// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function RecipientLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:8000/api/recipients/login", { email, password });
//       console.log("recipient login response:", data);
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       const name = data?.name || data?.user?.name || "Recipient";
//       alert("Login Success! Recipient: " + name);
//       navigate("/recipient");
//     } catch (error) {
//       console.error(error);
//       const message = error?.response?.data?.message || error.message || "Login failed";
//       alert(message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Recipient Login</h2>
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// // }
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function RecipientLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       easing: "ease-in-out",
//       once: true
//     });

//     // Check for remembered email
//     const rememberedEmail = localStorage.getItem("rememberedRecipientEmail");
//     if (rememberedEmail) {
//       setEmail(rememberedEmail);
//       setRememberMe(true);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const { data } = await axios.post("http://localhost:8000/api/recipients/login", { email, password });
//       console.log("recipient login response:", data);

//       // Save user info in localStorage
//       localStorage.setItem("userInfo", JSON.stringify(data));

//       // Remember email if checkbox is checked
//       if (rememberMe) {
//         localStorage.setItem("rememberedRecipientEmail", email);
//       } else {
//         localStorage.removeItem("rememberedRecipientEmail");
//       }

//       const name = data?.name || data?.user?.name || "Recipient";
//       alert("Login Success! Welcome back, " + name);
//       navigate("/recipient");
//     } catch (error) {
//       console.error(error);
//       const message = error?.response?.data?.message || error.message || "Login failed";
//       alert(message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEmergencyAccess = () => {
//     alert("Emergency access: Please call our 24/7 helpline at +1 (555) 911-BLOOD for immediate assistance.");
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.background}></div>
      
//       <div style={styles.loginContainer} data-aos="fade-up">
//         {/* Login Form */}
//         <div style={styles.loginCard} data-aos="fade-right" data-aos-delay="200">
//           {/* Header */}
//           <div style={styles.header}>
//             <div style={styles.logo}>
//               <i className="fas fa-hands-helping" style={styles.logoIcon}></i>
//               <span style={styles.logoText}>Life<span style={styles.logoAccent}>Link</span></span>
//             </div>
//             <h2 style={styles.title}>Recipient Login</h2>
//             <p style={styles.subtitle}>Access your recipient dashboard</p>
//           </div>

//           {/* Emergency Alert */}
//           <div style={styles.emergencyAlert} data-aos="zoom-in" data-aos-delay="400">
//             <div style={styles.emergencyIcon}>
//               <i className="fas fa-exclamation-triangle"></i>
//             </div>
//             <div style={styles.emergencyContent}>
//               <h4 style={styles.emergencyTitle}>Urgent Blood Need?</h4>
//               <p style={styles.emergencyText}>Emergency requests get priority response</p>
//               <button onClick={handleEmergencyAccess} style={styles.emergencyButton}>
//                 <i className="fas fa-phone-alt"></i>
//                 Emergency Access
//               </button>
//             </div>
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} style={styles.form}>
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>
//                 <i className="fas fa-envelope" style={styles.inputIcon}></i>
//                 Email Address
//               </label>
//               <input 
//                 type="email" 
//                 placeholder="Enter your registered email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 required 
//                 style={styles.input}
//                 disabled={isLoading}
//                 onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
//                 onBlur={(e) => e.target.style = styles.input}
//               />
//             </div>

//             <div style={styles.inputGroup}>
//               <div style={styles.labelRow}>
//                 <label style={styles.label}>
//                   <i className="fas fa-lock" style={styles.inputIcon}></i>
//                   Password
//                 </label>
//                 <Link to="/forgot-password" style={styles.forgotLink}>
//                   Forgot Password?
//                 </Link>
//               </div>
//               <input 
//                 type="password" 
//                 placeholder="Enter your password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 required 
//                 style={styles.input}
//                 disabled={isLoading}
//                 onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
//                 onBlur={(e) => e.target.style = styles.input}
//               />
//             </div>

