import React from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Logo and Title */}
        <div style={styles.logoContainer}>
          <div style={styles.logo}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM20 36C11.16 36 4 28.84 4 20C4 11.16 11.16 4 20 4C28.84 4 36 11.16 36 20C36 28.84 28.84 36 20 36Z" fill="#4A90E2"/>
              <path d="M20 8C13.36 8 8 13.36 8 20C8 26.64 13.36 32 20 32C26.64 32 32 26.64 32 20C32 13.36 26.64 8 20 8ZM20 28C15.6 28 12 24.4 12 20C12 15.6 15.6 12 20 12C24.4 12 28 15.6 28 20C28 24.4 24.4 28 20 28Z" fill="#4A90E2"/>
              <path d="M20 16C17.8 16 16 17.8 16 20C16 22.2 17.8 24 20 24C22.2 24 24 22.2 24 20C24 17.8 22.2 16 20 16Z" fill="#4A90E2"/>
            </svg>
          </div>
          <h1 style={styles.title}>PGCET Portal</h1>
        </div>
        
        {/* Navigation Links */}
        <div style={styles.navLinks}>
          <Link to="/user" style={styles.navLink}>Profile</Link>
          <Link to="/user/changepassword" style={styles.navLink}>ChangePasssword</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
          <Link to="/faq" style={styles.navLink}>FAQ</Link>
          <Link to="/collegegallery" style={styles.navLink}>College Gallery</Link>
        </div>
        
        {/* Login Button */}
        <Link to="/login" style={styles.loginButton}>
          Login
          <span style={styles.loginButtonHover}></span>
        </Link>
      </div>
    </nav>
  );
};

// Internal CSS Styles
const styles = {
  navbar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '0.5rem 0',
    transition: 'all 0.3s ease',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#f5f7fa',
    transition: 'transform 0.3s ease',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2c3e50',
    margin: 0,
    background: 'linear-gradient(90deg, #4A90E2, #2c3e50)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'all 0.3s ease',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    color: '#2c3e50',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    position: 'relative',
    padding: '0.5rem 0',
    transition: 'color 0.3s ease',
  },
  navLinkHover: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '0%',
    height: '2px',
    backgroundColor: '#4A90E2',
    transition: 'width 0.3s ease',
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    color: '#ffffff',
    padding: '0.7rem 1.5rem',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(74, 144, 226, 0.2)',
  },
  loginButtonHover: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '0',
    height: '0',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transition: 'width 0.3s ease, height 0.3s ease',
  },
};

// Adding hover effects
const addHoverEffects = () => {
  // Navbar hover effect
  const navbar = document.querySelector('nav');
  if (navbar) {
    navbar.addEventListener('mouseenter', () => {
      navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    });
    navbar.addEventListener('mouseleave', () => {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
  }

  // Logo hover effect
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'rotate(15deg) scale(1.1)';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'rotate(0deg) scale(1)';
    });
  }

  // Title hover effect
  const title = document.querySelector('.title');
  if (title) {
    title.addEventListener('mouseenter', () => {
      title.style.background = 'linear-gradient(90deg, #2c3e50, #4A90E2)';
    });
    title.addEventListener('mouseleave', () => {
      title.style.background = 'linear-gradient(90deg, #4A90E2, #2c3e50)';
    });
  }

  // Nav link hover effects
  const navLinks = document.querySelectorAll('.navLink');
  navLinks.forEach(link => {
    const hoverElement = document.createElement('div');
    hoverElement.style.cssText = styles.navLinkHover;
    link.appendChild(hoverElement);

    link.addEventListener('mouseenter', () => {
      link.style.color = '#4A90E2';
      hoverElement.style.width = '100%';
    });
    link.addEventListener('mouseleave', () => {
      link.style.color = '#2c3e50';
      hoverElement.style.width = '0%';
    });
  });

  // Login button hover effect
  const loginButton = document.querySelector('.loginButton');
  if (loginButton) {
    const hoverElement = loginButton.querySelector('.loginButtonHover');
    loginButton.addEventListener('mouseenter', () => {
      loginButton.style.backgroundColor = '#3a7bc8';
      hoverElement.style.width = '200%';
      hoverElement.style.height = '200%';
    });
    loginButton.addEventListener('mouseleave', () => {
      loginButton.style.backgroundColor = '#4A90E2';
      hoverElement.style.width = '0';
      hoverElement.style.height = '0';
    });
  }
};

// Call the hover effects after component mounts
document.addEventListener('DOMContentLoaded', addHoverEffects);

export default UserNavbar;