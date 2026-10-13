import { Link } from "react-router-dom";
export default function NotFound() {
  return <section className="empty-state section-pad"><span className="eyebrow">404 · WRONG TURN</span><h1>This page isn't on the menu.</h1><p>Let's get you back to something delicious.</p><Link className="button button-primary" to="/">Go home</Link></section>;
}