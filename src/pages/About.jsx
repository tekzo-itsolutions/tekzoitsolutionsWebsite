import React from 'react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles';

const About = () => {
  return (
    <>
      <section className="page-hero">
        <Particles count={15} />
        <div className="container">
          <h1 data-aos="fade-up">About Us</h1>
          <p data-aos="fade-up" data-aos-delay="50">
            Learn more about Tekzo IT Solutions and our journey
          </p>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="100">
            <Link to="/">Home</Link> <span>/</span> <span>About Us</span>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="about-intro">
            <div className="about-image" data-aos="fade-right">
              <img src="/images/about us img.png" alt="Tekzo IT Solutions Office" />
            </div>
            <div className="about-text" data-aos="fade-left">
              <span className="section-tag">Our Story</span>
              <h2>Company Introduction</h2>
              <p>
                Tekzo IT Solutions was founded with a singular vision: to bridge the gap between
                innovative ideas and powerful digital execution. What started as a small team of
                passionate developers and designers has grown into a full-service digital agency
                trusted by businesses across industries.
              </p>
              <p>
                We specialize in crafting bespoke web solutions, stunning visual identities, and
                impactful social media strategies that help our clients stand out in an increasingly
                competitive digital landscape. Every project we undertake is approached with
                meticulous attention to detail and a commitment to excellence.
              </p>
              <p>
                Our multidisciplinary team combines technical expertise with creative flair, ensuring
                that every solution we deliver is not only functional but also visually compelling
                and strategically sound.
              </p>
              <Link to="/contact" className="btn btn-silver" style={{ marginTop: '16px' }}>
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gradient">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">What Drives Us</span>
            <h2 className="section-title">Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            <div className="value-card" data-aos="fade-up" data-aos-delay="100">
              <i className="fas fa-lightbulb"></i>
              <h4>Innovation</h4>
              <p>
                We embrace cutting-edge technologies and creative approaches to deliver
                forward-thinking solutions.
              </p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-gem"></i>
              <h4>Quality</h4>
              <p>
                Excellence is non-negotiable. We maintain the highest standards in every line of code
                and pixel of design.
              </p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="300">
              <i className="fas fa-handshake"></i>
              <h4>Integrity</h4>
              <p>
                Transparency, honesty, and ethical practices form the foundation of all our client
                relationships.
              </p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="400">
              <i className="fas fa-heart"></i>
              <h4>Customer Satisfaction</h4>
              <p>
                Your success is our success. We go above and beyond to ensure complete client
                satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Our Edge</span>
            <h2 className="section-title">Why Tekzo IT Solutions</h2>
            <p className="section-subtitle">
              What sets us apart in the digital solutions landscape
            </p>
          </div>
          <div className="why-tekzo-grid">
            <div className="why-tekzo-card" data-aos="fade-up" data-aos-delay="100">
              <span className="number">01</span>
              <div>
                <h4>End-to-End Solutions</h4>
                <p>
                  From concept to launch, we handle every aspect of your digital project under one
                  roof.
                </p>
              </div>
            </div>
            <div className="why-tekzo-card" data-aos="fade-up" data-aos-delay="200">
              <span className="number">02</span>
              <div>
                <h4>Client-Centric Approach</h4>
                <p>
                  We listen, understand, and tailor our solutions to meet your unique business
                  objectives.
                </p>
              </div>
            </div>
            <div className="why-tekzo-card" data-aos="fade-up" data-aos-delay="300">
              <span className="number">03</span>
              <div>
                <h4>Proven Track Record</h4>
                <p>
                  150+ successful projects delivered for clients ranging from startups to established
                  enterprises.
                </p>
              </div>
            </div>
            <div className="why-tekzo-card" data-aos="fade-up" data-aos-delay="400">
              <span className="number">04</span>
              <div>
                <h4>Continuous Innovation</h4>
                <p>
                  We stay ahead of industry trends to ensure your digital presence remains
                  competitive and relevant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

