// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:8000/api/admin/login", { email, password });
//       console.log("admin login response:", data);
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       const name = data?.name || data?.user?.name || "Admin";
//       alert("Login Success! Admin: " + name);
//       navigate("/admin");
//     } catch (error) {
//       console.error(error);
//       const message = error?.response?.data?.message || error.message || "Login failed";
//       alert(message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Admin Login</h2>
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

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data } = await axios.post("http://localhost:8000/api/admin/login", { email, password });
      console.log("admin login response:", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      const name = data?.name || data?.user?.name || "Admin";
      
      // Success notification
      alert("Login Success! Welcome, " + name);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || error.message || "Login failed";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      
      <div style={styles.loginContainer} data-aos="fade-up">
        <div style={styles.loginCard}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.logo}>
              <i className="fas fa-user-shield" style={styles.logoIcon}></i>
              <span style={styles.logoText}>Life<span style={styles.logoAccent}>Link</span></span>
            </div>
            <h2 style={styles.title}>Admin Portal</h2>
            <p style={styles.subtitle}>Access the administration dashboard</p>
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
                placeholder="Enter your admin email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={styles.input}
                disabled={isLoading}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <i className="fas fa-lock" style={styles.inputIcon}></i>
                Password
              </label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={styles.input}
                disabled={isLoading}
              />
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
                  Authenticating...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt" style={styles.buttonIcon}></i>
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={styles.footer}>
            <div style={styles.divider}>
              <span style={styles.dividerText}>Quick Links</span>
            </div>
            
            <div style={styles.links}>
              <Link to="/" style={styles.link}>
                <i className="fas fa-home"></i>
                Back to Home
              </Link>
              <Link to="/forgot-password" style={styles.link}>
                <i className="fas fa-key"></i>
                Forgot Password?
              </Link>
            </div>

            <div style={styles.securityNote}>
              <i className="fas fa-shield-alt" style={styles.securityIcon}></i>
              <span>Secure admin access only</span>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div style={styles.sidePanel} data-aos="fade-left" data-aos-delay="300">
          <div style={styles.sideContent}>
            <h3 style={styles.sideTitle}>Admin Features</h3>
            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <i className="fas fa-users-cog" style={styles.featureIcon}></i>
                <div>
                  <h4>View donor</h4>
                  <p>view All donors </p>
                </div>
              </div>


              <div style={styles.featureItem}>
                <i className="fas fa-users-cog" style={styles.featureIcon}></i>
                <div>
                  <h4>View Recipients</h4>
                  <p>view All donors </p>
                </div>
              </div>
              
              <div style={styles.featureItem}>
                <i className="fas fa-chart-bar" style={styles.featureIcon}></i>
                <div>
                  <h4>Analytics Dashboard</h4>
                  <p>View platform statistics</p>
                </div>
              </div>
              
              
              {/* <div style={styles.featureItem}>
                <i className="fas fa-bell" style={styles.featureIcon}></i>
                <div>
                  <h4>Emergency Alerts</h4>
                  <p>Monitor urgent requests</p>
                </div>
              </div> */}
            </div>
            
            {/* <div style={styles.emergencyContact}>
              <h4 style={styles.emergencyTitle}>
                <i className="fas fa-exclamation-triangle"></i>
                System Admin
              </h4>
              <p style={styles.emergencyText}>
                For technical issues contact: 
                <br />
                <strong>admin@lifelink.com</strong>
              </p>
            </div> */}
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
    background: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.1,
    zIndex: 0
  },
  loginContainer: {
    display: "flex",
    maxWidth: "1000px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    minHeight: "600px",
    position: "relative",
    zIndex: 1
  },
  loginCard: {
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
    backgroundColor: "#fafafa"
  },
  inputFocus: {
    borderColor: "#e53935",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(229, 57, 53, 0.1)"
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
  footer: {
    marginTop: "40px",
    textAlign: "center"
  },
  divider: {
    position: "relative",
    margin: "30px 0",
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
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  link: {
    color: "#e53935",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
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
  },
  sidePanel: {
    flex: "0 0 350px",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "40px 30px",
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
  sideTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "30px",
    textAlign: "center"
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flex: 1
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    padding: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    transition: "background-color 0.3s ease"
  },
  featureIcon: {
    fontSize: "1.2rem",
    color: "#e53935",
    marginTop: "2px",
    flexShrink: 0
  },
  featureItemHover: {
    backgroundColor: "rgba(255, 255, 255, 0.15)"
  },
  emergencyContact: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "rgba(229, 57, 53, 0.1)",
    borderRadius: "10px",
    border: "1px solid rgba(229, 57, 53, 0.3)"
  },
  emergencyTitle: {
    fontSize: "1.1rem",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  emergencyText: {
    fontSize: "0.9rem",
    margin: 0,
    lineHeight: "1.5"
  }
};

// Add hover effects
Object.assign(styles.input, {
  ":focus": styles.inputFocus
});

Object.assign(styles.submitButton, {
  ":hover": {
    backgroundColor: "#c62828",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(229, 57, 53, 0.3)"
  }
});

Object.assign(styles.link, {
  ":hover": {
    color: "#c62828"
  }
});

Object.assign(styles.featureItem, {
  ":hover": styles.featureItemHover
});