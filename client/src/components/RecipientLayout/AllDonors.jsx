// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AllDonors() {
//   const [donors, setDonors] = useState([]);
//   const [expanded, setExpanded] = useState(null);

//   useEffect(() => {
//     const fetchDonors = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8000/api/recipients/all-donors");
//         setDonors(data);
//         console.log(data)
//       } catch (error) {
//         console.error("Error fetching donors:", error);
//       }
//     };
//     fetchDonors();
//   }, []);

//   return (
//     <div>
//       <h2>All Donors</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Blood Group</th>
//             <th>Location</th>
//             <th>Latitude</th>
//             <th>Longitude</th>
//             <th>Avg Rating</th>
//             <th>Last Donation Date</th>
//             <th>Feedback</th>
//           </tr>
//         </thead>
//         <tbody>
//           {donors.map((donor) => (
//             <tr key={donor._id}>
//               <td>{donor.name}</td>
//               <td>{donor.email}</td>
//               <td>{donor.phone || "-"}</td>
//               <td>{donor.bloodGroup}</td>
//               <td>{donor.location}</td>
//               <td>{donor.latitude || "-"}</td>
//               <td>{donor.longitude || "-"}</td>
//               <td>{
//                 donor.reviews && donor.reviews.length > 0 ?
//                   (donor.reviews.reduce((s, r) => s + (r.rating || 0), 0) / donor.reviews.length).toFixed(1)
//                   : '-'
//               }</td>
//               <td>{donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : "N/A"}</td>
//               <td>
//                 <button onClick={() => setExpanded(expanded === donor._id ? null : donor._id)}>Show</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {expanded && (
//         <div style={{ marginTop: 16 }}>
//           <h3>Feedback</h3>
//           {donors.find(d => d._id === expanded).reviews?.length > 0 ? (
//             <ul>
//               {donors.find(d => d._id === expanded).reviews.map(r => (
//                 <li key={r._id || r.createdAt}>
//                   <strong>{r.reviewerName || 'Anonymous'}</strong> — {r.rating || '-'} / 5
//                   <p>{r.comment}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No feedback yet for this donor.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AOS from "aos";
import "aos/dist/aos.css";

