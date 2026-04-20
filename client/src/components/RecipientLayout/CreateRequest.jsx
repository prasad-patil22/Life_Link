// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function CreateRequest() {
//   const [requests, setRequests] = useState([]);
//   const [form, setForm] = useState({
//     bloodGroup: "",
//     location: "",
//     urgency: "Medium",
//     message: "",
//   });
//   const [geo, setGeo] = useState({ latitude: null, longitude: null });

//   // Prefer unified userInfo saved at login/register
//   const stored = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("userInfo") || "null");
//     } catch (e) {
//       return null;
//     }
//   })();

//   const recipientId = stored?._id || stored?.id || localStorage.getItem("recipientId") || null;

//   // Fetch recipient’s requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         if (!recipientId) return; // nothing to fetch until logged in
//         const { data } = await axios.get(`http://localhost:8000/api/requests/recipient/${recipientId}`);
//         setRequests(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchRequests();
//   }, [recipientId]);

//   // Create new request
//   const handleCreateRequest = async (e) => {
//     e.preventDefault();
//     try {
//       if (!recipientId) {
//         alert("You must be logged in as a recipient to create a request. Please login.");
//         return;
//       }
//       // try to get geolocation if not already obtained
//       if (!geo.latitude || !geo.longitude) {
//         try {
//           const position = await new Promise((resolve, reject) => {
//             navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
//           });
//           setGeo({ latitude: position.coords.latitude, longitude: position.coords.longitude });
//         } catch (err) {
//           console.warn("Geolocation not available or denied", err);
//         }
//       }

//       const payload = { ...form, recipient: recipientId, latitude: geo.latitude, longitude: geo.longitude };
//       const { data } = await axios.post("http://localhost:8000/api/requests", payload);
//       alert("Request created successfully!");
//       setRequests([data, ...requests]);
//       setForm({ bloodGroup: "", location: "", urgency: "Medium", message: "" });
//     } catch (error) {
//       const message = error?.response?.data?.message || error.message || "Failed to create request";
//       alert(message);
//     }
//   };

//   // Mark fulfilled
//   const markFulfilled = async (id) => {
//     // show a simple prompt for rating and comment
//     const rating = Number(prompt("Please rate the donor (1-5)"));
//     const comment = prompt("Optional feedback about donor:", "");
//     if (!recipientId) return alert("You must be logged in as recipient to perform this action");
//     try {
//       const payload = { recipientId, reviewerName: stored?.name || '', rating, comment };
//       const { data } = await axios.put(`http://localhost:8000/api/requests/fulfill/${id}`, payload);
//       alert(data.message || "Marked as fulfilled!");
//       setRequests((prev) =>
//         prev.map((req) => (req._id === id ? { ...req, status: "Fulfilled", feedback: payload } : req))
//       );
//     } catch (error) {
//       const message = error?.response?.data?.message || error.message || "Failed to mark fulfilled";
//       alert(message);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Create Blood Request</h2>
//       <form onSubmit={handleCreateRequest} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           name="bloodGroup"
//           placeholder="Blood Group (e.g. A+)"
//           value={form.bloodGroup}
//           onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={form.location}
//           onChange={(e) => setForm({ ...form, location: e.target.value })}
//           required
//         />
//         <select
//           name="urgency"
//           value={form.urgency}
//           onChange={(e) => setForm({ ...form, urgency: e.target.value })}
//         >
//           <option>Low</option>
//           <option>Medium</option>
//           <option>High</option>
//           <option>Critical</option>
//         </select>
//         <textarea
//           name="message"
//           placeholder="Additional message..."
//           value={form.message}
//           onChange={(e) => setForm({ ...form, message: e.target.value })}
//         />
//         <button type="submit">Create Request</button>
//       </form>

