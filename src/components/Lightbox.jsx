import React, { useEffect } from 'react';

const Lightbox = ({ isOpen, currentItem, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !currentItem) return null;

  return (
    <div className="lightbox active" onClick={(e) => e.target.classList.contains('lightbox') && onClose()}>
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous">
          <i className="fas fa-chevron-left"></i>
        </button>
        <img src={currentItem.img} alt={currentItem.title} />
        <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next">
          <i className="fas fa-chevron-right"></i>
        </button>
        <div className="lightbox-info">
          <h3>{currentItem.title}</h3>
          <p>{currentItem.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

