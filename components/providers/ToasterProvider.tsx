"use client";

import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      style: {
        fontFamily: '"Inter", sans-serif',
        borderRadius: "12px",
        background: "#2D2B55",
        color: "#ffffff",
        padding: "12px 16px",
      },
      success: {
        style: {
          background: "#1f9d55",
        },
      },
      error: {
        style: {
          background: "#c53030",
        },
      },
    }}
  />
);