// Custom marker icon for Leaflet
const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function AllDonors() {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    });

    const fetchDonors = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("http://localhost:8000/api/recipients/all-donors");
        setDonors(data);
      } catch (error) {
        console.error("Error fetching donors:", error);
        alert("Failed to load donors. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const handleCall = (phoneNumber) => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`);
    }
  };

  const handleWhatsApp = (phoneNumber, donorName) => {
    if (phoneNumber) {
      const message = `Hello ${donorName}, I found your contact through the blood donor platform and would like to discuss blood donation.`;
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
    }
  };

  const handleEmail = (email, donorName) => {
    const subject = `Blood Donation Inquiry - Contacting ${donorName}`;
    const body = `Dear ${donorName},\n\nI found your contact through the blood donor platform and would like to discuss blood donation.\n\nThank you.`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    return (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "#2e7d32";
    if (rating >= 3) return "#ff9800";
    return "#f44336";
  };

  const getStatusBadge = (donor) => {
    const lastDonation = donor.lastDonationDate ? new Date(donor.lastDonationDate) : null;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    if (!lastDonation) {
      return { status: "New Donor", color: "#2196f3", bgColor: "#e3f2fd" };
    } else if (lastDonation > sixMonthsAgo) {
      return { status: "Active", color: "#4caf50", bgColor: "#e8f5e8" };
    } else {
      return { status: "Inactive", color: "#757575", bgColor: "#f5f5f5" };
    }
  };

  const openMapModal = (donor) => {
    setSelectedDonor(donor);
    setShowMapModal(true);
  };

  const openFeedbackModal = (donor) => {
    setSelectedDonor(donor);
    setShowFeedbackModal(true);
  };

  const closeModals = () => {
    setShowMapModal(false);
    setShowFeedbackModal(false);
    setSelectedDonor(null);
  };

  // Filter donors based on search criteria
  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup = !bloodGroupFilter || donor.bloodGroup === bloodGroupFilter;
    const matchesLocation = !locationFilter || donor.location?.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesBloodGroup && matchesLocation;
  });

  const getTotalStats = () => {
    const total = donors.length;
    const active = donors.filter(donor => {
      const lastDonation = donor.lastDonationDate ? new Date(donor.lastDonationDate) : null;
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return lastDonation && lastDonation > sixMonthsAgo;
    }).length;
    const newDonors = donors.filter(donor => !donor.lastDonationDate).length;
    const rated = donors.filter(donor => donor.reviews && donor.reviews.length > 0).length;

    return { total, active, newDonors, rated };
  };

  const stats = getTotalStats();

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header} data-aos="fade-down">
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            <i className="fas fa-users" style={styles.titleIcon}></i>
            Blood Donors Directory
          </h1>
          <p style={styles.subtitle}>Find and connect with verified blood donors in your area</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsContainer} data-aos="fade-up" data-aos-delay="200">
        <div style={styles.statCard}>
          <div style={styles.statIconContainer}>
            <i className="fas fa-users" style={styles.statIcon}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.total}</h3>
            <p style={styles.statLabel}>Total Donors</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIconContainer, backgroundColor: "#e8f5e8"}}>
            <i className="fas fa-heartbeat" style={{...styles.statIcon, color: "#4caf50"}}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.active}</h3>
            <p style={styles.statLabel}>Active Donors</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIconContainer, backgroundColor: "#e3f2fd"}}>
            <i className="fas fa-star" style={{...styles.statIcon, color: "#2196f3"}}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.newDonors}</h3>
            <p style={styles.statLabel}>New Donors</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIconContainer, backgroundColor: "#fff3e0"}}>
            <i className="fas fa-comments" style={{...styles.statIcon, color: "#ff9800"}}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.rated}</h3>
            <p style={styles.statLabel}>Rated Donors</p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div style={styles.controlsSection} data-aos="fade-up" data-aos-delay="300">
        <div style={styles.controlsCard}>
          <div style={styles.controlsGrid}>
            <div style={styles.searchGroup}>
              <i className="fas fa-search" style={styles.searchIcon}></i>
              <input
                type="text"
                placeholder="Search donors by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            
            <select
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Blood Groups</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              style={styles.filterInput}
            />

            <button
              onClick={() => openMapModal(null)}
              style={styles.mapToggleButton}
            >
              <i className="fas fa-map" style={{marginRight: '8px'}}></i>
              View All Donors Map
            </button>
          </div>
        </div>
      </div>

      {/* Donors List Section */}
      <div style={styles.donorsSection} data-aos="fade-up" data-aos-delay="400">
        <div style={styles.donorsCard}>
          <h2 style={styles.donorsTitle}>
            <i className="fas fa-list"></i>
            Available Donors ({filteredDonors.length})
          </h2>

          {isLoading ? (
            <div style={styles.loadingState}>
              <i className="fas fa-spinner fa-spin" style={styles.loadingIcon}></i>
              <p>Loading donors...</p>
            </div>
          ) : filteredDonors.length === 0 ? (
            <div style={styles.emptyState}>
              <i className="fas fa-user-slash" style={styles.emptyIcon}></i>
              <h3>No donors found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <div style={styles.donorsGrid}>
              {filteredDonors.map((donor, index) => {
                const status = getStatusBadge(donor);
                const avgRating = calculateAverageRating(donor.reviews);
                
                return (
                  <div 
                    key={donor._id} 
                    style={styles.donorCard}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div style={styles.donorHeader}>
                      <div style={styles.donorInfo}>
                        <div style={styles.avatar}>
                          <i className="fas fa-user" style={styles.avatarIcon}></i>
                        </div>
                        <div>
                          <h4 style={styles.donorName}>{donor.name}</h4>
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: status.bgColor,
                            color: status.color
                          }}>
                            {status.status}
                          </span>
                        </div>
                      </div>
                      <div style={styles.bloodGroup}>
                        <i className="fas fa-tint" style={styles.bloodIcon}></i>
                        {donor.bloodGroup}
                      </div>
                    </div>

                    <div style={styles.donorDetails}>
                      <div style={styles.detailRow}>
                        <i className="fas fa-map-marker-alt" style={styles.detailIcon}></i>
                        <span>{donor.location}</span>
                      </div>
                      
                      <div style={styles.detailRow}>
                        <i className="fas fa-envelope" style={styles.detailIcon}></i>
                        <span>{donor.email}</span>
                      </div>

                      {donor.phone && (
                        <div style={styles.detailRow}>
                          <i className="fas fa-phone" style={styles.detailIcon}></i>
                          <span>{donor.phone}</span>
                        </div>
                      )}

                      {donor.lastDonationDate && (
                        <div style={styles.detailRow}>
                          <i className="fas fa-calendar" style={styles.detailIcon}></i>
                          <span>Last donation: {new Date(donor.lastDonationDate).toLocaleDateString()}</span>
                        </div>
                      )}

                      <div style={styles.detailRow}>
                        <i className="fas fa-star" style={{...styles.detailIcon, color: "#ffc107"}}></i>
                        <span>
                          Rating: <strong style={{color: getRatingColor(avgRating)}}>
                            {avgRating > 0 ? `${avgRating}/5` : 'Not rated'}
                          </strong>
                          {donor.reviews && donor.reviews.length > 0 && (
                            <span style={styles.reviewCount}>({donor.reviews.length} reviews)</span>
                          )}
                        </span>
                      </div>
                    </div>

                    <div style={styles.donorActions}>
                      {donor.phone && (
                        <>
                          <button 
                            onClick={() => handleCall(donor.phone)}
                            style={styles.actionButton}
                            title="Call"
                          >
                            <i className="fas fa-phone"></i>
                          </button>
                          <button 
                            onClick={() => handleWhatsApp(donor.phone, donor.name)}
                            style={{...styles.actionButton, backgroundColor: "#25D366"}}
                            title="WhatsApp"
                          >
                            <i className="fab fa-whatsapp"></i>
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleEmail(donor.email, donor.name)}
                        style={{...styles.actionButton, backgroundColor: "#ea4335"}}
                        title="Email"
                      >
                        <i className="fas fa-envelope"></i>
                      </button>
                      
                      {/* View Map Button */}
                      {donor.latitude && donor.longitude && (
                        <button 
                          onClick={() => openMapModal(donor)}
                          style={{...styles.actionButton, backgroundColor: "#667eea"}}
                          title="View Location"
                        >
                          <i className="fas fa-map-marker-alt"></i>
                        </button>
                      )}
                      
                      {/* View Feedback Button */}
                      {donor.reviews && donor.reviews.length > 0 && (
                        <button 
                          onClick={() => openFeedbackModal(donor)}
                          style={{...styles.actionButton, backgroundColor: "#ff9800"}}
                          title="View Reviews"
                        >
                          <i className="fas fa-comments"></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal} data-aos="zoom-in">
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <i className="fas fa-map-marker-alt" style={{color: "#e53935", marginRight: '10px'}}></i>
                {selectedDonor ? `${selectedDonor.name}'s Location` : 'All Donors Map'}
              </h3>
              <button onClick={closeModals} style={styles.closeButton}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.mapModalContainer}>
                <MapContainer 
                  center={selectedDonor ? [selectedDonor.latitude, selectedDonor.longitude] : [20.5937, 78.9629]} 
                  zoom={selectedDonor ? 12 : 5} 
                  style={{ height: '500px', width: '100%', borderRadius: '10px' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {selectedDonor ? (
                    <Marker 
                      position={[selectedDonor.latitude, selectedDonor.longitude]}
                      icon={customIcon}
                    >
                      <Popup>
                        <div style={styles.popupContent}>
                          <h4 style={styles.popupName}>{selectedDonor.name}</h4>
                          <div style={styles.popupBadge}>
                            <i className="fas fa-tint" style={{color: "#e53935", marginRight: '5px'}}></i>
                            {selectedDonor.bloodGroup}
                          </div>
                          <p style={styles.popupLocation}>
                            <i className="fas fa-map-marker-alt" style={{marginRight: '5px'}}></i>
                            {selectedDonor.location}
                          </p>
                          {selectedDonor.phone && (
                            <p style={styles.popupPhone}>
                              <i className="fas fa-phone" style={{marginRight: '5px'}}></i>
                              {selectedDonor.phone}
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ) : (
                    filteredDonors.filter(donor => donor.latitude && donor.longitude).map((donor) => (
                      <Marker 
                        key={donor._id} 
                        position={[donor.latitude, donor.longitude]}
                        icon={customIcon}
                      >
                        <Popup>
                          <div style={styles.popupContent}>
                            <h4 style={styles.popupName}>{donor.name}</h4>
                            <div style={styles.popupBadge}>
                              <i className="fas fa-tint" style={{color: "#e53935", marginRight: '5px'}}></i>
                              {donor.bloodGroup}
                            </div>
                            <p style={styles.popupLocation}>
                              <i className="fas fa-map-marker-alt" style={{marginRight: '5px'}}></i>
                              {donor.location}
                            </p>
                            {donor.phone && (
                              <p style={styles.popupPhone}>
                                <i className="fas fa-phone" style={{marginRight: '5px'}}></i>
                                {donor.phone}
                              </p>
                            )}
                          </div>
                        </Popup>
                      </Marker>
                    ))
                  )}
                </MapContainer>
              </div>
              
              {selectedDonor && (
                <div style={styles.donorInfoModal}>
                  <h4 style={styles.donorInfoTitle}>Donor Information</h4>
                  <div style={styles.donorInfoGrid}>
                    <div style={styles.infoItem}>
                      <strong>Name:</strong> {selectedDonor.name}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Blood Group:</strong> {selectedDonor.bloodGroup}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Location:</strong> {selectedDonor.location}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Email:</strong> {selectedDonor.email}
                    </div>
                    {selectedDonor.phone && (
                      <div style={styles.infoItem}>
                        <strong>Phone:</strong> {selectedDonor.phone}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div style={styles.modalActions}>
              <button onClick={closeModals} style={styles.closeModalButton}>
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedDonor && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal} data-aos="zoom-in">
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <i className="fas fa-comments" style={{color: "#ff9800", marginRight: '10px'}}></i>
                Reviews for {selectedDonor.name}
              </h3>
              <button onClick={closeModals} style={styles.closeButton}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.donorSummary}>
                <div style={styles.avatarLarge}>
                  <i className="fas fa-user" style={styles.avatarIconLarge}></i>
                </div>
                <div style={styles.donorSummaryInfo}>
                  <h4 style={styles.donorNameLarge}>{selectedDonor.name}</h4>
                  <div style={styles.bloodGroupLarge}>
                    <i className="fas fa-tint" style={styles.bloodIconLarge}></i>
                    {selectedDonor.bloodGroup}
                  </div>
                  <div style={styles.ratingSummary}>
                    <i className="fas fa-star" style={{color: "#ffc107", marginRight: '5px'}}></i>
                    <strong style={{color: getRatingColor(calculateAverageRating(selectedDonor.reviews))}}>
                      {calculateAverageRating(selectedDonor.reviews)}/5
                    </strong>
                    <span style={styles.totalReviews}>({selectedDonor.reviews.length} reviews)</span>
                  </div>
                </div>
              </div>

              <div style={styles.reviewsSectionModal}>
                {selectedDonor.reviews.length === 0 ? (
                  <div style={styles.noReviews}>
                    <i className="fas fa-comment-slash" style={styles.noReviewsIcon}></i>
                    <p>No reviews yet for this donor.</p>
                  </div>
                ) : (
                  <div style={styles.reviewsListModal}>
                    {selectedDonor.reviews.map((review, index) => (
                      <div key={review._id || index} style={styles.reviewItemModal}>
                        <div style={styles.reviewHeaderModal}>
                          <div style={styles.reviewerInfo}>
                            <strong style={styles.reviewerName}>
                              {review.reviewerName || 'Anonymous'}
                            </strong>
                            <div style={styles.reviewRatingModal}>
                              {[1, 2, 3, 4, 5].map(star => (
                                <i 
                                  key={star}
                                  className={star <= review.rating ? "fas fa-star" : "far fa-star"} 
                                  style={{
                                    color: star <= review.rating ? "#ffc107" : "#ddd",
                                    fontSize: "0.9rem",
                                    marginRight: "2px"
                                  }}
                                ></i>
                              ))}
                              <span style={styles.ratingTextModal}>({review.rating}/5)</span>
                            </div>
                          </div>
                          {review.createdAt && (
                            <span style={styles.reviewDateModal}>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {review.comment && (
                          <p style={styles.reviewCommentModal}>"{review.comment}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={styles.modalActions}>
              <button onClick={closeModals} style={styles.closeModalButton}>
                Close Reviews
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
  controlsSection: {
    marginBottom: "30px"
  },
  controlsCard: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  controlsGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr auto",
    gap: "15px",
    alignItems: "center"
  },
  searchGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    color: "#666",
    zIndex: 1
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 45px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa"
  },
  filterSelect: {
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "#fafafa",
    cursor: "pointer"
  },
  filterInput: {
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa"
  },
  mapToggleButton: {
    padding: "12px 20px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap"
  },
  donorsSection: {
    marginBottom: "30px"
  },
  donorsCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  donorsTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  donorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "20px"
  },
  donorCard: {
    border: "1px solid #e9ecef",
    borderRadius: "12px",
    padding: "20px",
    transition: "all 0.3s ease",
    backgroundColor: "white"
  },
  donorCardHover: {
    borderColor: "#667eea",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.1)",
    transform: "translateY(-2px)"
  },
  donorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px"
  },
  donorInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  avatar: {
    width: "50px",
    height: "50px",
    backgroundColor: "#667eea",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  avatarIcon: {
    color: "white",
    fontSize: "1.2rem"
  },
  donorName: {
    margin: "0 0 5px 0",
    color: "#2c3e50",
    fontSize: "1.1rem",
    fontWeight: "600"
  },
  statusBadge: {
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "0.7rem",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  bloodGroup: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#e53935",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  bloodIcon: {
    fontSize: "1rem"
  },
  donorDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "15px"
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.9rem",
    color: "#666"
  },
  detailIcon: {
    color: "#999",
    fontSize: "0.8rem",
    width: "14px",
    textAlign: "center"
  },
  reviewCount: {
    color: "#999",
    fontSize: "0.8rem",
    marginLeft: "5px"
  },
  donorActions: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  actionButton: {
    padding: "8px 12px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.8rem",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "40px"
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
    maxWidth: "900px",
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
    alignItems: "center"
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
    padding: "0 25px 25px 25px"
  },
  mapModalContainer: {
    marginBottom: "20px"
  },
  popupContent: {
    padding: "10px",
    minWidth: "200px"
  },
  popupName: {
    margin: "0 0 10px 0",
    color: "#2c3e50",
    fontSize: "1.1rem"
  },
  popupBadge: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#ffebee",
    color: "#e53935",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "600",
    marginBottom: "8px"
  },
  popupLocation: {
    margin: "5px 0",
    color: "#666",
    fontSize: "0.9rem"
  },
  popupPhone: {
    margin: "5px 0",
    color: "#666",
    fontSize: "0.9rem"
  },
  donorInfoModal: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px"
  },
  donorInfoTitle: {
    margin: "0 0 15px 0",
    color: "#2c3e50",
    fontSize: "1.1rem"
  },
  donorInfoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px"
  },
  infoItem: {
    padding: "8px",
    backgroundColor: "white",
    borderRadius: "6px",
    fontSize: "0.9rem"
  },
  // Feedback Modal Styles
  donorSummary: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  avatarLarge: {
    width: "80px",
    height: "80px",
    backgroundColor: "#667eea",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  avatarIconLarge: {
    color: "white",
    fontSize: "2rem"
  },
  donorSummaryInfo: {
    flex: 1
  },
  donorNameLarge: {
    margin: "0 0 8px 0",
    color: "#2c3e50",
    fontSize: "1.5rem",
    fontWeight: "600"
  },
  bloodGroupLarge: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#e53935",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px"
  },
  bloodIconLarge: {
    fontSize: "1.2rem"
  },
  ratingSummary: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "1.1rem"
  },
  totalReviews: {
    color: "#666",
    fontSize: "0.9rem"
  },
  reviewsSectionModal: {
    maxHeight: "400px",
    overflowY: "auto"
  },
  noReviews: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#666"
  },
  noReviewsIcon: {
    fontSize: "3rem",
    marginBottom: "15px",
    color: "#ddd"
  },
  reviewsListModal: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  reviewItemModal: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "1px solid #e9ecef",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  },
  reviewHeaderModal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px"
  },
  reviewerInfo: {
    flex: 1
  },
  reviewerName: {
    color: "#2c3e50",
    fontSize: "1rem",
    marginBottom: "5px"
  },
  reviewRatingModal: {
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  ratingTextModal: {
    color: "#666",
    fontSize: "0.8rem",
    marginLeft: "5px"
  },
  reviewDateModal: {
    color: "#999",
    fontSize: "0.8rem"
  },
  reviewCommentModal: {
    margin: 0,
    color: "#555",
    fontSize: "0.9rem",
    lineHeight: "1.5",
    fontStyle: "italic"
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 25px 25px 25px"
  },
  closeModalButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
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
  }
};

// Add hover effects
Object.assign(styles.statCard, {
  ":hover": styles.statCardHover
});

Object.assign(styles.donorCard, {
  ":hover": styles.donorCardHover
});

Object.assign(styles.mapToggleButton, {
  ":hover": {
    backgroundColor: "#5a6fd8",
    transform: "translateY(-1px)"
  }
});

Object.assign(styles.actionButton, {
  ":hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
  }
});

Object.assign(styles.closeButton, {
  ":hover": styles.closeButtonHover
});

Object.assign(styles.closeModalButton, {
  ":hover": {
    backgroundColor: "#545b62",
    transform: "translateY(-1px)"
  }
});

Object.assign(styles.searchInput, {
  ":focus": {
    borderColor: "#667eea",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)"
  }
});

Object.assign(styles.filterSelect, {
  ":focus": {
    borderColor: "#667eea",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)"
  }
});

Object.assign(styles.filterInput, {
  ":focus": {
    borderColor: "#667eea",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)"
  }
});

// Responsive styles
const responsiveStyles = `
  @media (max-width: 1200px) {
    .controlsGrid {
      grid-template-columns: 1fr 1fr;
      gap: 15px;
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
    .controlsGrid {
      grid-template-columns: 1fr;
    }
    .donorsGrid {
      grid-template-columns: 1fr;
    }
    .donorHeader {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .bloodGroup {
      align-self: flex-start;
    }
    .modal {
      max-width: 95%;
      margin: 20px;
    }
    .donorSummary {
      flex-direction: column;
      text-align: center;
    }
    .donorInfoGrid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .statsContainer {
      grid-template-columns: 1fr;
    }
    .donorsCard {
      padding: 20px;
    }
    .donorActions {
      flex-wrap: wrap;
    }
    .modalHeader {
      flex-direction: column;
      gap: 10px;
      text-align: center;
    }
  }
`;

// Add responsive styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = responsiveStyles;
  document.head.appendChild(styleSheet);
}