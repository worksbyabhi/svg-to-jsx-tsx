import React, { useRef, useState } from "react";
import "./main.scss";
import { convertToJSX } from "./convertToJSX";
import { fileDownloadHandler } from "./fileDownloadHandler";

export const MainComponent = () => {
  const userInputPreviewRef = useRef<HTMLDivElement>(null);
  const convertedPreviewRef = useRef<HTMLDivElement>(null);
  const [svgtring, setSvgString] = useState("");
  const [userConfig, setUserConfig] = useState({
    height: "36",
    width: "36",
    componentName: "SVG",
  });
  const [convertedJsx, setConvertedJsx] = useState("");

  const userConfigChangeHandler =
    (key: keyof typeof userConfig) => (value: string) => {
      const tempUserConfig = { ...userConfig };
      tempUserConfig[key] = value;
      setUserConfig(tempUserConfig);
    };

  const convertClickHandler = async () => {
    const convertToSvgResult = await convertToJSX(svgtring, {
      width: !Number.isNaN(userConfig.width) ? userConfig.width : "36",
      height: !Number.isNaN(userConfig.height) ? userConfig.width : "36",
      componentName: userConfig.componentName ?? "SVG",
    });
    if (userInputPreviewRef.current) {
      userInputPreviewRef.current.innerHTML = svgtring;
    }
    if (convertedPreviewRef.current) {
      convertedPreviewRef.current.innerHTML = convertToSvgResult.optimizedSvg;
    }
    setConvertedJsx(convertToSvgResult.JSXComponent);
  };

  return (
    <section id="svg2js-main" className="svg2js-main-section" role="main">
      <div className="contentContainer">
        <div className="leftContent">
          <label htmlFor="user-input-svg">SVG to convert:</label>
          <textarea
            id="user-input-svg"
            value={svgtring}
            onChange={(e) => setSvgString(e.target.value)}
          />
        </div>
        <div className="rightContent">
          {!!convertedJsx && <>User input preview:</>}
          <div className="userInputPreview" ref={userInputPreviewRef}></div>
          Optimized SVG component config:
          <div className="userInput">
            <label htmlFor="width-value">Width</label>
            <input
              id="width-value"
              type="text"
              value={userConfig.width}
              onChange={(e) => userConfigChangeHandler("width")(e.target.value)}
            />
            px
          </div>
          <div className="userInput">
            <label htmlFor="height-value">Height</label>
            <input
              id="height-value"
              type="text"
              value={userConfig.height}
              onChange={(e) =>
                userConfigChangeHandler("height")(e.target.value)
              }
            />
            px
          </div>
          <div className="userInput">
            <label htmlFor="component-name">Component name</label>
            <input
              id="component-name-value"
              type="text"
              value={userConfig.componentName}
              onChange={(e) =>
                userConfigChangeHandler("componentName")(e.target.value)
              }
            />
          </div>
          <button onClick={convertClickHandler}>Convert</button>
        </div>
      </div>
      <div className="contentContainer">
        <div className="leftContentPreview">
          <label htmlFor="converted-svg">Converted JSX code:</label>
          <textarea id="converted-svg" value={convertedJsx} />
        </div>
        <div className="rightContentPreview">
          <button
            className="downloadButton"
            onClick={() =>
              fileDownloadHandler(
                convertedJsx,
                `${userConfig.componentName}.tsx`
              )
            }
          >
            Download
          </button>
          <div className="convertedPreview" ref={convertedPreviewRef}></div>
        </div>
      </div>
    </section>
  );
};
