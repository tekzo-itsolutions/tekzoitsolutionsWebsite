import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from '../components/Lightbox';
import Particles from '../components/Particles';

const portfolioData = [
  {
    category: 'websites',
    title: 'Single PAge Website',
    desc: 'A modern Single Page website with responsive design and CMS integration.',
    img: 'images/Screenshot 2026-06-09 230415.png',
    label: 'Single page Website',
    tag: 'Websites'
  },
  {
    category: 'websites',
    title: 'E-Commerce Platform',
    desc: 'Full-featured e-commerce platform with payment gateway integration.',
    img: 'images/travelling web.jpeg',
    label: 'E-Commerce Platform',
    tag: 'Websites'
  },
  {
    category: 'ui-design',
    title: 'Mobile App UI',
    desc: 'Clean and intuitive mobile application interface design.',
    img: 'images/tekzo ui.png',
    label: 'Mobile App UI',
    tag: 'UI Design'
  },
  {
    category: 'logo-design',
    title: 'Apex Brand Logo',
    desc: 'Minimalist logo design for a technology startup.',
    img: 'images/inspiration logo.jpeg',
    label: ' Brand Logo',
    tag: 'Logo Design'
  },
  {
    category: 'Visiting Card',
    title: 'Visiting Card',
    desc: 'Complete Visiting Card including logo, colors, and Design.',
    img: 'images/vicitingcard.png',
    label: 'Visiting Card',
    tag: 'Visiting Card'
  },
  {
    category: 'social-media',
    title: 'Instagram Campaign',
    desc: 'Creative social media campaign design for brand awareness.',
    img: 'images/portfolio/social-1.svg',
    label: 'Instagram Campaign',
    tag: 'Social Media Designs'
  }
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = portfolioData.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  return (
    <>
      <section className="page-hero">
        <Particles count={15} />
        <div className="container">
          <h1 data-aos="fade-up">Our Portfolio</h1>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="100">
            <Link to="/">Home</Link> <span>/</span> <span>Portfolio</span>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Our Work</span>
            <h2 className="section-title">Portfolio Gallery</h2>
            <p className="section-subtitle">
              Explore our latest projects across web development, design, and branding
            </p>
          </div>

          <div className="portfolio-filters" data-aos="fade-up">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${activeFilter === 'websites' ? 'active' : ''}`}
              onClick={() => setActiveFilter('websites')}
            >
              Websites
            </button>
            <button
              className={`filter-btn ${activeFilter === 'ui-design' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ui-design')}
            >
              UI Design
            </button>
            <button
              className={`filter-btn ${activeFilter === 'logo-design' ? 'active' : ''}`}
              onClick={() => setActiveFilter('logo-design')}
            >
              Logo Design
            </button>
            <button
              className={`filter-btn ${activeFilter === 'Visiting Card' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Visiting Card')}
            >
              Visiting Card
            </button>
            <button
              className={`filter-btn ${activeFilter === 'social-media' ? 'active' : ''}`}
              onClick={() => setActiveFilter('social-media')}
            >
              Social Media Designs
            </button>
          </div>

          <div className="portfolio-grid">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="portfolio-item"
                data-category={item.category}
                data-title={item.title}
                data-desc={item.desc}
                data-aos="fade-up"
                style={{ animation: 'fadeIn 0.5s ease' }}
                onClick={() => openLightbox(idx)}
              >
                <img src={item.img} alt={item.label} />
                <div className="portfolio-overlay">
                  <i className="fas fa-search-plus"></i>
                  <h4>{item.label}</h4>
                  <span>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        isOpen={lightboxOpen}
        currentItem={filteredItems[currentIndex]}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
};

export default Portfolio;

