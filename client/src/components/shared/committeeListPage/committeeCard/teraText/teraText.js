import React from "react";

const TeraText= props => {
  const { title, text } = props;

  return (
    <div>
      <span className="card-body-heading">{title}:</span>
      <p>{text}</p>
    </div>
  );
};

export default TeraText;
