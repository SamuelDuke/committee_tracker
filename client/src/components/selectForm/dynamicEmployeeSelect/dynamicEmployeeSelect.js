import React from "react";
import AsyncSelect from "react-select/async";
import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import api, { authHeader } from "../../../apis/backend";

import "./dynamicEmployeeSelect.css";

export const defaultEmployee = { lable: null, value: {} };

const promiseOptions = inputValue => {
  if (!inputValue) inputValue = "A";
  return api
    .get(`/api/users/search/${inputValue}`, authHeader())
    .then(users => {
      const usersList = users.data.map(user => {
        return { value: user, label: user.name };
      });

      return usersList;
    })
    .catch(err => {
      console.log(err);
    });
};

const EmployeeSelect = props => {
  // state, handleChange, uniqueId, handleDynamicRemove
  const {
    value,
    placeholder,
    stateKey,
    handleChange,
    uniqueId,
    handleDynamicRemove
  } = props;

  const returnChange = (data, info) => {
    handleChange(data, info, stateKey);
  };

  return (
    <div className="member-select">
      <Form.Row>
        <Col>
          <AsyncSelect
            name={uniqueId}
            value={value}
            placeholder={placeholder}
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            onChange={returnChange}
          />
        </Col>
        <Col>
          <Button
            variant="outline-danger"
            onClick={handleDynamicRemove(stateKey, uniqueId)}
          >
            Remove
          </Button>
        </Col>
      </Form.Row>
    </div>
  );
};

export default EmployeeSelect;
