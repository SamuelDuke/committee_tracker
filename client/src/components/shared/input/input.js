import React from "react";

import Form from "react-bootstrap/Form";

const Input = props => {
  const {
    id,
    label,
    state,
    name,
    handleChange,
    type,
    placeholder,
    rows,
    as
  } = props;
  
  let newName = "";
  if (!name) {
    newName = id;
  } else {
    newName = name;
  }

  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={handleChange(id)}
        value={state[id]}
        name={newName}
        type={type}
        rows={rows}
        as={as}
        placeholder={placeholder}
      />
    </Form.Group>
  );
};

export default Input;
