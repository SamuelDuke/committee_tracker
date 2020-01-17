import React from "react";
import { Col, Form } from "react-bootstrap";

const DynamicInputList = props => {
  const {
    Component,
    label,
    defaultSchema,
    state,
    stateValue,
    handleDynamicChange,
    handleDynamicRemove,
    handleDynamicAdd
  } = props;

  const renderComponent = () => {
    const keys = Object.keys(state[stateValue]);

    return keys.map(key => {
      return (
        <Component
          key={key}
          state={state}
          handleChange={() => handleDynamicChange(stateValue)}
          uniqueId={key}
          handleDynamicRemove={handleDynamicRemove}
        />
      );
    });
  };

  return (
    <React.Fragment>
      <Form.Label>{label}</Form.Label>

      {renderComponent()}
      <Form.Row>
        <Col>
          <Form.Control
            style={{
              backgroundColor: "#00843D",
              boarderRadius: "15px",
              color: "white",
              fontWeight: "bold"
            }}
            type="button"
            value={`Add to ${label}`}
            onClick={handleDynamicAdd(stateValue, defaultSchema)}
          />
        </Col>
        <Col></Col>
      </Form.Row>
    </React.Fragment>
  );
};

export default DynamicInputList;
