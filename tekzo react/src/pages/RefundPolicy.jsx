import React from 'react';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 data-aos="fade-up">Refund Policy</h1>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="100">
            <Link to="/">Home</Link> <span>/</span> <span>Refund Policy</span>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Support</span>
            <h2 className="section-title">Refund and cancellation terms</h2>
            <p className="section-subtitle">
              Review our policy for refunds, cancellations, and how we handle project changes.
            </p>
          </div>

          <div className="policy-content" data-aos="fade-up" data-aos-delay="100">
            <h3>Refund Eligibility</h3>
            <p>
              Refunds are evaluated based on the services provided, the project stage, and whether
              work has already been delivered. Once work has begun, partial refunds may apply based
              on the completed effort.
            </p>

            <h3>Project Cancellations</h3>
            <p>
              If you cancel a project after work begins, we will invoice for the hours spent and
              any third-party costs incurred. Deposit amounts may be non-refundable depending on the
              agreement.
            </p>

            <h3>Revisions and Deliverables</h3>
            <p>
              Revisions included in the project scope are provided as agreed in the proposal. Requests
              beyond the agreed scope may incur additional fees and do not automatically qualify for
              a refund.
            </p>

            <h3>How to Request a Refund</h3>
            <p>
              To request a refund, contact us at{' '}
              <a href="mailto:tektoitsolutions@gmail.com">tektoitsolutions@gmail.com</a> with your
              project details and reason for the request. We will review your request and respond
              promptly.
            </p>

            <h3>Exceptions</h3>
            <p>
              No refunds are available for services already delivered and accepted by the client.
              Refunds are also not available for third-party products or licenses purchased on
              behalf of the client.
            </p>

            <h3>Contact</h3>
            <p>
              If you have any questions about this policy, reach out to our support team at{' '}
              <a href="mailto:tektoitsolutions@gmail.com">tektoitsolutions@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default RefundPolicy;

