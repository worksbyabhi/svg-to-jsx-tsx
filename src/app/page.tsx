"use client";
import { useEffect, useRef } from "react";
import style from "./page.module.scss";

import { CoreComponent } from "@/core";

export default function Home() {
  const headerTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headerTitleRef && headerTitleRef.current) {
      headerTitleRef.current.focus();
    }
  }, []);

  return (
    <div className={style.svg2JsApp}>
      <CoreComponent />
    </div>
  );
}
