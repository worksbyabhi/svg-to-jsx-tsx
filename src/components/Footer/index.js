import React from "react";

import "./footer.scss";
import SnowImage from "../../assets/images/snow";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-cog">
        <SnowImage />
      </div>
      <div className="copyright">
        <i>
          Copyright &copy;&nbsp;
          <a
            href="http://getabhishek.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            2024 Abhishek Kumar
          </a>
        </i>
      </div>
    </footer>
  );
};

export default Footer;
