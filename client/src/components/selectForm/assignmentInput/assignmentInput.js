import React from "react";

import { Col, Form } from "react-bootstrap";

import Input from "../../shared/input";
import InputWithButton from "../../shared/inputWithButton";

export const defaultAssignment = {
  discription: "",
  deliverable: "",
  dueDate: ""
};

const AssignmentInput = props => {
  const { state, handleChange, uniqueId, handleDynamicRemove } = props;

  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "10px",
        padding: "6px",
        margin: "6px",
        marginBottom: "10px"
      }}
      key={uniqueId}
    >
      <Form.Row>
        <Col>
          <Input
            id="discription"
            label="Description"
            name={uniqueId}
            placeholder="Enter a discription of the assignment."
            as="textarea"
            rows="2"
            type="Text"
            state={state.assignments[uniqueId]}
            handleChange={handleChange}
          />
        </Col>
        <Col>
          <Input
            id="deliverable"
            label="Deliverable"
            name={uniqueId}
            placeholder="Enter what will be delivered. For example: Presentation to President's Council."
            as="textarea"
            rows="2"
            state={state.assignments[uniqueId]}
            handleChange={handleChange}
          />
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <InputWithButton
            id="dueDate"
            label="Due Date"
            name={uniqueId}
            placeholder="Enter an due date."
            type="Date"
            variant="outline-danger"
            buttonText="Remove"
            state={state.assignments[uniqueId]}
            handleChange={handleChange}
            onClick={handleDynamicRemove("assignments", uniqueId)}
          />
        </Col>
      </Form.Row>
    </div>
  );
};

export default AssignmentInput;
