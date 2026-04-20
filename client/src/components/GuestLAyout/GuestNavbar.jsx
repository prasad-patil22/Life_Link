// import React from 'react';
// import { Link } from 'react-router-dom';

// const GuestNavbar = () => {
//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.navContainer}>
//         {/* Logo and Title */}
//         <div style={styles.logoContainer}>
//           <div style={styles.logo}>
//             <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM20 36C11.16 36 4 28.84 4 20C4 11.16 11.16 4 20 4C28.84 4 36 11.16 36 20C36 28.84 28.84 36 20 36Z" fill="#4A90E2"/>
//               <path d="M20 8C13.36 8 8 13.36 8 20C8 26.64 13.36 32 20 32C26.64 32 32 26.64 32 20C32 13.36 26.64 8 20 8ZM20 28C15.6 28 12 24.4 12 20C12 15.6 15.6 12 20 12C24.4 12 28 15.6 28 20C28 24.4 24.4 28 20 28Z" fill="#4A90E2"/>
//               <path d="M20 16C17.8 16 16 17.8 16 20C16 22.2 17.8 24 20 24C22.2 24 24 22.2 24 20C24 17.8 22.2 16 20 16Z" fill="#4A90E2"/>
//             </svg>
//           </div>
//           <h1 style={styles.title}>PGCET Portal</h1>
//         </div>
        
//         {/* Navigation Links */}
//         <div style={styles.navLinks}>
//           <Link to="/" style={styles.navLink}>Home</Link>
//           <Link to="/adminlogin" style={styles.navLink}>admin Login</Link>
//           <Link to="/doonerlogin" style={styles.navLink}>DonorLogin</Link>
//           <Link to="/doonerregister" style={styles.navLink}>DonorRegister</Link>
//           <Link to="/RecipientRegister" style={styles.navLink}>RecipientRegister</Link>
//         </div>
        
//         {/* Login Button */}
//         <Link to="/RecipientLogin" style={styles.loginButton}>
//           RecipientLogin
//           <span style={styles.loginButtonHover}></span>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// // Internal CSS Styles
// const styles = {
//   navbar: {
//     backgroundColor: '#ffffff',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1000,
//     padding: '0.5rem 0',
//     transition: 'all 0.3s ease',
//   },
//   navContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '0 2rem',
//   },
//   logoContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1rem',
//   },
//   logo: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '50px',
//     height: '50px',
//     borderRadius: '50%',
//     backgroundColor: '#f5f7fa',
//     transition: 'transform 0.3s ease',
//   },
//   title: {
//     fontSize: '1.5rem',
//     fontWeight: '700',
//     color: '#2c3e50',
//     margin: 0,
//     background: 'linear-gradient(90deg, #4A90E2, #2c3e50)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     transition: 'all 0.3s ease',
//   },
//   navLinks: {
//     display: 'flex',
//     gap: '2rem',
//     alignItems: 'center',
//   },
//   navLink: {
//     color: '#2c3e50',
//     textDecoration: 'none',
//     fontWeight: '600',
//     fontSize: '1rem',
//     position: 'relative',
//     padding: '0.5rem 0',
//     transition: 'color 0.3s ease',
//   },
//   navLinkHover: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     width: '0%',
//     height: '2px',
//     backgroundColor: '#4A90E2',
//     transition: 'width 0.3s ease',
//   },
//   loginButton: {
//     backgroundColor: '#4A90E2',
//     color: '#ffffff',
//     padding: '0.7rem 1.5rem',
//     borderRadius: '25px',
//     textDecoration: 'none',
//     fontWeight: '600',
//     fontSize: '1rem',
//     position: 'relative',
//     overflow: 'hidden',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 6px rgba(74, 144, 226, 0.2)',
//   },
//   loginButtonHover: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '0',
//     height: '0',
//     borderRadius: '50%',
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     transition: 'width 0.3s ease, height 0.3s ease',
//   },
// };

// // Adding hover effects
// const addHoverEffects = () => {
//   // Navbar hover effect
//   const navbar = document.querySelector('nav');
//   if (navbar) {
//     navbar.addEventListener('mouseenter', () => {
//       navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
//     });
//     navbar.addEventListener('mouseleave', () => {
//       navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
//     });
//   }

