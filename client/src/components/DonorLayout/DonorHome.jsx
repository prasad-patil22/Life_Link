import React from "react";

const DonorHome = () => {
  const user = JSON.parse(localStorage.getItem("userInfo") || "null");
  const name = user?.name || user?.user?.name || "Donor";
  return (
    <div style={{ padding: 20 }}>
      <h2>Donor Dashboard</h2>
      <p>Welcome, {name}!</p>
    </div>
  );
};

export default DonorHome;
