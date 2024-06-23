import React, { useRef, useState } from "react";
import "./main.scss";
import { convertToJSX } from "./convertToJSX";
import { fileDownloadHandler } from "./fileDownloadHandler";
import DownloadSVG from "@/assets/images/download";

export const CoreComponent = () => {
  const convertedPreviewRef = useRef<HTMLDivElement>(null);
  const [svgtring, setSvgString] = useState("");
  const [userConfig, setUserConfig] = useState({
    height: "36",
    width: "36",
    componentName: "SVG",
    ariaHidden: true,
    isTsx: true,
  });
  const [convertedJsx, setConvertedJsx] = useState("");

  const userConfigChangeHandler =
    (key: keyof typeof userConfig) => (value: string | boolean) => {
      const tempUserConfig = { ...userConfig };
      if (
        typeof value === "string" &&
        (key === "height" || key === "width" || key === "componentName")
      ) {
        tempUserConfig[key] = value;
      } else if (
        typeof value === "boolean" &&
        (key === "ariaHidden" || key === "isTsx")
      ) {
        tempUserConfig[key] = value;
      }

      setUserConfig(tempUserConfig);
    };

  const fileDownloadClickHandler = () => {
    fileDownloadHandler(
      convertedJsx,
      `${userConfig.componentName}.${userConfig.isTsx ? "tsx" : "jsx"}`
    );
  };

  const convertClickHandler = async () => {
    const convertToSvgResult = await convertToJSX(svgtring, {
      width: !Number.isNaN(userConfig.width) ? userConfig.width : "36",
      height: !Number.isNaN(userConfig.height) ? userConfig.width : "36",
      componentName: userConfig.componentName ?? "SVG",
      ariaHidden: userConfig.ariaHidden,
    });
    if (convertedPreviewRef.current) {
      convertedPreviewRef.current.innerHTML = convertToSvgResult.optimizedSvg;
    }
    setConvertedJsx(convertToSvgResult.JSXComponent);
  };

  return (
    <main id="svg2js-main" className="svg2js-main-section">
      <h2>Convert Your SVG to JSX/TSX</h2>
      <form className="contentContainer" action={convertClickHandler}>
        <div className="leftContent">
          <label htmlFor="user-input-svg">Paste your SVG code here:</label>
          <textarea
            id="user-input-svg"
            value={svgtring}
            onChange={(e) => setSvgString(e.target.value)}
          />
        </div>
        <div className="rightContent">
          Optimized SVG component config:
          <div className="userInput">
            <label htmlFor="width-value">width (in px)</label>
            <input
              id="width-value"
              type="text"
              value={userConfig.width}
              onChange={(e) => userConfigChangeHandler("width")(e.target.value)}
            />
          </div>
          <div className="userInput">
            <label htmlFor="height-value">height (in px)</label>
            <input
              id="height-value"
              type="text"
              value={userConfig.height}
              onChange={(e) =>
                userConfigChangeHandler("height")(e.target.value)
              }
            />
          </div>
          <div className="userInput">
            <label htmlFor="export-name-value">export name</label>
            <input
              id="export-name-value"
              type="text"
              value={userConfig.componentName}
              onChange={(e) =>
                userConfigChangeHandler("componentName")(e.target.value)
              }
            />
          </div>
          <div className="userInput">
            <label htmlFor="isAriaHidden">aria hidden</label>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="isAriaHidden"
                checked={userConfig.ariaHidden}
                onChange={(e) =>
                  userConfigChangeHandler("ariaHidden")(e.target.checked)
                }
              />
            </div>
          </div>
          <div className="userInput">
            <label htmlFor="isTsxExport">.tsx (if checked else .jsx)</label>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="isTsxExport"
                checked={userConfig.isTsx}
                onChange={(e) =>
                  userConfigChangeHandler("isTsx")(e.target.checked)
                }
              />
            </div>
          </div>
          <button disabled={!svgtring} type="submit">
            Convert
          </button>
        </div>
      </form>
      <section className="outputContainer">
        <div className="output-title-action">
          <h3>Converted Code:</h3>
          <button
            aria-label={`download ${userConfig.componentName}.${userConfig.isTsx ? "tsx" : "jsx"}`}
            onClick={fileDownloadClickHandler}
            disabled={!convertedJsx}
          >
            <DownloadSVG />
          </button>
        </div>
        <div className="output-code">
          <div className="leftContentPreview">
            <textarea
              id="converted-svg"
              aria-label="Converted Code"
              value={convertedJsx}
              readOnly
            />
          </div>
          <div className="rightContentPreview">
            <div className="convertedPreview" ref={convertedPreviewRef}></div>
          </div>
        </div>
      </section>
    </main>
  );
};