//             <div style={styles.rememberMe}>
//               <label style={styles.checkboxLabel}>
//                 <input 
//                   type="checkbox" 
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   style={styles.checkbox}
//                 />
//                 <span style={styles.checkboxText}>Remember me</span>
//               </label>
//             </div>

//             <button 
//               type="submit" 
//               style={{
//                 ...styles.submitButton,
//                 ...(isLoading ? styles.submitButtonLoading : {})
//               }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <i className="fas fa-spinner fa-spin" style={styles.buttonIcon}></i>
//                   Accessing Dashboard...
//                 </>
//               ) : (
//                 <>
//                   <i className="fas fa-sign-in-alt" style={styles.buttonIcon}></i>
//                   Login to Dashboard
//                 </>
//               )}
//             </button>

//             <div style={styles.divider}>
//               <span style={styles.dividerText}>New to LifeLink?</span>
//             </div>

//             <Link to="/RecipientRegister" style={styles.registerButton}>
//               <i className="fas fa-user-plus" style={styles.buttonIcon}></i>
//               Create Recipient Account
//             </Link>
//           </form>

//           {/* Footer */}
//           <div style={styles.footer}>
//             <div style={styles.quickLinks}>
//               <Link to="/" style={styles.footerLink}>
//                 <i className="fas fa-home"></i>
//                 Home
//               </Link>
//               <Link to="/services" style={styles.footerLink}>
//                 <i className="fas fa-hand-holding-heart"></i>
//                 Services
//               </Link>
//               <Link to="/contact" style={styles.footerLink}>
//                 <i className="fas fa-phone"></i>
//                 Contact
//               </Link>
//             </div>

//             <div style={styles.securityNote}>
//               <i className="fas fa-shield-alt" style={styles.securityIcon}></i>
//               <span>Your medical data is protected and confidential</span>
//             </div>
//           </div>
//         </div>

//         {/* Side Panel */}
//         <div style={styles.sidePanel} data-aos="fade-left" data-aos-delay="400">
//           <div style={styles.sideContent}>
//             <div style={styles.heroSection}>
//               <div style={styles.heroIcon}>
//                 <i className="fas fa-heartbeat" style={styles.heroMainIcon}></i>
//               </div>
//               <h2 style={styles.heroTitle}>Help When You Need It Most</h2>
//               <p style={styles.heroText}>
//                 Your login connects you with life-saving donors in your area. We're here to support you.
//               </p>
//             </div>

//             <div style={styles.featuresList}>
//               <div style={styles.featureItem}>
//                 <i className="fas fa-bolt" style={styles.featureIcon}></i>
//                 <div>
//                   <h4>Quick Matching</h4>
//                   <p>Instant connection with compatible donors</p>
//                 </div>
//               </div>
              
//               <div style={styles.featureItem}>
//                 <i className="fas fa-map-marker-alt" style={styles.featureIcon}></i>
//                 <div>
//                   <h4>Local Donors</h4>
//                   <p>Find donors in your immediate area</p>
//                 </div>
//               </div>
              
//               <div style={styles.featureItem}>
//                 <i className="fas fa-comments" style={styles.featureIcon}></i>
//                 <div>
//                   <h4>Direct Communication</h4>
//                   <p>Secure messaging with potential donors</p>
//                 </div>
//               </div>
              
//               <div style={styles.featureItem}>
//                 <i className="fas fa-hospital" style={styles.featureIcon}></i>
//                 <div>
//                   <h4>Hospital Network</h4>
//                   <p>Access to our partner medical facilities</p>
//                 </div>
//               </div>
//             </div>

//             <div style={styles.supportSection}>
//               <h4 style={styles.supportTitle}>
//                 <i className="fas fa-headset"></i>
//                 24/7 Support Available
//               </h4>
//               <div style={styles.supportContacts}>
//                 <div style={styles.supportItem}>
//                   <strong>Emergency Helpline:</strong>
//                   <span style={styles.supportNumber}>+1 (555) 911-BLOOD</span>
//                 </div>
//                 <div style={styles.supportItem}>
//                   <strong>Medical Coordination:</strong>
//                   <span style={styles.supportNumber}>+1 (555) 234-HOSP</span>
//                 </div>
//               </div>
//             </div>

