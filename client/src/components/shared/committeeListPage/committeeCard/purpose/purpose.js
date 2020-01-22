import React from "react";

const Purpose = props => {
  const { purpose } = props;

  return (
    <div>
      <span className="card-body-heading">Purpose:</span>
      <p>{purpose}</p>
    </div>
  );
};

export default Purpose;
