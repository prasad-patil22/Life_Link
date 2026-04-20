// import { useState } from "react";
// import axios from "axios";

// export default function DonorRegister() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     bloodGroup: "",
//     location: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:8000/api/donors/register", formData);
//       alert("Donor Registered! Token: " + data.token);
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Donor Registration</h2>
//       <input name="name" placeholder="Name" onChange={handleChange} required />
//       <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} required />
//       <input name="location" placeholder="Location" onChange={handleChange} required />
//       <button type="submit">Register</button>
//     </form>
//   );
// }




import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DonorRegister() {
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  bloodGroup: "",
  location: "",
  phone: "",
  latitude: "",
  longitude: ""
});


  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true
  });

  // Get user's coordinates
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to fetch your location automatically. Please enter it manually.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}, []);


  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    // Check password match
    if (name === "confirmPassword" || name === "password") {
      if (formData.password !== formData.confirmPassword && formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    // Create a payload with required fields
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      bloodGroup: formData.bloodGroup,
      location: formData.location,
      latitude: formData.latitude,
  longitude: formData.longitude,
      phone: formData.phone,
    };

    const { data } = await axios.post("http://localhost:8000/api/donors/register", payload);

    alert("🎉 Registration Successful! Welcome to LifeLink!");

    if (data.token) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/donor");
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || "Registration failed. Please try again.";
    alert("❌ " + message);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      
      <div style={styles.registerContainer} data-aos="fade-up">
        {/* Side Panel */}
        <div style={styles.sidePanel} data-aos="fade-right" data-aos-delay="200">
          <div style={styles.sideContent}>
            <div style={styles.heroSection}>
              <div style={styles.heroIcon}>
                <i className="fas fa-hand-holding-heart" style={styles.heroMainIcon}></i>
              </div>
              <h2 style={styles.heroTitle}>Join Our Life-Saving Mission</h2>
              <p style={styles.heroText}>
                Your registration brings hope to those in need. Become a hero today and help save lives in your community.
              </p>
            </div>

            <div style={styles.benefitsList}>
              <div style={styles.benefitItem} data-aos="zoom-in" data-aos-delay="300">
                <i className="fas fa-bolt" style={styles.benefitIcon}></i>
                <div>
                  <h4>Quick Response</h4>
                  <p>Get notified for emergency blood requests</p>
                </div>
              </div>
              
              <div style={styles.benefitItem} data-aos="zoom-in" data-aos-delay="400">
                <i className="fas fa-map-marker-alt" style={styles.benefitIcon}></i>
                <div>
                  <h4>Local Impact</h4>
                  <p>Help people in your immediate area</p>
                </div>
              </div>
              
              <div style={styles.benefitItem} data-aos="zoom-in" data-aos-delay="500">
                <i className="fas fa-shield-alt" style={styles.benefitIcon}></i>
                <div>
                  <h4>Safe & Secure</h4>
                  <p>Verified medical procedures</p>
                </div>
              </div>
            </div>

            <div style={styles.stats} data-aos="fade-up" data-aos-delay="600">
              <div style={styles.statItem}>
                <h3 style={styles.statNumber}>25,000+</h3>
                <p style={styles.statLabel}>Active Donors</p>
              </div>
              <div style={styles.statItem}>
                <h3 style={styles.statNumber}>50,000+</h3>
                <p style={styles.statLabel}>Lives Saved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div style={styles.registerCard} data-aos="fade-left" data-aos-delay="400">
          <div style={styles.header}>
            <div style={styles.logo}>
              <i className="fas fa-heartbeat" style={styles.logoIcon}></i>
              <span style={styles.logoText}>Life<span style={styles.logoAccent}>Link</span></span>
            </div>
            <h2 style={styles.title}>Become a Donor</h2>
            <p style={styles.subtitle}>Join our community of life-savers</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-user" style={styles.inputIcon}></i>
                Full Name *
              </label>
              <input 
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                style={errors.name ? { ...styles.input, ...styles.inputError } : styles.input}
                disabled={isLoading}
              />
              {errors.name && <span style={styles.errorText}>{errors.name}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-envelope" style={styles.inputIcon}></i>
                Email Address *
              </label>
              <input 
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={errors.email ? { ...styles.input, ...styles.inputError } : styles.input}
                disabled={isLoading}
              />
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-phone" style={styles.inputIcon}></i>
                Phone Number *
              </label>
              <input 
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                style={errors.phone ? { ...styles.input, ...styles.inputError } : styles.input}
                disabled={isLoading}
              />
              {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
            </div>

            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <i className="fas fa-tint" style={styles.inputIcon}></i>
                  Blood Group *
                </label>
                <select 
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  style={errors.bloodGroup ? { ...styles.input, ...styles.inputError } : styles.input}
                  disabled={isLoading}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                {errors.bloodGroup && <span style={styles.errorText}>{errors.bloodGroup}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <i className="fas fa-map-marker-alt" style={styles.inputIcon}></i>
                  Location *
                </label>
                <input 
                  name="location"
                  type="text"
                  placeholder="Your city"
                  value={formData.location}
                  onChange={handleChange}
                  style={errors.location ? { ...styles.input, ...styles.inputError } : styles.input}
                  disabled={isLoading}
                />
                {errors.location && <span style={styles.errorText}>{errors.location}</span>}
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <i className="fas fa-lock" style={styles.inputIcon}></i>
                  Password *
                </label>
                <input 
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  style={errors.password ? { ...styles.input, ...styles.inputError } : styles.input}
                  disabled={isLoading}
                />
                {errors.password && <span style={styles.errorText}>{errors.password}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <i className="fas fa-lock" style={styles.inputIcon}></i>
                  Confirm Password *
                </label>
                <input 
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={errors.confirmPassword ? { ...styles.input, ...styles.inputError } : styles.input}
                  disabled={isLoading}
                />
                {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonLoading : {})
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin" style={styles.buttonIcon}></i>
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="fas fa-heart" style={styles.buttonIcon}></i>
                  Join as Donor
                </>
              )}
            </button>

            <div style={styles.loginPrompt}>
              <span>Already have an account? </span>
              <Link to="/doonerlogin" style={styles.loginLink}>
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('https://images.unsplash.com/photo-1579154204601-015d927e3fd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.1,
    zIndex: 0
  },
  registerContainer: {
    display: "flex",
    maxWidth: "1100px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    minHeight: "700px",
    position: "relative",
    zIndex: 1
  },
  sidePanel: {
    flex: "0 0 45%",
    background: "linear-gradient(135deg, #e53935 0%, #c62828 100%)",
    color: "white",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  sideContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  heroSection: {
    textAlign: "center",
    marginBottom: "40px"
  },
  heroIcon: {
    width: "80px",
    height: "80px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px"
  },
  heroMainIcon: {
    fontSize: "2.5rem",
    color: "white"
  },
  heroTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "15px",
    lineHeight: "1.3"
  },
  heroText: {
    fontSize: "1rem",
    opacity: 0.9,
    lineHeight: "1.6"
  },
  benefitsList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "40px"
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    transition: "all 0.3s ease"
  },
  benefitIcon: {
    fontSize: "1.3rem",
    color: "white",
    width: "24px",
    textAlign: "center"
  },
  benefitItemHover: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    transform: "translateX(5px)"
  },
  stats: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center"
  },
  statItem: {
    padding: "15px"
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "700",
    margin: "0 0 5px 0"
  },
  statLabel: {
    fontSize: "0.9rem",
    opacity: 0.9,
    margin: 0
  },
  registerCard: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px"
  },
  logoIcon: {
    fontSize: "2rem",
    color: "#e53935"
  },
  logoText: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#2c3e50"
  },
  logoAccent: {
    color: "#e53935"
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
    margin: 0
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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
  inputIcon: {
    color: "#e53935",
    fontSize: "0.9rem",
    width: "16px"
  },
  input: {
    padding: "14px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    outline: "none"
  },
  inputError: {
    borderColor: "#f44336",
    backgroundColor: "#fff5f5"
  },
  inputFocus: {
    borderColor: "#e53935",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(229, 57, 53, 0.1)"
  },
  errorText: {
    color: "#f44336",
    fontSize: "0.8rem",
    fontWeight: "500",
    marginTop: "4px"
  },
  submitButton: {
    padding: "16px 20px",
    backgroundColor: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px"
  },
  submitButtonLoading: {
    backgroundColor: "#999",
    cursor: "not-allowed"
  },
  buttonIcon: {
    fontSize: "1rem"
  },
  loginPrompt: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#666",
    marginTop: "20px"
  },
  loginLink: {
    color: "#e53935",
    textDecoration: "none",
    fontWeight: "600"
  }
};

// Add hover effects
Object.assign(styles.submitButton, {
  ":hover": {
    backgroundColor: "#c62828",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(229, 57, 53, 0.3)"
  }
});

Object.assign(styles.benefitItem, {
  ":hover": styles.benefitItemHover
});

Object.assign(styles.input, {
  ":focus": styles.inputFocus
});

Object.assign(styles.loginLink, {
  ":hover": {
    textDecoration: "underline"
  }
});

// Responsive styles
const responsiveStyles = `
  @media (max-width: 968px) {
    .registerContainer {
      flex-direction: column;
      min-height: auto;
    }
    .sidePanel {
      flex: 0 0 auto;
      padding: 30px;
    }
    .formRow {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .registerCard {
      padding: 30px;
    }
    .title {
      font-size: 1.8rem;
    }
    .heroTitle {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 10px;
    }
    .registerCard {
      padding: 20px;
    }
    .sidePanel {
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