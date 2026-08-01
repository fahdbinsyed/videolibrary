import React from "react";
import { useData } from "context/Data-context";
import "./toast.css";

export function ToastContainer() {
  const { toasts } = useData();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-message toast-${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
