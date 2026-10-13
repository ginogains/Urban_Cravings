import { useReducer, useState } from "react";
import { localFoods } from "../../data";

const initialFoods = localFoods;
function foodsReducer(state, action) {
  switch (action.type) {
    case "add": return [{ ...action.food, id: Date.now(), tag: "New" }, ...state];
    case "delete": return state.filter((food) => food.id !== action.id);
    case "edit": return state.map((food) => food.id === action.food.id ? action.food : food);
    default: return state;
  }
}
export default function ManageFoods() {
  const [foods, dispatch] = useReducer(foodsReducer, initialFoods);
  const [form, setForm] = useState({ name: "", category: "Burgers", price: "", description: "", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85", rating: 4.5 });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  function submit(e) {
    e.preventDefault();
    if (form.name.trim().length < 2 || Number(form.price) <= 0) { setMessage("Enter a dish name and a price greater than zero."); return; }
    const food = { ...form, price: Number(form.price), rating: Number(form.rating), id: editingId || Date.now() };
    dispatch({ type: editingId ? "edit" : "add", food });
    setForm({ name: "", category: "Burgers", price: "", description: "", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85", rating: 4.5 });
    setEditingId(null); setMessage(editingId ? "Dish updated." : "Dish added.");
  }
  function edit(food) { setEditingId(food.id); setForm({ ...food, price: String(food.price) }); setMessage(""); window.scrollTo({ top: 0, behavior: "smooth" }); }
  return <div className="manage-layout"><form className="form-card admin-form" onSubmit={submit}><h2>{editingId ? "Edit dish" : "Add a dish"}</h2>{message && <p className="notice">{message}</p>}<label>Dish name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required minLength="2" /></label><div className="form-grid"><label>Category<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{["Burgers","Pizza","Pasta","Sides","Desserts","Drinks","Wraps"].map((c) => <option key={c}>{c}</option>)}</select></label><label>Price (₹)<input type="number" min="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></label></div><label>Description<textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label><button className="button button-primary button-wide">{editingId ? "Save changes" : "Add dish"}</button>{editingId && <button type="button" className="button button-outline button-wide" onClick={() => { setEditingId(null); setForm({ name: "", category: "Burgers", price: "", description: "", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85", rating: 4.5 }); }}>Cancel edit</button>}</form>
    <div className="admin-table-wrap"><h2>Menu inventory <span className="muted">({foods.length})</span></h2><div className="admin-food-list">{foods.map((food) => <div className="admin-food-row" key={food.id}><img src={food.image} alt="" /><div><strong>{food.name}</strong><small>{food.category} · ₹{food.price}</small></div><button className="small-action" onClick={() => edit(food)}>Edit</button><button className="small-action danger" onClick={() => dispatch({ type: "delete", id: food.id })}>Delete</button></div>)}</div><p className="muted">CRUD demo uses useReducer. Changes reset when the page reloads.</p></div></div>;
}