// import React from 'react';

// const About = () => {
//     return (
//         <div className="about-container">
//             {/* Hero Section */}
//             <section className="about-hero">
//                 <div className="container">
//                     <div className="hero-content">
//                         <h1>About LifeLink</h1>
//                         <p>Connecting blood donors with those in need, saving lives one donation at a time</p>
//                     </div>
//                 </div>
//             </section>

//             {/* Mission Section */}
//             <section className="mission-section">
//                 <div className="container">
//                     <div className="mission-grid">
//                         <div className="mission-content">
//                             <h2>Our Mission</h2>
//                             <p>
//                                 LifeLink is dedicated to creating a reliable and efficient platform that connects
//                                 voluntary blood donors with patients in need. We believe that no one should suffer
//                                 or lose their life due to unavailability of blood.
//                             </p>
//                             <p>
//                                 Our mission is to bridge the gap between blood donors and recipients through
//                                 technology, making the process of blood donation and request seamless, transparent,
//                                 and accessible to everyone.
//                             </p>
//                             <div className="mission-stats">
//                                 <div className="stat">
//                                     <h3>50,000+</h3>
//                                     <p>Lives Saved</p>
//                                 </div>
//                                 <div className="stat">
//                                     <h3>25,000+</h3>
//                                     <p>Active Donors</p>
//                                 </div>
//                                 <div className="stat">
//                                     <h3>500+</h3>
//                                     <p>Partner Hospitals</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mission-image">
//                             <img
//                                 src="https://images.unsplash.com/photo-1584467735871-8db9ac8d55b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
//                                 alt="Blood donation process"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Values Section */}
//             <section className="values-section">
//                 <div className="container">
//                     <h2>Our Values</h2>
//                     <div className="values-grid">
//                         <div className="value-card">
//                             <div className="value-icon">
//                                 <i className="fas fa-heart"></i>
//                             </div>
//                             <h3>Compassion</h3>
//                             <p>We operate with empathy and understanding for both donors and recipients</p>
//                         </div>
//                         <div className="value-card">
//                             <div className="value-icon">
//                                 <i className="fas fa-shield-alt"></i>
//                             </div>
//                             <h3>Safety</h3>
//                             <p>Ensuring the highest standards of safety and privacy for all users</p>
//                         </div>
//                         <div className="value-card">
//                             <div className="value-icon">
//                                 <i className="fas fa-bolt"></i>
//                             </div>
//                             <h3>Efficiency</h3>
//                             <p>Quick response system to connect donors with recipients in emergency situations</p>
//                         </div>
//                         <div className="value-card">
//                             <div className="value-icon">
//                                 <i className="fas fa-users"></i>
//                             </div>
//                             <h3>Community</h3>
//                             <p>Building a strong network of life-savers who support each other</p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Story Section */}
//             <section className="story-section">
//                 <div className="container">
//                     <div className="story-grid">
//                         <div className="story-image">
//                             <img
//                                 src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
//                                 alt="Our story"
//                             />
//                         </div>
//                         <div className="story-content">
//                             <h2>Our Story</h2>
//                             <p>
//                                 LifeLink was founded in 2018 by a group of healthcare professionals and tech
//                                 enthusiasts who witnessed the challenges patients face in finding timely blood
//                                 donations. We saw the gap between willing donors and those in need, and decided
//                                 to bridge it with technology.
//                             </p>
//                             <p>
//                                 What started as a small initiative has now grown into a nationwide network
//                                 connecting thousands of donors with recipients every day. Our platform has
//                                 been instrumental in emergency situations, planned surgeries, and regular
//                                 blood requirements across the country.
//                             </p>
//                             <p>
//                                 Today, we continue to innovate and expand our services to make blood donation
//                                 more accessible and efficient for everyone.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Team Section */}
//             <section className="team-section">
//                 <div className="container">
//                     <h2>Why Choose LifeLink?</h2>
//                     <div className="features-grid">
//                         <div className="feature">
//                             <img
//                                 src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
//                                 alt="Verified Donors"
//                             />
//                             <div className="feature-content">
//                                 <h3>Verified Donors</h3>
//                                 <p>All our donors are medically verified and regularly screened for safety</p>
//                             </div>
//                         </div>
//                         <div className="feature">
//                             <img
//                                 src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
//                                 alt="Quick Response"
//                             />
//                             <div className="feature-content">
//                                 <h3>Quick Response</h3>
//                                 <p>Emergency requests get immediate attention and rapid donor matching</p>
//                             </div>
//                         </div>
//                         <div className="feature">
//                             <img
//                                 src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
//                                 alt="Nationwide Network"
//                             />
//                             <div className="feature-content">
//                                 <h3>Nationwide Network</h3>
//                                 <p>Access to donors and blood banks across the entire country</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section className="about-cta">
//                 <div className="container">
//                     <div className="cta-content">
//                         <h2>Join Our Life-Saving Mission</h2>
//                         <p>Be part of the solution. Register today and make a difference in someone's life.</p>
//                         <div className="cta-buttons">
//                             <a href="/doonerregister" className="btn btn-primary">
//                                 Become a Donor
//                             </a>
//                             <a href="/contact" className="btn btn-secondary">
//                                 Contact Us
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <style>{`
//         /* About.css */
// .about-container {
//   min-height: 100vh;
// }

// /* Hero Section */
// .about-hero {
//   background: linear-gradient(rgba(44, 62, 80, 0.8), rgba(44, 62, 80, 0.9)), 
//               url('https://images.unsplash.com/photo-1579154204601-015d927e3fd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80');
//   background-size: cover;
//   background-position: center;
//   color: white;
//   padding: 100px 0;
//   text-align: center;
// }

// .hero-content h1 {
//   font-size: 3.5rem;
//   margin-bottom: 1rem;
//   font-weight: 700;
// }

// .hero-content p {
//   font-size: 1.3rem;
//   opacity: 0.9;
//   max-width: 600px;
//   margin: 0 auto;
// }

// /* Mission Section */
// .mission-section {
//   padding: 80px 0;
//   background-color: white;
// }

// .mission-grid {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 4rem;
//   align-items: center;
// }

// .mission-content h2 {
//   font-size: 2.5rem;
//   color: #2c3e50;
//   margin-bottom: 1.5rem;
// }

// .mission-content p {
//   font-size: 1.1rem;
//   line-height: 1.7;
//   color: #666;
//   margin-bottom: 1.5rem;
// }

// .mission-stats {
//   display: flex;
//   gap: 2rem;
//   margin-top: 2rem;
// }

// .stat {
//   text-align: center;
// }

// .stat h3 {
//   font-size: 2rem;
//   color: #e53935;
//   margin-bottom: 0.5rem;
//   font-weight: 700;
// }

// .stat p {
//   color: #666;
//   font-weight: 500;
// }

// .mission-image img {
//   width: 100%;
//   border-radius: 15px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// }

// /* Values Section */
// .values-section {
//   padding: 80px 0;
//   background-color: #f8f9fa;
//   text-align: center;
// }

// .values-section h2 {
//   font-size: 2.5rem;
//   color: #2c3e50;
//   margin-bottom: 3rem;
// }

// .values-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 2rem;
// }

// .value-card {
//   background: white;
//   padding: 2.5rem 2rem;
//   border-radius: 15px;
//   box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
//   transition: transform 0.3s ease;
// }

// .value-card:hover {
//   transform: translateY(-5px);
// }

// .value-icon {
//   width: 80px;
//   height: 80px;
//   background: linear-gradient(135deg, #e53935, #c62828);
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 auto 1.5rem;
//   color: white;
//   font-size: 2rem;
// }

// .value-card h3 {
//   font-size: 1.5rem;
//   color: #2c3e50;
//   margin-bottom: 1rem;
// }

// .value-card p {
//   color: #666;
//   line-height: 1.6;
// }

// /* Story Section */
// .story-section {
//   padding: 80px 0;
//   background-color: white;
// }

// .story-grid {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 4rem;
//   align-items: center;
// }

// .story-image img {
//   width: 100%;
//   border-radius: 15px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// }

// .story-content h2 {
//   font-size: 2.5rem;
//   color: #2c3e50;
//   margin-bottom: 1.5rem;
// }

// .story-content p {
//   font-size: 1.1rem;
//   line-height: 1.7;
//   color: #666;
//   margin-bottom: 1.5rem;
// }

// /* Team/Features Section */
// .team-section {
//   padding: 80px 0;
//   background-color: #f8f9fa;
//   text-align: center;
// }

// .team-section h2 {
//   font-size: 2.5rem;
//   color: #2c3e50;
//   margin-bottom: 3rem;
// }

// .features-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 2rem;
// }

// .feature {
//   background: white;
//   border-radius: 15px;
//   overflow: hidden;
//   box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
//   transition: transform 0.3s ease;
// }

// .feature:hover {
//   transform: translateY(-5px);
// }

// .feature img {
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
// }

// .feature-content {
//   padding: 2rem;
// }

// .feature-content h3 {
//   font-size: 1.5rem;
//   color: #2c3e50;
//   margin-bottom: 1rem;
// }

// .feature-content p {
//   color: #666;
//   line-height: 1.6;
// }

// /* CTA Section */
// .about-cta {
//   background: linear-gradient(135deg, #2c3e50, #1a252f);
//   color: white;
//   padding: 80px 0;
//   text-align: center;
// }

// .cta-content h2 {
//   font-size: 2.5rem;
//   margin-bottom: 1rem;
// }

// .cta-content p {
//   font-size: 1.2rem;
//   margin-bottom: 2rem;
//   opacity: 0.9;
//   max-width: 600px;
//   margin-left: auto;
//   margin-right: auto;
// }

// .cta-buttons {
//   display: flex;
//   gap: 1rem;
//   justify-content: center;
//   flex-wrap: wrap;
// }

// .btn {
//   display: inline-block;
//   padding: 12px 30px;
//   border-radius: 8px;
//   text-decoration: none;
//   font-weight: 600;
//   transition: all 0.3s ease;
//   border: 2px solid transparent;
// }

// .btn-primary {
//   background-color: #e53935;
//   color: white;
// }

// .btn-primary:hover {
//   background-color: transparent;
//   border-color: #e53935;
//   color: #e53935;
// }

// .btn-secondary {
//   background-color: transparent;
//   color: white;
//   border-color: white;
// }

// .btn-secondary:hover {
//   background-color: white;
//   color: #2c3e50;
// }

// /* Container */
// .container {
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 20px;
// }

// /* Responsive Design */
// @media (max-width: 768px) {
//   .mission-grid,
//   .story-grid {
//     grid-template-columns: 1fr;
//     gap: 2rem;
//   }
  
//   .mission-stats {
//     flex-direction: column;
//     gap: 1rem;
//   }
  
//   .hero-content h1 {
//     font-size: 2.5rem;
//   }
  
//   .mission-content h2,
//   .story-content h2,
//   .values-section h2,
//   .team-section h2 {
//     font-size: 2rem;
//   }
  
//   .cta-buttons {
//     flex-direction: column;
//     align-items: center;
//   }
  
//   .btn {
//     width: 200px;
//     text-align: center;
//   }
// }

// @media (max-width: 480px) {
//   .about-hero {
//     padding: 60px 0;
//   }
  
//   .hero-content h1 {
//     font-size: 2rem;
//   }
  
//   .hero-content p {
//     font-size: 1.1rem;
//   }
  
//   .values-grid {
//     grid-template-columns: 1fr;
//   }
  
//   .features-grid {
//     grid-template-columns: 1fr;
//   }
// }
//       `}</style>
//         </div>
//     );
// };

