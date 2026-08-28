import React from 'react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles';

const VisionMission = () => {
  return (
    <>
      <section className="page-hero">
        <Particles count={15} />
        <div className="container">
          <h1 data-aos="fade-up">Vision & Mission</h1>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="100">
            <Link to="/">Home</Link> <span>/</span> <span>Vision & Mission</span>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="vm-card" data-aos="fade-up">
            <i className="fas fa-eye"></i>
            <h2>Our Vision</h2>
            <p>
              To be the most trusted and innovative digital solutions partner globally, empowering
              businesses of all sizes to thrive in the digital era through cutting-edge technology,
              exceptional design, and strategic digital marketing.
            </p>
          </div>
          <div className="vm-card" data-aos="fade-up" data-aos-delay="200">
            <i className="fas fa-bullseye"></i>
            <h2>Our Mission</h2>
            <p>
              To deliver transformative digital experiences that drive measurable business growth. We
              are committed to understanding our clients' unique challenges and crafting tailored
              solutions that combine technical excellence with creative innovation, all while
              maintaining the highest standards of integrity and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

  
      <section className="section section-gradient">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Strategy</span>
            <h2 className="section-title">Business Growth Strategy</h2>
            <p className="section-subtitle">
              A structured approach to scaling our impact and reach
            </p>
          </div>
          <div className="strategy-grid">
            <div className="strategy-card" data-aos="fade-up" data-aos-delay="100">
              <div className="step">1</div>
              <h4>Market Research</h4>
              <p>
                Continuous analysis of market trends, client needs, and competitive landscape to
                identify growth opportunities.
              </p>
            </div>
            <div className="strategy-card" data-aos="fade-up" data-aos-delay="200">
              <div className="step">2</div>
              <h4>Service Diversification</h4>
              <p>
                Expanding our offerings to include emerging technologies like AI, cloud solutions,
                and e-commerce platforms.
              </p>
            </div>
            <div className="strategy-card" data-aos="fade-up" data-aos-delay="300">
              <div className="step">3</div>
              <h4>Client Retention</h4>
              <p>
                Building long-term partnerships through exceptional service, regular communication,
                and ongoing support.
              </p>
            </div>
            <div className="strategy-card" data-aos="fade-up" data-aos-delay="400">
              <div className="step">4</div>
              <h4>Talent Development</h4>
              <p>
                Investing in team training, certifications, and a culture of continuous learning and
                innovation.
              </p>
            </div>
            <div className="strategy-card" data-aos="fade-up" data-aos-delay="500">
              <div className="step">5</div>
              <h4>Digital Marketing</h4>
              <p>
                Leveraging SEO, content marketing, and social media to build brand authority and
                attract quality leads.
              </p>
            </div>
            <div className="strategy-card" data-aos="fade-up" data-aos-delay="600">
              <div className="step">6</div>
              <h4>Strategic Partnerships</h4>
              <p>
                Forming alliances with technology providers and agencies to deliver comprehensive
                solutions at scale.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisionMission;

