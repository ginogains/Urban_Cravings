import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { localFoods } from "../data";
import useFetchData from "../hooks/useFetchData";

const PAGE_SIZE = 6;
const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "name-asc", label: "Name: A–Z" },
];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid"); // "grid" | "list"

  const page = Math.max(1, Number(searchParams.get("page") || 1));

  // API integration + custom hook
  const { data: apiFoods, loading, error } = useFetchData("https://dummyjson.com/recipes?limit=8");

  const foods = useMemo(() => {
    const apiItems = Array.isArray(apiFoods)
      ? apiFoods.map((item) => ({
          id: `api-${item.id}`,
          name: item.name,
          category: item.cuisine || "Chef's special",
          price: 149 + (item.id % 5) * 30,
          rating: item.rating,
          description: item.ingredients?.slice(0, 3).join(", ") || "A tasty recipe selected by our kitchen.",
          image: item.image,
          tag: "Online pick",
        }))
      : [];
    return [...localFoods, ...apiItems];
  }, [apiFoods]);

  const categories = ["All", ...new Set(foods.map((food) => food.category))];

  const filtered = useMemo(() => {
    let result = foods.filter(
      (food) =>
        food.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || food.category === category)
    );
    switch (sort) {
      case "price-asc":   result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-desc":  result = [...result].sort((a, b) => b.price - a.price); break;
      case "rating-desc": result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case "name-asc":    result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return result;
  }, [foods, search, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function changePage(next) {
    setSearchParams(next === 1 ? {} : { page: String(next) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    changePage(1);
  }

  function handleCategory(e) {
    setCategory(e.target.value);
    changePage(1);
  }

  // Page numbers to display
  const pageNums = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <section className="section section-pad">
      <div className="page-heading">
        <span className="eyebrow">FRESH FROM OUR KITCHEN</span>
        <h1>Explore the menu<span className="accent-dot">.</span></h1>
        <p>Find your next favourite. There is something delicious for every craving.</p>
      </div>

      {/* Toolbar */}
      <div className="menu-toolbar">
        <label className="search-box">
          <span>⌕</span>
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search dishes..."
            aria-label="Search dishes"
          />
          {search && (
            <button
              className="clear-search"
              onClick={() => { setSearch(""); changePage(1); }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>
        <div className="toolbar-right">
          <label className="filter-label">
            Category{" "}
            <select value={category} onChange={handleCategory}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="filter-label">
            Sort{" "}
            <select value={sort} onChange={(e) => { setSort(e.target.value); changePage(1); }}>
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
          <div className="view-toggle" role="group" aria-label="View mode">
            <button
              className={`view-btn${view === "grid" ? " active" : ""}`}
              onClick={() => setView("grid")}
              aria-label="Grid view"
              title="Grid view"
            >
              ⊞
            </button>
            <button
              className={`view-btn${view === "list" ? " active" : ""}`}
              onClick={() => setView("list")}
              aria-label="List view"
              title="List view"
            >
              ≡
            </button>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="menu-status">
        <span className="muted">
          {filtered.length} {filtered.length === 1 ? "dish" : "dishes"} found
          {search && <> for "<strong>{search}</strong>"</>}
          {category !== "All" && <> in <strong>{category}</strong></>}
        </span>
      </div>

      {loading && <p className="notice">Loading extra dishes from the recipe API…</p>}
      {error && <p className="notice">{error} The local menu is still available.</p>}

      {visible.length ? (
        <div className={view === "list" ? "food-list-view" : "food-grid"}>
          {visible.map((food) => (
            view === "list"
              ? <FoodListRow key={food.id} food={food} />
              : <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="empty-state compact">
          <div className="empty-icon">🍽</div>
          <h3>No dishes found</h3>
          <p>Try another search term or category.</p>
          <button
            className="button button-outline"
            onClick={() => { setSearch(""); setCategory("All"); changePage(1); }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="pagination">
          <span>Page {currentPage} of {pageCount}</span>
          <div className="page-nums">
            <button
              className="button button-outline"
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              ← Prev
            </button>
            {pageNums.map((n) => (
              <button
                key={n}
                className={`page-num-btn${n === currentPage ? " active" : ""}`}
                onClick={() => changePage(n)}
                aria-current={n === currentPage ? "page" : undefined}
              >
                {n}
              </button>
            ))}
            <button
              className="button button-outline"
              disabled={currentPage === pageCount}
              onClick={() => changePage(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// List-view row component for food items
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";

function FoodListRow({ food }) {
  const dispatch = useDispatch();
  const { toggleWishlist, isWished } = useWishlist();
  const { showToast } = useToast();
  const wished = isWished(food.id);

  return (
    <article className="food-list-row">
      <Link to={`/menu/${food.id}`} className="food-list-img-wrap">
        <img src={food.image} alt={food.name} className="food-list-img" loading="lazy" />
      </Link>
      <div className="food-list-info">
        <div className="food-list-top">
          <div>
            <span className="food-tag" style={{ position: "static", marginBottom: 6, display: "inline-block" }}>{food.tag || food.category}</span>
            <Link to={`/menu/${food.id}`}><h3 className="food-list-title">{food.name}</h3></Link>
            <p className="food-list-desc">{food.description}</p>
          </div>
          <div className="food-list-actions">
            <span className="rating">★ {food.rating || "4.5"}</span>
            <strong className="food-list-price">₹{food.price}</strong>
            <button className="add-button" onClick={() => { dispatch(addToCart(food)); showToast(`${food.name} added to cart 🛒`); }}>
              + Add
            </button>
            <button
              className={`wish-btn${wished ? " wished" : ""}`}
              onClick={() => { toggleWishlist(food); showToast(wished ? `Removed from wishlist` : `Saved to wishlist ♡`, wished ? "info" : "success"); }}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            >
              {wished ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}