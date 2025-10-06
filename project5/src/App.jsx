import { useState } from "react";
import "./App.css";

function ReviewApp() {
  const initialForm = {
    username: "",
    review: "",
    rating: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [formErr, setFormErr] = useState({});
  const [reviews, setReviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleError = () => {
    let errors = {};

    if (formData.username.trim() === "") {
      errors.usernameErr = "Username is required";
    }

    if (formData.review.trim() === "") {
      errors.reviewErr = "Review text is required";
    }

    if (formData.rating === "") {
      errors.ratingErr = "Rating is required";
    } else if (formData.rating < 1 || formData.rating > 5) {
      errors.ratingErr = "Rating must be between 1 and 5";
    }

    setFormErr(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleError()) {
      setReviews([...reviews, formData]);
      setFormData(initialForm);
    }
  };

  return (
    <div className="app-container">
      <h2>Feedback App</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {formErr.usernameErr && <span className="error">{formErr.usernameErr}</span>}
        <br />

        <label>Review:</label>
        <textarea
          name="review"
          value={formData.review}
          onChange={handleChange}
        ></textarea>
        {formErr.reviewErr && <span className="error">{formErr.reviewErr}</span>}
        <br />

        <label>Rating:</label>
        <div className="rating">
          <input
            type="radio"
            id="star5"
            name="rating"
            value="5"
            checked={formData.rating === "5"}
            onChange={handleChange}
          />
          <label htmlFor="star5" title="Excellent!"></label>

          <input
            type="radio"
            id="star4"
            name="rating"
            value="4"
            checked={formData.rating === "4"}
            onChange={handleChange}
          />
          <label htmlFor="star4" title="Great!"></label>

          <input
            type="radio"
            id="star3"
            name="rating"
            value="3"
            checked={formData.rating === "3"}
            onChange={handleChange}
          />
          <label htmlFor="star3" title="Good"></label>

          <input
            type="radio"
            id="star2"
            name="rating"
            value="2"
            checked={formData.rating === "2"}
            onChange={handleChange}
          />
          <label htmlFor="star2" title="Okay"></label>

          <input
            type="radio"
            id="star1"
            name="rating"
            value="1"
            checked={formData.rating === "1"}
            onChange={handleChange}
          />
          <label htmlFor="star1" title="Bad"></label>
        </div>
        {formErr.ratingErr && <span className="error">{formErr.ratingErr}</span>}
        <br />

        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews-list">
        <h3>Submitted Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((rev, index) => (
            <div key={index} className="review-card">
              <h4>{rev.username}</h4>
              <p>{rev.review}</p>
              <p>{"⭐".repeat(Number(rev.rating))} ({rev.rating} / 5)</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewApp;
