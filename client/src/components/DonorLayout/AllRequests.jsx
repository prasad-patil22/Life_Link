// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AllRequests() {
//   const [requests, setRequests] = useState([]);
//   const stored = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("userInfo") || "null");
//     } catch (e) {
//       return null;
//     }
//   })();
//   const donorId = stored?._id || localStorage.getItem("donorId");

//   // Fetch all pending requests
//   useEffect(() => {
//     const fetchAllRequests = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8000/api/requests/all");
//         setRequests(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchAllRequests();
//   }, []);

//   // Accept request
//   const handleAccept = async (id) => {
//     try {
//       if (!donorId) return alert("You must be logged in as a donor to accept requests.");
//       const { data } = await axios.put(`http://localhost:8000/api/requests/accept/${id}`, { donorId });
//       alert(data.message || "You accepted this request!");
//       setRequests((prev) =>
//         prev.map((req) => (req._id === id ? { ...req, status: "Accepted", donor: donorId } : req))
//       );
//     } catch (error) {
//       const message = error?.response?.data?.message || error.message || "Failed to accept";
//       alert(message);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>All Active Blood Requests</h2>
//       {requests.length === 0 && <p>No pending requests available right now.</p>}

//       <ul>
//         {requests.map((req) => (
//           <li key={req._id} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
//             <strong>Blood Group:</strong> {req.bloodGroup} <br />
//             <strong>Location:</strong> {req.location} <br />
//             <strong>Urgency:</strong> {req.urgency} <br />
//             <strong>Recipient:</strong> {req.recipient?.name} ({req.recipient?.email}) <br />
//             <strong>Status:</strong> {req.status}
//             {req.status === "Pending" && (
//               <button
//                 onClick={() => handleAccept(req._id)}
//                 style={{ marginTop: "10px", marginLeft: "10px" }}
//               >
//                 Accept Request
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    bloodGroup: "",
    urgency: "",
    location: "",
    status: ""
  });
  const [acceptingId, setAcceptingId] = useState(null);

  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("userInfo") || "null");
    } catch (e) {
      return null;
    }
  })();
  
  const donorId = stored?._id || localStorage.getItem("donorId");
  const donorName = stored?.name || "Donor";

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["Low", "Medium", "High"];
  const statusTypes = ["Pending", "Accepted", "Completed", "Cancelled"];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    });

    const fetchAllRequests = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("http://localhost:8000/api/requests/all");
        setRequests(data);
        setFilteredRequests(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load requests. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [searchTerm, filters, requests]);

  const filterRequests = () => {
    let filtered = requests;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.recipient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.recipient?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Blood group filter
    if (filters.bloodGroup) {
      filtered = filtered.filter(request => 
        request.bloodGroup === filters.bloodGroup
      );
    }

    // Urgency filter
    if (filters.urgency) {
      filtered = filtered.filter(request => 
        request.urgency === filters.urgency
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(request =>
        request.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(request => 
        request.status === filters.status
      );
    }

    setFilteredRequests(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      bloodGroup: "",
      urgency: "",
      location: "",
      status: ""
    });
  };

  const handleAccept = async (id) => {
    if (!donorId) {
      alert("You must be logged in as a donor to accept requests.");
      return;
    }

    try {
      setAcceptingId(id);
      const { data } = await axios.put(`http://localhost:8000/api/requests/accept/${id}`, { donorId });
      
      alert(`✅ ${data.message || "You accepted this request!"}`);
      
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: "Accepted", donor: donorId } : req))
      );
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Failed to accept request";
      alert(`❌ ${message}`);
    } finally {
      setAcceptingId(null);
    }
  };

  const getUrgencyBadge = (urgency) => {
    const urgencyStyles = {
      Low: { backgroundColor: "#e8f5e8", color: "#2e7d32" },
      Medium: { backgroundColor: "#fff3e0", color: "#ef6c00" },
      High: { backgroundColor: "#ffebee", color: "#c62828" }
    };

    const style = urgencyStyles[urgency] || urgencyStyles.Medium;

    return (
      <span style={{
        ...style,
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "0.8rem",
        fontWeight: "600",
        textTransform: "uppercase"
      }}>
        <i className="fas fa-bolt" style={{marginRight: "4px", fontSize: "0.7rem"}}></i>
        {urgency}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: { backgroundColor: "#fff3e0", color: "#ef6c00" },
      Accepted: { backgroundColor: "#e3f2fd", color: "#1976d2" },
      Completed: { backgroundColor: "#e8f5e8", color: "#2e7d32" },
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

  const getTotalStats = () => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === "Pending").length;
    const accepted = requests.filter(r => r.status === "Accepted").length;
    const completed = requests.filter(r => r.status === "Completed").length;

    return { total, pending, accepted, completed };
  };

  const stats = getTotalStats();

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}>
          <i className="fas fa-spinner fa-spin" style={styles.spinnerIcon}></i>
          <p>Loading blood requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header} data-aos="fade-down">
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            <i className="fas fa-hand-holding-heart" style={styles.titleIcon}></i>
            Blood Donation Requests
          </h1>
          <p style={styles.subtitle}>Help save lives by accepting blood donation requests</p>
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
            <h3 style={styles.statNumber}>{stats.completed}</h3>
            <p style={styles.statLabel}>Completed</p>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div style={styles.filtersContainer} data-aos="fade-up" data-aos-delay="300">
        <div style={styles.searchBox}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input
            type="text"
            placeholder="Search by blood group, location, or recipient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterGroup}>
          <select
            value={filters.bloodGroup}
            onChange={(e) => handleFilterChange("bloodGroup", e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>

          <select
            value={filters.urgency}
            onChange={(e) => handleFilterChange("urgency", e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Urgency Levels</option>
            {urgencyLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Status</option>
            {statusTypes.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filter by location..."
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            style={styles.filterInput}
          />

          <button onClick={clearFilters} style={styles.clearButton}>
            <i className="fas fa-times"></i>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div style={styles.resultsInfo} data-aos="fade-up" data-aos-delay="400">
        <span style={styles.resultsText}>
          Showing {filteredRequests.length} of {requests.length} requests
          {(searchTerm || Object.values(filters).some(f => f)) && (
            <button onClick={clearFilters} style={styles.clearResultsButton}>
              Clear all
            </button>
          )}
        </span>
      </div>

      {/* Requests Grid */}
      <div style={styles.requestsGrid} data-aos="fade-up" data-aos-delay="500">
        {filteredRequests.length === 0 ? (
          <div style={styles.emptyState}>
            <i className="fas fa-search" style={styles.emptyIcon}></i>
            <h3>No requests found</h3>
            <p>Try adjusting your search or filters</p>
            <button onClick={clearFilters} style={styles.emptyButton}>
              Clear Filters
            </button>
          </div>
        ) : (
          filteredRequests.map((request, index) => (
            <div key={request._id} style={styles.requestCard} data-aos="fade-up" data-aos-delay={index * 100}>
              <div style={styles.cardHeader}>
                <div style={styles.bloodGroupSection}>
                  <div style={styles.bloodGroupIcon}>
                    <i className="fas fa-tint" style={styles.bloodIcon}></i>
                  </div>
                  <div>
                    <h3 style={styles.bloodGroup}>{request.bloodGroup}</h3>
                    <p style={styles.bloodLabel}>Blood Group Needed</p>
                  </div>
                </div>
                <div style={styles.statusSection}>
                  {getStatusBadge(request.status)}
                  {getUrgencyBadge(request.urgency)}
                </div>
              </div>

              <div style={styles.cardContent}>
                <div style={styles.detailRow}>
                  <i className="fas fa-map-marker-alt" style={styles.detailIcon}></i>
                  <div>
                    <strong>Location:</strong> {request.location}
                  </div>
                </div>

                <div style={styles.detailRow}>
                  <i className="fas fa-user" style={styles.detailIcon}></i>
                  <div>
                    <strong>Recipient:</strong> {request.recipient?.name || "Unknown"}
                  </div>
                </div>

                <div style={styles.detailRow}>
                  <i className="fas fa-envelope" style={styles.detailIcon}></i>
                  <div>
                    <strong>Email:</strong> {request.recipient?.email || "Not provided"}
                  </div>
                </div>

                {request.recipient?.phone && (
                  <div style={styles.detailRow}>
                    <i className="fas fa-phone" style={styles.detailIcon}></i>
                    <div>
                      <strong>Phone:</strong> {request.recipient.phone}
                    </div>
                  </div>
                )}

                <div style={styles.detailRow}>
                  <i className="fas fa-calendar" style={styles.detailIcon}></i>
                  <div>
                    <strong>Requested:</strong> {new Date(request.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div style={styles.cardFooter}>
                {request.status === "Pending" && (
                  <button
                    onClick={() => handleAccept(request._id)}
                    disabled={acceptingId === request._id}
                    style={
                      acceptingId === request._id ? 
                      {...styles.acceptButton, ...styles.acceptButtonLoading} : 
                      styles.acceptButton
                    }
                  >
                    {acceptingId === request._id ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Accepting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-hand-holding-heart"></i>
                        Accept Request
                      </>
                    )}
                  </button>
                )}

                {request.status === "Accepted" && request.donor === donorId && (
                  <div style={styles.acceptedByYou}>
                    <i className="fas fa-check-circle" style={styles.acceptedIcon}></i>
                    Accepted by You
                  </div>
                )}

                {request.status === "Accepted" && request.donor !== donorId && (
                  <div style={styles.acceptedByOther}>
                    <i className="fas fa-user-check" style={styles.acceptedIcon}></i>
                    Accepted by Another Donor
                  </div>
                )}

                {request.status === "Completed" && (
                  <div style={styles.completedBadge}>
                    <i className="fas fa-heart" style={styles.completedIcon}></i>
                    Donation Completed
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
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
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px"
  },
  loadingSpinner: {
    textAlign: "center",
    color: "#666"
  },
  spinnerIcon: {
    fontSize: "2rem",
    marginBottom: "10px"
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
  filtersContainer: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  searchBox: {
    position: "relative",
    marginBottom: "20px"
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#666",
    fontSize: "1rem"
  },
  searchInput: {
    width: "100%",
    padding: "12px 20px 12px 45px",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    fontSize: "1rem",
    transition: "all 0.3s ease"
  },
  searchInputFocus: {
    borderColor: "#e53935",
    boxShadow: "0 0 0 3px rgba(229, 57, 53, 0.1)"
  },
  filterGroup: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    flexWrap: "wrap"
  },
  filterSelect: {
    padding: "10px 15px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "0.9rem",
    backgroundColor: "white",
    minWidth: "150px"
  },
  filterInput: {
    padding: "10px 15px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "0.9rem",
    minWidth: "200px"
  },
  clearButton: {
    padding: "10px 15px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.9rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "all 0.3s ease"
  },
  clearButtonHover: {
    backgroundColor: "#5a6268"
  },
  resultsInfo: {
    marginBottom: "15px"
  },
  resultsText: {
    color: "#666",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  clearResultsButton: {
    backgroundColor: "transparent",
    color: "#e53935",
    border: "none",
    fontSize: "0.8rem",
    cursor: "pointer",
    textDecoration: "underline"
  },
  requestsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gap: "20px"
  },
  requestCard: {
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "25px",
    transition: "all 0.3s ease"
  },
  requestCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px"
  },
  bloodGroupSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  bloodGroupIcon: {
    width: "50px",
    height: "50px",
    backgroundColor: "#ffebee",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  bloodIcon: {
    fontSize: "1.5rem",
    color: "#e53935"
  },
  bloodGroup: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#e53935",
    margin: "0 0 2px 0"
  },
  bloodLabel: {
    fontSize: "0.8rem",
    color: "#666",
    margin: 0
  },
  statusSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "flex-end"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px"
  },
  detailRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    fontSize: "0.9rem",
    color: "#555"
  },
  detailIcon: {
    color: "#666",
    fontSize: "0.8rem",
    width: "16px",
    marginTop: "2px"
  },
  cardFooter: {
    borderTop: "1px solid #f0f0f0",
    paddingTop: "20px"
  },
  acceptButton: {
    width: "100%",
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
  acceptButtonHover: {
    backgroundColor: "#c62828",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(229, 57, 53, 0.3)"
  },
  acceptButtonLoading: {
    backgroundColor: "#999",
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none"
  },
  acceptedByYou: {
    padding: "10px 15px",
    backgroundColor: "#e8f5e8",
    color: "#2e7d32",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  acceptedByOther: {
    padding: "10px 15px",
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  completedBadge: {
    padding: "10px 15px",
    backgroundColor: "#f8f9fa",
    color: "#666",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  acceptedIcon: {
    fontSize: "0.9rem"
  },
  completedIcon: {
    fontSize: "0.9rem",
    color: "#e53935"
  },
  emptyState: {
    gridColumn: "1 / -1",
    padding: "60px 20px",
    textAlign: "center",
    color: "#666",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "20px",
    color: "#ddd"
  },
  emptyButton: {
    padding: "10px 20px",
    backgroundColor: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px"
  }
};

// Add hover effects
Object.assign(styles.statCard, {
  ":hover": styles.statCardHover
});

Object.assign(styles.searchInput, {
  ":focus": styles.searchInputFocus
});

Object.assign(styles.clearButton, {
  ":hover": styles.clearButtonHover
});

Object.assign(styles.requestCard, {
  ":hover": styles.requestCardHover
});

Object.assign(styles.acceptButton, {
  ":hover": styles.acceptButtonHover
});