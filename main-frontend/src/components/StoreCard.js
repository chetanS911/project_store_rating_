import React from 'react';

const StoreCard = ({ store, onRate }) => {
  const handleRatingSubmit = (newRating) => {
    
    onRate(store.id, newRating);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
      <h3>{store.name}</h3>
      <p><strong>Address:</strong> {store.address}</p>
      <p><strong>Overall Rating:</strong> {store.overallRating ? parseFloat(store.overallRating).toFixed(2) : 'Not Rated Yet'}</p>
      <p><strong>Your Rating:</strong> {store.myRating || 'You have not rated'}</p>

      <div>
        <strong>Rate this store:</strong>
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => handleRatingSubmit(star)} style={{margin: '0 5px'}}>
            {star} ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreCard;