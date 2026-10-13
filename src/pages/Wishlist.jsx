import { useWishlist } from "../context/WishlistContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  function handleAddToCart(food) {
    dispatch(addToCart(food));
    showToast(`${food.name} added to cart 🛒`);
  }

  function handleRemove(food) {
    toggleWishlist(food);
    showToast(`${food.name} removed from wishlist`, "info");
  }

  if (!wishlist.length) {
    return (
      <section className="section section-pad empty-state">
        <div className="empty-icon">♡</div>
        <h1>Your wishlist is empty.</h1>
        <p>Browse the menu and tap the heart icon to save your favourites.</p>
        <Link className="button button-primary" to="/menu">Explore menu</Link>
      </section>
    );
  }

  return (
    <section className="section section-pad">
      <div className="page-heading">
        <span className="eyebrow">YOUR SAVED DISHES</span>
        <h1>Wishlist<span className="accent-dot">.</span></h1>
        <p className="muted">{wishlist.length} saved {wishlist.length === 1 ? "dish" : "dishes"}</p>
      </div>

      <div className="food-grid">
        {wishlist.map((food) => (
          <article className="food-card wishlist-card" key={food.id}>
            <Link to={`/menu/${food.id}`} className="food-image-wrap">
              <img src={food.image} alt={food.name} className="food-image" loading="lazy" />
              <span className="food-tag">{food.tag || food.category}</span>
              <button
                className="wish-btn wished"
                onClick={(e) => { e.preventDefault(); handleRemove(food); }}
                aria-label={`Remove ${food.name} from wishlist`}
                title="Remove from wishlist"
              >
                ♥
              </button>
            </Link>
            <div className="food-info">
              <div className="food-title-row">
                <h3>{food.name}</h3>
                <span className="rating">★ {food.rating || "4.5"}</span>
              </div>
              <p>{food.description}</p>
              <div className="food-bottom">
                <strong>₹{food.price}</strong>
                <button className="add-button" onClick={() => handleAddToCart(food)}>
                  + Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          className="button button-primary"
          onClick={() => {
            wishlist.forEach((food) => dispatch(addToCart(food)));
            showToast(`All ${wishlist.length} items added to cart 🛒`);
          }}
        >
          Add all to cart
        </button>
        <Link className="button button-outline" to="/menu">Continue browsing</Link>
      </div>
    </section>
  );
}