//       <h3>My Requests</h3>
//       {requests.length === 0 && <p>No requests yet.</p>}
//       <ul>
//         {requests.map((req) => (
//           <li key={req._id} style={{ marginBottom: "10px" }}>
//             <strong>{req.bloodGroup}</strong> | {req.location} | Urgency: {req.urgency} | Status: {req.status}
//             <br />
//             <small>{req.message}</small>
//             <div>
//               <small>Created: {new Date(req.createdAt).toLocaleString()}</small>
//               <small style={{ marginLeft: 12 }}>Lat: {req.latitude || '-'} Lon: {req.longitude || '-'}</small>
//             </div>
//             {req.status === "Accepted" && req.recipient === recipientId && (
//               <button onClick={() => markFulfilled(req._id)} style={{ marginLeft: "10px" }}>
//                 Mark as Fulfilled & Leave Feedback
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CreateRequest() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    bloodGroup: "",
    location: "",
    urgency: "Medium",
    message: "",
  });
  const [geo, setGeo] = useState({ latitude: null, longitude: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fulfillingId, setFulfillingId] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [feedback, setFeedback] = useState({
    rating: 5,
    comment: ""
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = [
    { value: "Low", label: "Low", color: "#4caf50", icon: "fa-walking" },
    { value: "Medium", label: "Medium", color: "#ff9800", icon: "fa-running" },
    { value: "High", label: "High", color: "#f44336", icon: "fa-bolt" },
    { value: "Critical", label: "Critical", color: "#d32f2f", icon: "fa-exclamation-triangle" }
  ];

  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("userInfo") || "null");
    } catch (e) {
      return null;
    }
  })();

  const recipientId = stored?._id || stored?.id || localStorage.getItem("recipientId") || null;
  const recipientName = stored?.name || "Recipient";

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    });

    const fetchRequests = async () => {
      try {
        if (!recipientId) return;
        setIsLoading(true);
        const { data } = await axios.get(`http://localhost:8000/api/requests/recipient/${recipientId}`);
        setRequests(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load your requests. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, [recipientId]);

  const getLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGeo({ latitude, longitude });
          resolve({ latitude, longitude });
        },
        (error) => {
          console.warn("Geolocation error:", error);
          reject(error);
        },
        { 
          timeout: 10000,
          enableHighAccuracy: true 
        }
      );
    });
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    
    if (!recipientId) {
      alert("You must be logged in as a recipient to create a request. Please login.");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Get geolocation
      let locationData = geo;
      if (!geo.latitude || !geo.longitude) {
        try {
          locationData = await getLocation();
        } catch (err) {
          console.warn("Geolocation not available, proceeding without coordinates");
        }
      }

      const payload = { 
        ...form, 
        recipient: recipientId, 
        latitude: locationData.latitude, 
        longitude: locationData.longitude 
      };
      
      const { data } = await axios.post("http://localhost:8000/api/requests", payload);
      
      alert("✅ Request created successfully! Donors will be notified.");
      setRequests([data, ...requests]);
      setForm({ bloodGroup: "", location: "", urgency: "Medium", message: "" });
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Failed to create request";
      alert(`❌ ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openFeedbackModal = (requestId) => {
    setCurrentRequestId(requestId);
    setFeedback({ rating: 5, comment: "" });
    setShowFeedbackModal(true);
  };

  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
    setCurrentRequestId(null);
    setFulfillingId(null);
  };

  const markFulfilled = async () => {
    if (!recipientId || !currentRequestId) return;

    try {
      setFulfillingId(currentRequestId);
      const payload = { 
        recipientId, 
        reviewerName: recipientName, 
        rating: feedback.rating, 
        comment: feedback.comment 
      };
      
      const { data } = await axios.put(`http://localhost:8000/api/requests/fulfill/${currentRequestId}`, payload);
      
      alert("✅ " + (data.message || "Thank you for your feedback! Request marked as fulfilled."));
      setRequests((prev) =>
        prev.map((req) => (req._id === currentRequestId ? { ...req, status: "Fulfilled", feedback: payload } : req))
      );
      closeFeedbackModal();
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Failed to mark fulfilled";
      alert(`❌ ${message}`);
    } finally {
      setFulfillingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: { backgroundColor: "#fff3e0", color: "#ef6c00" },
      Accepted: { backgroundColor: "#e3f2fd", color: "#1976d2" },
      Fulfilled: { backgroundColor: "#e8f5e8", color: "#2e7d32" },
      Cancelled: { backgroundColor: "#f5f5f5", color: "#757575" }
    };

    const style = statusStyles[status] || statusStyles.Pending;

    return (
      <span style={{
        ...style,
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "0.8rem",
        fontWeight: "600",
        textTransform: "uppercase"
      }}>
        {status}
      </span>
    );
  };

  const getUrgencyBadge = (urgency) => {
    const urgencyConfig = urgencyLevels.find(u => u.value === urgency) || urgencyLevels[1];
    
    return (
      <span style={{
        backgroundColor: urgencyConfig.color + "20",
        color: urgencyConfig.color,
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "0.8rem",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "4px"
      }}>
        <i className={`fas ${urgencyConfig.icon}`} style={{fontSize: "0.7rem"}}></i>
        {urgency}
      </span>
    );
  };

  const getTotalStats = () => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === "Pending").length;
    const accepted = requests.filter(r => r.status === "Accepted").length;
    const fulfilled = requests.filter(r => r.status === "Fulfilled").length;

    return { total, pending, accepted, fulfilled };
  };

  const stats = getTotalStats();

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header} data-aos="fade-down">
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            <i className="fas fa-hand-holding-heart" style={styles.titleIcon}></i>
            Request Blood Donation
          </h1>
          <p style={styles.subtitle}>Create a request to find compatible blood donors in your area</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsContainer} data-aos="fade-up" data-aos-delay="200">
        <div style={styles.statCard}>
          <div style={styles.statIconContainer}>
            <i className="fas fa-list" style={styles.statIcon}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.total}</h3>
            <p style={styles.statLabel}>Total Requests</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIconContainer, backgroundColor: "#fff3e0"}}>
            <i className="fas fa-clock" style={{...styles.statIcon, color: "#ef6c00"}}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.pending}</h3>
            <p style={styles.statLabel}>Pending</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIconContainer, backgroundColor: "#e3f2fd"}}>
            <i className="fas fa-check" style={{...styles.statIcon, color: "#1976d2"}}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.accepted}</h3>
            <p style={styles.statLabel}>Accepted</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIconContainer, backgroundColor: "#e8f5e8"}}>
            <i className="fas fa-heart" style={{...styles.statIcon, color: "#2e7d32"}}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.fulfilled}</h3>
            <p style={styles.statLabel}>Fulfilled</p>
          </div>
        </div>
      </div>

      <div style={styles.contentGrid}>
        {/* Create Request Form */}
        <div style={styles.formSection} data-aos="fade-right" data-aos-delay="300">
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>
              <i className="fas fa-plus-circle"></i>
              New Blood Request
            </h2>
            
            <form onSubmit={handleCreateRequest} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <i className="fas fa-tint"></i>
                  Blood Group Needed *
                </label>
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                  style={styles.select}
                  required
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <i className="fas fa-map-marker-alt"></i>
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your city or area"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <i className="fas fa-exclamation-circle"></i>
                  Urgency Level
                </label>
                <select
                  name="urgency"
                  value={form.urgency}
                  onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                  style={styles.select}
                >
                  {urgencyLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
                <div style={styles.urgencyPreview}>
                  {getUrgencyBadge(form.urgency)}
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <i className="fas fa-comment"></i>
                  Additional Message
                </label>
                <textarea
                  name="message"
                  placeholder="Any additional information for donors..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={styles.textarea}
                  rows="4"
                />
              </div>

              <div style={styles.locationInfo}>
                <i className="fas fa-info-circle" style={styles.infoIcon}></i>
                <span>
                  {geo.latitude && geo.longitude 
                    ? "📍 Location detected automatically" 
                    : "📍 Enable location for better donor matching"
                  }
                </span>
              </div>

              <button 
                type="submit" 
                style={
                  isSubmitting ? 
                  {...styles.submitButton, ...styles.submitButtonLoading} : 
                  styles.submitButton
                }
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Creating Request...
                  </>
                ) : (
                  <>
                    <i className="fas fa-bell"></i>
                    Create Blood Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* My Requests Section */}
        <div style={styles.requestsSection} data-aos="fade-left" data-aos-delay="400">
          <div style={styles.requestsCard}>
            <h2 style={styles.requestsTitle}>
              <i className="fas fa-history"></i>
              My Blood Requests
            </h2>

            {isLoading ? (
              <div style={styles.loadingState}>
                <i className="fas fa-spinner fa-spin" style={styles.loadingIcon}></i>
                <p>Loading your requests...</p>
              </div>
            ) : requests.length === 0 ? (
              <div style={styles.emptyState}>
                <i className="fas fa-inbox" style={styles.emptyIcon}></i>
                <h3>No requests yet</h3>
                <p>Create your first blood request to get started</p>
              </div>
            ) : (
              <div style={styles.requestsList}>
                {requests.map((request, index) => (
                  <div key={request._id} style={styles.requestItem} data-aos="fade-up" data-aos-delay={index * 100}>
                    <div style={styles.requestHeader}>
                      <div style={styles.bloodGroup}>
                        <i className="fas fa-tint" style={styles.bloodIcon}></i>
                        {request.bloodGroup}
                      </div>
                      <div style={styles.requestStatus}>
                        {getStatusBadge(request.status)}
                        {getUrgencyBadge(request.urgency)}
                      </div>
                    </div>

                    <div style={styles.requestDetails}>
                      <div style={styles.detailRow}>
                        <i className="fas fa-map-marker-alt" style={styles.detailIcon}></i>
                        <span>{request.location}</span>
                      </div>
                      
                      {request.message && (
                        <div style={styles.detailRow}>
                          <i className="fas fa-comment" style={styles.detailIcon}></i>
                          <span style={styles.messageText}>"{request.message}"</span>
                        </div>
                      )}

                      <div style={styles.detailRow}>
                        <i className="fas fa-calendar" style={styles.detailIcon}></i>
                        <span>Created: {new Date(request.createdAt).toLocaleString()}</span>
                      </div>

                      {(request.latitude && request.longitude) && (
                        <div style={styles.detailRow}>
                          <i className="fas fa-location-crosshairs" style={styles.detailIcon}></i>
                          <span>Location: {request.latitude.toFixed(4)}, {request.longitude.toFixed(4)}</span>
                        </div>
                      )}
                    </div>

                    {request.status === "Accepted" && request.recipient === recipientId && (
                      <div style={styles.requestActions}>
                        <button 
                          onClick={() => openFeedbackModal(request._id)}
                          style={styles.fulfillButton}
                        >
                          <i className="fas fa-check-circle"></i>
                          Mark as Fulfilled
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal} data-aos="zoom-in">
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <i className="fas fa-star" style={{color: "#ffc107"}}></i>
                Rate Your Donor Experience
              </h3>
              <button onClick={closeFeedbackModal} style={styles.closeButton}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.ratingSection}>
                <label style={styles.modalLabel}>Rate the donor (1-5 stars)</label>
                <div style={styles.starRating}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                      style={styles.starButton}
                    >
                      <i 
                        className={star <= feedback.rating ? "fas fa-star" : "far fa-star"} 
                        style={{
                          fontSize: "2.5rem",
                          color: star <= feedback.rating ? "#ffc107" : "#ddd",
                          textShadow: star <= feedback.rating ? "0 2px 4px rgba(255, 193, 7, 0.3)" : "none",
                          transition: "all 0.3s ease"
                        }}
                      ></i>
                    </button>
                  ))}
                </div>
                <span style={styles.ratingText}>
                  {feedback.rating} {feedback.rating === 1 ? 'star' : 'stars'} - {
                    feedback.rating === 5 ? 'Excellent' :
                    feedback.rating === 4 ? 'Very Good' :
                    feedback.rating === 3 ? 'Good' :
                    feedback.rating === 2 ? 'Fair' : 'Poor'
                  }
                </span>
              </div>

              <div style={styles.commentSection}>
                <label style={styles.modalLabel}>Additional Comments (Optional)</label>
                <textarea
                  value={feedback.comment}
                  onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your experience with the donor..."
                  style={styles.modalTextarea}
                  rows="4"
                />
              </div>
            </div>

            <div style={styles.modalActions}>
              <button onClick={closeFeedbackModal} style={styles.cancelModalButton}>
                Cancel
              </button>
              <button 
                onClick={markFulfilled}
                disabled={fulfillingId === currentRequestId}
                style={
                  fulfillingId === currentRequestId ? 
                  {...styles.submitModalButton, ...styles.submitModalButtonLoading} : 
                  styles.submitModalButton
                }
              >
                {fulfillingId === currentRequestId ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i>
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  headerContent: {
    textAlign: "center"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px"
  },
  titleIcon: {
    color: "#e53935"
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#666",
    margin: 0
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  statCard: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    transition: "transform 0.3s ease"
  },
  statCardHover: {
    transform: "translateY(-5px)"
  },
  statIconContainer: {
    width: "60px",
    height: "60px",
    backgroundColor: "#ffebee",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  statIcon: {
    fontSize: "1.5rem",
    color: "#e53935"
  },
  statContent: {
    flex: 1
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "0 0 5px 0"
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#666",
    margin: 0,
    fontWeight: "500"
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    alignItems: "start"
  },
  formSection: {
    // Styles for form section
  },
  formCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  formTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#2c3e50",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  input: {
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa"
  },
  select: {
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "#fafafa",
    cursor: "pointer"
  },
  textarea: {
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    resize: "vertical",
    minHeight: "100px",
    fontFamily: "inherit"
  },
  inputFocus: {
    borderColor: "#e53935",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(229, 57, 53, 0.1)"
  },
  urgencyPreview: {
    marginTop: "8px"
  },
  locationInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    backgroundColor: "#e3f2fd",
    borderRadius: "8px",
    fontSize: "0.9rem",
    color: "#1976d2"
  },
  infoIcon: {
    fontSize: "0.9rem"
  },
  submitButton: {
    padding: "15px 20px",
    backgroundColor: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    marginTop: "10px"
  },
  submitButtonHover: {
    backgroundColor: "#c62828",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(229, 57, 53, 0.3)"
  },
  submitButtonLoading: {
    backgroundColor: "#999",
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none"
  },
  requestsSection: {
    // Styles for requests section
  },
  requestsCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    maxHeight: "600px",
    overflowY: "auto"
  },
  requestsTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  loadingState: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#666"
  },
  loadingIcon: {
    fontSize: "2rem",
    marginBottom: "10px"
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#666"
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "15px",
    color: "#ddd"
  },
  requestsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  requestItem: {
    padding: "20px",
    border: "1px solid #e9ecef",
    borderRadius: "10px",
    transition: "all 0.3s ease"
  },
  requestItemHover: {
    borderColor: "#e53935",
    boxShadow: "0 2px 8px rgba(229, 57, 53, 0.1)"
  },
  requestHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },
  bloodGroup: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#e53935",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  bloodIcon: {
    fontSize: "1.1rem"
  },
  requestStatus: {
    display: "flex",
    gap: "8px",
    alignItems: "center"
  },
  requestDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "15px"
  },
  detailRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    fontSize: "0.9rem",
    color: "#666"
  },
  detailIcon: {
    color: "#999",
    fontSize: "0.8rem",
    width: "14px",
    marginTop: "2px"
  },
  messageText: {
    fontStyle: "italic",
    color: "#555"
  },
  requestActions: {
    borderTop: "1px solid #f0f0f0",
    paddingTop: "15px"
  },
  fulfillButton: {
    padding: "8px 16px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s ease"
  },
  fulfillButtonHover: {
    backgroundColor: "#388e3c",
    transform: "translateY(-1px)"
  },
  // Modal Styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px"
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
    width: "100%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflow: "auto"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 25px 0 25px",
    marginBottom: "20px"
  },
  modalTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#2c3e50",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    color: "#666",
    cursor: "pointer",
    padding: "5px",
    borderRadius: "4px",
    transition: "all 0.3s ease"
  },
  closeButtonHover: {
    backgroundColor: "#f5f5f5",
    color: "#333"
  },
  modalContent: {
    padding: "0 25px",
    display: "flex",
    flexDirection: "column",
    gap: "25px"
  },
  ratingSection: {
    textAlign: "center"
  },
  modalLabel: {
    display: "block",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "15px",
    textAlign: "center"
  },
  starRating: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "15px",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px"
  },
  starButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    transition: "transform 0.2s ease",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  starButtonHover: {
    transform: "scale(1.2)",
    backgroundColor: "rgba(255, 193, 7, 0.1)"
  },
  ratingText: {
    fontSize: "1rem",
    color: "#666",
    fontWeight: "600",
    textAlign: "center",
    padding: "8px 16px",
    backgroundColor: "#e8f5e8",
    borderRadius: "20px",
    display: "inline-block"
  },
  commentSection: {
    // Styles for comment section
  },
  modalTextarea: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    resize: "vertical",
    minHeight: "100px",
    fontFamily: "inherit",
    transition: "all 0.3s ease"
  },
  modalTextareaFocus: {
    borderColor: "#e53935",
    boxShadow: "0 0 0 3px rgba(229, 57, 53, 0.1)"
  },
  modalActions: {
    display: "flex",
    gap: "15px",
    padding: "25px",
    borderTop: "1px solid #e9ecef",
    marginTop: "10px"
  },
  cancelModalButton: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "transparent",
    color: "#666",
    border: "2px solid #666",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  cancelModalButtonHover: {
    backgroundColor: "#666",
    color: "white"
  },
  submitModalButton: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease"
  },
  submitModalButtonHover: {
    backgroundColor: "#c62828",
    transform: "translateY(-2px)"
  },
  submitModalButtonLoading: {
    backgroundColor: "#999",
    cursor: "not-allowed",
    transform: "none"
  }
};

