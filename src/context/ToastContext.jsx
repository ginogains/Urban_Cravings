import { createContext, useContext, useReducer, useCallback } from "react";

// Toast context using useReducer for managing notification state.
const ToastContext = createContext(null);

function toastReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: action.id, message: action.message, kind: action.kind }];
    case "remove":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = useCallback((message, kind = "success") => {
    const id = Date.now() + Math.random();
    dispatch({ type: "add", id, message, kind });
    setTimeout(() => dispatch({ type: "remove", id }), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container rendered at root level so it's always on top */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.kind}`}>
            <span className="toast-icon">{toast.kind === "success" ? "✓" : toast.kind === "error" ? "✕" : "ℹ"}</span>
            <span>{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => dispatch({ type: "remove", id: toast.id })}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
