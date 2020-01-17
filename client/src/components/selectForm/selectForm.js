import React, { useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import PageLayout from "../shared/pageLayout";
import Input from "../shared/input";
import InputWithButton from "../shared/inputWithButton";

import DynamicInputList from "./dynamicInputList";
import AssignmentInput from "./assignmentInput";
import { defaultAssignment } from "./assignmentInput/assignmentInput";
import MemberInput from "./memberInput";
import { defaultMember } from "./memberInput/memberInput";

import api, { authHeader } from "../../apis/backend";
import useDynamicFormValues from "../../hooks/useDynamicFormValues";
// import useApiGet from "../../hooks/useApiGet";

import "./selectForm.css";

const defaultFormState = {
  title: "",
  chair: {},
  startDate: "",
  endDate: "",
  mission: "",
  vpSponser: "",
  authority: "",
  standing: false,
  assignments: {},
  members: {}
};

const SelectForm = props => {
  const [
    formState,
    handleChange,
    handleSelect,
    handleAsyncSelect,
    handleDynamicChange,
    handleDynamicAdd,
    handleDynamicRemove,
    handleDropdown,
    handleCheckbox,
    clearState
  ] = useDynamicFormValues(defaultFormState);

  const handleSubmit = e => {
    e.preventDefault();

    // This makes sure that the chair is set even if the value is not changed
    if (!formState.chair) {
      formState.chair = document.getElementById("chair").value;
    }

    // This only sends the UVID
    formState.chair = formState.chair.substr(formState.chair.length - 8);

    api
      .post("/api/committees", formState, authHeader())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    clearState(defaultFormState);
  };

  const committeeType = formState.standing ? "Adhoc" : "Standing";

  const promiseOptions = inputValue => {
    return api
      .get(`/api/users/${inputValue}`, authHeader())
      .then(users => {
        const usersList = users.data.map(user => {
          return { value: user, label: user.name };
        });

        console.log("usersList", usersList);
        return usersList;
      })
      .catch(err => {
        console.log(err);
      });

    // return list;
  };

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
            <AsyncSelect
              name="TestName"
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
              onChange={handleAsyncSelect("chair")}
            />
            {/* <InputDropdown
              id="chair"
              label="Chair"
              placeholder="Enter a Chair."
              type="Text"
              state={formState}
              handleChange={handleChange}
              dropdownList={userState.state}
            /> */}
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Input
              id="vpSponser"
              label="Vice Presidet Sponser"
              placeholder="Enter a Vice Presidet Sponser."
              type="Text"
              state={formState}
              handleChange={handleChange}
            />
          </Col>

          <Col>
            <Input
              id="authority"
              label="Authority Body"
              placeholder="Enter a Authority."
              type="Text"
              state={formState}
              handleChange={handleChange}
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
              id="mission"
              label="Mission Statement"
              placeholder="Enter a mission statement."
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

        <DynamicInputList
          Component={MemberInput}
          label="Members"
          defaultSchema={defaultMember}
          state={formState}
          stateValue="members"
          handleDynamicChange={handleDynamicChange}
          handleDynamicRemove={handleDynamicRemove}
          handleDynamicAdd={handleDynamicAdd}
        />
        <Form.Row>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control type="submit" />
          </Form.Group>
        </Form.Row>

        {/* <SearchableDropdownInput
          id="chair2"
          label="Chair"
          placeholder="Enter a Chair."
          type="Text"
          state={formState}
          handleChange={handleChange}
          dropdownList={userState.state}
        /> */}

        {/* <NewSerachDropdown
          stateKey="chair"
          state={formState}
          list={testObject}
          setState={handleDropdown}
        /> */}
      </Form>
      <div onClick={() => console.log(formState)}>Log formState</div>
    </PageLayout>
  );
};

export default SelectForm;
