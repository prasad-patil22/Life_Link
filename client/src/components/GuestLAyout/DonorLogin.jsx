// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function DonorLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:8000/api/donors/login", { email, password });
//       // Log the full response to make debugging easier if fields are missing
//       console.log("donor login response:", data);

//       // Save user info (token + profile) in localStorage for later use
//       localStorage.setItem("userInfo", JSON.stringify(data));

//       // Use a safe fallback for name in case the backend returns a different shape
//       const name = data?.name || data?.user?.name || "Donor";
//       // Navigate to donor layout/dashboard
//       alert("Login Success! Donor: " + name);
//       navigate("/donor");
//     } catch (error) {
//       console.error(error);
//       const message = error?.response?.data?.message || error.message || "Login failed";
//       alert(message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Donor Login</h2>
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DonorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true
    });

    // Check for remembered email
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data } = await axios.post("http://localhost:8000/api/donors/login", { email, password });
      console.log("donor login response:", data);

      // Save user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Remember email if checkbox is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const name = data?.name || data?.user?.name || "Donor";
      alert("Login Success! Welcome back, " + name);
      navigate("/donor");
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || error.message || "Login failed";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputStyle = (fieldName) => {
    return focusedInput === fieldName 
      ? {...styles.input, ...styles.inputFocus}
      : styles.input;
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      
      <div style={styles.loginContainer} data-aos="fade-up">
        {/* Side Panel */}
        <div style={styles.sidePanel} data-aos="fade-right" data-aos-delay="200">
          <div style={styles.sideContent}>
            <div style={styles.heroSection}>
              <div style={styles.heroIcon}>
                <i className="fas fa-hand-holding-heart" style={styles.heroMainIcon}></i>
              </div>
              <h2 style={styles.heroTitle}>Save Lives Today</h2>
              <p style={styles.heroText}>
                Your login brings hope to those in need. Every donation counts, every login matters.
              </p>
            </div>

            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <i className="fas fa-bell" style={styles.featureIcon}></i>
                <div>
                  <h4>Emergency Alerts</h4>
                  <p>Get notified for urgent blood requests</p>
                </div>
              </div>
              
              <div style={styles.featureItem}>
                <i className="fas fa-history" style={styles.featureIcon}></i>
                <div>
                  <h4>Donation History</h4>
                  <p>Track your life-saving journey</p>
                </div>
              </div>
              
              <div style={styles.featureItem}>
                <i className="fas fa-map-marker-alt" style={styles.featureIcon}></i>
                <div>
                  <h4>Location Based</h4>
                  <p>Help people in your area</p>
                </div>
              </div>
              
              <div style={styles.featureItem}>
                <i className="fas fa-award" style={styles.featureIcon}></i>
                <div>
                  <h4>Recognition</h4>
                  <p>Earn badges and rewards</p>
                </div>
              </div>
            </div>

            <div style={styles.stats}>
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

        {/* Login Form */}
        <div style={styles.loginCard} data-aos="fade-left" data-aos-delay="400">
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.logo}>
              <i className="fas fa-heartbeat" style={styles.logoIcon}></i>
              <span style={styles.logoText}>Life<span style={styles.logoAccent}>Link</span></span>
            </div>
            <h2 style={styles.title}>Donor Login</h2>
            <p style={styles.subtitle}>Access your donor dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-envelope" style={styles.inputIcon}></i>
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="Enter your registered email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={getInputStyle('email')}
                disabled={isLoading}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.labelRow}>
                <label style={styles.label}>
                  <i className="fas fa-lock" style={styles.inputIcon}></i>
                  Password
                </label>
                <Link to="/forgot-password" style={styles.forgotLink}>
                  Forgot Password?
                </Link>
              </div>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={getInputStyle('password')}
                disabled={isLoading}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            <div style={styles.rememberMe}>
              <label style={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>Remember me</span>
              </label>
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
                  Signing In...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt" style={styles.buttonIcon}></i>
                  Login to Dashboard
                </>
              )}
            </button>

            <div style={styles.divider}>
              <span style={styles.dividerText}>New to LifeLink?</span>
            </div>

            <Link to="/doonerregister" style={styles.registerButton}>
              <i className="fas fa-user-plus" style={styles.buttonIcon}></i>
              Create Donor Account
            </Link>
          </form>

          {/* Footer */}
          <div style={styles.footer}>
            <div style={styles.quickLinks}>
              <Link to="/" style={styles.footerLink}>
                <i className="fas fa-home"></i>
                Home
              </Link>
              <Link to="/services" style={styles.footerLink}>
                <i className="fas fa-hand-holding-heart"></i>
                Services
              </Link>
              <Link to="/contact" style={styles.footerLink}>
                <i className="fas fa-phone"></i>
                Contact
              </Link>
            </div>

            <div style={styles.securityNote}>
              <i className="fas fa-shield-alt" style={styles.securityIcon}></i>
              <span>Your data is securely protected</span>
            </div>
          </div>
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
    background: "white", // Changed to white background
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
    opacity: 0.05, // Reduced opacity for white background
    zIndex: 0
  },
  loginContainer: {
    display: "flex",
    maxWidth: "1100px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)", // Lighter shadow for white background
    overflow: "hidden",
    minHeight: "650px",
    position: "relative",
    zIndex: 1,
    border: "1px solid #f0f0f0" // Added border for definition
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
    marginBottom: "15px"
  },
  heroText: {
    fontSize: "1rem",
    opacity: 0.9,
    lineHeight: "1.6"
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "40px"
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    transition: "all 0.3s ease"
  },
  featureIcon: {
    fontSize: "1.3rem",
    color: "white",
    width: "24px",
    textAlign: "center"
  },
  featureItemHover: {
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
  loginCard: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white" // Explicit white background
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
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
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
    fontSize: "0.9rem"
  },
  input: {
    padding: "15px 20px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    outline: "none"
  },
  inputFocus: {
    borderColor: "#e53935",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(229, 57, 53, 0.1)"
  },
  forgotLink: {
    color: "#e53935",
    fontSize: "0.85rem",
    textDecoration: "none",
    fontWeight: "500"
  },
  rememberMe: {
    display: "flex",
    alignItems: "center"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#666"
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#e53935"
  },
  checkboxText: {
    userSelect: "none"
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
    marginTop: "10px"
  },
  submitButtonLoading: {
    backgroundColor: "#999",
    cursor: "not-allowed"
  },
  buttonIcon: {
    fontSize: "1rem"
  },
  divider: {
    position: "relative",
    margin: "20px 0",
    textAlign: "center"
  },
  dividerText: {
    backgroundColor: "white",
    padding: "0 15px",
    color: "#666",
    fontSize: "0.9rem",
    position: "relative",
    zIndex: 1
  },
  registerButton: {
    padding: "15px 20px",
    backgroundColor: "transparent",
    color: "#e53935",
    border: "2px solid #e53935",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    textDecoration: "none",
    textAlign: "center"
  },
  footer: {
    marginTop: "40px",
    textAlign: "center"
  },
  quickLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  footerLink: {
    color: "#666",
    textDecoration: "none",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "color 0.3s ease"
  },
  securityNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "0.8rem",
    color: "#666",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px"
  },
  securityIcon: {
    color: "#4caf50"
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

Object.assign(styles.registerButton, {
  ":hover": {
    backgroundColor: "#e53935",
    color: "white",
    transform: "translateY(-2px)"
  }
});

Object.assign(styles.forgotLink, {
  ":hover": {
    textDecoration: "underline"
  }
});

Object.assign(styles.featureItem, {
  ":hover": styles.featureItemHover
});

Object.assign(styles.footerLink, {
  ":hover": {
    color: "#e53935"
  }
});