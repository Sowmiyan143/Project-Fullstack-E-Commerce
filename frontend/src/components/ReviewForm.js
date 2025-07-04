import React, { useState } from 'react';


function ReviewForm({ isOpen, onClose }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const maxLength = 300;
    const [image, setImage] = useState(null);
    const token = localStorage.getItem("access_token");

    if (!isOpen) return null
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', reviewText);
        formData.append('rating', rating);
        if (image) {
            formData.append('image',image);
        }

        const res = await fetch('http://127.0.0.1:8000/api/submit_review/',{
            method:'POST',
            headers:{
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (res.ok) {
            alert("Review submitted!");
            onClose();
        } else {
            alert("Something went wrong");
        }
    };
    
  return (
    <div className="popup-overlay">
      <div className="popup-content">
            <button  className="close-btn" onClick={onClose}>&times;</button>
            <h2>Submit Review</h2>
            <form onSubmit={handleSubmit} >
            <textarea
                placeholder="Your review..."
                required
                maxLength={maxLength}
                value={reviewText}
                onChange={(e)=>setReviewText(e.target.value)}
                />
            <div style={{ textAlign: "right", fontSize: "14px", color: "#777" }}>
                {reviewText.length}/{maxLength}
            </div>

            <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                <i
                    key={star}
                    className={`fa-star ${hoverRating >= star || rating >= star ? 'fas' : 'far'}`}
                    style={{ color: '#ff523b', cursor: 'pointer' }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                />
                ))}
            </div>

                <label htmlFor="fileUpload">User Image:  </label>
                <input type="file" id="fileUpload" accept='image/*'  onChange={(e)=>setImage(e.target.files[0])}/>
            <button className="btn" type="submit">Submit</button>
            </form>
      </div>
    </div>
  );
}

export default ReviewForm;
