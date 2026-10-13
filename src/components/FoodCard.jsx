import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

export default function FoodCard({ food }) {
  const dispatch = useDispatch();
  const { toggleWishlist, isWished } = useWishlist();
  const { showToast } = useToast();
  const wished = isWished(food.id);

  function handleAddToCart() {
    dispatch(addToCart(food));
    showToast(`${food.name} added to cart 🛒`);
  }

  function handleWishlist(e) {
    e.preventDefault(); // prevent navigating to food detail
    toggleWishlist(food);
    showToast(
      wished ? `${food.name} removed from wishlist` : `${food.name} saved to wishlist ♡`,
      wished ? "info" : "success"
    );
  }

  return (
    <article className="food-card">
      <Link to={`/menu/${food.id}`} className="food-image-wrap">
        <img src={food.image} alt={food.name} className="food-image" loading="lazy" />
        <span className="food-tag">{food.tag || food.category}</span>
        <button
          className={`wish-btn${wished ? " wished" : ""}`}
          onClick={handleWishlist}
          aria-label={wished ? `Remove ${food.name} from wishlist` : `Save ${food.name} to wishlist`}
          title={wished ? "Remove from wishlist" : "Save to wishlist"}
        >
          {wished ? "♥" : "♡"}
        </button>
      </Link>
      <div className="food-info">
        <div className="food-title-row">
          <h3>{food.name}</h3>
          <span className="rating">★ {food.rating || "4.5"}</span>
        </div>
        <p>{food.description || "A delicious customer favourite made fresh to order."}</p>
        <div className="food-bottom">
          <strong>₹{food.price}</strong>
          <button className="add-button" onClick={handleAddToCart}>+ Add</button>
        </div>
      </div>
    </article>
  );
}