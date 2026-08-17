import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    document.body.classList.add('loading');
    const timer = setTimeout(() => {
      setIsHidden(true);
      document.body.classList.remove('loading');
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('loading');
    };
  }, []);

  return (
    <div className={`loader ${isHidden ? 'hidden' : ''}`}>
      <img src="/images/tekzo logo 12.png" alt="Tekzo IT Solutions" className="loader-logo" />
      <div className="loader-bar">
        <div className="loader-progress"></div>
      </div>
    </div>
  );
};

export default Loader;

