import { NavLink, Outlet } from "react-router-dom";
export default function AdminLayout() {
  return <section className="section section-pad"><div className="page-heading"><span className="eyebrow">STAFF WORKSPACE</span><h1>Admin dashboard<span className="accent-dot">.</span></h1><p>Manage menu items and view demo reservation requests.</p></div><div className="admin-tabs"><NavLink end to="/admin">Overview</NavLink><NavLink to="/admin/foods">Manage foods</NavLink><NavLink to="/admin/bookings">Bookings</NavLink></div><Outlet /></section>;
}