//             <div style={styles.stats}>
//               <div style={styles.statItem}>
//                 <h3 style={styles.statNumber}>15 min</h3>
//                 <p style={styles.statLabel}>Avg. Response Time</p>
//               </div>
//               <div style={styles.statItem}>
//                 <h3 style={styles.statNumber}>98%</h3>
//                 <p style={styles.statLabel}>Request Success Rate</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     padding: "20px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//   },
//   background: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "url('https://images.unsplash.com/photo-1584467735871-8db9ac8d55b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     opacity: 0.1,
//     zIndex: 0
//   },
//   loginContainer: {
//     display: "flex",
//     maxWidth: "1200px",
//     width: "100%",
//     backgroundColor: "white",
//     borderRadius: "20px",
//     boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
//     overflow: "hidden",
//     minHeight: "700px",
//     position: "relative",
//     zIndex: 1
//   },
//   loginCard: {
//     flex: 1,
//     padding: "40px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center"
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "30px"
//   },
//   logo: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px",
//     marginBottom: "20px"
//   },
//   logoIcon: {
//     fontSize: "2rem",
//     color: "#2196f3"
//   },
//   logoText: {
//     fontSize: "1.8rem",
//     fontWeight: "700",
//     color: "#2c3e50"
//   },
//   logoAccent: {
//     color: "#2196f3"
//   },
//   title: {
//     fontSize: "2.2rem",
//     fontWeight: "700",
//     color: "#2c3e50",
//     marginBottom: "10px"
//   },
//   subtitle: {
//     fontSize: "1rem",
//     color: "#666",
//     margin: 0
//   },
//   emergencyAlert: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//     padding: "20px",
//     backgroundColor: "#fff3e0",
//     border: "2px solid #ff9800",
//     borderRadius: "12px",
//     marginBottom: "30px"
//   },
//   emergencyIcon: {
//     width: "50px",
//     height: "50px",
//     backgroundColor: "#ff9800",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "white",
//     fontSize: "1.3rem",
//     flexShrink: 0
//   },
//   emergencyContent: {
//     flex: 1
//   },
//   emergencyTitle: {
//     color: "#e65100",
//     margin: "0 0 5px 0",
//     fontSize: "1.1rem",
//     fontWeight: "600"
//   },
//   emergencyText: {
//     color: "#666",
//     margin: "0 0 10px 0",
//     fontSize: "0.9rem"
//   },
//   emergencyButton: {
//     padding: "8px 16px",
//     backgroundColor: "#ff9800",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     fontSize: "0.85rem",
//     fontWeight: "600",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     gap: "5px",
//     transition: "all 0.3s ease"
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px"
//   },
//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px"
//   },
//   labelRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   label: {
//     fontSize: "0.9rem",
//     fontWeight: "600",
//     color: "#2c3e50",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px"
//   },
//   inputIcon: {
//     color: "#2196f3",
//     fontSize: "0.9rem"
//   },
//   input: {
//     padding: "15px 20px",
//     border: "2px solid #e0e0e0",
//     borderRadius: "12px",
//     fontSize: "1rem",
//     transition: "all 0.3s ease",
//     backgroundColor: "#fafafa",
//     outline: "none"
//   },
//   inputFocus: {
//     borderColor: "#2196f3",
//     backgroundColor: "white",
//     boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.1)"
//   },
//   forgotLink: {
//     color: "#2196f3",
//     fontSize: "0.85rem",
//     textDecoration: "none",
//     fontWeight: "500"
//   },
//   rememberMe: {
//     display: "flex",
//     alignItems: "center"
//   },
//   checkboxLabel: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     cursor: "pointer",
//     fontSize: "0.9rem",
//     color: "#666"
//   },
//   checkbox: {
//     width: "16px",
//     height: "16px",
//     accentColor: "#2196f3"
//   },
//   checkboxText: {
//     userSelect: "none"
//   },
//   submitButton: {
//     padding: "16px 20px",
//     backgroundColor: "#2196f3",
//     color: "white",
//     border: "none",
//     borderRadius: "12px",
//     fontSize: "1.1rem",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px",
//     marginTop: "10px"
//   },
//   submitButtonLoading: {
//     backgroundColor: "#999",
//     cursor: "not-allowed"
//   },
//   buttonIcon: {
//     fontSize: "1rem"
//   },
//   divider: {
//     position: "relative",
//     margin: "20px 0",
//     textAlign: "center"
//   },
//   dividerText: {
//     backgroundColor: "white",
//     padding: "0 15px",
//     color: "#666",
//     fontSize: "0.9rem",
//     position: "relative",
//     zIndex: 1
//   },
//   registerButton: {
//     padding: "15px 20px",
//     backgroundColor: "transparent",
//     color: "#2196f3",
//     border: "2px solid #2196f3",
//     borderRadius: "12px",
//     fontSize: "1rem",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px",
//     textDecoration: "none",
//     textAlign: "center"
//   },
//   footer: {
//     marginTop: "40px",
//     textAlign: "center"
//   },
//   quickLinks: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     marginBottom: "20px",
//     flexWrap: "wrap"
//   },
//   footerLink: {
//     color: "#666",
//     textDecoration: "none",
//     fontSize: "0.85rem",
//     display: "flex",
//     alignItems: "center",
//     gap: "5px",
//     transition: "color 0.3s ease"
//   },
//   securityNote: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "8px",
//     fontSize: "0.8rem",
//     color: "#666",
//     padding: "10px",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "8px"
//   },
//   securityIcon: {
//     color: "#4caf50"
//   },
//   sidePanel: {
//     flex: "0 0 45%",
//     background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
//     color: "white",
//     padding: "40px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center"
//   },
//   sideContent: {
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between"
//   },
//   heroSection: {
//     textAlign: "center",
//     marginBottom: "40px"
//   },
//   heroIcon: {
//     width: "80px",
//     height: "80px",
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto 20px"
//   },
//   heroMainIcon: {
//     fontSize: "2.5rem",
//     color: "white"
//   },
//   heroTitle: {
//     fontSize: "2rem",
//     fontWeight: "700",
//     marginBottom: "15px"
//   },
//   heroText: {
//     fontSize: "1rem",
//     opacity: 0.9,
//     lineHeight: "1.6"
//   },
//   featuresList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//     marginBottom: "30px"
//   },
//   featureItem: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//     padding: "15px",
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     borderRadius: "10px",
//     transition: "all 0.3s ease"
//   },
//   featureIcon: {
//     fontSize: "1.3rem",
//     color: "white",
//     width: "24px",
//     textAlign: "center"
//   },
//   featureItemHover: {
//     backgroundColor: "rgba(255, 255, 255, 0.15)",
//     transform: "translateX(5px)"
//   },
//   supportSection: {
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     padding: "20px",
//     borderRadius: "10px",
//     marginBottom: "30px"
//   },
//   supportTitle: {
//     fontSize: "1.1rem",
//     marginBottom: "15px",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px"
//   },
//   supportContacts: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px"
//   },
//   supportItem: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     fontSize: "0.9rem"
//   },
//   supportNumber: {
//     fontWeight: "600",
//     color: "#ffeb3b"
//   },
//   stats: {
//     display: "flex",
//     justifyContent: "space-around",
//     textAlign: "center"
//   },
//   statItem: {
//     padding: "15px"
//   },
//   statNumber: {
//     fontSize: "2rem",
//     fontWeight: "700",
//     margin: "0 0 5px 0"
//   },
//   statLabel: {
//     fontSize: "0.9rem",
//     opacity: 0.9,
//     margin: 0
//   }
// };

