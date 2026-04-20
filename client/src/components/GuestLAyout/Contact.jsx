import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Format message for WhatsApp
    const whatsappMessage = `
*New Contact Message from LifeLink*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

*Sent via LifeLink Contact Form*
    `.trim();

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp API URL (replace with your actual WhatsApp number)
    const whatsappNumber = '+918549076433'; // Replace with your number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message opened in WhatsApp! Please send it to complete your contact request.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visit Us',
      details: ['123 LifeLink Plaza', 'Healthcare District', 'City, State 12345'],
      link: '#'
    },
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      link: 'tel:+15551234567'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      details: ['info@lifelink.com', 'support@lifelink.com'],
      link: 'mailto:info@lifelink.com'
    },
    
  ];

  const emergencyContacts = [
    {
      title: 'Emergency Blood Request',
      number: '+1 (555) 911-BLOOD',
      description: '24/7 emergency blood requirement line'
    },
    {
      title: 'Hospital Coordination',
      number: '+1 (555) 234-HOSP',
      description: 'For hospital staff and blood banks'
    },
    {
      title: 'Donor Support',
      number: '+1 (555) 789-DONOR',
      description: 'Donor queries and support'
    }
  ];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Contact LifeLink</h1>
            <p>Get in touch with us for any queries, emergency blood requests, or partnership opportunities</p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="main-contact">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll contact you via WhatsApp immediately</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? 'error' : ''}
                    >
                      <option value="">Select a subject</option>
                      <option value="blood-request">Emergency Blood Request</option>
                      <option value="donor-registration">Donor Registration Help</option>
                      <option value="hospital-partnership">Hospital Partnership</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="feedback">Feedback & Suggestions</option>
                    </select>
                    {errors.subject && <span className="error-text">{errors.subject}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Please describe your inquiry in detail..."
                    rows="6"
                  ></textarea>
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Preparing WhatsApp...
                      </>
                    ) : (
                      <>
                        <i className="fab fa-whatsapp"></i>
                        Send via WhatsApp
                      </>
                    )}
                  </button>

                  <div className="whatsapp-note">
                    <i className="fab fa-whatsapp"></i>
                    <span>Your message will open in WhatsApp for immediate assistance</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="info-header">
                <h2>Get in Touch</h2>
                <p>Multiple ways to reach us for immediate assistance</p>
              </div>

              <div className="contact-info-cards">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-card">
                    <div className="info-icon">
                      <i className={info.icon}></i>
                    </div>
                    <div className="info-content">
                      <h3>{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                      {info.link !== '#' && (
                        <a href={info.link} className="info-link">
                          Contact via {info.title.split(' ')[0]}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

             {/* Emergency Contacts
               <div className="emergency-section">
                <h3>
                  <i className="fas fa-exclamation-triangle"></i>
                  Emergency Contacts
                </h3>
                <div className="emergency-cards">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="emergency-card">
                      <h4>{contact.title}</h4>
                      <a href={`tel:${contact.number.replace(/\D/g, '')}`} className="emergency-number">
                        {contact.number}
                      </a>
                      <p>{contact.description}</p>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-header">
            <h2>Find Us</h2>
            <p>Visit our headquarters or find our partner hospitals near you</p>
          </div>

          <div className="map-container">
            {/* Google Maps Embed */}
            <div className="map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7717935846545!2d77.59537107507782!3d13.050192887272443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae177eca7756c9%3A0x3507209562ab16f6!2sPresidency%20College!5e0!3m2!1sen!2sin!4v1760711947046!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '15px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LifeLink Headquarters Location"
              ></iframe>
            </div>

            {/* <div className="map-overlay">
              <div className="location-info">
                <h3>LifeLink Headquarters</h3>
                <p>
                  <i className="fas fa-map-marker-alt"></i>
                  123 LifeLink Plaza, Healthcare District, City, State 12345
                </p>
                <p>
                  <i className="fas fa-clock"></i>
                  Open 24/7 for Emergency Blood Requests
                </p>
                <div className="location-actions">
                  <a 
                    href="https://maps.google.com/?q=123+LifeLink+Plaza+Healthcare+District+City+State+12345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <i className="fas fa-directions"></i>
                    Get Directions
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Quick Action Section */}
      <section className="quick-actions">
        <div className="container">
          <div className="action-grid">
            <div className="action-card">
              <i className="fas fa-hand-holding-medical"></i>
              <h3>Become a Donor</h3>
              <p>Join our community of life-savers</p>
              <a href="/doonerregister" className="btn btn-primary">Register Now</a>
            </div>

            <div className="action-card">
              <i className="fas fa-hands-helping"></i>
              <h3>Request Blood</h3>
              <p>Need blood urgently? Request here</p>
              <a href="/RecipientRegister" className="btn btn-secondary">Make Request</a>
            </div>

            <div className="action-card">
              <i className="fas fa-hospital"></i>
              <h3>Hospital Login</h3>
              <p>Access hospital portal</p>
              <a href="/adminlogin" className="btn btn-outline">Admin Login</a>
            </div>
          </div>
        </div>
      </section>
      <style>{`/* Contact.css */
.contact-container {
  min-height: 100vh;
}

/* Hero Section */
.contact-hero {
  background: linear-gradient(rgba(44, 62, 80, 0.9), rgba(44, 62, 80, 0.95)), 
              url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0 60px;
  text-align: center;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-content p {
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Main Contact Section */
.main-contact {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: start;
}

/* Contact Form Styles */
.contact-form-section {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.form-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.form-header h2 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.form-header p {
  color: #666;
  font-size: 1.1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #fafafa;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #e53935;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.1);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #f44336;
  background-color: #fff5f5;
}

.error-text {
  color: #f44336;
  font-size: 0.85rem;
  margin-top: 0.3rem;
  font-weight: 500;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

/* Form Actions */
.form-actions {
  margin-top: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 15px 20px;
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-btn.submitting {
  background: linear-gradient(135deg, #666, #888);
}

.whatsapp-note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1rem;
  background: #e8f5e8;
  border-radius: 8px;
  color: #25D366;
  font-size: 0.9rem;
}

.whatsapp-note i {
  font-size: 1.2rem;
}

/* Contact Information */
.contact-info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-header {
  text-align: center;
}

.info-header h2 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.info-header p {
  color: #666;
}

.contact-info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #e53935, #c62828);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.info-content h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.info-content p {
  color: #666;
  margin-bottom: 0.3rem;
  font-size: 0.95rem;
}

.info-link {
  color: #e53935;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: inline-block;
}

.info-link:hover {
  text-decoration: underline;
}

/* Emergency Section */
.emergency-section {
  background: #fff3e0;
  padding: 2rem;
  border-radius: 15px;
  border-left: 5px solid #ff9800;
}

.emergency-section h3 {
  color: #e65100;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
}

.emergency-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.emergency-card {
  background: white;
  padding: 1.2rem;
  border-radius: 10px;
  border: 1px solid #ffe0b2;
}

.emergency-card h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.emergency-number {
  color: #e53935;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
}

.emergency-number:hover {
  text-decoration: underline;
}

.emergency-card p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

/* Map Section */
.map-section {
  padding: 80px 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-header p {
  color: #666;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.map-container {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.map-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 300px;
}

.location-info h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.location-info p {
  color: #666;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.location-actions {
  margin-top: 1.5rem;
}

/* Quick Actions */
.quick-actions {
  padding: 60px 0;
  background: linear-gradient(135deg, #2c3e50, #1a252f);
  color: white;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  text-align: center;
}

.action-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2.5rem 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.action-card:hover {
  transform: translateY(-10px);
}

.action-card i {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #e53935;
}

.action-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.action-card p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  font-size: 0.95rem;
}

.btn-primary {
  background: #e53935;
  color: white;
}

.btn-primary:hover {
  background: #c62828;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #25D366;
  color: white;
}

.btn-secondary:hover {
  background: #128C7E;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: white;
  border-color: white;
}

.btn-outline:hover {
  background: white;
  color: #2c3e50;
  transform: translateY(-2px);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Responsive Design */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .map-overlay {
    position: relative;
    top: 0;
    right: 0;
    max-width: 100%;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 80px 0 40px;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .contact-form-section {
    padding: 2rem;
  }

  .info-card {
    flex-direction: column;
    text-align: center;
  }

  .action-grid {
    grid-template-columns: 1fr;
  }

  .emergency-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .contact-form-section {
    padding: 1.5rem;
  }

  .info-card {
    padding: 1.2rem;
  }
}`}</style>
    </div>
  );
};

export default Contact;