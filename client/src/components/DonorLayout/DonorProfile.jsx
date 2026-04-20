// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function DonorProfile() {
//   const [profile, setProfile] = useState({});
//   const [error, setError] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [passwordChange, setPasswordChange] = useState({ oldPassword: "", newPassword: "" });

//   const navigate = useNavigate();

//   // Prefer the unified `userInfo` object saved on login/register
//   const stored = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("userInfo") || "null");
//     } catch (e) {
//       return null;
//     }
//   })();

//   const donorId = stored?._id || stored?.id || localStorage.getItem("donorId") || null;
//   const token = stored?.token || localStorage.getItem("Token") || null;

//   // Fetch profile on load
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!donorId || !token) {
//         // No authenticated donor info available, send to donor login
//         navigate("/doonerlogin");
//         return;
//       }
//       // Debug logging: show what id/token are being used
//       console.log("Fetching donor profile with id:", donorId);
//       console.log("Using token:", token ? `${token.substring(0, 10)}...` : token);
//       try {
//         const { data } = await axios.get(`http://localhost:8000/api/donors/profile/${donorId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(data);
//         setError(null);
//       } catch (error) {
//         // Capture error status and message for display
//         console.error("Error fetching donor profile:", error);
//         const status = error?.response?.status;
//         const message = error?.response?.data?.message || error.message;
//         setError({ status, message });
//       }
//     };
//     fetchProfile();
//   }, [donorId, token]);

//   // Handle profile input change
//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // Handle password input change
//   const handlePasswordChange = (e) => {
//     setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value });
//   };

//   // Update profile (name, bloodGroup, location)
//   const handleUpdateProfile = async () => {
//     try {
//       const payload = {
//         name: profile.name,
//         bloodGroup: profile.bloodGroup,
//         location: profile.location,
//       };
//       const { data } = await axios.put(`http://localhost:8000/api/donors/profile/${donorId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Profile updated successfully!");
//       setProfile(data);
//       setEditMode(false);
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   // Change password
//   const handleChangePassword = async () => {
//     try {
//       const payload = {
//         oldPassword: passwordChange.oldPassword,
//         newPassword: passwordChange.newPassword,
//       };
//       const { data } = await axios.put(`http://localhost:8000/api/donors/profile/${donorId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Password changed successfully!");
//       setPasswordChange({ oldPassword: "", newPassword: "" });
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Donor Profile</h2>
//       {error ? (
//         <div style={{ padding: 20, background: "#ffecec", color: "#900", borderRadius: 6 }}>
//           <h3>Error loading profile</h3>
//           <p>Status: {error.status || "unknown"}</p>
//           <p>Message: {error.message || "No details"}</p>
//           <p>
//             Check the server logs and confirm the stored user id in localStorage (<code>userInfo</code>) matches a Donor record.
//           </p>
//         </div>
//       ) : (
//         <div>
//         <p><strong>Email:</strong> {profile.email}</p> {/* email is read-only */}
//         <p>
//           <strong>Name:</strong>{" "}
//           {editMode ? <input name="name" value={profile.name || ""} onChange={handleChange} /> : profile.name}
//         </p>
//         <p>
//           <strong>Blood Group:</strong>{" "}
//           {editMode ? <input name="bloodGroup" value={profile.bloodGroup || ""} onChange={handleChange} /> : profile.bloodGroup}
//         </p>
//         <p>
//           <strong>Location:</strong>{" "}
//           {editMode ? <input name="location" value={profile.location || ""} onChange={handleChange} /> : profile.location}
//         </p>
//         <p>
//           <strong>Last Donation Date:</strong>{" "}
//           {editMode ? (
//             <input
//               type="date"
//               name="lastDonationDate"
//               value={profile.lastDonationDate ? profile.lastDonationDate.split("T")[0] : ""}
//               onChange={handleChange}
//             />
//           ) : (
//             profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString() : "N/A"
//           )}
//         </p>

//         {!editMode && <button onClick={() => setEditMode(true)}>Edit Profile</button>}
//         {editMode && <button onClick={handleUpdateProfile}>Save Changes</button>}
//         {editMode && <button onClick={() => setEditMode(false)}>Cancel</button>}
//       </div>
//   )}
//       <div style={{ marginTop: "20px" }}>
//         <h3>Change Password</h3>
//         <input
//           type="password"
//           name="oldPassword"
//           value={passwordChange.oldPassword}
//           onChange={handlePasswordChange}
//           placeholder="Old Password"
//         />
//         <input
//           type="password"
//           name="newPassword"
//           value={passwordChange.newPassword}
//           onChange={handlePasswordChange}
//           placeholder="New Password"
//         />
//         <button onClick={handleChangePassword}>Change Password</button>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DonorProfile() {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordChange, setPasswordChange] = useState({ oldPassword: "", newPassword: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    });
  }, []);

  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("userInfo") || "null");
    } catch (e) {
      return null;
    }
  })();

  const donorId = stored?._id || stored?.id || localStorage.getItem("donorId") || null;
  const token = stored?.token || localStorage.getItem("Token") || null;

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const fetchProfile = async () => {
      if (!donorId || !token) {
        navigate("/doonerlogin");
        return;
      }

      try {
        setIsLoading(true);
        const { data } = await axios.get(`http://localhost:8000/api/donors/profile/${donorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching donor profile:", error);
        const status = error?.response?.status;
        const message = error?.response?.data?.message || "Failed to load profile";
        setError({ status, message });
        
        if (status === 401 || status === 400 || status === 404) {
          try { localStorage.removeItem('userInfo'); } catch (e) {}
          navigate('/doonerlogin');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [donorId, token, navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      setIsUpdating(true);
      const payload = {
        name: profile.name,
        bloodGroup: profile.bloodGroup,
        location: profile.location,
        lastDonationDate: profile.lastDonationDate,
      };
      const { data } = await axios.put(`http://localhost:8000/api/donors/profile/${donorId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Profile updated successfully!");
      setProfile(data);
      setEditMode(false);
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Failed to update profile"));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordChange.oldPassword || !passwordChange.newPassword) {
      alert("Please fill in both password fields");
      return;
    }

    try {
      setIsUpdating(true);
      const payload = {
        oldPassword: passwordChange.oldPassword,
        newPassword: passwordChange.newPassword,
      };
      await axios.put(`http://localhost:8000/api/donors/profile/${donorId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Password changed successfully!");
      setPasswordChange({ oldPassword: "", newPassword: "" });
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Failed to change password"));
    } finally {
      setIsUpdating(false);
    }
  };

  const getDonationStatus = (lastDonationDate) => {
    if (!lastDonationDate) return { status: "Never Donated", color: "#666", bgColor: "#f0f0f0" };
    
    const lastDonation = new Date(lastDonationDate);
    const today = new Date();
    const monthsSinceDonation = (today.getFullYear() - lastDonation.getFullYear()) * 12 + 
                               (today.getMonth() - lastDonation.getMonth());
    
    if (monthsSinceDonation < 3) {
      return { status: "Recently Donated", color: "#2e7d32", bgColor: "#e8f5e8" };
    } else if (monthsSinceDonation < 6) {
      return { status: "Eligible Soon", color: "#ef6c00", bgColor: "#fff3e0" };
    } else {
      return { status: "Eligible to Donate", color: "#2196f3", bgColor: "#e3f2fd" };
    }
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}>
          <i className="fas fa-spinner fa-spin" style={styles.spinnerIcon}></i>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard} data-aos="fade-up">
          <div style={styles.errorIcon}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3>Error Loading Profile</h3>
          <p style={styles.errorMessage}>Status: {error.status || "Unknown"}</p>
          <p style={styles.errorMessage}>Message: {error.message}</p>
          <button 
            onClick={() => navigate("/doonerlogin")} 
            style={styles.primaryButton}
          >
            <i className="fas fa-sign-in-alt"></i>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const donationStatus = getDonationStatus(profile.lastDonationDate);

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header} data-aos="fade-down">
        <div style={styles.headerContent}>
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>
              <i className="fas fa-user" style={styles.avatarIcon}></i>
            </div>
            <div style={styles.headerText}>
              <h1 style={styles.title}>{profile.name || "Donor"}</h1>
              <p style={styles.subtitle}>LifeLink Blood Donor</p>
            </div>
          </div>
          <div style={styles.donationInfo}>
            <div style={styles.bloodGroupBadge}>
              <i className="fas fa-tint" style={styles.bloodIcon}></i>
              {profile.bloodGroup || "Not specified"}
            </div>
            <div style={styles.donationStatus}>
              <span style={styles.donationLabel}>Donation Status:</span>
              <span style={{
                ...styles.statusBadge,
                backgroundColor: donationStatus.bgColor,
                color: donationStatus.color
              }}>
                {donationStatus.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={styles.tabContainer} data-aos="fade-up">
        <button 
          style={activeTab === "profile" ? {...styles.tab, ...styles.activeTab} : styles.tab}
          onClick={() => setActiveTab("profile")}
        >
          <i className="fas fa-user"></i>
          Profile Information
        </button>
        <button 
          style={activeTab === "security" ? {...styles.tab, ...styles.activeTab} : styles.tab}
          onClick={() => setActiveTab("security")}
        >
          <i className="fas fa-lock"></i>
          Security
        </button>
      </div>

      {/* Profile Tab Content */}
      {activeTab === "profile" && (
        <div style={styles.contentCard} data-aos="fade-up" data-aos-delay="200">
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              <i className="fas fa-id-card"></i>
              Personal Information
            </h2>
            {!editMode ? (
              <button 
                onClick={() => setEditMode(true)} 
                style={styles.editButton}
              >
                <i className="fas fa-edit"></i>
                Edit Profile
              </button>
            ) : (
              <div style={styles.editActions}>
                <button 
                  onClick={handleUpdateProfile} 
                  style={styles.saveButton}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-check"></i>
                  )}
                  Save Changes
                </button>
                <button 
                  onClick={() => setEditMode(false)} 
                  style={styles.cancelButton}
                >
                  <i className="fas fa-times"></i>
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div style={styles.profileGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-envelope"></i>
                Email Address
              </label>
              <input 
                style={styles.input}
                value={profile.email || ""}
                disabled
                placeholder="Email address"
              />
              <span style={styles.helperText}>Email cannot be changed</span>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-user"></i>
                Full Name
              </label>
              {editMode ? (
                <input 
                  name="name"
                  style={styles.input}
                  value={profile.name || ""}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              ) : (
                <div style={styles.readOnlyField}>{profile.name || "Not set"}</div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-tint"></i>
                Blood Group
              </label>
              {editMode ? (
                <select 
                  name="bloodGroup"
                  style={styles.input}
                  value={profile.bloodGroup || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              ) : (
                <div style={styles.readOnlyField}>
                  {profile.bloodGroup ? (
                    <span style={styles.bloodGroup}>{profile.bloodGroup}</span>
                  ) : (
                    "Not set"
                  )}
                </div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-map-marker-alt"></i>
                Location
              </label>
              {editMode ? (
                <input 
                  name="location"
                  style={styles.input}
                  value={profile.location || ""}
                  onChange={handleChange}
                  placeholder="Your city or area"
                />
              ) : (
                <div style={styles.readOnlyField}>{profile.location || "Not set"}</div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-calendar-heart"></i>
                Last Donation Date
              </label>
              {editMode ? (
                <input 
                  type="date"
                  name="lastDonationDate"
                  style={styles.input}
                  value={profile.lastDonationDate ? profile.lastDonationDate.split("T")[0] : ""}
                  onChange={handleChange}
                />
              ) : (
                <div style={styles.readOnlyField}>
                  {profile.lastDonationDate ? 
                    new Date(profile.lastDonationDate).toLocaleDateString() : 
                    "Never donated"
                  }
                </div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-info-circle"></i>
                Donation Status
              </label>
              <div style={styles.readOnlyField}>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: donationStatus.bgColor,
                  color: donationStatus.color
                }}>
                  {donationStatus.status}
                </span>
              </div>
              <span style={styles.helperText}>
                Based on your last donation date. You can donate every 3 months.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab Content */}
      {activeTab === "security" && (
        <div style={styles.contentCard} data-aos="fade-up" data-aos-delay="200">
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              <i className="fas fa-shield-alt"></i>
              Change Password
            </h2>
          </div>

          <div style={styles.securityForm}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-lock"></i>
                Current Password
              </label>
              <input
                type="password"
                name="oldPassword"
                style={styles.input}
                value={passwordChange.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-key"></i>
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                style={styles.input}
                value={passwordChange.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your new password"
              />
            </div>

            <button 
              onClick={handleChangePassword} 
              style={styles.primaryButton}
              disabled={isUpdating || !passwordChange.oldPassword || !passwordChange.newPassword}
            >
              {isUpdating ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-sync-alt"></i>
              )}
              Update Password
            </button>

            <div style={styles.securityNote}>
              <i className="fas fa-info-circle" style={styles.securityIcon}></i>
              <span>Make sure your new password is strong and unique</span>
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px"
  },
  avatarSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  avatar: {
    width: "80px",
    height: "80px",
    backgroundColor: "#e53935",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  avatarIcon: {
    color: "white",
    fontSize: "2rem"
  },
  headerText: {
    flex: 1
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "0 0 5px 0"
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#666",
    margin: 0
  },
  donationInfo: {
    textAlign: "center",
    padding: "15px 20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px"
  },
  bloodGroupBadge: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#e53935",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px"
  },
  bloodIcon: {
    fontSize: "1.1rem"
  },
  donationStatus: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  donationLabel: {
    fontSize: "0.8rem",
    color: "#666",
    marginBottom: "4px"
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  tabContainer: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "5px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  tab: {
    flex: 1,
    padding: "15px 20px",
    border: "none",
    backgroundColor: "transparent",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#666",
    transition: "all 0.3s ease"
  },
  activeTab: {
    backgroundColor: "#e53935",
    color: "white",
    boxShadow: "0 2px 8px rgba(229, 57, 53, 0.3)"
  },
  contentCard: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px"
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2c3e50",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: 0
  },
  editButton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "#e53935",
    border: "2px solid #e53935",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease"
  },
  editActions: {
    display: "flex",
    gap: "10px"
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease"
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "#666",
    border: "2px solid #666",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease"
  },
  profileGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px"
  },
  securityForm: {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "25px"
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
  readOnlyField: {
    padding: "12px 16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    color: "#666",
    fontSize: "1rem",
    minHeight: "46px",
    display: "flex",
    alignItems: "center"
  },
  bloodGroup: {
    color: "#e53935",
    fontWeight: "600",
    fontSize: "1.1rem"
  },
  helperText: {
    fontSize: "0.8rem",
    color: "#666",
    fontStyle: "italic"
  },
  primaryButton: {
    padding: "12px 24px",
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
    transition: "all 0.3s ease",
    alignSelf: "flex-start"
  },
  securityNote: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.8rem",
    color: "#666",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px"
  },
  securityIcon: {
    color: "#e53935"
  },
  errorCard: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "500px",
    margin: "50px auto"
  },
  errorIcon: {
    fontSize: "3rem",
    color: "#f44336",
    marginBottom: "20px"
  },
  errorMessage: {
    color: "#666",
    margin: "10px 0"
  }
};

// Add hover effects
Object.assign(styles.editButton, {
  ':hover': {
    backgroundColor: "#e53935",
    color: "white"
  }
});

Object.assign(styles.primaryButton, {
  ':hover': {
    backgroundColor: "#c62828",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(229, 57, 53, 0.3)"
  }
});

Object.assign(styles.input, {
  ':focus': {
    borderColor: "#e53935",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(229, 57, 53, 0.1)",
    outline: "none"
  }
});

// Responsive styles
const responsiveStyles = `
  @media (max-width: 768px) {
    .headerContent {
      flex-direction: column;
      text-align: center;
    }
    .avatarSection {
      justify-content: center;
    }
    .donationInfo {
      width: 100%;
    }
    .cardHeader {
      flex-direction: column;
      align-items: flex-start;
    }
    .editActions {
      width: 100%;
      justify-content: space-between;
    }
    .profileGrid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 10px;
    }
    .header {
      padding: 20px;
    }
    .title {
      font-size: 1.8rem;
    }
    .contentCard {
      padding: 20px;
    }
  }
`;

// Add responsive styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = responsiveStyles;
  document.head.appendChild(styleSheet);
}