import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  const services = [
    {
      icon: 'fas fa-hand-holding-medical',
      title: 'Blood Donation',
      description: 'Connect with verified donors and schedule blood donations safely and efficiently.',
      features: ['Verified Donors', 'Safe Process', 'Quick Matching', '24/7 Support']
    },
    {
      icon: 'fas fa-bell',
      title: 'Emergency Alerts',
      description: 'Instant notifications for urgent blood requirements in your area.',
      features: ['Real-time Alerts', 'Location-based', 'Priority Handling', 'Quick Response']
    },
    {
      icon: 'fas fa-hospital',
      title: 'Hospital Partnerships',
      description: 'Direct coordination with hospitals and blood banks for seamless operations.',
      features: ['Verified Hospitals', 'Direct Coordination', 'Stock Management', 'Quality Control']
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Blood Bank Management',
      description: 'Comprehensive system for managing blood inventory and distribution.',
      features: ['Inventory Tracking', 'Demand Analysis', 'Supply Chain', 'Reporting Tools']
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile App Access',
      description: 'Full functionality available through our mobile application.',
      features: ['Easy Registration', 'Push Notifications', 'Location Services', 'Chat Support']
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Donor Verification',
      description: 'Rigorous verification process to ensure donor safety and reliability.',
      features: ['Medical Screening', 'Background Check', 'Health Records', 'Regular Updates']
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Register',
      description: 'Create your account as a donor, recipient, or hospital staff',
      icon: 'fas fa-user-plus',
      role: 'All Users'
    },
    {
      step: 2,
      title: 'Set Profile',
      description: 'Complete your profile with necessary details and preferences',
      icon: 'fas fa-id-card',
      role: 'All Users'
    },
    {
      step: 3,
      title: 'Make Request',
      description: 'Recipients create blood requests with specific requirements',
      icon: 'fas fa-bell',
      role: 'Recipient'
    },
    {
      step: 4,
      title: 'Find Match',
      description: 'System automatically finds matching donors based on criteria',
      icon: 'fas fa-search',
      role: 'System'
    },
    {
      step: 5,
      title: 'Get Notified',
      description: 'Matching donors receive instant notifications about the request',
      icon: 'fas fa-comment-alt',
      role: 'Donor'
    },
    {
      step: 6,
      title: 'Coordinate',
      description: 'Donors and recipients coordinate through secure messaging',
      icon: 'fas fa-comments',
      role: 'Both Parties'
    },
    {
      step: 7,
      title: 'Donate',
      description: 'Successful blood donation at verified centers',
      icon: 'fas fa-heart',
      role: 'Donor'
    },
    {
      step: 8,
      title: 'Verify & Update',
      description: 'Admin verifies completion and updates system records',
      icon: 'fas fa-check-circle',
      role: 'Admin'
    }
  ];

  return (
    <div className="services-container">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <div className="hero-content" data-aos="fade-up">
            <h1>Our Services</h1>
            <p>Comprehensive blood donation solutions connecting donors, recipients, and healthcare providers</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>What We Offer</h2>
            <p>LifeLink provides end-to-end solutions for blood donation management</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="service-actions">
                  <Link to="/contact" className="btn btn-outline">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>How LifeLink Works</h2>
            <p>Simple, efficient process that saves lives through technology</p>
          </div>

          <div className="process-timeline">
            {howItWorks.map((step, index) => (
              <div 
                key={index} 
                className={`process-step ${index % 2 === 0 ? 'left' : 'right'}`}
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={index * 150}
              >
                <div className="step-content">
                  <div className="step-number">{step.step}</div>
                  <div className="step-icon">
                    <i className={step.icon}></i>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="step-role">
                    <span className="role-badge">{step.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Breakdown */}
      <section className="features-breakdown">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>Key Features</h2>
            <p>Advanced capabilities that make LifeLink the preferred choice</p>
          </div>

          <div className="features-grid">
            <div className="feature-item" data-aos="zoom-in" data-aos-delay="100">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Quick Matching</h3>
              <p>Advanced algorithm matches blood requests with suitable donors in seconds</p>
            </div>

            <div className="feature-item" data-aos="zoom-in" data-aos-delay="200">
              <div className="feature-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Location Services</h3>
              <p>Find donors and blood banks near you with precise location tracking</p>
            </div>

            <div className="feature-item" data-aos="zoom-in" data-aos-delay="300">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure Platform</h3>
              <p>End-to-end encryption and privacy protection for all user data</p>
            </div>

            <div className="feature-item" data-aos="zoom-in" data-aos-delay="400">
              <div className="feature-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3>Real-time Analytics</h3>
              <p>Monitor blood supply, demand patterns, and donation trends</p>
            </div>

            <div className="feature-item" data-aos="zoom-in" data-aos-delay="500">
              <div className="feature-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>Secure Messaging</h3>
              <p>Built-in communication system for donors and recipients</p>
            </div>

            <div className="feature-item" data-aos="zoom-in" data-aos-delay="600">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Mobile First</h3>
              <p>Fully responsive design works perfectly on all devices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item" data-aos="fade-up" data-aos-delay="100">
              <i className="fas fa-users"></i>
              <h3>25,000+</h3>
              <p>Active Donors</p>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-hand-holding-heart"></i>
              <h3>50,000+</h3>
              <p>Lives Saved</p>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="300">
              <i className="fas fa-hospital"></i>
              <h3>500+</h3>
              <p>Partner Hospitals</p>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="400">
              <i className="fas fa-clock"></i>
              <h3>15 min</h3>
              <p>Average Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content" data-aos="fade-up">
            <h2>Ready to Get Started?</h2>
            <p>Join our community and be part of the life-saving mission</p>
            <div className="cta-buttons">
              <Link to="/doonerregister" className="btn btn-primary">
                <i className="fas fa-hand-holding-medical"></i>
                Become a Donor
              </Link>
              <Link to="/RecipientRegister" className="btn btn-secondary">
                <i className="fas fa-hands-helping"></i>
                Request Blood
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <i className="fas fa-question-circle"></i>
                Get Help
              </Link>
            </div>
          </div>
        </div>

      </section>
      <style>{`/* Services.css */
.services-container {
  min-height: 100vh;
}

/* Hero Section */
.services-hero {
  background: linear-gradient(rgba(44, 62, 80, 0.9), rgba(44, 62, 80, 0.95)), 
              url('https://images.unsplash.com/photo-1579154204601-015d927e3fd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 120px 0 80px;
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

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-header p {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

/* Services Grid */
.services-section {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(135deg, #e53935, #c62828);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #e53935, #c62828);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
}

.service-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.service-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  text-align: left;
}

.service-features li {
  padding: 0.5rem 0;
  color: #555;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.service-features li i {
  color: #4caf50;
  font-size: 0.9rem;
}

.service-actions {
  margin-top: 2rem;
}

/* How It Works Section */
.how-it-works-section {
  padding: 80px 0;
  background: white;
  position: relative;
}

.process-timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.process-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background: linear-gradient(to bottom, #e53935, #c62828);
  transform: translateX(-50%);
}

.process-step {
  position: relative;
  margin-bottom: 4rem;
  width: 100%;
}

.step-content {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid #f0f0f0;
  position: relative;
  width: 45%;
  transition: all 0.3s ease;
}

.step-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  border-color: #e53935;
}

.process-step.left .step-content {
  margin-right: auto;
}

.process-step.right .step-content {
  margin-left: auto;
}

.step-number {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #e53935, #c62828);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(229, 57, 53, 0.4);
}

.step-icon {
  width: 60px;
  height: 60px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #e53935;
  font-size: 1.5rem;
  border: 2px solid #e53935;
}

.step-content h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
}

.step-content p {
  color: #666;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.step-role {
  text-align: center;
}

.role-badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Features Breakdown */
.features-breakdown {
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.features-breakdown .section-header h2 {
  color: white;
}

.features-breakdown .section-header p {
  color: rgba(255, 255, 255, 0.9);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2.5rem 2rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
}

.feature-icon {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.8rem;
}

.feature-item h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.feature-item p {
  opacity: 0.9;
  line-height: 1.6;
}

/* Stats Section */
.stats-section {
  padding: 60px 0;
  background: #f8f9fa;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item i {
  font-size: 3rem;
  color: #e53935;
  margin-bottom: 1rem;
}

.stat-item h3 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.stat-item p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

/* CTA Section */
.services-cta {
  padding: 80px 0;
  background: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  font-size: 1rem;
}

.btn-primary {
  background: #e53935;
  color: white;
}

.btn-primary:hover {
  background: #c62828;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(229, 57, 53, 0.3);
}

.btn-secondary {
  background: #2c3e50;
  color: white;
}

.btn-secondary:hover {
  background: #1a252f;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(44, 62, 80, 0.3);
}

.btn-outline {
  background: transparent;
  color: #e53935;
  border-color: #e53935;
}

.btn-outline:hover {
  background: #e53935;
  color: white;
  transform: translateY(-2px);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .process-timeline::before {
    left: 30px;
  }

  .process-step {
    padding-left: 60px;
  }

  .step-content {
    width: 100%;
    margin: 0 !important;
  }

  .step-number {
    left: 0;
    transform: translateX(-50%);
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .section-header h2 {
    font-size: 2.2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 250px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .service-card {
    padding: 2rem 1.5rem;
  }

  .feature-item {
    padding: 2rem 1.5rem;
  }
}

/* AOS Custom Animations */
[data-aos] {
  pointer-events: none;
}

[data-aos].aos-animate {
  pointer-events: auto;
}`}</style>
    </div>
  );
};

export default Services;