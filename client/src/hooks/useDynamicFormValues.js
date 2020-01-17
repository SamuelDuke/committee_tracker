import { useState } from "react";

const useDynamicFormValues = defaultState => {
  const [state, setState] = useState(defaultState);

  const handleChange = stateKey => e => {
    setState({ ...state, [stateKey]: e.target.value });
  };

  const handleSelect = (stateKey, value) => {
    setState({ ...state, [stateKey]: value });
  };

  const handleDropdown = (stateKey, newState) => {
    setState({ ...state, [stateKey]: newState });
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

  const handleAsyncSelect = (stateKey) => value => {
    setState({ ...state, [stateKey]: value.value });
  };

  const handleDynamicAsyncSelect = (stateKey) => value => {
    setState({ ...state, 
      [stateKey]: {
        ...state[stateKey],
      } });
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
    handleAsyncSelect,
    handleDynamicChange,
    handleDynamicAdd,
    handleDynamicRemove,
    handleDropdown,
    handleCheckbox,
    clearState
  ];
};

export default useDynamicFormValues;
