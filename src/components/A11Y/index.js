import React from "react";

import "./a11y.scss";

const ScreenReaderText = (props) => {
  return <span className="screenReaderOnly">{props.children}</span>;
};

export default ScreenReaderText;
