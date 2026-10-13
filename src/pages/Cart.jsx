import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeQuantity, clearCart, removeFromCart } from "../store";
import { useToast } from "../context/ToastContext";

const ORDER_STEPS = [
  { icon: "✓", label: "Order placed" },
  { icon: "👨‍🍳", label: "Preparing" },
  { icon: "🔥", label: "Almost ready" },
  { icon: "🛵", label: "On the way" },
  { icon: "🎉", label: "Delivered!" },
];

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [checkoutStep, setCheckoutStep] = useState(null); // null | 0-4
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmt = Math.round(subtotal * discount);
  const total = subtotal - discountAmt;

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (code === "URBAN10") { setDiscount(0.1); setCouponMsg("✓ 10% discount applied!"); }
    else if (code === "FRESH20") { setDiscount(0.2); setCouponMsg("✓ 20% discount applied!"); }
    else { setDiscount(0); setCouponMsg("✕ Invalid coupon code."); }
  }

  function startCheckout() {
    setCheckoutStep(0);
    const interval = setInterval(() => {
      setCheckoutStep((prev) => {
        if (prev >= ORDER_STEPS.length - 1) {
          clearInterval(interval);
          dispatch(clearCart());
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  }

  function handleRemove(item) {
    dispatch(removeFromCart(item.id));
    showToast(`${item.name} removed from cart`, "info");
  }

  if (checkoutStep !== null) {
    return (
      <section className="section section-pad order-tracker">
        <span className="eyebrow">YOUR ORDER</span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,48px)", margin: "12px 0 30px" }}>
          {checkoutStep < ORDER_STEPS.length - 1 ? "Your order is on its way!" : "Order delivered! 🎉"}
        </h1>
        <div className="tracker-steps">
          {ORDER_STEPS.map((step, idx) => (
            <div key={idx} className={`tracker-step${idx <= checkoutStep ? " done" : ""}${idx === checkoutStep ? " active" : ""}`}>
              <div className="tracker-icon">{step.icon}</div>
              <span>{step.label}</span>
              {idx < ORDER_STEPS.length - 1 && <div className="tracker-line" />}
            </div>
          ))}
        </div>
        {checkoutStep === ORDER_STEPS.length - 1 && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <p className="muted" style={{ marginBottom: 20 }}>
              Thank you for your demo order! No real payment was processed.
            </p>
            <Link className="button button-primary" to="/menu">Order again</Link>
          </div>
        )}
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="section section-pad empty-state">
        <div className="empty-icon">♡</div>
        <h1>Your cart is taking a break.</h1>
        <p>Find something delicious to bring it back to life.</p>
        <Link className="button button-primary" to="/menu">Explore menu</Link>
      </section>
    );
  }

  return (
    <section className="section section-pad">
      <div className="page-heading">
        <span className="eyebrow">YOUR ORDER</span>
        <h1>Shopping cart<span className="accent-dot">.</span></h1>
        <p className="muted">{items.length} {items.length === 1 ? "item" : "items"} in your cart</p>
      </div>

      <div className="cart-layout">
        {/* Cart items */}
        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-main">
                <h3>{item.name}</h3>
                <p>₹{item.price} each</p>
                <div className="quantity">
                  <button onClick={() => dispatch(changeQuantity({ id: item.id, amount: -1 }))}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(changeQuantity({ id: item.id, amount: 1 }))}>+</button>
                </div>
              </div>
              <strong>₹{item.price * item.quantity}</strong>
              <button
                className="remove-button"
                onClick={() => handleRemove(item)}
                aria-label={`Remove ${item.name}`}
              >
                ×
              </button>
            </article>
          ))}
          <div className="cart-footer-actions">
            <button className="text-link" onClick={() => { dispatch(clearCart()); showToast("Cart cleared", "info"); }}>
              Clear cart
            </button>
            <Link className="text-link" to="/menu">+ Add more items</Link>
          </div>
        </div>

        {/* Order summary */}
        <aside className="summary-card">
          <h2>Order summary</h2>

          {/* Items list */}
          {items.map((item) => (
            <div key={item.id} style={{ fontSize: 11, display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
              <span>{item.name} ×{item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr />

          {/* Coupon */}
          <div className="coupon-row">
            <input
              className="coupon-input"
              value={coupon}
              onChange={(e) => { setCoupon(e.target.value); setCouponMsg(""); }}
              placeholder="Coupon code"
              aria-label="Coupon code"
            />
            <button className="button button-outline" onClick={applyCoupon} style={{ padding: "10px 12px", fontSize: 11 }}>
              Apply
            </button>
          </div>
          {couponMsg && (
            <p className={couponMsg.startsWith("✓") ? "success-message" : "field-error"} style={{ fontSize: 11, margin: "6px 0" }}>
              {couponMsg}
            </p>
          )}
          <div className="muted" style={{ fontSize: 10, margin: "4px 0 10px" }}>
            Try: <code>URBAN10</code> or <code>FRESH20</code>
          </div>

          <hr />
          <div><span>Subtotal</span><strong>₹{subtotal}</strong></div>
          {discount > 0 && <div style={{ color: "var(--green)" }}><span>Discount ({discount * 100}%)</span><strong>−₹{discountAmt}</strong></div>}
          <div><span>Delivery</span><strong>₹0</strong></div>
          <hr />
          <div className="summary-total"><span>Total</span><strong>₹{total}</strong></div>

          <button className="button button-primary button-wide" onClick={startCheckout}>
            Continue to checkout ↗
          </button>
          <small className="muted">Training demo. No real payment is processed.</small>
        </aside>
      </div>
    </section>
  );
}