//   // Logo hover effect
//   const logo = document.querySelector('.logo');
//   if (logo) {
//     logo.addEventListener('mouseenter', () => {
//       logo.style.transform = 'rotate(15deg) scale(1.1)';
//     });
//     logo.addEventListener('mouseleave', () => {
//       logo.style.transform = 'rotate(0deg) scale(1)';
//     });
//   }

//   // Title hover effect
//   const title = document.querySelector('.title');
//   if (title) {
//     title.addEventListener('mouseenter', () => {
//       title.style.background = 'linear-gradient(90deg, #2c3e50, #4A90E2)';
//     });
//     title.addEventListener('mouseleave', () => {
//       title.style.background = 'linear-gradient(90deg, #4A90E2, #2c3e50)';
//     });
//   }

//   // Nav link hover effects
//   const navLinks = document.querySelectorAll('.navLink');
//   navLinks.forEach(link => {
//     const hoverElement = document.createElement('div');
//     hoverElement.style.cssText = styles.navLinkHover;
//     link.appendChild(hoverElement);

//     link.addEventListener('mouseenter', () => {
//       link.style.color = '#4A90E2';
//       hoverElement.style.width = '100%';
//     });
//     link.addEventListener('mouseleave', () => {
//       link.style.color = '#2c3e50';
//       hoverElement.style.width = '0%';
//     });
//   });

//   // Login button hover effect
//   const loginButton = document.querySelector('.loginButton');
//   if (loginButton) {
//     const hoverElement = loginButton.querySelector('.loginButtonHover');
//     loginButton.addEventListener('mouseenter', () => {
//       loginButton.style.backgroundColor = '#3a7bc8';
//       hoverElement.style.width = '200%';
//       hoverElement.style.height = '200%';
//     });
//     loginButton.addEventListener('mouseleave', () => {
//       loginButton.style.backgroundColor = '#4A90E2';
//       hoverElement.style.width = '0';
//       hoverElement.style.height = '0';
//     });
//   }
// };

// // Call the hover effects after component mounts
// document.addEventListener('DOMContentLoaded', addHoverEffects);

