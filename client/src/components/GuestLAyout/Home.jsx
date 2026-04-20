// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import About from '../GuestLAyout/About';
// import Services from '../GuestLAyout/Services';
// import Contact from '../GuestLAyout/Contact';

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const carouselImages = [
//     {
//       url: "https://images.unsplash.com/photo-1579154204601-015d927e3fd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
//       title: "Save Lives with Blood Donation",
//       description: "Your single donation can save up to three lives"
//     },
//     {
//       url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
//       title: "Join Our Community of Donors",
//       description: "Be the reason someone smiles today"
//     },
//     {
//       url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
//       title: "Emergency Blood Requests",
//       description: "Quick response system for urgent blood needs"
//     },
//     {
//       url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
//       title: "Verified & Safe Donations",
//       description: "All donors are medically verified for your safety"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [carouselImages.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="home-container">
//       {/* Hero Carousel Section */}
//       <section className="hero-carousel">
//         <div className="carousel-container">
//           {carouselImages.map((image, index) => (
//             <div
//               key={index}
//               className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
//               style={{ backgroundImage: `url(${image.url})` }}
//             >
//               <div className="carousel-overlay">
//                 <div className="carousel-content">
//                   <h1>{image.title}</h1>
//                   <p>{image.description}</p>
//                   <div className="carousel-buttons">
//                     <Link to="/doonerregister" className="btn btn-primary">
//                       Become a Donor
//                     </Link>
//                     <Link to="/services" className="btn btn-secondary">
//                       Learn More
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Carousel Controls */}
//         <button className="carousel-control prev" onClick={prevSlide}>
//           <i className="fas fa-chevron-left"></i>
//         </button>
//         <button className="carousel-control next" onClick={nextSlide}>
//           <i className="fas fa-chevron-right"></i>
//         </button>
        
//         {/* Carousel Indicators */}
//         <div className="carousel-indicators">
//           {carouselImages.map((_, index) => (
//             <button
//               key={index}
//               className={`indicator ${index === currentSlide ? 'active' : ''}`}
//               onClick={() => goToSlide(index)}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Quick Stats Section */}
//       <section className="stats-section">
//         <div className="container">
//           <div className="stats-grid">
//             <div className="stat-item">
//               <i className="fas fa-users"></i>
//               <h3>10,000+</h3>
//               <p>Registered Donors</p>
//             </div>
//             <div className="stat-item">
//               <i className="fas fa-hand-holding-heart"></i>
//               <h3>25,000+</h3>
//               <p>Lives Saved</p>
//             </div>
//             <div className="stat-item">
//               <i className="fas fa-hospital"></i>
//               <h3>500+</h3>
//               <p>Partner Hospitals</p>
//             </div>
//             <div className="stat-item">
//               <i className="fas fa-map-marker-alt"></i>
//               <h3>50+</h3>
//               <p>Cities Covered</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* User Roles Section */}
//       <section className="roles-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>🧑‍🤝‍🧑 User Roles in LifeLink</h2>
//             <p>Our platform connects three key roles to save lives efficiently</p>
//           </div>

//           <div className="roles-grid">
//             {/* Donor Card */}
//             <div className="role-card">
//               <div className="role-icon donor">
//                 <i className="fas fa-hand-holding-medical"></i>
//               </div>
//               <h3>Donor</h3>
//               <p className="role-description">
//                 A person who is willing to donate blood to someone in need.
//               </p>
//               <div className="responsibilities">
//                 <h4>Key Responsibilities:</h4>
//                 <ul>
//                   <li>Register with personal, contact, and medical details</li>
//                   <li>Maintain updated health information</li>
//                   <li>Respond to donation requests</li>
//                   <li>Coordinate donation through the app</li>
//                   <li>View donation history and get reminders</li>
//                 </ul>
//               </div>
//               <div className="eligibility">
//                 <h4>Eligibility Check:</h4>
//                 <p>System ensures donors can't donate within 3 months of last donation</p>
//               </div>
//               <Link to="/doonerregister" className="role-btn donor-btn">
//                 Become a Donor
//               </Link>
//             </div>