// // Add hover effects
// Object.assign(styles.submitButton, {
//   ":hover": {
//     backgroundColor: "#1976d2",
//     transform: "translateY(-2px)",
//     boxShadow: "0 10px 25px rgba(33, 150, 243, 0.3)"
//   }
// });

// Object.assign(styles.registerButton, {
//   ":hover": {
//     backgroundColor: "#2196f3",
//     color: "white",
//     transform: "translateY(-2px)"
//   }
// });

// Object.assign(styles.emergencyButton, {
//   ":hover": {
//     backgroundColor: "#f57c00",
//     transform: "translateY(-1px)"
//   }
// });

// Object.assign(styles.forgotLink, {
//   ":hover": {
//     textDecoration: "underline"
//   }
// });

// Object.assign(styles.featureItem, {
//   ":hover": styles.featureItemHover
// });

// Object.assign(styles.footerLink, {
//   ":hover": {
//     color: "#2196f3"
//   }
// });
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function RecipientLogin() {
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
    const rememberedEmail = localStorage.getItem("rememberedRecipientEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data } = await axios.post("http://localhost:8000/api/recipients/login", { email, password });
      console.log("recipient login response:", data);

      // Save user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Remember email if checkbox is checked
      if (rememberMe) {
        localStorage.setItem("rememberedRecipientEmail", email);
      } else {
        localStorage.removeItem("rememberedRecipientEmail");
      }

      const name = data?.name || data?.user?.name || "Recipient";
      alert("Login Success! Welcome back, " + name);
      navigate("/recipient");
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || error.message || "Login failed";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmergencyAccess = () => {
    alert("Emergency access: Please call our 24/7 helpline at +1 (555) 911-BLOOD for immediate assistance.");
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
        {/* Login Form */}
        <div style={styles.loginCard} data-aos="fade-right" data-aos-delay="200">
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.logo}>
              <i className="fas fa-hands-helping" style={styles.logoIcon}></i>
              <span style={styles.logoText}>Life<span style={styles.logoAccent}>Link</span></span>
            </div>
            <h2 style={styles.title}>Recipient Login</h2>
            <p style={styles.subtitle}>Access your recipient dashboard</p>
          </div>

          {/* Emergency Alert */}
          <div style={styles.emergencyAlert} data-aos="zoom-in" data-aos-delay="400">
            <div style={styles.emergencyIcon}>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div style={styles.emergencyContent}>
              <h4 style={styles.emergencyTitle}>Urgent Blood Need?</h4>
              <p style={styles.emergencyText}>Emergency requests get priority response</p>
              <button onClick={handleEmergencyAccess} style={styles.emergencyButton}>
                <i className="fas fa-phone-alt"></i>
                Emergency Access
              </button>
            </div>
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
                  Accessing Dashboard...
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

            <Link to="/RecipientRegister" style={styles.registerButton}>
              <i className="fas fa-user-plus" style={styles.buttonIcon}></i>
              Create Recipient Account
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
              <span>Your medical data is protected and confidential</span>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div style={styles.sidePanel} data-aos="fade-left" data-aos-delay="400">
          <div style={styles.sideContent}>
            <div style={styles.heroSection}>
              <div style={styles.heroIcon}>
                <i className="fas fa-heartbeat" style={styles.heroMainIcon}></i>
              </div>
              <h2 style={styles.heroTitle}>Help When You Need It Most</h2>
              <p style={styles.heroText}>
                Your login connects you with life-saving donors in your area. We're here to support you.
              </p>
            </div>

            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <i className="fas fa-bolt" style={styles.featureIcon}></i>
                <div>
                  <h4>Quick Matching</h4>
                  <p>Instant connection with compatible donors</p>
                </div>
              </div>
              
              <div style={styles.featureItem}>
                <i className="fas fa-map-marker-alt" style={styles.featureIcon}></i>
                <div>
                  <h4>Local Donors</h4>
                  <p>Find donors in your immediate area</p>
                </div>
              </div>
              
              <div style={styles.featureItem}>
                <i className="fas fa-comments" style={styles.featureIcon}></i>
                <div>
                  <h4>Direct Communication</h4>
                  <p>Secure messaging with potential donors</p>
                </div>
              </div>
              
              <div style={styles.featureItem}>
                <i className="fas fa-hospital" style={styles.featureIcon}></i>
                <div>
                  <h4>Hospital Network</h4>
                  <p>Access to our partner medical facilities</p>
                </div>
              </div>
            </div>

            <div style={styles.supportSection}>
              <h4 style={styles.supportTitle}>
                <i className="fas fa-headset"></i>
                24/7 Support Available
              </h4>
              <div style={styles.supportContacts}>
                <div style={styles.supportItem}>
                  <strong>Emergency Helpline:</strong>
                  <span style={styles.supportNumber}>+1 (555) 911-BLOOD</span>
                </div>
                <div style={styles.supportItem}>
                  <strong>Medical Coordination:</strong>
                  <span style={styles.supportNumber}>+1 (555) 234-HOSP</span>
                </div>
              </div>
            </div>

            <div style={styles.stats}>
              <div style={styles.statItem}>
                <h3 style={styles.statNumber}>15 min</h3>
                <p style={styles.statLabel}>Avg. Response Time</p>
              </div>
              <div style={styles.statItem}>
                <h3 style={styles.statNumber}>98%</h3>
                <p style={styles.statLabel}>Request Success Rate</p>
              </div>
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
    background: "url('https://images.unsplash.com/photo-1584467735871-8db9ac8d55b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.05, // Reduced opacity for white background
    zIndex: 0
  },
  loginContainer: {
    display: "flex",
    maxWidth: "1200px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)", // Lighter shadow for white background
    overflow: "hidden",
    minHeight: "700px",
    position: "relative",
    zIndex: 1,
    border: "1px solid #f0f0f0" // Added border for definition
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
    marginBottom: "30px"
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
    color: "#2196f3"
  },
  logoText: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#2c3e50"
  },
  logoAccent: {
    color: "#2196f3"
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
  emergencyAlert: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    backgroundColor: "#fff3e0",
    border: "2px solid #ff9800",
    borderRadius: "12px",
    marginBottom: "30px"
  },
  emergencyIcon: {
    width: "50px",
    height: "50px",
    backgroundColor: "#ff9800",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.3rem",
    flexShrink: 0
  },
  emergencyContent: {
    flex: 1
  },
  emergencyTitle: {
    color: "#e65100",
    margin: "0 0 5px 0",
    fontSize: "1.1rem",
    fontWeight: "600"
  },
  emergencyText: {
    color: "#666",
    margin: "0 0 10px 0",
    fontSize: "0.9rem"
  },
  emergencyButton: {
    padding: "8px 16px",
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "all 0.3s ease"
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
    color: "#2196f3",
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
    borderColor: "#2196f3",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.1)"
  },
  forgotLink: {
    color: "#2196f3",
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
    accentColor: "#2196f3"
  },
  checkboxText: {
    userSelect: "none"
  },
  submitButton: {
    padding: "16px 20px",
    backgroundColor: "#2196f3",
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
    color: "#2196f3",
    border: "2px solid #2196f3",
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
  },
  sidePanel: {
    flex: "0 0 45%",
    background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
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
    marginBottom: "30px"
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
  supportSection: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px"
  },
  supportTitle: {
    fontSize: "1.1rem",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  supportContacts: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  supportItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.9rem"
  },
  supportNumber: {
    fontWeight: "600",
    color: "#ffeb3b"
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
  }
};

// Add hover effects
Object.assign(styles.submitButton, {
  ":hover": {
    backgroundColor: "#1976d2",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(33, 150, 243, 0.3)"
  }
});

Object.assign(styles.registerButton, {
  ":hover": {
    backgroundColor: "#2196f3",
    color: "white",
    transform: "translateY(-2px)"
  }
});

Object.assign(styles.emergencyButton, {
  ":hover": {
    backgroundColor: "#f57c00",
    transform: "translateY(-1px)"
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
    color: "#2196f3"
  }
});