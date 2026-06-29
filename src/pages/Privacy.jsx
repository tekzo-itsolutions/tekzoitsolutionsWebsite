import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 data-aos="fade-up">Privacy Policy</h1>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="100">
            <Link to="/">Home</Link> <span>/</span> <span>Privacy Policy</span>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Privacy</span>
            <h2 className="section-title">How we protect your data</h2>
            <p className="section-subtitle">
              This policy describes how Tekzo IT Solutions collects, uses, and safeguards your
              personal information.
            </p>
          </div>

          <div className="policy-content" data-aos="fade-up" data-aos-delay="100">
            <h3>Information We Collect</h3>
            <p>
              We collect information you provide directly, including name, email address, phone
              number, project details, and billing information. We may also collect technical data
              from your visits to our website, such as IP address, browser type, and device
              information.
            </p>

            <h3>How We Use Information</h3>
            <p>
              Your information is used to respond to inquiries, provide services, send updates, and
              improve our website and offerings. We do not sell or share your personal data with
              third parties for marketing purposes.
            </p>

            <h3>Cookies and Tracking</h3>
            <p>
              We may use cookies and similar technologies to enhance site performance, remember
              preferences, and analyze user activity. You can control cookie settings through your
              browser, but some site features may be affected.
            </p>

            <h3>Data Security</h3>
            <p>
              We implement reasonable safeguards to protect your personal information. However, no
              transmission over the internet or storage solution is completely secure.
            </p>

            <h3>Retention</h3>
            <p>
              We retain your information only as long as necessary to provide services, comply with
              legal obligations, and resolve disputes.
            </p>

            <h3>Contact Us</h3>
            <p>
              If you have questions about this Privacy Policy or want to request updates to your
              personal data, please contact us at{' '}
              <a href="mailto:tektoitsolutions@gmail.com">tektoitsolutions@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;

