import React from 'react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles';

const Services = () => {
  return (
    <>
      <section className="page-hero">
        <Particles count={15} />
        <div className="container">
          <h1 data-aos="fade-up">Our Services</h1>
          <p data-aos="fade-up" data-aos-delay="50">
            Comprehensive digital solutions tailored to elevate your business presence
          </p>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="100">
            <Link to="/">Home</Link> <span>/</span> <span>Services</span>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          {/* Development */}
          <div className="service-section" data-aos="fade-up">
            <div className="service-section-header">
              <div className="icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h2>Development</h2>
            </div>
            <div className="services-grid">
              <div className="service-item">
                <i className="fas fa-globe"></i>
                <h4>Web Application Development</h4>
                <p>
                  Custom web applications built with modern frameworks, scalable architecture, and
                  responsive design.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-file-alt"></i>
                <h4>Static Websites & Dynamic Websites</h4>
                <p>
                  Sleek, fast-loading single page websites perfect for portfolios, landing pages,
                  and product launches.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-code"></i>
                <h4>App Development</h4>
                <p>
                  Clean, lightweight App Design optimized for speed, security, and search engine
                  visibility.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-database"></i>
                <h4>Dynamic Website</h4>
                <p>
                  Feature-rich dynamic websites with CMS integration, user authentication, and
                  database connectivity.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-mobile-alt"></i>
                <h4>Mobile UI Design</h4>
                <p>
                  Intuitive mobile interface designs that deliver seamless user experiences across
                  all devices.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-desktop"></i>
                <h4>Website UI Design</h4>
                <p>
                  Beautiful, user-centric website interfaces that combine aesthetics with
                  functionality.
                </p>
              </div>
            </div>
          </div>

          {/* Designing */}
          <div className="service-section" data-aos="fade-up">
            <div className="service-section-header">
              <div className="icon">
                <i className="fas fa-paint-brush"></i>
              </div>
              <h2>Designing</h2>
            </div>
            <div className="services-grid">
              <div className="service-item">
                <i className="fas fa-pen-nib"></i>
                <h4>Logo Design</h4>
                <p>
                  Memorable, professional logos that capture your brand essence and make a lasting
                  impression.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-id-card"></i>
                <h4>Visiting/Business Card Design</h4>
                <p>
                  Elegant business card designs that reflect your professional identity and brand
                  standards.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-newspaper"></i>
                <h4>Pamplet Design</h4>
                <p>
                  Eye-catching pamphlets designed to effectively communicate your message and
                  attract customers.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-scroll"></i>
                <h4>Flyer Design</h4>
                <p>
                  Creative flyer designs for events, promotions, and marketing campaigns that drive
                  engagement.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-book-open"></i>
                <h4>Brochure Design</h4>
                <p>
                  Professional brochures that showcase your products, services, and company story
                  effectively.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-crown"></i>
                <h4>Brand Identity Design</h4>
                <p>
                  Complete brand identity packages including color palettes, typography, and visual
                  guidelines.
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="service-section" data-aos="fade-up">
            <div className="service-section-header">
              <div className="icon">
                <i className="fas fa-hashtag"></i>
              </div>
              <h2>Social Media Handling</h2>
            </div>
            <div className="services-grid">
              <div className="service-item">
                <i className="fab fa-instagram"></i>
                <h4>Instagram Management</h4>
                <p>
                  Complete Instagram account management including content planning, posting, and
                  engagement strategies.
                </p>
              </div>
              <div className="service-item">
                <i className="fab fa-facebook"></i>
                <h4>Facebook Management</h4>
                <p>
                  Professional Facebook page management with targeted content and community building.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-palette"></i>
                <h4>Creative Design</h4>
                <p>
                  Stunning social media graphics, banners, and visual content tailored for each
                  platform.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-pen-fancy"></i>
                <h4>Content Creation</h4>
                <p>
                  Engaging written and visual content that resonates with your audience and drives
                  interaction.
                </p>
              </div>
              <div className="service-item">
                <i className="fas fa-chart-line"></i>
                <h4>Marketing Support</h4>
                <p>
                  Strategic social media marketing campaigns to boost visibility, leads, and brand
                  awareness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" style={{ textAlign: 'center' }}>
        <div className="container" data-aos="fade-up">
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            Ready to Get Started?
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '30px' }}>
            Let's discuss how we can help transform your digital presence
          </p>
          <Link to="/contact" className="btn btn-primary">
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;

