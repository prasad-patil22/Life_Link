import React from "react";
import { Outlet } from "react-router-dom";
import UserFooter from "../UserLayout/UserFooter";
import RecipientNavbar from "./RecipientNavbar";


const RecipientLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <RecipientNavbar />
      </div>
      {/* Main Czontent (Outlet) */}
      <div style={{ flex: 1, paddingTop: "75px", paddingBottom: "40px" }}>
        <Outlet />
      </div>
      {/* Fixed Footer */}
      <div
        style={{
          position: "float",
          bottom: 0,
          width: "100%",
          zIndex: 100,
          backgroundColor: "black",
          color: "white",
        }}
      >
        <UserFooter />
      </div>
    </div>
  );
};
export default RecipientLayout;
