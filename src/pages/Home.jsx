import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles';

const Home = () => {
  const typingRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    /* Typing Effect */
    const words = ['Digital Solutions', 'Web Experiences', 'Brand Identity', 'Social Presence'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timerId;

    function type() {
      if (!typingRef.current) return;
      const current = words[wordIndex];
      let display = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);

      typingRef.current.textContent = display;
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === current.length + 1) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
      }

      timerId = setTimeout(type, speed);
    }
    type();

    /* Animated Counters */
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const ctrTimer = setInterval(() => {
              current += step;
              if (current >= target) {
                el.textContent = target + suffix;
                clearInterval(ctrTimer);
              } else {
                el.textContent = Math.floor(current) + suffix;
              }
            }, 16);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((counter) => observer.observe(counter));

    return () => {
      clearTimeout(timerId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <Particles count={20} />
        <div className="container">
          <div className="hero-content" data-aos="fade-up">
            <span className="hero-tag">Welcome to Tekzo IT Solution</span>
            <h1 className="hero-title">
              Transforming Ideas Into<br />
              <span className="typing-text" ref={typingRef}>Digital Solutions</span>
            </h1>
            <p className="hero-subtitle">
              Professional Web Development, Creative Designing, Branding and Social Media Solutions.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary">
                Explore Services
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
            <div className="hero-cards">
              <div className="glass-card" data-aos="fade-up" data-aos-delay="100">
                <i className="fas fa-code"></i>
                <h4>Web Development</h4>
                <p>Custom websites & applications</p>
              </div>
              <div className="glass-card" data-aos="fade-up" data-aos-delay="200">
                <i className="fas fa-palette"></i>
                <h4>Creative Design</h4>
                <p>Logos, branding & graphics</p>
              </div>
              <div className="glass-card" data-aos="fade-up" data-aos-delay="300">
                <i className="fas fa-share-alt"></i>
                <h4>Social Media</h4>
                <p>Management & content creation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Comprehensive digital solutions tailored to elevate your business presence
            </p>
          </div>
          <div className="service-categories">
            <div className="category-card" data-aos="fade-up" data-aos-delay="100">
              <div className="category-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3>Development</h3>
              <ul>
                <li>
                  <i className="fas fa-chevron-right"></i> Web Application Development
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Single Page Websites
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Static Websites & Dynamic Websites
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> App Development
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Mobile UI Design
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Website UI Design
                </li>
              </ul>
            </div>
            <div className="category-card" data-aos="fade-up" data-aos-delay="200">
              <div className="category-icon">
                <i className="fas fa-paint-brush"></i>
              </div>
              <h3>Designing</h3>
              <ul>
                <li>
                  <i className="fas fa-chevron-right"></i> Logo Design
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Visiting/Business Card Design
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Pamplet Design
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Flyer Design
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Product Catalog Design
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Banner Design
                </li>
              </ul>
            </div>
            <div className="category-card" data-aos="fade-up" data-aos-delay="300">
              <div className="category-icon">
                <i className="fas fa-hashtag"></i>
              </div>
              <h3>Social Media Handling</h3>
              <ul>
                <li>
                  <i className="fas fa-chevron-right"></i> Instagram Management
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Instagram Ads
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Creative Posts
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Branding Content
                </li>
                <li>
                  <i className="fas fa-chevron-right"></i> Content Creation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Why Us</span>
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">
              We deliver excellence through innovation, quality, and dedication
            </p>
          </div>
          <div className="why-grid">
            <div className="why-card" data-aos="fade-up" data-aos-delay="100">
              <div className="icon-wrap">
                <i className="fas fa-rocket"></i>
              </div>
              <h4>Fast Delivery</h4>
              <p>
                We deliver projects on time without compromising on quality, ensuring your business
                stays ahead.
              </p>
            </div>
            <div className="why-card" data-aos="fade-up" data-aos-delay="200">
              <div className="icon-wrap">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Secure Solutions</h4>
              <p>
                Security is built into every project with industry best practices and robust
                architecture.
              </p>
            </div>
            <div className="why-card" data-aos="fade-up" data-aos-delay="300">
              <div className="icon-wrap">
                <i className="fas fa-headset"></i>
              </div>
              <h4>24/7 Support</h4>
              <p>
                Our dedicated support team is always available to assist you with any queries or
                issues.
              </p>
            </div>
            <div className="why-card" data-aos="fade-up" data-aos-delay="400">
              <div className="icon-wrap">
                <i className="fas fa-award"></i>
              </div>
              <h4>Premium Quality</h4>
              <p>
                We maintain the highest standards in design and development for every project we
                undertake.
              </p>
            </div>
            <div className="why-card" data-aos="fade-up" data-aos-delay="500">
              <div className="icon-wrap">
                <i className="fas fa-users"></i>
              </div>
              <h4>Expert Team</h4>
              <p>
                Our skilled professionals bring years of experience across web, design, and digital
                marketing.
              </p>
            </div>
            <div className="why-card" data-aos="fade-up" data-aos-delay="600">
              <div className="icon-wrap">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <h4>Affordable Pricing</h4>
              <p>
                Competitive pricing with flexible packages designed to fit businesses of all sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-number" data-target="2" data-suffix="+">
                0
              </div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-number" data-target="2" data-suffix="+">
                0
              </div>
              <div className="stat-label">Clients</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-number" data-target="2" data-suffix="+">
                0
              </div>
              <div className="stat-label">Designs</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="400">
              <div className="stat-number" data-target="24" data-suffix="/7">
                0
              </div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Trusted by businesses across industries for exceptional digital solutions
            </p>
          </div>
          <div className="testimonial-slide">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                The logo and branding package they created for us was phenomenal. Professional,
                creative, and perfectly aligned with our vision. Highly recommended!
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">IS</div>
                <div className="testimonial-info">
                  <h5>Inspiration Soft Solutions </h5>
                  <span> Founder Inspiration Soft Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

