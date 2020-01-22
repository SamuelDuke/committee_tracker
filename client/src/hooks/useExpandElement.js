import { useState } from "react";

const useExpandElement = () => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = e => setExpanded(!expanded);

  return [expanded, handleClick];
};

export default useExpandElement;
