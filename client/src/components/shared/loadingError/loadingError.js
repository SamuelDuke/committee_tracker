import React from "react";

const LoadingOrError = props => {
  const { error } = props;

  return (
    <React.Fragment>
      {error
        ? "There was an error accessing the server. Please try reload the page later."
        : "Loading..."}
    </React.Fragment>
  );
};

export default LoadingOrError;