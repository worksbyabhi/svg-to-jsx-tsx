"use client";
import "./header.scss";

import WhiteLogoSVG from "../../assets/images/logo-white";
import ScreenReaderText from "../A11Y";
import Link from "next/link";

export const HeaderComponent = (props) => {
  return (
    <header>
      <Link
        className="logo-home-button"
        href="https://worksbyabhi.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhiteLogoSVG />
        <ScreenReaderText>home</ScreenReaderText>
      </Link>
      <h1>SVG to JSX/TSX Converter</h1>
    </header>
  );
};
