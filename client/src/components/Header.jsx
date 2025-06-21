import React from "react";

const Header = ({ user, onLogout }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>✨ Solo Sparks</h1>
      {user && (
        <div style={styles.userSection}>
          <span style={styles.welcome}>Welcome, {user.name}!</span>
          <button style={styles.logout} onClick={onLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    background: "linear-gradient(135deg, #007cf0, #00dfd8)",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "4px solid #eee",
    fontFamily: "Segoe UI, sans-serif"
  },
  logo: {
    fontSize: "24px",
    margin: 0
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  welcome: {
    fontWeight: "500"
  },
  logout: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Header;
