import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 data-aos="fade-up">Terms of Service</h1>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="100">
            <Link to="/">Home</Link> <span>/</span> <span>Terms of Service</span>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Legal</span>
            <h2 className="section-title">Your agreement with Tekzo IT Solutions</h2>
            <p className="section-subtitle">
              These Terms of Service govern access to and use of our website and digital services.
            </p>
          </div>

          <div className="policy-content" data-aos="fade-up" data-aos-delay="100">
            <h3>Acceptance of Terms</h3>
            <p>
              By using our website, requesting services, or communicating with Tekzo IT Solutions,
              you agree to these Terms of Service. If you do not agree with any part of these terms,
              please do not use our services.
            </p>

            <h3>Services</h3>
            <p>
              We provide web development, UI/UX design, branding, and social media solutions.
              Project scope, fees, timelines, and deliverables are confirmed in separate agreements
              and proposals for each client engagement.
            </p>

            <h3>Client Responsibilities</h3>
            <p>
              Clients must provide clear project requirements, timely feedback, access to necessary
              assets, and any approvals required to keep work on schedule.
            </p>

            <h3>Intellectual Property</h3>
            <p>
              Unless otherwise agreed, Tekzo IT Solutions retains ownership of the design and code
              until full payment is received. Upon payment, ownership of final deliverables transfers
              as described in the project agreement.
            </p>

            <h3>Payment Terms</h3>
            <p>
              Payment details, deposit requirements, and due dates are set in the client proposal or
              agreement. Late payments may result in project delays or suspension of work.
            </p>

            <h3>Limitation of Liability</h3>
            <p>
              Tekzo IT Solutions is not liable for indirect, incidental, or consequential damages
              arising from use of our services. Our total liability is limited to the amount paid for
              the relevant service.
            </p>

            <h3>Changes and Cancellations</h3>
            <p>
              Project changes are subject to review and may incur additional charges. Cancellation
              terms are defined in the project agreement and may include fees for work already
              completed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;

