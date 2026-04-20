// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function RecipientProfile() {
//   const [profile, setProfile] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [passwordChange, setPasswordChange] = useState({ oldPassword: "", newPassword: "" });

//   const navigate = useNavigate();

//   const stored = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("userInfo") || "null");
//     } catch (e) {
//       return null;
//     }
//   })();
//   const token = stored?.token || localStorage.getItem("recipientToken") || null;

//   // Helper: decode JWT payload (no verification) to extract id if localStorage lacks it
//   const parseJwt = (t) => {
//     try {
//       const base64Url = t.split('.')[1];
//       if (!base64Url) return null;
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split('')
//           .map(function(c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//           })
//           .join('')
//       );
//       return JSON.parse(jsonPayload);
//     } catch (e) {
//       return null;
//     }
//   };

//   // Derive recipientId preferentially from stored userInfo, fallback to token payload, then legacy local key
//   const recipientId = stored?._id || stored?.id || (() => {
//     if (token) {
//       const p = parseJwt(token);
//       return p?.id || p?._id || p?.sub || null;
//     }
//     return localStorage.getItem("recipientId") || null;
//   })();

//   // Fetch profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       // Must have either a recipientId (derived) or a token to proceed
//       if (!recipientId && !token) {
//         navigate("/Recipientlogin");
//         return;
//       }

//       try {
//         // Use id-based public profile route (server-side token endpoint may not exist in current repo state)
//         const url = `http://localhost:8000/api/recipients/profile/${recipientId}`;
//         const opts = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
//         const { data } = await axios.get(url, opts);
//         setProfile(data);
//       } catch (error) {
//         console.error('Failed to fetch recipient profile', error?.response || error);
//         // If profile not found or token invalid, force login
//         const status = error?.response?.status;
//         if (status === 401 || status === 400 || status === 404) {
//           // clear potentially stale userInfo and redirect to login
//           try { localStorage.removeItem('userInfo'); } catch (e) {}
//           navigate('/Recipientlogin');
//         }
//       }
//     };
//     fetchProfile();
//   }, [recipientId, token]);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handlePasswordChange = (e) => {
//     setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value });
//   };

//   // Update profile
//   const handleUpdateProfile = async () => {
//     try {
//       const payload = {
//         name: profile.name,
//         requiredBloodGroup: profile.requiredBloodGroup,
//         location: profile.location,
//         urgency: profile.urgency,
//       };
//       const { data } = await axios.put(`http://localhost:8000/api/recipients/profile/${recipientId}`, payload, {
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
//       const { data } = await axios.put(`http://localhost:8000/api/recipients/profile/${recipientId}`, payload, {
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
//       <h2>Recipient Profile</h2>
//       <div>
//         <p><strong>Email:</strong> {profile.email}</p>
//         <p>
//           <strong>Name:</strong>{" "}
//           {editMode ? <input name="name" value={profile.name || ""} onChange={handleChange} /> : profile.name}
//         </p>
//         <p>
//           <strong>Required Blood Group:</strong>{" "}
//           {editMode ? (
//             <input name="requiredBloodGroup" value={profile.requiredBloodGroup || ""} onChange={handleChange} />
//           ) : (
//             profile.requiredBloodGroup
//           )}
//         </p>
//         <p>
//           <strong>Location:</strong>{" "}
//           {editMode ? <input name="location" value={profile.location || ""} onChange={handleChange} /> : profile.location}
//         </p>
//         <p>
//           <strong>Urgency:</strong>{" "}
//           {editMode ? <input name="urgency" value={profile.urgency || ""} onChange={handleChange} /> : profile.urgency}
//         </p>

