import React from "react";

import "./pageLayout.css";

const PageLayout = props => {
  const { header } = props;

  return (
    <div>
      <div className="myheader">
        <p className="header-title">{header}</p>
      </div>

      <div className="container">{props.children}</div>
    </div>
  );
};

export default PageLayout;