// Add hover effects
Object.assign(styles.statCard, {
  ":hover": styles.statCardHover
});

Object.assign(styles.submitButton, {
  ":hover": styles.submitButtonHover
});

Object.assign(styles.requestItem, {
  ":hover": styles.requestItemHover
});

Object.assign(styles.fulfillButton, {
  ":hover": styles.fulfillButtonHover
});

Object.assign(styles.closeButton, {
  ":hover": styles.closeButtonHover
});

Object.assign(styles.starButton, {
  ":hover": styles.starButtonHover
});

Object.assign(styles.cancelModalButton, {
  ":hover": styles.cancelModalButtonHover
});

Object.assign(styles.submitModalButton, {
  ":hover": styles.submitModalButtonHover
});

Object.assign(styles.input, {
  ":focus": styles.inputFocus
});

Object.assign(styles.textarea, {
  ":focus": styles.inputFocus
});

Object.assign(styles.modalTextarea, {
  ":focus": styles.modalTextareaFocus
});

// Responsive styles
const responsiveStyles = `
  @media (max-width: 968px) {
    .contentGrid {
      grid-template-columns: 1fr;
    }
    .requestsCard {
      max-height: none;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 15px;
    }
    .header {
      padding: 20px;
    }
    .title {
      font-size: 2rem;
    }
    .statsContainer {
      grid-template-columns: repeat(2, 1fr);
    }
    .formCard, .requestsCard {
      padding: 20px;
    }
  }

  @media (max-width: 480px) {
    .statsContainer {
      grid-template-columns: 1fr;
    }
    .requestHeader {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .requestStatus {
      align-self: flex-start;5
    }
    .starRating {
      gap: 5px;
    }
    .starButton {
      width: 40px;
      height: 40px;
    }
  }
`;

// Add responsive styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = responsiveStyles;
  document.head.appendChild(styleSheet);
}