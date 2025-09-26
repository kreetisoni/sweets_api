import React from "react";

export default function Loading() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh"
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: "4px solid #eee",
        borderTop: "4px solid #1890ff",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
