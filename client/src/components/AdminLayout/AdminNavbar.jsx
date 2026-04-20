
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUsers, FaHandHoldingHeart, FaUser, FaSignInAlt, FaBars, FaChevronDown } from 'react-icons/fa';

const AdminNavbar = () => {
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

export default AdminNavbar;