// export default GuestNavbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GuestNavbar = () => {
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [registerDropdown, setRegisterDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const [mobileRegisterOpen, setMobileRegisterOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <div className="logo-text">Life<span>Link</span></div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link active">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              <i className="fas fa-info-circle"></i> About
            </Link>
          </li>
          <li>
            <Link to="/services" className="nav-link">
              <i className="fas fa-hand-holding-heart"></i> Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              <i className="fas fa-address-book"></i> Contact
            </Link>
          </li>
          
          {/* Login Dropdown */}
          <li 
            className="dropdown"
            onMouseEnter={() => setLoginDropdown(true)}
            onMouseLeave={() => setLoginDropdown(false)}
          >
            <span className="nav-link dropdown-toggle">
              <i className="fas fa-sign-in-alt"></i> Login <i className="fas fa-chevron-down"></i>
            </span>
            {loginDropdown && (
              <div className="dropdown-menu">
                <Link 
                  to="/adminlogin" 
                  className="dropdown-item"
                  onClick={() => setLoginDropdown(false)}
                >
                  <i className="fas fa-user-shield"></i> Admin Login
                </Link>
                <Link 
                  to="/recipientlogin" 
                  className="dropdown-item"
                  onClick={() => setLoginDropdown(false)}
                >
                  <i className="fas fa-user-shield"></i> Recipter Login
                </Link>
                <Link 
                  to="/doonerlogin" 
                  className="dropdown-item"
                  onClick={() => setLoginDropdown(false)}
                >
                  <i className="fas fa-user"></i> Donor Login
                </Link>
              </div>
            )}
          </li>
          
          {/* Register Dropdown */}
          <li 
            className="dropdown"
            onMouseEnter={() => setRegisterDropdown(true)}
            onMouseLeave={() => setRegisterDropdown(false)}
          >
            <span className="nav-link dropdown-toggle">
              <i className="fas fa-user-plus"></i> Register <i className="fas fa-chevron-down"></i>
            </span>
            {registerDropdown && (
              <div className="dropdown-menu">
                <Link 
                  to="/doonerregister" 
                  className="dropdown-item"
                  onClick={() => setRegisterDropdown(false)}
                >
                  <i className="fas fa-hand-holding-medical"></i> Donor Register
                </Link>
                <Link 
                  to="/RecipientRegister" 
                  className="dropdown-item"
                  onClick={() => setRegisterDropdown(false)}
                >
                  <i className="fas fa-hands-helping"></i> Recipient Register
                </Link>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="mobile-toggle" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${mobileMenu ? 'active' : ''}`}>
        <ul className="mobile-links">
          <li>
            <Link 
              to="/" 
              className="mobile-nav-link"
              onClick={() => setMobileMenu(false)}
            >
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className="mobile-nav-link"
              onClick={() => setMobileMenu(false)}
            >
              <i className="fas fa-info-circle"></i> About
            </Link>
          </li>
          <li>
            <Link 
              to="/services" 
              className="mobile-nav-link"
              onClick={() => setMobileMenu(false)}
            >
              <i className="fas fa-hand-holding-heart"></i> Services
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="mobile-nav-link"
              onClick={() => setMobileMenu(false)}
            >
              <i className="fas fa-address-book"></i> Contact
            </Link>
          </li>
          
          {/* Mobile Login Dropdown */}
          <li className={`mobile-dropdown ${mobileLoginOpen ? 'active' : ''}`}>
            <div 
              className="mobile-nav-link dropdown-header"
              onClick={() => setMobileLoginOpen(!mobileLoginOpen)}
            >
              <i className="fas fa-sign-in-alt"></i> Login <i className="fas fa-chevron-down"></i>
            </div>
            <div className="submenu">
              <Link 
                to="/adminlogin" 
                className="mobile-nav-link submenu-item"
                onClick={() => setMobileMenu(false)}
              >
                <i className="fas fa-user-shield"></i> Admin Login
              </Link>
              <Link 
                to="/doonerlogin" 
                className="mobile-nav-link submenu-item"
                onClick={() => setMobileMenu(false)}
              >
                <i className="fas fa-user"></i> Donor Login
              </Link>
            </div>
          </li>
          
          {/* Mobile Register Dropdown */}
          <li className={`mobile-dropdown ${mobileRegisterOpen ? 'active' : ''}`}>
            <div 
              className="mobile-nav-link dropdown-header"
              onClick={() => setMobileRegisterOpen(!mobileRegisterOpen)}
            >
              <i className="fas fa-user-plus"></i> Register <i className="fas fa-chevron-down"></i>
            </div>
            <div className="submenu">
              <Link 
                to="/doonerregister" 
                className="mobile-nav-link submenu-item"
                onClick={() => setMobileMenu(false)}
              >
                <i className="fas fa-hand-holding-medical"></i> Donor Register
              </Link>
              <Link 
                to="/RecipientRegister" 
                className="mobile-nav-link submenu-item"
                onClick={() => setMobileMenu(false)}
              >
                <i className="fas fa-hands-helping"></i> Recipient Register
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <style>
        {`
          /* GuestNavbar.css */
:root {
  --primary: #e53935;
  --primary-dark: #c62828;
  --secondary: #2c3e50;
  --light: #f5f5f5;
  --dark: #333;
  --gray: #757575;
}

.navbar {
  background-color: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-icon {
  color: var(--primary);
  font-size: 28px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: var(--secondary);
}

.logo-text span {
  color: var(--primary);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--secondary);
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.nav-link:hover {
  background-color: rgba(229, 57, 53, 0.1);
  color: var(--primary);
}

.nav-link.active {
  background-color: var(--primary);
  color: white;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 200px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0.5rem 0;
  z-index: 1001;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  color: var(--secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background-color: rgba(229, 57, 53, 0.1);
  color: var(--primary);
}

.dropdown-item i {
  width: 20px;
  text-align: center;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: var(--secondary);
  cursor: pointer;
  padding: 10px;
}

.mobile-menu {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
}

.mobile-menu.active {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  color: var(--secondary);
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.mobile-nav-link:hover {
  background-color: rgba(229, 57, 53, 0.1);
  color: var(--primary);
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-dropdown .submenu {
  padding-left: 20px;
  margin-top: 5px;
  display: none;
}

.mobile-dropdown.active .submenu {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.submenu-item {
  font-size: 0.9rem;
  padding: 10px 15px;
}

/* Responsive Design */
@media (max-width: 992px) {
  .nav-links {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
  }

  .logo-text {
    font-size: 20px;
  }

  .logo-icon {
    font-size: 24px;
  }
}
        `}
      </style>
    </nav>
  );
};

export default GuestNavbar;