// export default About;



import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }, []);

    return (
        <div className="about-container">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 data-aos="fade-down">About LifeLink</h1>
                        <p data-aos="fade-up" data-aos-delay="200">
                            Connecting blood donors with those in need, saving lives one donation at a time
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-content" data-aos="fade-right">
                            <h2>Our Mission</h2>
                            <p>
                                LifeLink is dedicated to creating a reliable and efficient platform that connects
                                voluntary blood donors with patients in need. We believe that no one should suffer
                                or lose their life due to unavailability of blood.
                            </p>
                            <p>
                                Our mission is to bridge the gap between blood donors and recipients through
                                technology, making the process of blood donation and request seamless, transparent,
                                and accessible to everyone.
                            </p>
                            <div className="mission-stats">
                                <div className="stat" data-aos="zoom-in" data-aos-delay="200">
                                    <h3>50,000+</h3>
                                    <p>Lives Saved</p>
                                </div>
                                <div className="stat" data-aos="zoom-in" data-aos-delay="400">
                                    <h3>25,000+</h3>
                                    <p>Active Donors</p>
                                </div>
                                <div className="stat" data-aos="zoom-in" data-aos-delay="600">
                                    <h3>500+</h3>
                                    <p>Partner Hospitals</p>
                                </div>
                            </div>
                        </div>
                        <div className="mission-image" data-aos="fade-left" data-aos-delay="400">
                            <img
                                src="https://images.unsplash.com/photo-1584467735871-8db9ac8d55b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                alt="Blood donation process"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <h2 data-aos="fade-up">Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="value-icon">
                                <i className="fas fa-heart"></i>
                            </div>
                            <h3>Compassion</h3>
                            <p>We operate with empathy and understanding for both donors and recipients</p>
                        </div>
                        <div className="value-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="value-icon">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h3>Safety</h3>
                            <p>Ensuring the highest standards of safety and privacy for all users</p>
                        </div>
                        <div className="value-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="value-icon">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <h3>Efficiency</h3>
                            <p>Quick response system to connect donors with recipients in emergency situations</p>
                        </div>
                        <div className="value-card" data-aos="fade-up" data-aos-delay="500">
                            <div className="value-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3>Community</h3>
                            <p>Building a strong network of life-savers who support each other</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-image" data-aos="fade-right" data-aos-delay="200">
                            <img
                                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                alt="Our story"
                            />
                        </div>
                        <div className="story-content" data-aos="fade-left" data-aos-delay="400">
                            <h2>Our Story</h2>
                            <p>
                                LifeLink was founded in 2018 by a group of healthcare professionals and tech
                                enthusiasts who witnessed the challenges patients face in finding timely blood
                                donations. We saw the gap between willing donors and those in need, and decided
                                to bridge it with technology.
                            </p>
                            <p>
                                What started as a small initiative has now grown into a nationwide network
                                connecting thousands of donors with recipients every day. Our platform has
                                been instrumental in emergency situations, planned surgeries, and regular
                                blood requirements across the country.
                            </p>
                            <p>
                                Today, we continue to innovate and expand our services to make blood donation
                                more accessible and efficient for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container">
                    <h2 data-aos="fade-up">Why Choose LifeLink?</h2>
                    <div className="features-grid">
                        <div className="feature" data-aos="fade-up" data-aos-delay="200">
                            <img
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                                alt="Verified Donors"
                            />
                            <div className="feature-content">
                                <h3>Verified Donors</h3>
                                <p>All our donors are medically verified and regularly screened for safety</p>
                            </div>
                        </div>
                        <div className="feature" data-aos="fade-up" data-aos-delay="400">
                            <img
                                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                                alt="Quick Response"
                            />
                            <div className="feature-content">
                                <h3>Quick Response</h3>
                                <p>Emergency requests get immediate attention and rapid donor matching</p>
                            </div>
                        </div>
                        <div className="feature" data-aos="fade-up" data-aos-delay="600">
                            <img
                                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                                alt="Nationwide Network"
                            />
                            <div className="feature-content">
                                <h3>Nationwide Network</h3>
                                <p>Access to donors and blood banks across the entire country</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2 data-aos="fade-up">Join Our Life-Saving Mission</h2>
                        <p data-aos="fade-up" data-aos-delay="200">
                            Be part of the solution. Register today and make a difference in someone's life.
                        </p>
                        <div className="cta-buttons" data-aos="fade-up" data-aos-delay="400">
                            <a href="/doonerregister" className="btn btn-primary">
                                Become a Donor
                            </a>
                            <a href="/contact" className="btn btn-secondary">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
        /* About.css */
.about-container {
  min-height: 100vh;
}

/* Hero Section */
.about-hero {
  background: linear-gradient(rgba(44, 62, 80, 0.8), rgba(44, 62, 80, 0.9)), 
              url('https://images.unsplash.com/photo-1579154204601-015d927e3fd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
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

/* Mission Section */
.mission-section {
  padding: 80px 0;
  background-color: white;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.mission-content h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.mission-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #666;
  margin-bottom: 1.5rem;
}

.mission-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat {
  text-align: center;
}

.stat h3 {
  font-size: 2rem;
  color: #e53935;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.stat p {
  color: #666;
  font-weight: 500;
}

.mission-image img {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Values Section */
.values-section {
  padding: 80px 0;
  background-color: #f8f9fa;
  text-align: center;
}

.values-section h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 3rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
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

.value-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.value-card p {
  color: #666;
  line-height: 1.6;
}

/* Story Section */
.story-section {
  padding: 80px 0;
  background-color: white;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-image img {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.story-content h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.story-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #666;
  margin-bottom: 1.5rem;
}

/* Team/Features Section */
.team-section {
  padding: 80px 0;
  background-color: #f8f9fa;
  text-align: center;
}

.team-section h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.feature-content {
  padding: 2rem;
}

.feature-content h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-content p {
  color: #666;
  line-height: 1.6;
}

/* CTA Section */
.about-cta {
  background: linear-gradient(135deg, #2c3e50, #1a252f);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background-color: #e53935;
  color: white;
}

.btn-primary:hover {
  background-color: transparent;
  border-color: #e53935;
  color: #e53935;
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border-color: white;
}

.btn-secondary:hover {
  background-color: white;
  color: #2c3e50;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .mission-grid,
  .story-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .mission-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .mission-content h2,
  .story-content h2,
  .values-section h2,
  .team-section h2 {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .about-hero {
    padding: 60px 0;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
      `}</style>
        </div>
    );
};

export default About;