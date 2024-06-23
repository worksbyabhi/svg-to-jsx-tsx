import prettier from "prettier";

import * as prettierPluginEstree from "prettier/plugins/estree";
import { optimize } from "svgo";

// convertToSvg

const parserBabel = require("prettier/plugins/babel");

export interface SVGConfig {
  height: string;
  width: string;
  componentName: string;
  ariaHidden: boolean;
}

export const convertToJSX = async (svgString: string, svgConfig: SVGConfig) => {
  const { height, width, componentName } = svgConfig;

  const domParser = new DOMParser();

  const originalSVGDoc = domParser.parseFromString(svgString, "image/svg+xml");
  const originalSVGElement = originalSVGDoc.getElementsByTagName("svg")[0];
  const originalSVGAttributeViewBox = originalSVGElement
    ? originalSVGElement.getAttribute("viewBox")
    : null;

  let optimizedSvg = "";
  try {
    const optimizeSvg = optimize(svgString, {
      multipass: true,
    });
    optimizedSvg = optimizeSvg.data;
  } catch (err) {
    console.log(err);
    optimizedSvg = "";
  }

  const SVGDoc = domParser.parseFromString(optimizedSvg, "image/svg+xml");
  const SVGElement = SVGDoc.getElementsByTagName("svg")[0];

  if (SVGElement) {
    SVGElement.setAttribute("height", height);
    SVGElement.setAttribute("width", width);
    if (svgConfig.ariaHidden) {
      SVGElement.setAttribute("aria-hidden", "true");
    }
    if (originalSVGAttributeViewBox) {
      SVGElement.setAttribute("viewBox", originalSVGAttributeViewBox);
    }

    const SVGElementString = SVGElement.outerHTML;

    const JSXComponentString =
      `import React from 'react';` +
      `export const ${componentName} = () => { return (` +
      SVGElementString +
      `);};`;

    const JSXFormattedComponentString = await prettier.format(
      JSXComponentString,
      {
        parser: "babel",
        plugins: [parserBabel, prettierPluginEstree],
        trailingComma: "es5",
        singleQuote: true,
        quoteProps: "consistent",
        bracketSameLine: true,
        printWidth: 80,
      }
    );

    return {
      optimizedSvg: SVGElementString,
      JSXComponent: JSXFormattedComponentString,
    };
  } else {
    return {
      optimizedSvg: "",
      JSXComponent: "",
    };
  }
};
