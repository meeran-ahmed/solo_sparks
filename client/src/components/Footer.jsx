import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <h4 style={styles.contact}>📞 Contact Me</h4>
      <p>👨‍💻 Meeran Ahmed</p>
      <p>📱 8015186448</p>
      <p>📧 meeranahmed@gmail.com</p>
      <p style={styles.design}>🛠️ Designed & Built with 💻 by Meeran</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#001f3f",
    color: "white",
    textAlign: "center",
    padding: "20px",
    marginTop: "40px",
    fontFamily: "Segoe UI, sans-serif"
  },
  contact: {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "600"
  },
  design: {
    marginTop: "10px",
    fontStyle: "italic",
    fontSize: "14px",
    color: "#ccc"
  }
};

export default Footer;
