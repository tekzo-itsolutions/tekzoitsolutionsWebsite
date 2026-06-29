import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles';
import { supabase } from '../utils/supabase';

const Contact = () => {
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (window.location.search.includes('submitted=true') || window.location.search.includes('success=true')) {
      setStatusMsg({
        type: 'success',
        text: '🎉 Thank You! Your message has been successfully delivered. A confirmation email has been sent to your entered email address!'
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg({ text: '', type: '' });

    const form = e.target;
    const data = new FormData(form);

    const nameVal = data.get('name') || 'Anonymous Client';
    const phoneVal = data.get('phone') || 'N/A';
    const emailVal = data.get('email') || 'N/A';
    const serviceVal = data.get('service') || 'General Inquiry';
    const msgVal = data.get('message') || '';

    // Save to Supabase
    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: nameVal.trim(),
          phone: phoneVal.trim(),
          email: emailVal.trim(),
          service: serviceVal,
          message: msgVal.trim()
        }
      ]);
      if (error) throw error;
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
      // Fallback to localStorage for compatibility and robustness
      try {
        const record = {
          id: Date.now(),
          name: nameVal.trim(),
          phone: phoneVal.trim(),
          email: emailVal.trim(),
          service: serviceVal,
          message: msgVal.trim(),
          date:
            new Date().toLocaleDateString() +
            ' ' +
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const existing = JSON.parse(localStorage.getItem('tekzo_inquiries') || '[]');
        localStorage.setItem('tekzo_inquiries', JSON.stringify([record, ...existing]));
      } catch (localErr) {
        console.warn('Could not save local storage fallback', localErr);
      }
    }

    const payload = {
      name: nameVal,
      email: emailVal,
      phone: phoneVal,
      service: serviceVal,
      message: msgVal,
      _subject: `New Website Inquiry - Tekzo IT Solutions`,
      _template: 'table',
      _captcha: 'false',
      _autoresponse: `Dear ${nameVal},\n\nThank you for reaching out to Tekzo IT Solutions!\n\nWe have received your inquiry regarding "${serviceVal}". Our expert team will review your requirements and get back to you within 24 hours.\n\nBest Regards,\nTekzo IT Solutions Team\n🌐 https://tekzoitsolutions.com\n📞 +91 99132 90604\n📧 tektoitsolutions@gmail.com`
    };

    try {
      const res = await fetch(`https://formsubmit.co/ajax/tektoitsolutions@gmail.com`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Network response was not ok');
      setStatusMsg({
        type: 'success',
        text: '🎉 Thank You! Your message has been sent successfully.'
      });
      form.reset();
    } catch (err) {
      console.error('Contact form AJAX error, submitting directly:', err);
      form.action = 'https://formsubmit.co/tektoitsolutions@gmail.com';
      form.submit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="page-hero">
        <Particles count={15} />
        <div className="container">
          <h1 data-aos="fade-up">Contact Us</h1>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="100">
            <Link to="/">Home</Link> <span>/</span> <span>Contact Us</span>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div
            className="contact-details-header"
            data-aos="fade-up"
            style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}
          >
            <span className="section-tag">Reach Out To Us</span>
            <h2>Get in Touch</h2>
            <p className="contact-details-intro">
              Have a project in mind, need branding support, or looking to boost your digital
              presence? Fill out the form below and our expert team will respond promptly.
            </p>
          </div>

          <div className="contact-wrapper">
            <div className="contact-info-cards" data-aos="fade-right">
              <div className="contact-info-card">
                <div className="icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4>Call Us Direct</h4>
                  <p>
                    <a href="tel:+919913290604">+91 99132 90604</a>
                  </p>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="icon">
                  <i className="fas fa-envelope-open-text"></i>
                </div>
                <div>
                  <h4>Email Address</h4>
                  <p>
                    <a href="mailto:tektoitsolutions@gmail.com">tektoitsolutions@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div>
                  <h4>Visit Office</h4>
                  <p>Vapi, Gujarat, India</p>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-form" data-aos="fade-left">
              <h3 style={{ marginBottom: '25px', fontWeight: 800, fontSize: '1.6rem' }}>
                Send Us a Message
              </h3>
              {statusMsg.text && (
                <div className={statusMsg.type === 'success' ? 'form-success show' : 'form-error show'}>
                  {statusMsg.text}
                </div>
              )}
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="from_name">
                      Full Name <span style={{ color: '#e53e3e' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone Number <span style={{ color: '#e53e3e' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="from_email">
                    Email Address <span style={{ color: '#e53e3e' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="from_email"
                    name="email"
                    placeholder="e.g. name@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <select id="service" name="service" defaultValue="General Inquiry">
                    <option value="Web Development & Custom Website">
                      Web Development & Custom Website
                    </option>
                    <option value="Logo & UI/UX Design">Logo & UI/UX Design</option>
                    <option value="Branding & Identity Support">Branding & Identity Support</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">
                    Project Details / Message <span style={{ color: '#e53e3e' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project requirements, timeline, or questions..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <i className="fas fa-paper-plane"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section map-section" data-aos="fade-up">
        <div className="container">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.52982230402!2d72.85044439999999!3d20.3718591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0ce2b33c1626f%3A0xb2b4d952d4bf6895!2sVapi%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tekzo IT Solutions Office Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

