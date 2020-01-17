import { useState } from "react";

const useFormValues = defaultState => {
  const [state, setState] = useState(defaultState);

  const handleChange = stateValue => e => {
    setState({ ...state, [stateValue]: e.target.value });
  };

  const clearState = defaultState => {
    setState(defaultState);
  };

  const handleCheckbox = a => {
    setState({
      ...state,
      [a]: !state[a]
    });
  };

  return [state, handleChange, handleCheckbox, clearState];
};

export default useFormValues;