//         {!editMode && <button onClick={() => setEditMode(true)}>Edit Profile</button>}
//         {editMode && <button onClick={handleUpdateProfile}>Save Changes</button>}
//         {editMode && <button onClick={() => setEditMode(false)}>Cancel</button>}
//       </div>

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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function RecipientProfile() {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [passwordChange, setPasswordChange] = useState({ oldPassword: "", newPassword: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState(null);

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
  
  const token = stored?.token || localStorage.getItem("recipientToken") || null;

  const parseJwt = (t) => {
    try {
      const base64Url = t.split('.')[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const recipientId = stored?._id || stored?.id || (() => {
    if (token) {
      const p = parseJwt(token);
      return p?.id || p?._id || p?.sub || null;
    }
    return localStorage.getItem("recipientId") || null;
  })();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["Low", "Medium", "High", "Critical"];

  useEffect(() => {
    const fetchProfile = async () => {
      if (!recipientId && !token) {
        navigate("/Recipientlogin");
        return;
      }

      try {
        setIsLoading(true);
        const url = `http://localhost:8000/api/recipients/profile/${recipientId}`;
        const opts = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const { data } = await axios.get(url, opts);
        setProfile(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch recipient profile', error?.response || error);
        const status = error?.response?.status;
        const message = error?.response?.data?.message || "Failed to load profile";
        setError({ status, message });
        
        if (status === 401 || status === 400 || status === 404) {
          try { localStorage.removeItem('userInfo'); } catch (e) {}
          navigate('/Recipientlogin');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [recipientId, token, navigate]);

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
        requiredBloodGroup: profile.requiredBloodGroup,
        location: profile.location,
        urgency: profile.urgency,

        phone: profile.phone,
        latitude: profile.latitude,
        longitude: profile.longitude,
      };
      const { data } = await axios.put(`http://localhost:8000/api/recipients/profile/${recipientId}`, payload, {
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
      await axios.put(`http://localhost:8000/api/recipients/profile/${recipientId}`, payload, {
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

  const getUrgencyBadge = (urgency) => {
    const urgencyStyles = {
      Low: { backgroundColor: "#e8f5e8", color: "#2e7d32" },
      Medium: { backgroundColor: "#fff3e0", color: "#ef6c00" },
      High: { backgroundColor: "#ffebee", color: "#f44336" },
      Critical: { backgroundColor: "#fce4ec", color: "#c2185b" }
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
            onClick={() => navigate("/Recipientlogin")} 
            style={styles.primaryButton}
          >
            <i className="fas fa-sign-in-alt"></i>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

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
              <h1 style={styles.title}>{profile.name || "Recipient"}</h1>
              <p style={styles.subtitle}>LifeLink Blood Recipient</p>
            </div>
          </div>
          <div style={styles.bloodInfo}>
            {/* <div style={styles.bloodGroupBadge}>
              <i className="fas fa-tint" style={styles.bloodIcon}></i>
              {profile.requiredBloodGroup || "Not specified"}
            </div> */}
            {/* {profile.urgency && (
              <div style={styles.urgencySection}>
                <span style={styles.urgencyLabel}>Default Urgency:</span>
                {getUrgencyBadge(profile.urgency)}
              </div>
            )} */}
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
                Required Blood Group
              </label>
              {editMode ? (
                <select 
                  name="requiredBloodGroup"
                  style={styles.input}
                  value={profile.requiredBloodGroup || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              ) : (
                <div style={styles.readOnlyField}>
                  {profile.requiredBloodGroup ? (
                    <span style={styles.bloodGroup}>{profile.requiredBloodGroup}</span>
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
                <i className="fas fa-phone"></i>
                Phone
              </label>
              {editMode ? (
                <input
                  name="phone"
                  style={styles.input}
                  value={profile.phone || ""}
                  onChange={handleChange}
                  placeholder="Mobile or contact number"
                />
              ) : (
                <div style={styles.readOnlyField}>{profile.phone || "Not set"}</div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-map-pin"></i>
                Coordinates (Latitude / Longitude)
              </label>
              {editMode ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    name="latitude"
                    style={{ ...styles.input, width: "50%" }}
                    value={profile.latitude || ""}
                    onChange={handleChange}
                    placeholder="Latitude"
                  />
                  <input
                    name="longitude"
                    style={{ ...styles.input, width: "50%" }}
                    value={profile.longitude || ""}
                    onChange={handleChange}
                    placeholder="Longitude"
                  />
                </div>
              ) : (
                <div style={styles.readOnlyField}>{(profile.latitude && profile.longitude) ? `${profile.latitude}, ${profile.longitude}` : "Not set"}</div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-exclamation-circle"></i>
                Default Urgency Level
              </label>
              {editMode ? (
                <select 
                  name="urgency"
                  style={styles.input}
                  value={profile.urgency || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Urgency</option>
                  {urgencyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              ) : (
                <div style={styles.readOnlyField}>
                  {profile.urgency ? getUrgencyBadge(profile.urgency) : "Not set"}
                </div>
              )}
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
    backgroundColor: "#2196f3",
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
  bloodInfo: {
    textAlign: "center",
    padding: "15px 20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px"
  },
  bloodGroupBadge: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#2196f3",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px"
  },
  bloodIcon: {
    fontSize: "1.1rem"
  },
  urgencySection: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  urgencyLabel: {
    fontSize: "0.8rem",
    color: "#666",
    marginBottom: "4px"
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
    backgroundColor: "#2196f3",
    color: "white",
    boxShadow: "0 2px 8px rgba(33, 150, 243, 0.3)"
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
    color: "#2196f3",
    border: "2px solid #2196f3",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease"
  },
  editButtonHover: {
    backgroundColor: "#2196f3",
    color: "white"
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
  inputFocus: {
    borderColor: "#2196f3",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.1)"
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
    color: "#2196f3",
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
    backgroundColor: "#2196f3",
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
  primaryButtonHover: {
    backgroundColor: "#1976d2",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)"
  },
  primaryButtonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none"
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
    color: "#2196f3"
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
  ":hover": styles.editButtonHover
});

Object.assign(styles.primaryButton, {
  ":hover": styles.primaryButtonHover
});

Object.assign(styles.input, {
  ":focus": styles.inputFocus
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
    .bloodInfo {
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