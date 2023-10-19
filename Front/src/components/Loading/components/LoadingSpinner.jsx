import React from 'react';
import './LoadingSpinner.css'; 

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="heartbeat">
          <img src='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png' alt="Logo" width="auto" height="200px" />
        </div>
      </div>
      <h3 className='pt-2'>Loading...</h3>
    </div>
  );
}

export default LoadingSpinner;