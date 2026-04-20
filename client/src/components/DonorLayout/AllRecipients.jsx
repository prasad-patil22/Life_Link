// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AllRecipients() {
//   const [recipients, setRecipients] = useState([]);

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8000/api/donors/all-recipients");
//         setRecipients(data);
//       } catch (error) {
//         console.error("Error fetching recipients:", error);
//       }
//     };
//     fetchRecipients();
//   }, []);

//   return (
//     <div>
//       <h2>All Recipients</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Blood Group</th>
//             <th>Location</th>
//             <th>Urgency</th>
//           </tr>
//         </thead>
//         <tbody>
//           {recipients.map((rec) => (
//             <tr key={rec._id}>
//               <td>{rec.name}</td>
//               <td>{rec.email}</td>
//               <td>{rec.requiredBloodGroup}</td>
//               <td>{rec.location}</td>
//               <td>{rec.urgency}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
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

export default function AllRecipients() {
  const [recipients, setRecipients] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    bloodGroup: "",
    urgency: "",
    location: ""
  });
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["Low", "Medium", "High"];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    });

    const fetchRecipients = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("http://localhost:8000/api/donors/all-recipients");
        setRecipients(data);
        setFilteredRecipients(data);
      } catch (error) {
        console.error("Error fetching recipients:", error);
        alert("Failed to load recipients. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipients();
  }, []);

  useEffect(() => {
    filterRecipients();
  }, [searchTerm, filters, recipients]);

  const filterRecipients = () => {
    let filtered = recipients;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(recipient =>
        recipient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Blood group filter
    if (filters.bloodGroup) {
      filtered = filtered.filter(recipient => 
        recipient.requiredBloodGroup === filters.bloodGroup
      );
    }

    // Urgency filter
    if (filters.urgency) {
      filtered = filtered.filter(recipient => 
        recipient.urgency === filters.urgency
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(recipient =>
        recipient.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredRecipients(filtered);
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
      location: ""
    });
  };

  const openMapModal = (recipient = null) => {
    setSelectedRecipient(recipient);
    setShowMapModal(true);
  };

  const openDetailsModal = (recipient) => {
    setSelectedRecipient(recipient);
    setShowDetailsModal(true);
  };

  const closeModals = () => {
    setShowMapModal(false);
    setShowDetailsModal(false);
    setSelectedRecipient(null);
  };

  const handleCall = (phoneNumber) => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`);
    }
  };

  const handleEmail = (email, recipientName) => {
    const subject = `Blood Donation Offer - Helping ${recipientName}`;
    const body = `Dear ${recipientName},\n\nI saw your blood request and would like to help with blood donation.\n\nPlease let me know how I can assist.\n\nThank you.`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
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
        {urgency}
      </span>
    );
  };

  const getTotalStats = () => {
    const total = recipients.length;
    const highUrgency = recipients.filter(r => r.urgency === "High").length;
    const mediumUrgency = recipients.filter(r => r.urgency === "Medium").length;
    const lowUrgency = recipients.filter(r => r.urgency === "Low").length;

    return { total, highUrgency, mediumUrgency, lowUrgency };
  };

  const stats = getTotalStats();

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}>
          <i className="fas fa-spinner fa-spin" style={styles.spinnerIcon}></i>
          <p>Loading recipients...</p>
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
            <i className="fas fa-users" style={styles.titleIcon}></i>
            Blood Recipients
          </h1>
          <p style={styles.subtitle}>Find and connect with people in need of blood donations</p>
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
            <p style={styles.statLabel}>Total Recipients</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIconContainer, backgroundColor: "#ffebee"}}>
            <i className="fas fa-exclamation-triangle" style={{...styles.statIcon, color: "#c62828"}}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.highUrgency}</h3>
            <p style={styles.statLabel}>High Urgency</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIconContainer, backgroundColor: "#fff3e0"}}>
            <i className="fas fa-clock" style={{...styles.statIcon, color: "#ef6c00"}}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.mediumUrgency}</h3>
            <p style={styles.statLabel}>Medium Urgency</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIconContainer, backgroundColor: "#e8f5e8"}}>
            <i className="fas fa-check-circle" style={{...styles.statIcon, color: "#2e7d32"}}></i>
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.lowUrgency}</h3>
            <p style={styles.statLabel}>Low Urgency</p>
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
                placeholder="Search recipients by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            
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

            <button
              onClick={() => openMapModal()}
              style={styles.mapToggleButton}
            >
              <i className="fas fa-map" style={{marginRight: '8px'}}></i>
              View All Recipients Map
            </button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div style={styles.resultsInfo} data-aos="fade-up" data-aos-delay="400">
        <span style={styles.resultsText}>
          Showing {filteredRecipients.length} of {recipients.length} recipients
          {(searchTerm || Object.values(filters).some(f => f)) && (
            <button onClick={clearFilters} style={styles.clearResultsButton}>
              Clear all
            </button>
          )}
        </span>
      </div>

      {/* Recipients Grid Section */}
      <div style={styles.recipientsSection} data-aos="fade-up" data-aos-delay="500">
        <div style={styles.recipientsCard}>
          <h2 style={styles.recipientsTitle}>
            <i className="fas fa-list"></i>
            Blood Recipients ({filteredRecipients.length})
          </h2>

          {filteredRecipients.length === 0 ? (
            <div style={styles.emptyState}>
              <i className="fas fa-search" style={styles.emptyIcon}></i>
              <h3>No recipients found</h3>
              <p>Try adjusting your search or filters</p>
              <button onClick={clearFilters} style={styles.emptyButton}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={styles.recipientsGrid}>
              {filteredRecipients.map((recipient, index) => (
                <div 
                  key={recipient._id} 
                  style={styles.recipientCard}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div style={styles.recipientHeader}>
                    <div style={styles.recipientInfo}>
                      <div style={styles.avatar}>
                        <i className="fas fa-user" style={styles.avatarIcon}></i>
                      </div>
                      <div>
                        <h4 style={styles.recipientName}>{recipient.name}</h4>
                        {getUrgencyBadge(recipient.urgency)}
                      </div>
                    </div>
                    <div style={styles.bloodGroup}>
                      <i className="fas fa-tint" style={styles.bloodIcon}></i>
                      {recipient.requiredBloodGroup}
                    </div>
                  </div>

                  <div style={styles.recipientDetails}>
                    <div style={styles.detailRow}>
                      <i className="fas fa-envelope" style={styles.detailIcon}></i>
                      <span>{recipient.email}</span>
                    </div>

                    {recipient.phone && (
                      <div style={styles.detailRow}>
                        <i className="fas fa-phone" style={styles.detailIcon}></i>
                        <span>{recipient.phone}</span>
                      </div>
                    )}

                    <div style={styles.detailRow}>
                      <i className="fas fa-map-marker-alt" style={styles.detailIcon}></i>
                      <span>{recipient.location}</span>
                    </div>

                    {(recipient.latitude || recipient.longitude) && (
                      <div style={styles.detailRow}>
                        <i className="fas fa-location-crosshairs" style={styles.detailIcon}></i>
                        <span>
                          {recipient.latitude?.toFixed(4) || '—'}, {recipient.longitude?.toFixed(4) || '—'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={styles.recipientActions}>
                    {recipient.phone && (
                      <button 
                        onClick={() => handleCall(recipient.phone)}
                        style={styles.actionButton}
                        title="Call"
                      >
                        <i className="fas fa-phone"></i>
                      </button>
                    )}
                    
                    <button 
                      onClick={() => handleEmail(recipient.email, recipient.name)}
                      style={{...styles.actionButton, backgroundColor: "#ea4335"}}
                      title="Email"
                    >
                      <i className="fas fa-envelope"></i>
                    </button>
                    
                    {/* View Map Button */}
                    {recipient.latitude && recipient.longitude && (
                      <button 
                        onClick={() => openMapModal(recipient)}
                        style={{...styles.actionButton, backgroundColor: "#667eea"}}
                        title="View Location"
                      >
                        <i className="fas fa-map-marker-alt"></i>
                      </button>
                    )}
                    
                    {/* View Details Button */}
                    <button 
                      onClick={() => openDetailsModal(recipient)}
                      style={{...styles.actionButton, backgroundColor: "#ff9800"}}
                      title="View Details"
                    >
                      <i className="fas fa-info-circle"></i>
                    </button>
                  </div>
                </div>
              ))}
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
                <i className="fas fa-map-marker-alt" style={{color: "#2196f3", marginRight: '10px'}}></i>
                {selectedRecipient ? `${selectedRecipient.name}'s Location` : 'All Recipients Map'}
              </h3>
              <button onClick={closeModals} style={styles.closeButton}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.mapModalContainer}>
                <MapContainer 
                  center={selectedRecipient ? [selectedRecipient.latitude, selectedRecipient.longitude] : [20.5937, 78.9629]} 
                  zoom={selectedRecipient ? 12 : 5} 
                  style={{ height: '500px', width: '100%', borderRadius: '10px' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {selectedRecipient ? (
                    <Marker 
                      position={[selectedRecipient.latitude, selectedRecipient.longitude]}
                      icon={customIcon}
                    >
                      <Popup>
                        <div style={styles.popupContent}>
                          <h4 style={styles.popupName}>{selectedRecipient.name}</h4>
                          <div style={styles.popupBadge}>
                            <i className="fas fa-tint" style={{color: "#e53935", marginRight: '5px'}}></i>
                            {selectedRecipient.requiredBloodGroup}
                          </div>
                          <p style={styles.popupLocation}>
                            <i className="fas fa-map-marker-alt" style={{marginRight: '5px'}}></i>
                            {selectedRecipient.location}
                          </p>
                          <p style={styles.popupUrgency}>
                            <i className="fas fa-exclamation-circle" style={{marginRight: '5px'}}></i>
                            Urgency: {selectedRecipient.urgency}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ) : (
                    filteredRecipients
                      .filter(recipient => recipient.latitude && recipient.longitude)
                      .map((recipient) => (
                      <Marker 
                        key={recipient._id} 
                        position={[recipient.latitude, recipient.longitude]}
                        icon={customIcon}
                      >
                        <Popup>
                          <div style={styles.popupContent}>
                            <h4 style={styles.popupName}>{recipient.name}</h4>
                            <div style={styles.popupBadge}>
                              <i className="fas fa-tint" style={{color: "#e53935", marginRight: '5px'}}></i>
                              {recipient.requiredBloodGroup}
                            </div>
                            <p style={styles.popupLocation}>
                              <i className="fas fa-map-marker-alt" style={{marginRight: '5px'}}></i>
                              {recipient.location}
                            </p>
                            <p style={styles.popupUrgency}>
                              <i className="fas fa-exclamation-circle" style={{marginRight: '5px'}}></i>
                              Urgency: {recipient.urgency}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))
                  )}
                </MapContainer>
              </div>
              
              {selectedRecipient && (
                <div style={styles.recipientInfoModal}>
                  <h4 style={styles.recipientInfoTitle}>Recipient Information</h4>
                  <div style={styles.recipientInfoGrid}>
                    <div style={styles.infoItem}>
                      <strong>Name:</strong> {selectedRecipient.name}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Blood Group Needed:</strong> {selectedRecipient.requiredBloodGroup}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Location:</strong> {selectedRecipient.location}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Email:</strong> {selectedRecipient.email}
                    </div>
                    {selectedRecipient.phone && (
                      <div style={styles.infoItem}>
                        <strong>Phone:</strong> {selectedRecipient.phone}
                      </div>
                    )}
                    <div style={styles.infoItem}>
                      <strong>Urgency:</strong> {selectedRecipient.urgency}
                    </div>
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

      {/* Details Modal */}
      {showDetailsModal && selectedRecipient && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal} data-aos="zoom-in">
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <i className="fas fa-info-circle" style={{color: "#2196f3", marginRight: '10px'}}></i>
                Recipient Details
              </h3>
              <button onClick={closeModals} style={styles.closeButton}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.recipientSummary}>
                <div style={styles.avatarLarge}>
                  <i className="fas fa-user" style={styles.avatarIconLarge}></i>
                </div>
                <div style={styles.recipientSummaryInfo}>
                  <h4 style={styles.recipientNameLarge}>{selectedRecipient.name}</h4>
                  <div style={styles.bloodGroupLarge}>
                    <i className="fas fa-tint" style={styles.bloodIconLarge}></i>
                    {selectedRecipient.requiredBloodGroup}
                  </div>
                  <div style={styles.urgencySummary}>
                    {getUrgencyBadge(selectedRecipient.urgency)}
                  </div>
                </div>
              </div>

              <div style={styles.detailsGrid}>
                <div style={styles.detailSection}>
                  <h5 style={styles.sectionTitle}>
                    <i className="fas fa-address-card"></i>
                    Contact Information
                  </h5>
                  <div style={styles.detailList}>
                    <div style={styles.detailItem}>
                      <i className="fas fa-envelope" style={styles.detailIconModal}></i>
                      <div>
                        <strong>Email:</strong>
                        <div>{selectedRecipient.email}</div>
                      </div>
                    </div>
                    {selectedRecipient.phone && (
                      <div style={styles.detailItem}>
                        <i className="fas fa-phone" style={styles.detailIconModal}></i>
                        <div>
                          <strong>Phone:</strong>
                          <div>{selectedRecipient.phone}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={styles.detailSection}>
                  <h5 style={styles.sectionTitle}>
                    <i className="fas fa-map-marker-alt"></i>
                    Location Information
                  </h5>
                  <div style={styles.detailList}>
                    <div style={styles.detailItem}>
                      <i className="fas fa-location-arrow" style={styles.detailIconModal}></i>
                      <div>
                        <strong>Location:</strong>
                        <div>{selectedRecipient.location}</div>
                      </div>
                    </div>
                    {(selectedRecipient.latitude || selectedRecipient.longitude) && (
                      <div style={styles.detailItem}>
                        <i className="fas fa-crosshairs" style={styles.detailIconModal}></i>
                        <div>
                          <strong>Coordinates:</strong>
                          <div>
                            {selectedRecipient.latitude?.toFixed(4) || '—'}, {selectedRecipient.longitude?.toFixed(4) || '—'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={styles.detailSection}>
                  <h5 style={styles.sectionTitle}>
                    <i className="fas fa-heartbeat"></i>
                    Medical Information
                  </h5>
                  <div style={styles.detailList}>
                    <div style={styles.detailItem}>
                      <i className="fas fa-tint" style={styles.detailIconModal}></i>
                      <div>
                        <strong>Required Blood Group:</strong>
                        <div>{selectedRecipient.requiredBloodGroup}</div>
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <i className="fas fa-exclamation-circle" style={styles.detailIconModal}></i>
                      <div>
                        <strong>Urgency Level:</strong>
                        <div>{selectedRecipient.urgency}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.modalActions}>
              <div style={styles.modalActionButtons}>
                {selectedRecipient.phone && (
                  <button 
                    onClick={() => handleCall(selectedRecipient.phone)}
                    style={styles.primaryActionButton}
                  >
                    <i className="fas fa-phone" style={{marginRight: '8px'}}></i>
                    Call Recipient
                  </button>
                )}
                <button 
                  onClick={() => handleEmail(selectedRecipient.email, selectedRecipient.name)}
                  style={styles.secondaryActionButton}
                >
                  <i className="fas fa-envelope" style={{marginRight: '8px'}}></i>
                  Send Email
                </button>
                <button onClick={closeModals} style={styles.closeModalButton}>
                  Close
                </button>
              </div>
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
    color: "#2196f3"
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
    backgroundColor: "#e3f2fd",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  statIcon: {
    fontSize: "1.5rem",
    color: "#2196f3"
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
    color: "#2196f3",
    border: "none",
    fontSize: "0.8rem",
    cursor: "pointer",
    textDecoration: "underline"
  },
  recipientsSection: {
    marginBottom: "30px"
  },
  recipientsCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  recipientsTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  recipientsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "20px"
  },
  recipientCard: {
    border: "1px solid #e9ecef",
    borderRadius: "12px",
    padding: "20px",
    transition: "all 0.3s ease",
    backgroundColor: "white"
  },
  recipientCardHover: {
    borderColor: "#667eea",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.1)",
    transform: "translateY(-2px)"
  },
  recipientHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px"
  },
  recipientInfo: {
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
  recipientName: {
    margin: "0 0 5px 0",
    color: "#2c3e50",
    fontSize: "1.1rem",
    fontWeight: "600"
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
  recipientDetails: {
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
  recipientActions: {
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
  popupUrgency: {
    margin: "5px 0",
    color: "#666",
    fontSize: "0.9rem"
  },
  recipientInfoModal: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px"
  },
  recipientInfoTitle: {
    margin: "0 0 15px 0",
    color: "#2c3e50",
    fontSize: "1.1rem"
  },
  recipientInfoGrid: {
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
  // Details Modal Styles
  recipientSummary: {
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
  recipientSummaryInfo: {
    flex: 1
  },
  recipientNameLarge: {
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
  urgencySummary: {
    display: "inline-block"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },
  detailSection: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px"
  },
  sectionTitle: {
    margin: "0 0 15px 0",
    color: "#2c3e50",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  detailList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px"
  },
  detailIconModal: {
    color: "#2196f3",
    fontSize: "1rem",
    marginTop: "2px",
    width: "16px"
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 25px 25px 25px"
  },
  modalActionButtons: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap"
  },
  primaryActionButton: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease"
  },
  secondaryActionButton: {
    padding: "10px 20px",
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease"
  },
  closeModalButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  emptyState: {
    padding: "60px 20px",
    textAlign: "center",
    color: "#666"
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "20px",
    color: "#ddd"
  },
  emptyButton: {
    padding: "10px 20px",
    backgroundColor: "#2196f3",
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

Object.assign(styles.recipientCard, {
  ":hover": styles.recipientCardHover
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

Object.assign(styles.primaryActionButton, {
  ":hover": {
    backgroundColor: "#388e3c",
    transform: "translateY(-1px)"
  }
});

Object.assign(styles.secondaryActionButton, {
  ":hover": {
    backgroundColor: "#1976d2",
    transform: "translateY(-1px)"
  }
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
    .recipientsGrid {
      grid-template-columns: 1fr;
    }
    .recipientHeader {
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
    .recipientSummary {
      flex-direction: column;
      text-align: center;
    }
    .detailsGrid {
      grid-template-columns: 1fr;
    }
    .modalActionButtons {
      flex-direction: column;
      width: 100%;
    }
    .modalActionButtons button {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .statsContainer {
      grid-template-columns: 1fr;
    }
    .recipientsCard {
      padding: 20px;
    }
    .recipientActions {
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