import { Link } from "react-router-dom";
import { localFoods } from "../../data";
export default function AdminOverview() {
  const bookings = JSON.parse(localStorage.getItem("uc-bookings") || "[]");
  return <div className="admin-stats"><article className="stat-card"><span>Menu items</span><strong>{localFoods.length}</strong><Link to="/admin/foods">Manage menu →</Link></article><article className="stat-card"><span>Reservation requests</span><strong>{bookings.length}</strong><Link to="/admin/bookings">View bookings →</Link></article><article className="stat-card"><span>Cart state</span><strong>Redux</strong><p>Global state example</p></article><div className="admin-note"><strong>About this demo</strong><p>This is a frontend-only training dashboard. Menu edits are kept in the current page state; bookings are stored in this browser's localStorage. Do not use it for real customer data.</p></div></div>;
}