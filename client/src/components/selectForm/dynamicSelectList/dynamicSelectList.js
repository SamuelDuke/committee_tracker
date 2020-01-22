import React from "react";
import { Col, Form } from "react-bootstrap";

const DynamicSelectList = props => {
  const {
    Component,
    label,
    defaultSchema,
    state,
    stateKey,
    handleDynamicChange,
    handleDynamicRemove,
    handleDynamicAdd
  } = props;

  const renderComponent = () => {
    const keys = Object.keys(state[stateKey]);

    return keys.map(key => {
      return (
        <Component
          key={key}
          state={state}
          stateKey={stateKey}
          value={state[stateKey][key]}
          handleChange={handleDynamicChange}
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
            onClick={handleDynamicAdd(stateKey, defaultSchema)}
          />
        </Col>
        <Col></Col>
      </Form.Row>
    </React.Fragment>
  );
};

export default DynamicSelectList;
