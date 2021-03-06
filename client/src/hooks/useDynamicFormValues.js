import { useState } from "react";

const useDynamicFormValues = defaultState => {
  const [state, setState] = useState(defaultState);

  const handleChange = stateKey => e => {
    setState({ ...state, [stateKey]: e.target.value });
  };

  const clearState = defaultState => {
    setState(defaultState);
  };

  const handleDynamicChange = stateKey => e => {
    const { id, name, value } = e.target;
    setState({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        [name]: {
          ...state[stateKey][name],
          [id]: value
        }
      }
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

  const handleDynamicRemove = (a, name) => e => {
    const removeProperty = prop => ({ [prop]: _, ...rest }) => rest;
    const remove = removeProperty(name);
    const newState = remove(state[a]);

    setState({ ...state, [a]: newState });
  };

  const handleDynamicAdd = (a, defaultObject) => e => {
    setState({
      ...state,
      [a]: {
        ...state[a],
        [Date.now()]: defaultObject
      }
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