//             {/* Recipient Card */}
//             <div className="role-card">
//               <div className="role-icon recipient">
//                 <i className="fas fa-hands-helping"></i>
//               </div>
//               <h3>Recipient</h3>
//               <p className="role-description">
//                 A person (or hospital staff) who needs blood for themselves or a patient.
//               </p>
//               <div className="responsibilities">
//                 <h4>Key Responsibilities:</h4>
//                 <ul>
//                   <li>Create blood requests with required details</li>
//                   <li>Search for available donors nearby</li>
//                   <li>Send donation requests to matching donors</li>
//                   <li>Communicate securely through the system</li>
//                   <li>View nearby hospitals and blood banks</li>
//                 </ul>
//               </div>
//               <div className="features">
//                 <h4>System Features:</h4>
//                 <p>Automatically finds matching donors based on blood group and location</p>
//               </div>
//               <Link to="/RecipientRegister" className="role-btn recipient-btn">
//                 Request Blood
//               </Link>
//             </div>

//             {/* Admin Card */}
//             <div className="role-card">
//               <div className="role-icon admin">
//                 <i className="fas fa-user-shield"></i>
//               </div>
//               <h3>Admin / Hospital Staff</h3>
//               <p className="role-description">
//                 Manages the platform and verifies data for reliability.
//               </p>
//               <div className="responsibilities">
//                 <h4>Key Responsibilities:</h4>
//                 <ul>
//                   <li>Monitor all platform activities</li>
//                   <li>Verify donor authenticity and profiles</li>
//                   <li>Manage hospital and blood bank database</li>
//                   <li>Update available blood units and track shortages</li>
//                   <li>Handle emergency requests from hospitals</li>
//                   <li>Generate reports and analytics</li>
//                 </ul>
//               </div>
//               <div className="purpose">
//                 <h4>Purpose:</h4>
//                 <p>Keep the system accurate, reliable, and trustworthy</p>
//               </div>
//               <Link to="/adminlogin" className="role-btn admin-btn">
//                 Admin Login
//               </Link>
//             </div>
//           </div>

//           {/* How It Works Section */}
//           <div className="workflow-section">
//             <h3>💡 How These Roles Work Together</h3>
//             <div className="workflow-steps">
//               <div className="workflow-step">
//                 <div className="step-number">1</div>
//                 <p>A recipient submits a blood request</p>
//               </div>
//               <div className="workflow-arrow">
//                 <i className="fas fa-arrow-right"></i>
//               </div>
//               <div className="workflow-step">
//                 <div className="step-number">2</div>
//                 <p>System finds matching donors</p>
//               </div>
//               <div className="workflow-arrow">
//                 <i className="fas fa-arrow-right"></i>
//               </div>
//               <div className="workflow-step">
//                 <div className="step-number">3</div>
//                 <p>Donors receive notifications</p>
//               </div>
//               <div className="workflow-arrow">
//                 <i className="fas fa-arrow-right"></i>
//               </div>
//               <div className="workflow-step">
//                 <div className="step-number">4</div>
//                 <p>Donors respond to requests</p>
//               </div>
//               <div className="workflow-arrow">
//                 <i className="fas fa-arrow-right"></i>
//               </div>
//               <div className="workflow-step">
//                 <div className="step-number">5</div>
//                 <p>Admin verifies and coordinates</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta-section">
//         <div className="container">
//           <div className="cta-content">
//             <h2>Ready to Make a Difference?</h2>
//             <p>Join thousands of life-savers in our community today</p>
//             <div className="cta-buttons">
//               <Link to="/doonerregister" className="btn btn-large btn-primary">
//                 <i className="fas fa-hand-holding-medical"></i>
//                 Register as Donor
//               </Link>
//               <Link to="/RecipientRegister" className="btn btn-large btn-secondary">
//                 <i className="fas fa-hands-helping"></i>
//                 Request Blood
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//       <style>{`/* Home.css */
// :root {
//   --primary: #e53935;
//   --primary-dark: #c62828;
//   --secondary: #2c3e50;
//   --light: #f5f5f5;
//   --dark: #333;
//   --gray: #757575;
//   --success: #4caf50;
//   --warning: #ff9800;
//   --info: #2196f3;
// }

