import React from "react";

const AdminHome = () => {
  const user = JSON.parse(localStorage.getItem("userInfo") || "null");
  const name = user?.name || user?.user?.name || "Admin";
  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {name}!</p>
    </div>
  );
};

export default AdminHome;
