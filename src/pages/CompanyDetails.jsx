import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles';

const CompanyDetails = () => {
  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="page-hero">
        <Particles count={15} />
        <div className="container">
          <h1 data-aos="fade-up">Company Details</h1>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="100">
            <Link to="/">Home</Link> <span>/</span> <span>Company Details</span>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="detail-block">
            <div className="detail-content" data-aos="fade-right">
              <span className="section-tag">Profile</span>
              <h3>Company Overview</h3>
              <p>
                Tekzo IT Solutions is a premier digital agency headquartered in India, specializing
                in comprehensive web development, creative design, branding, and social media
                management services. Established with a passion for technology and creativity, we
                have rapidly grown to become a trusted name in the digital solutions industry.
              </p>
              <p>
                Our company operates with a client-first philosophy, delivering customized solutions
                that align with each client's unique business goals. We serve a diverse portfolio of
                clients including startups, SMEs, and large enterprises across retail, healthcare,
                education, hospitality, and technology sectors.
              </p>
              <p>
                With a team of certified professionals and a proven methodology, Tekzo IT Solutions
                ensures every project is delivered with precision, creativity, and within agreed
                timelines.
              </p>
            </div>
            <div className="about-image" data-aos="fade-left">
              <img src="images/Company Details img.png" alt="Tekzo Company Overview" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Expertise</span>
            <h2 className="section-title">Business Areas</h2>
            <p className="section-subtitle">Our core competencies across the digital spectrum</p>
          </div>
          <div className="business-areas">
            <div className="business-card" data-aos="fade-up" data-aos-delay="100">
              <i className="fas fa-code"></i>
              <h4>Web Development</h4>
            </div>
            <div className="business-card" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-paint-brush"></i>
              <h4>Designing</h4>
            </div>
            <div className="business-card" data-aos="fade-up" data-aos-delay="300">
              <i className="fas fa-crown"></i>
              <h4>Branding</h4>
            </div>
            <div className="business-card" data-aos="fade-up" data-aos-delay="400">
              <i className="fas fa-hashtag"></i>
              <h4>Social Media Handling</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up" style={{ marginBottom: '40px' }}>
            <span className="section-tag" style={{ color: 'var(--silver)' }}>
              Milestones
            </span>
            <h2 className="section-title">Our Achievements</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-item" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-number" data-target="1" data-suffix="+">
                0
              </div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-number" data-target="3" data-suffix="+">
                0
              </div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-number" data-target="4" data-suffix="+">
                0
              </div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="400">
              <div className="stat-number" data-target="3" data-suffix="+">
                0
              </div>
              <div className="stat-label">Team Members</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyDetails;