// .home-container {
//   min-height: 100vh;
// }

// /* Hero Carousel Styles */
// .hero-carousel {
//   position: relative;
//   height: 70vh;
//   overflow: hidden;
//   border-radius: 0 0 20px 20px;
// }

// .carousel-container {
//   position: relative;
//   width: 100%;
//   height: 100%;
// }

// .carousel-slide {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   opacity: 0;
//   transition: opacity 1s ease-in-out;
// }

// .carousel-slide.active {
//   opacity: 1;
// }

// .carousel-overlay {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.9));
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .carousel-content {
//   text-align: center;
//   color: white;
//   max-width: 800px;
//   padding: 0 20px;
// }

// .carousel-content h1 {
//   font-size: 3.5rem;
//   margin-bottom: 1rem;
//   font-weight: 700;
// }

// .carousel-content p {
//   font-size: 1.3rem;
//   margin-bottom: 2rem;
//   opacity: 0.9;
// }

// .carousel-buttons {
//   display: flex;
//   gap: 1rem;
//   justify-content: center;
//   flex-wrap: wrap;
// }

// .btn {
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 12px 30px;
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
//   font-weight: 600;
//   text-decoration: none;
//   cursor: pointer;
//   transition: all 0.3s ease;
// }

// .btn-primary {
//   background-color: var(--primary);
//   color: white;
// }

// .btn-primary:hover {
//   background-color: var(--primary-dark);
//   transform: translateY(-2px);
// }

// .btn-secondary {
//   background-color: transparent;
//   color: white;
//   border: 2px solid white;
// }

// .btn-secondary:hover {
//   background-color: white;
//   color: var(--primary);
// }

// .btn-large {
//   padding: 15px 40px;
//   font-size: 1.1rem;
// }

// /* Carousel Controls */
// .carousel-control {
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   background: rgba(255, 255, 255, 0.2);
//   border: none;
//   color: white;
//   font-size: 1.5rem;
//   padding: 15px;
//   cursor: pointer;
//   border-radius: 50%;
//   transition: all 0.3s ease;
//   backdrop-filter: blur(10px);
// }

// .carousel-control:hover {
//   background: rgba(255, 255, 255, 0.3);
// }

// .carousel-control.prev {
//   left: 20px;
// }

// .carousel-control.next {
//   right: 20px;
// }

// .carousel-indicators {
//   position: absolute;
//   bottom: 20px;
//   left: 50%;
//   transform: translateX(-50%);
//   display: flex;
//   gap: 10px;
// }

// .indicator {
//   width: 12px;
//   height: 12px;
//   border-radius: 50%;
//   border: none;
//   background: rgba(255, 255, 255, 0.5);
//   cursor: pointer;
//   transition: all 0.3s ease;
// }

// .indicator.active {
//   background: white;
//   transform: scale(1.2);
// }

// /* Stats Section */
// .stats-section {
//   background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
//   color: white;
//   padding: 60px 0;
// }

// .stats-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 2rem;
//   text-align: center;
// }

// .stat-item i {
//   font-size: 3rem;
//   margin-bottom: 1rem;
//   opacity: 0.9;
// }

// .stat-item h3 {
//   font-size: 2.5rem;
//   margin-bottom: 0.5rem;
//   font-weight: 700;
// }

// .stat-item p {
//   font-size: 1.1rem;
//   opacity: 0.9;
// }

// /* Roles Section */
// .roles-section {
//   padding: 80px 0;
//   background-color: var(--light);
// }

// .container {
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 20px;
// }

// .section-header {
//   text-align: center;
//   margin-bottom: 60px;
// }

// .section-header h2 {
//   font-size: 2.5rem;
//   color: var(--secondary);
//   margin-bottom: 1rem;
// }

// .section-header p {
//   font-size: 1.2rem;
//   color: var(--gray);
//   max-width: 600px;
//   margin: 0 auto;
// }

// .roles-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
//   gap: 2rem;
//   margin-bottom: 60px;
// }

// .role-card {
//   background: white;
//   padding: 2rem;
//   border-radius: 15px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   text-align: center;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   position: relative;
//   overflow: hidden;
// }

// .role-card:hover {
//   transform: translateY(-10px);
//   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
// }

// .role-icon {
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 auto 1.5rem;
//   font-size: 2rem;
//   color: white;
// }

// .role-icon.donor {
//   background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
// }

// .role-icon.recipient {
//   background: linear-gradient(135deg, var(--info) 0%, #1976d2 100%);
// }

// .role-icon.admin {
//   background: linear-gradient(135deg, var(--success) 0%, #388e3c 100%);
// }

// .role-card h3 {
//   font-size: 1.8rem;
//   color: var(--secondary);
//   margin-bottom: 1rem;
// }

// .role-description {
//   color: var(--gray);
//   margin-bottom: 1.5rem;
//   font-size: 1.1rem;
//   line-height: 1.6;
// }

// .responsibilities, .eligibility, .features, .purpose {
//   text-align: left;
//   margin-bottom: 1.5rem;
// }

// .responsibilities h4, .eligibility h4, .features h4, .purpose h4 {
//   color: var(--secondary);
//   margin-bottom: 0.5rem;
//   font-size: 1.1rem;
// }

// .responsibilities ul {
//   list-style: none;
//   padding: 0;
// }

// .responsibilities li {
//   padding: 0.3rem 0;
//   color: var(--gray);
//   position: relative;
//   padding-left: 1.5rem;
// }

// .responsibilities li:before {
//   content: "✓";
//   position: absolute;
//   left: 0;
//   color: var(--success);
//   font-weight: bold;
// }

// .role-btn {
//   display: inline-block;
//   padding: 12px 30px;
//   border-radius: 8px;
//   text-decoration: none;
//   font-weight: 600;
//   transition: all 0.3s ease;
//   border: 2px solid transparent;
//   margin-top: 1rem;
// }

// .donor-btn {
//   background-color: var(--primary);
//   color: white;
// }

// .donor-btn:hover {
//   background-color: transparent;
//   border-color: var(--primary);
//   color: var(--primary);
// }

// .recipient-btn {
//   background-color: var(--info);
//   color: white;
// }

// .recipient-btn:hover {
//   background-color: transparent;
//   border-color: var(--info);
//   color: var(--info);
// }

// .admin-btn {
//   background-color: var(--success);
//   color: white;
// }

// .admin-btn:hover {
//   background-color: transparent;
//   border-color: var(--success);
//   color: var(--success);
// }

// /* Workflow Section */
// .workflow-section {
//   background: white;
//   padding: 3rem;
//   border-radius: 15px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   text-align: center;
// }

// .workflow-section h3 {
//   font-size: 2rem;
//   color: var(--secondary);
//   margin-bottom: 2rem;
// }

// .workflow-steps {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-wrap: wrap;
//   gap: 1rem;
// }

// .workflow-step {
//   text-align: center;
//   flex: 1;
//   min-width: 150px;
// }

// .step-number {
//   width: 50px;
//   height: 50px;
//   background: var(--primary);
//   color: white;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: bold;
//   margin: 0 auto 1rem;
//   font-size: 1.2rem;
// }

// .workflow-step p {
//   color: var(--gray);
//   font-weight: 500;
// }

// .workflow-arrow {
//   color: var(--primary);
//   font-size: 1.5rem;
// }

// /* CTA Section */
// .cta-section {
//   background: linear-gradient(135deg, var(--secondary) 0%, #1a252f 100%);
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
// }

// .cta-buttons {
//   display: flex;
//   gap: 1.5rem;
//   justify-content: center;
//   flex-wrap: wrap;
// }

// /* Responsive Design */
// @media (max-width: 768px) {
//   .hero-carousel {
//     height: 60vh;
//   }
  
//   .carousel-content h1 {
//     font-size: 2.5rem;
//   }
  
//   .carousel-content p {
//     font-size: 1.1rem;
//   }
  
//   .carousel-buttons {
//     flex-direction: column;
//     align-items: center;
//   }
  
//   .roles-grid {
//     grid-template-columns: 1fr;
//   }
  
//   .workflow-steps {
//     flex-direction: column;
//   }
  
//   .workflow-arrow {
//     transform: rotate(90deg);
//   }
  
//   .cta-buttons {
//     flex-direction: column;
//     align-items: center;
//   }
  
//   .stats-grid {
//     grid-template-columns: repeat(2, 1fr);
//   }
// }

// @media (max-width: 480px) {
//   .stats-grid {
//     grid-template-columns: 1fr;
//   }
  
//   .carousel-content h1 {
//     font-size: 2rem;
//   }
  
//   .section-header h2 {
//     font-size: 2rem;
//   }
// }`}</style>
// <div>
//   <About/>
//   <Services/>
//   <Contact/>
// </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import About from '../GuestLAyout/About';
import Services from '../GuestLAyout/Services';
import Contact from '../GuestLAyout/Contact';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1579154204601-015d927e3fd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      title: "Save Lives with Blood Donation",
      description: "Your single donation can save up to three lives"
    },
    {
      url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      title: "Join Our Community of Donors",
      description: "Be the reason someone smiles today"
    },
    {
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      title: "Emergency Blood Requests",
      description: "Quick response system for urgent blood needs"
    },
    {
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      title: "Verified & Safe Donations",
      description: "All donors are medically verified for your safety"
    }
  ];

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-container">
      {/* Hero Carousel Section */}
      <section className="hero-carousel">
        <div className="carousel-container">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <div className="carousel-overlay">
                <div className="carousel-content">
                  <h1 data-aos="fade-down" data-aos-delay="200">{image.title}</h1>
                  <p data-aos="fade-up" data-aos-delay="400">{image.description}</p>
                  <div className="carousel-buttons" data-aos="fade-up" data-aos-delay="600">
                    <Link to="/doonerregister" className="btn btn-primary">
                      Become a Donor
                    </Link>
                    <Link to="/services" className="btn btn-secondary">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Controls */}
        <button className="carousel-control prev" onClick={prevSlide} data-aos="fade-right" data-aos-delay="800">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="carousel-control next" onClick={nextSlide} data-aos="fade-left" data-aos-delay="800">
          <i className="fas fa-chevron-right"></i>
        </button>
        
        {/* Carousel Indicators */}
        <div className="carousel-indicators" data-aos="fade-up" data-aos-delay="1000">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-users"></i>
              <h3>10,000+</h3>
              <p>Registered Donors</p>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="400">
              <i className="fas fa-hand-holding-heart"></i>
              <h3>25,000+</h3>
              <p>Lives Saved</p>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="600">
              <i className="fas fa-hospital"></i>
              <h3>500+</h3>
              <p>Partner Hospitals</p>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="800">
              <i className="fas fa-map-marker-alt"></i>
              <h3>50+</h3>
              <p>Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="roles-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>🧑‍🤝‍🧑 User Roles in LifeLink</h2>
            <p>Our platform connects three key roles to save lives efficiently</p>
          </div>

          <div className="roles-grid">
            {/* Donor Card */}
            <div className="role-card" data-aos="fade-up" data-aos-delay="200">
              <div className="role-icon donor">
                <i className="fas fa-hand-holding-medical"></i>
              </div>
              <h3>Donor</h3>
              <p className="role-description">
                A person who is willing to donate blood to someone in need.
              </p>
              <div className="responsibilities">
                <h4>Key Responsibilities:</h4>
                <ul>
                  <li>Register with personal, contact, and medical details</li>
                  <li>Maintain updated health information</li>
                  <li>Respond to donation requests</li>
                  <li>Coordinate donation through the app</li>
                  <li>View donation history and get reminders</li>
                </ul>
              </div>
              <div className="eligibility">
                <h4>Eligibility Check:</h4>
                <p>System ensures donors can't donate within 3 months of last donation</p>
              </div>
              <Link to="/doonerregister" className="role-btn donor-btn">
                Become a Donor
              </Link>
            </div>

            {/* Recipient Card */}
            <div className="role-card" data-aos="fade-up" data-aos-delay="400">
              <div className="role-icon recipient">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3>Recipient</h3>
              <p className="role-description">
                A person (or hospital staff) who needs blood for themselves or a patient.
              </p>
              <div className="responsibilities">
                <h4>Key Responsibilities:</h4>
                <ul>
                  <li>Create blood requests with required details</li>
                  <li>Search for available donors nearby</li>
                  <li>Send donation requests to matching donors</li>
                  <li>Communicate securely through the system</li>
                  <li>View nearby hospitals and blood banks</li>
                </ul>
              </div>
              <div className="features">
                <h4>System Features:</h4>
                <p>Automatically finds matching donors based on blood group and location</p>
              </div>
              <Link to="/RecipientRegister" className="role-btn recipient-btn">
                Request Blood
              </Link>
            </div>

            {/* Admin Card */}
            <div className="role-card" data-aos="fade-up" data-aos-delay="600">
              <div className="role-icon admin">
                <i className="fas fa-user-shield"></i>
              </div>
              <h3>Admin / Hospital Staff</h3>
              <p className="role-description">
                Manages the platform and verifies data for reliability.
              </p>
              <div className="responsibilities">
                <h4>Key Responsibilities:</h4>
                <ul>
                  <li>Monitor all platform activities</li>
                  <li>Verify donor authenticity and profiles</li>
                  <li>Manage hospital and blood bank database</li>
                  <li>Update available blood units and track shortages</li>
                  <li>Handle emergency requests from hospitals</li>
                  <li>Generate reports and analytics</li>
                </ul>
              </div>
              <div className="purpose">
                <h4>Purpose:</h4>
                <p>Keep the system accurate, reliable, and trustworthy</p>
              </div>
              <Link to="/adminlogin" className="role-btn admin-btn">
                Admin Login
              </Link>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="workflow-section" data-aos="fade-up" data-aos-delay="200">
            <h3>💡 How These Roles Work Together</h3>
            <div className="workflow-steps">
              <div className="workflow-step" data-aos="zoom-in" data-aos-delay="300">
                <div className="step-number">1</div>
                <p>A recipient submits a blood request</p>
              </div>
              <div className="workflow-arrow" data-aos="fade-in" data-aos-delay="400">
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="workflow-step" data-aos="zoom-in" data-aos-delay="500">
                <div className="step-number">2</div>
                <p>System finds matching donors</p>
              </div>
              <div className="workflow-arrow" data-aos="fade-in" data-aos-delay="600">
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="workflow-step" data-aos="zoom-in" data-aos-delay="700">
                <div className="step-number">3</div>
                <p>Donors receive notifications</p>
              </div>
              <div className="workflow-arrow" data-aos="fade-in" data-aos-delay="800">
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="workflow-step" data-aos="zoom-in" data-aos-delay="900">
                <div className="step-number">4</div>
                <p>Donors respond to requests</p>
              </div>
              <div className="workflow-arrow" data-aos="fade-in" data-aos-delay="1000">
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="workflow-step" data-aos="zoom-in" data-aos-delay="1100">
                <div className="step-number">5</div>
                <p>Admin verifies and coordinates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 data-aos="fade-up">Ready to Make a Difference?</h2>
            <p data-aos="fade-up" data-aos-delay="200">Join thousands of life-savers in our community today</p>
            <div className="cta-buttons" data-aos="fade-up" data-aos-delay="400">
              <Link to="/doonerregister" className="btn btn-large btn-primary">
                <i className="fas fa-hand-holding-medical"></i>
                Register as Donor
              </Link>
              <Link to="/RecipientRegister" className="btn btn-large btn-secondary">
                <i className="fas fa-hands-helping"></i>
                Request Blood
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`/* Home.css */
:root {
  --primary: #e53935;
  --primary-dark: #c62828;
  --secondary: #2c3e50;
  --light: #f5f5f5;
  --dark: #333;
  --gray: #757575;
  --success: #4caf50;
  --warning: #ff9800;
  --info: #2196f3;
}

.home-container {
  min-height: 100vh;
}

/* Hero Carousel Styles */
.hero-carousel {
  position: relative;
  height: 70vh;
  overflow: hidden;
  border-radius: 0 0 20px 20px;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-content {
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.carousel-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.carousel-content p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.carousel-buttons {
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
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: var(--primary);
}

.btn-large {
  padding: 15px 40px;
  font-size: 1.1rem;
}

/* Carousel Controls */
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 15px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.carousel-control:hover {
  background: rgba(255, 255, 255, 0.3);
}

.carousel-control.prev {
  left: 20px;
}

.carousel-control.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 60px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.stat-item h3 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.stat-item p {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Roles Section */
.roles-section {
  padding: 80px 0;
  background-color: var(--light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--secondary);
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.2rem;
  color: var(--gray);
  max-width: 600px;
  margin: 0 auto;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 60px;
}

.role-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.role-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.role-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
}

.role-icon.donor {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
}

.role-icon.recipient {
  background: linear-gradient(135deg, var(--info) 0%, #1976d2 100%);
}

.role-icon.admin {
  background: linear-gradient(135deg, var(--success) 0%, #388e3c 100%);
}

.role-card h3 {
  font-size: 1.8rem;
  color: var(--secondary);
  margin-bottom: 1rem;
}

.role-description {
  color: var(--gray);
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.responsibilities, .eligibility, .features, .purpose {
  text-align: left;
  margin-bottom: 1.5rem;
}

.responsibilities h4, .eligibility h4, .features h4, .purpose h4 {
  color: var(--secondary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.responsibilities ul {
  list-style: none;
  padding: 0;
}

.responsibilities li {
  padding: 0.3rem 0;
  color: var(--gray);
  position: relative;
  padding-left: 1.5rem;
}

.responsibilities li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--success);
  font-weight: bold;
}

.role-btn {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  margin-top: 1rem;
}

.donor-btn {
  background-color: var(--primary);
  color: white;
}

.donor-btn:hover {
  background-color: transparent;
  border-color: var(--primary);
  color: var(--primary);
}

.recipient-btn {
  background-color: var(--info);
  color: white;
}

.recipient-btn:hover {
  background-color: transparent;
  border-color: var(--info);
  color: var(--info);
}

.admin-btn {
  background-color: var(--success);
  color: white;
}

.admin-btn:hover {
  background-color: transparent;
  border-color: var(--success);
  color: var(--success);
}

/* Workflow Section */
.workflow-section {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.workflow-section h3 {
  font-size: 2rem;
  color: var(--secondary);
  margin-bottom: 2rem;
}

.workflow-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.workflow-step {
  text-align: center;
  flex: 1;
  min-width: 150px;
}

.step-number {
  width: 50px;
  height: 50px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1rem;
  font-size: 1.2rem;
}

.workflow-step p {
  color: var(--gray);
  font-weight: 500;
}

.workflow-arrow {
  color: var(--primary);
  font-size: 1.5rem;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--secondary) 0%, #1a252f 100%);
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
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-carousel {
    height: 60vh;
  }
  
  .carousel-content h1 {
    font-size: 2.5rem;
  }
  
  .carousel-content p {
    font-size: 1.1rem;
  }
  
  .carousel-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .roles-grid {
    grid-template-columns: 1fr;
  }
  
  .workflow-steps {
    flex-direction: column;
  }
  
  .workflow-arrow {
    transform: rotate(90deg);
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .carousel-content h1 {
    font-size: 2rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
}`}</style>

      <div>
        <About/>
        <Services/>
        <Contact/>
      </div>
    </div>
  );
};

export default Home;