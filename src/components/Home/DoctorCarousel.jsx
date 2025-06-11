import React, { useState, useEffect } from 'react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.photo} alt={doctor.name} />
      <h2>{doctor.name}</h2>
    </div>
  );
};

const DoctorCarousel = ({ doctors }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (autoScroll) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % doctors.length);
      }
    }, 3000); // scroll every 3 seconds

    return () => clearInterval(intervalId);
  }, [autoScroll, doctors.length]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % doctors.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + doctors.length) % doctors.length);
  };

  return (
    <div className="doctor-carousel">
      {doctors.map((doctor, index) => (
        <div
          key={doctor.id}
          className={`doctor-card-container ${index === activeIndex ? 'active' : ''}`}
        >
          <DoctorCard doctor={doctor} />
        </div>
      ))}
      <button className="prev-button" onClick={handlePrev}>
        &#8592;
      </button>
      <button className="next-button" onClick={handleNext}>
        &#8594;
      </button>
      <button className="toggle-auto-scroll" onClick={() => setAutoScroll(!autoScroll)}>
        {autoScroll ? 'Stop Auto Scroll' : 'Start Auto Scroll'}
      </button>
    </div>
  );
};

export default DoctorCarousel;