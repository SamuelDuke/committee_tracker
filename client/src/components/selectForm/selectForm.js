import React from "react";

import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";

import PageLayout from "../shared/pageLayout";
import Input from "../shared/input";
import InputWithButton from "../shared/inputWithButton";
import EmployeeSelect from "./employeeSelect";
import DynamicEmployeeSelect from "./dynamicEmployeeSelect";
import { defaultEmployee } from "./employeeSelect/employeeSelect";
import SponsorSelect from "./sponsorSelect";
import AuthoritySelect from "./authoritySelect";

import DynamicInputList from "./dynamicInputList";
import DynamicSelectList from "./dynamicSelectList";
import AssignmentInput from "./assignmentInput";
import { defaultAssignment } from "./assignmentInput/assignmentInput";

import api, { authHeader } from "../../apis/backend";
import useDynamicFormValues from "../../hooks/useDynamicFormValues";

import "./selectForm.css";

const defaultState = {
  title: "",
  chair: { lable: null, value: {} },
  sponsor: { lable: null, value: {} },
  authorityBody: { lable: null, value: {} },
  startDate: "",
  endDate: "",
  purpose: "",
  delegatedAuthority: "",
  standing: false,
  assignments: {},
  members: {}
};

const SelectForm = props => {
  const { edit } = props;
  const defaultFormState = props.defaultState || defaultState;

  const [
    formState,
    handleChange,
    handleSelect,
    handleDynamicSelectChange,
    handleDynamicChange,
    handleDynamicAdd,
    handleDynamicRemove,
    handleCheckbox,
    clearState
  ] = useDynamicFormValues(defaultFormState);

  const handleSubmit = e => {
    e.preventDefault();

    if (edit) {
      api
        .put("/api/committees", formState, authHeader())
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      api
        .post("/api/committees", formState, authHeader())
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    clearState(defaultFormState);
  };

  const committeeType = formState.standing ? "Adhoc" : "Standing";

  return (
    <PageLayout header="Committee Charter Form">
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Input
              id="title"
              label="Title"
              placeholder="Enter a title."
              type="Text"
              state={formState}
              handleChange={handleChange}
            />
          </Col>

          <Col>
            <Form.Label>Chair</Form.Label>
            <EmployeeSelect
              name="chair"
              value={formState.chair}
              placeholder="Select a chair."
              onChange={handleSelect}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Label>Sponsor</Form.Label>
            <SponsorSelect
              name="sponsor"
              value={formState.sponsor}
              placeholder="Select a sponsor."
              onChange={handleSelect}
            />
          </Col>

          <Col>
            <Form.Label>Authority Body</Form.Label>
            <AuthoritySelect
              name="authorityBody"
              value={formState.authorityBody}
              placeholder="Select an authority body."
              onChange={handleSelect}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <InputWithButton
              id="startDate"
              label={`Start Date for ${committeeType} Committee`}
              placeholder="Enter a start date."
              type="date"
              buttonText={
                formState.standing ? "Switch to Standing" : "Switch to Adhoc"
              }
              state={formState}
              handleChange={handleChange}
              onClick={() => handleCheckbox("standing")}
            />
          </Col>
          {formState.standing ? (
            <Col>
              <Input
                id="endDate"
                label="End Date"
                placeholder="Enter an end date."
                type="date"
                state={formState}
                handleChange={handleChange}
              />
            </Col>
          ) : (
            <Col></Col>
          )}
        </Form.Row>

        <Form.Row>
          <Col>
            <Input
              id="purpose"
              label="Purpose"
              placeholder="Enter the purpose of the committe."
              as="textarea"
              rows="4"
              type="date"
              state={formState}
              handleChange={handleChange}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Input
              id="delegatedAuthority"
              label="Delegated Authority"
              placeholder="Enter the purpose of the committe."
              as="textarea"
              rows="4"
              type="date"
              state={formState}
              handleChange={handleChange}
            />
          </Col>
        </Form.Row>

        <DynamicInputList
          Component={AssignmentInput}
          label="Assignments"
          defaultSchema={defaultAssignment}
          state={formState}
          stateValue="assignments"
          handleDynamicChange={handleDynamicChange}
          handleDynamicRemove={handleDynamicRemove}
          handleDynamicAdd={handleDynamicAdd}
        />

        <DynamicSelectList
          Component={DynamicEmployeeSelect}
          label="Members"
          defaultSchema={defaultEmployee}
          state={formState}
          stateKey="members"
          handleDynamicChange={handleDynamicSelectChange}
          handleDynamicRemove={handleDynamicRemove}
          handleDynamicAdd={handleDynamicAdd}
        />
        <Form.Row>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control type="submit" />
          </Form.Group>
        </Form.Row>
      </Form>
      <div onClick={() => console.log(formState)}>Log formState</div>
    </PageLayout>
  );
};

export default SelectForm;
