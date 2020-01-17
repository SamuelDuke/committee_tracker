import React from "react";

import { Form, InputGroup, Button } from "react-bootstrap";

const InputWithButton = props => {
  const {
    id,
    label,
    state,
    name,
    handleChange,
    type,
    placeholder,
    rows,
    as,
    onClick,
    buttonText,
    variant
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
      <InputGroup>
        <Form.Control
          onChange={handleChange(id)}
          value={state[id]}
          name={newName}
          type={type}
          rows={rows}
          as={as}
          placeholder={placeholder}
        />

        <InputGroup.Append>
          <Button onClick={onClick} variant={variant}>
            {buttonText}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
};

export default InputWithButton;
