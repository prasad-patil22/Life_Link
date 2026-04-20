// import React from 'react';
// import { Link } from 'react-router-dom';

// const DonorNavbar = () => {
//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.navContainer}>
//         {/* Logo and Title */}
//         <div style={styles.logoContainer}>
//           <div style={styles.logo}>
//             <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM20 36C11.16 36 4 28.84 4 20C4 11.16 11.16 4 20 4C28.84 4 36 11.16 36 20C36 28.84 28.84 36 20 36Z" fill="#4A90E2" />
//               <path d="M20 8C13.36 8 8 13.36 8 20C8 26.64 13.36 32 20 32C26.64 32 32 26.64 32 20C32 13.36 26.64 8 20 8ZM20 28C15.6 28 12 24.4 12 20C12 15.6 15.6 12 20 12C24.4 12 28 15.6 28 20C28 24.4 24.4 28 20 28Z" fill="#4A90E2" />
//               <path d="M20 16C17.8 16 16 17.8 16 20C16 22.2 17.8 24 20 24C22.2 24 24 22.2 24 20C24 17.8 22.2 16 20 16Z" fill="#4A90E2" />
//             </svg>
//           </div>
//           <h1 style={styles.title}>Donor side</h1>
//         </div>

//         {/* Navigation Links */}
//         <div style={styles.navLinks}>
//           {/* <Link to="/donor" style={styles.navLink}>Profile</Link>
//           <Link to="/donor/changepassword" style={styles.navLink}>ChangePasssword</Link> */}
//           <Link to="/donor/allrecipient" style={styles.navLink}>AllRecipients</Link>
//           <Link to="/donor/allreq" style={styles.navLink}>request</Link>
//           <Link to="/donor/profile" style={styles.navLink}>Profile</Link>
//         </div>

//         {/* Login Button */}
//         <Link to="/" style={styles.loginButton}>
//           Login
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

// export default DonorNavbar;

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUsers, FaHandHoldingHeart, FaUser, FaSignInAlt, FaBars, FaChevronDown } from 'react-icons/fa';

const DonorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleNavClick = (path) => {
    setActiveLink(path);
    setMobileMenu(false);
  };

  const styles = {
    navbar: {
      backgroundColor: 'white',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '80px',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
    },
    logoImage: {
      width: '45px',
      height: '45px',
      borderRadius: '10px',
      objectFit: 'cover',
      border: '2px solid #e53935',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2c3e50',
      margin: 0,
    },
    logoTextSpan: {
      color: '#e53935',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: '#2c3e50',
      textDecoration: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
    },
    navLinkHover: {
      backgroundColor: 'rgba(229, 57, 53, 0.1)',
      color: '#e53935',
    },
    navLinkActive: {
      backgroundColor: '#e53935',
      color: 'white',
    },
    loginButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#e53935',
      color: 'white',
      textDecoration: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      border: 'none',
    },
    loginButtonHover: {
      backgroundColor: '#c62828',
      transform: 'translateY(-1px)',
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#e53935',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
    },
    logoutButtonHover: {
      backgroundColor: '#c62828',
      transform: 'translateY(-1px)',
    },
    mobileToggle: {
      display: 'none',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: '#2c3e50',
      cursor: 'pointer',
      padding: '10px',
    },
    mobileMenu: {
      position: 'fixed',
      top: '80px',
      left: 0,
      width: '100%',
      backgroundColor: 'white',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      transform: 'translateY(-100%)',
      opacity: 0,
      visibility: 'hidden',
      transition: 'all 0.3s ease',
      zIndex: 999,
    },
    mobileMenuActive: {
      transform: 'translateY(0)',
      opacity: 1,
      visibility: 'visible',
    },
    mobileLinks: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    mobileNavLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 15px',
      color: '#2c3e50',
      textDecoration: 'none',
      borderRadius: '5px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    mobileNavLinkHover: {
      backgroundColor: 'rgba(229, 57, 53, 0.1)',
      color: '#e53935',
    },
    mobileDropdown: {
      width: '100%',
    },
    dropdownHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    submenu: {
      paddingLeft: '20px',
      marginTop: '5px',
      display: 'none',
      flexDirection: 'column',
      gap: '5px',
    },
    submenuActive: {
      display: 'flex',
    },
    submenuItem: {
      fontSize: '0.9rem',
      padding: '10px 15px',
    },
    icon: {
      fontSize: '16px',
    },
  };

  // Logo image from Google
  const logoImage = "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80";

  // Check if user is logged in (you can replace this with your actual auth logic)
  const isLoggedIn = localStorage.getItem('token');

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <Link to="/donor" style={styles.logo}>
            <img 
              src={logoImage} 
              alt="LifeLink Logo" 
              style={styles.logoImage}
            />
            <div style={styles.logoText}>
              Life<span style={styles.logoTextSpan}>Link</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul style={styles.navLinks}>
          <li>
            <Link 
              to="/donor/allrecipient" 
              style={{
                ...styles.navLink,
                ...(activeLink === '/donor/allrecipient' ? styles.navLinkActive : {})
              }}
              onClick={() => handleNavClick('/donor/allrecipient')}
              onMouseEnter={(e) => {
                if (activeLink !== '/donor/allrecipient') {
                  Object.assign(e.target.style, styles.navLinkHover);
                }
              }}
              onMouseLeave={(e) => {
                if (activeLink !== '/donor/allrecipient') {
                  Object.assign(e.target.style, styles.navLink);
                }
              }}
            >
              <FaUsers style={styles.icon} />
              All Recipients
            </Link>
          </li>
          
          <li>
            <Link 
              to="/donor/allreq" 
              style={{
                ...styles.navLink,
                ...(activeLink === '/donor/allreq' ? styles.navLinkActive : {})
              }}
              onClick={() => handleNavClick('/donor/allreq')}
              onMouseEnter={(e) => {
                if (activeLink !== '/donor/allreq') {
                  Object.assign(e.target.style, styles.navLinkHover);
                }
              }}
              onMouseLeave={(e) => {
                if (activeLink !== '/donor/allreq') {
                  Object.assign(e.target.style, styles.navLink);
                }
              }}
            >
              <FaHandHoldingHeart style={styles.icon} />
              Requests
            </Link>
          </li>
          
          <li>
            <Link 
              to="/donor/profile" 
              style={{
                ...styles.navLink,
                ...(activeLink === '/donor/profile' ? styles.navLinkActive : {})
              }}
              onClick={() => handleNavClick('/donor/profile')}
              onMouseEnter={(e) => {
                if (activeLink !== '/donor/profile') {
                  Object.assign(e.target.style, styles.navLinkHover);
                }
              }}
              onMouseLeave={(e) => {
                if (activeLink !== '/donor/profile') {
                  Object.assign(e.target.style, styles.navLink);
                }
              }}
            >
              <FaUser style={styles.icon} />
              Profile
            </Link>
          </li>

          {/* Login/Logout Button */}
          <li>
            {isLoggedIn ? (
              <button 
                style={styles.logoutButton}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.logoutButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, styles.logoutButton);
                }}
              >
                <FaSignInAlt style={styles.icon} />
                Logout
              </button>
            ) : (
              <Link 
                to="/"
                style={styles.loginButton}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.loginButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, styles.loginButton);
                }}
              >
                <FaSignInAlt style={styles.icon} />
                LogOut
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          style={styles.mobileToggle}
          onClick={toggleMobileMenu}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div style={{
        ...styles.mobileMenu,
        ...(mobileMenu ? styles.mobileMenuActive : {})
      }}>
        <ul style={styles.mobileLinks}>
          <li>
            <Link 
              to="/donor/allrecipient" 
              style={styles.mobileNavLink}
              onClick={() => handleNavClick('/donor/allrecipient')}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.mobileNavLinkHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, styles.mobileNavLink);
              }}
            >
              <FaUsers style={styles.icon} />
              All Recipients
            </Link>
          </li>
          
          <li>
            <Link 
              to="/donor/allreq" 
              style={styles.mobileNavLink}
              onClick={() => handleNavClick('/donor/allreq')}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.mobileNavLinkHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, styles.mobileNavLink);
              }}
            >
              <FaHandHoldingHeart style={styles.icon} />
              Requests
            </Link>
          </li>
          
          {/* Mobile Profile Dropdown */}
          <li style={styles.mobileDropdown}>
            <div 
              style={{
                ...styles.mobileNavLink,
                ...styles.dropdownHeader
              }}
              onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.mobileNavLinkHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, styles.mobileNavLink);
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaUser style={styles.icon} />
                Profile
              </div>
              <FaChevronDown style={{ fontSize: '12px' }} />
            </div>
            <div style={{
              ...styles.submenu,
              ...(mobileProfileOpen ? styles.submenuActive : {})
            }}>
              <Link 
                to="/donor/profile" 
                style={{
                  ...styles.mobileNavLink,
                  ...styles.submenuItem
                }}
                onClick={() => handleNavClick('/donor/profile')}
              >
                View Profile
              </Link>
              <Link 
                to="/donor/edit-profile" 
                style={{
                  ...styles.mobileNavLink,
                  ...styles.submenuItem
                }}
                onClick={() => handleNavClick('/donor/edit-profile')}
              >
                Edit Profile
              </Link>
            </div>
          </li>

          {/* Mobile Login/Logout Button */}
          <li>
            {isLoggedIn ? (
              <button 
                style={{
                  ...styles.logoutButton,
                  width: '100%',
                  justifyContent: 'center'
                }}
                onClick={handleLogout}
              >
                <FaSignInAlt style={styles.icon} />
                Logout
              </button>
            ) : (
              <Link 
                to="/"
                style={{
                  ...styles.loginButton,
                  width: '100%',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
                onClick={() => setMobileMenu(false)}
              >
                <FaSignInAlt style={styles.icon} />
                LogOut
              </Link>
            )}
          </li>
        </ul>
      </div>

      <style>
        {`
          @media (max-width: 992px) {
            .nav-links {
              display: none !important;
            }

            .mobile-toggle {
              display: block !important;
            }
          }

          @media (max-width: 768px) {
            .nav-container {
              padding: 0 15px !important;
            }

            .logo-text {
              font-size: 20px !important;
            }

            .logo-image {
              width: 40px !important;
              height: 40px !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default DonorNavbar;