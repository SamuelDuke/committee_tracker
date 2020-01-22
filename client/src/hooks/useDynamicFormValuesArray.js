import { useState } from "react";

const useDynamicFormValues = defaultState => {
  const [state, setState] = useState(defaultState);

  const handleChange = stateKey => e => {
    setState({ ...state, [stateKey]: e.target.value });
  };

  // const handleDropdown = (stateKey, newState) => {
  //   setState({ ...state, [stateKey]: newState });
  // };

  const clearState = defaultState => {
    setState(defaultState);
  };

  const handleDynamicChange = stateKey => e => {
    const { id, name, value } = e.target;
    setState({
      ...state,
      [stateKey]: [
        ...state[stateKey].slice(0, parseInt(id, 10)),
        ...state[stateKey].slice(parseInt(id, 10) + 1, state[stateKey].length)
      ]
    });
  };

  const handleDynamicSelectChange = (data, info, stateKey) => {
    const { value, label } = data;
    const { name } = info;
    console.log("I was called");
    // const { id, name, value } = e.target;
    console.log({ stateKey, data, info });
    setState({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        [name]: {
          value,
          label
        }
      }
    });
  };

  const handleSelect = (data, info) => {
    setState({ ...state, [info.name]: data });
  };

  const handleCheckbox = a => {
    setState({
      ...state,
      [a]: !state[a]
    });
  };

  const handleDynamicRemove = stateKey => e => {
    const { id } = e.target;
    const index = parseInt(id, 10);
    setState([
      ...state[stateKey].slice(0, index),
      ...state[stateKey].slice(index + 1, state[stateKey].length)
    ]);
  };

  const handleDynamicAdd = (stateKey, defaultObject) => e => {
    console.log("Call to add Array was made");
    setState({
      ...state,
      [stateKey]: [...state[stateKey], defaultObject]
    });
  };

  return [
    state,
    handleChange,
    handleSelect,
    handleDynamicSelectChange,
    handleDynamicChange,
    handleDynamicAdd,
    handleDynamicRemove,
    handleCheckbox,
    clearState
  ];
};

export default useDynamicFormValues;
