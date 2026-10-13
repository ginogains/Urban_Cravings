import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import { localFoods } from "../data";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const DUMMY_REVIEWS = [
  { id: 1, name: "Sunita P.", rating: 5, date: "Oct 2026", text: "Absolutely fantastic! The taste is out of this world." },
  { id: 2, name: "Arjun K.", rating: 4, date: "Sep 2026", text: "Very good portion size and great flavour profile." },
  { id: 3, name: "Meera T.", rating: 5, date: "Sep 2026", text: "My all-time favourite here. Order it every single time!" },
];

export default function FoodDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { toggleWishlist, isWished } = useWishlist();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: "5", comment: "" });
  const [reviews, setReviews] = useState(DUMMY_REVIEWS);
  const [reviewSent, setReviewSent] = useState(false);
  const [activeTab, setActiveTab] = useState("details"); // "details" | "reviews"

  const food = localFoods.find((item) => String(item.id) === id);
  const wished = food ? isWished(food.id) : false;

  if (!food) {
    return (
      <section className="section section-pad empty-state">
        <h1>Dish not found</h1>
        <p>This demo detail page shows local menu items only.</p>
        <Link className="button button-primary" to="/menu">Back to menu</Link>
      </section>
    );
  }

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) dispatch(addToCart(food));
    showToast(`${qty}× ${food.name} added to cart 🛒`);
  }

  function handleWishlist() {
    toggleWishlist(food);
    showToast(wished ? `Removed from wishlist` : `Saved to wishlist ♡`, wished ? "info" : "success");
  }

  function submitReview(e) {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) return;
    const newReview = {
      id: Date.now(),
      name: reviewForm.name,
      rating: Number(reviewForm.rating),
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      text: reviewForm.comment,
    };
    setReviews([newReview, ...reviews]);
    setReviewForm({ name: "", rating: "5", comment: "" });
    setReviewSent(true);
    setTimeout(() => setReviewSent(false), 3000);
    showToast("Review submitted! Thank you 🙏");
  }

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="section section-pad">
      <div className="detail-layout">
        <div className="detail-img-wrap">
          <img src={food.image} alt={food.name} />
          {/* Wishlist heart overlay */}
          <button
            className={`detail-wish-btn${wished ? " wished" : ""}`}
            onClick={handleWishlist}
            aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
          >
            {wished ? "♥" : "♡"}
          </button>
        </div>
        <div>
          <span className="eyebrow">{food.category.toUpperCase()}</span>
          <h1>{food.name}</h1>
          <div className="detail-rating">
            <span className="stars">{"★".repeat(Math.round(food.rating))}{"☆".repeat(5 - Math.round(food.rating))}</span>
            <span> {food.rating} · {reviews.length} reviews</span>
          </div>
          <p>{food.description}</p>

          {/* Nutrition badges */}
          <div className="nutrition-badges">
            <span className="badge badge-green">🌿 Fresh</span>
            <span className="badge badge-orange">⚡ 25 min</span>
            <span className="badge badge-blue">🍽 {food.category}</span>
          </div>

          <div className="detail-price-row">
            <h2>₹{food.price}</h2>
            <span className="muted">per serving</span>
          </div>

          {/* Quantity selector */}
          <div className="qty-row">
            <span className="qty-label">Quantity</span>
            <div className="qty-control">
              <button
                className="qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                disabled={qty <= 1}
              >
                −
              </button>
              <span className="qty-value">{qty}</span>
              <button
                className="qty-btn"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="qty-total muted">= ₹{food.price * qty}</span>
          </div>

          <div className="detail-actions">
            <button className="button button-primary" onClick={handleAddToCart}>
              Add {qty > 1 ? `${qty}×` : ""} to cart
            </button>
            <Link className="button button-outline" to="/menu">Back to menu</Link>
          </div>
          <p className="muted" style={{ marginTop: 14 }}>
            Prepared fresh when you order. Please let our team know about any allergies.
          </p>
        </div>
      </div>

      {/* Tabs: Details | Reviews */}
      <div className="detail-tabs">
        <button
          className={`detail-tab${activeTab === "details" ? " active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
        <button
          className={`detail-tab${activeTab === "reviews" ? " active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {activeTab === "details" && (
        <div className="detail-extra">
          <div className="detail-info-grid">
            <div>
              <strong>Category</strong>
              <p>{food.category}</p>
            </div>
            <div>
              <strong>Prep time</strong>
              <p>~20–25 minutes</p>
            </div>
            <div>
              <strong>Serves</strong>
              <p>1 person</p>
            </div>
            <div>
              <strong>Available</strong>
              <p>Daily · 11 AM – 10 PM</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="reviews-section">
          <div className="reviews-summary">
            <div className="reviews-score">{avgRating}</div>
            <div>
              <div className="reviews-stars">{"★".repeat(Math.round(Number(avgRating)))}{"☆".repeat(5 - Math.round(Number(avgRating)))}</div>
              <p className="muted">{reviews.length} guest reviews</p>
            </div>
          </div>

          <div className="reviews-list">
            {reviews.map((r) => (
              <div className="review-item" key={r.id}>
                <div className="review-header">
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <strong>{r.name}</strong>
                    <span className="muted"> · {r.date}</span>
                  </div>
                  <div className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                </div>
                <p className="review-text">{r.text}</p>
              </div>
            ))}
          </div>

          {/* Leave a review form */}
          <form className="review-form form-card" onSubmit={submitReview}>
            <h3>Leave a review</h3>
            {reviewSent && <p className="success-message">✓ Review posted! Thank you.</p>}
            <label>
              Your name
              <input
                value={reviewForm.name}
                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                placeholder="Full name"
                required
              />
            </label>
            <label>
              Rating
              <select
                value={reviewForm.rating}
                onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
              >
                {["5", "4", "3", "2", "1"].map((n) => (
                  <option key={n} value={n}>{"★".repeat(Number(n))} ({n} star{n !== "1" ? "s" : ""})</option>
                ))}
              </select>
            </label>
            <label>
              Your review
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                rows="3"
                placeholder="Share your experience..."
                required
              />
            </label>
            <button className="button button-primary" type="submit">Submit review</button>
          </form>
        </div>
      )}
    </section>
  );
}