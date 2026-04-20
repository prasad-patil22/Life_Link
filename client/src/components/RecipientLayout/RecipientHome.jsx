import React from "react";

const RecipientHome = () => {
  const user = JSON.parse(localStorage.getItem("userInfo") || "null");
  const name = user?.name || user?.user?.name || "Recipient";
  return (
    <div style={{ padding: 20 }}>
      <h2>Recipient Dashboard</h2>
      <p>Welcome, {name}!</p>
    </div>
  );
};

export default RecipientHome;
