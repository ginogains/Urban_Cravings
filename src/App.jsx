import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import FoodDetails from "./pages/FoodDetails";
import Reservations from "./pages/Reservations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import ManageFoods from "./pages/admin/ManageFoods";
import ManageBookings from "./pages/admin/ManageBookings";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="menu/:id" element={<FoodDetails />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        {/* Nested admin routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="foods" element={<ManageFoods />} />
          <Route path="bookings" element={<ManageBookings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}