"use client";
import { useEffect, useRef } from "react";
import style from "./page.module.scss";

import Footer from "@/components/Footer";
import { MainComponent } from "@/components/Main";

export default function Home() {
  const headerTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headerTitleRef && headerTitleRef.current) {
      headerTitleRef.current.focus();
    }
  }, []);

  return (
    <div className={style.svg2JsApp}>
      <h1 ref={headerTitleRef}>Svg 2 Js</h1>
      <MainComponent />
      <Footer />
    </div>
  );
}
