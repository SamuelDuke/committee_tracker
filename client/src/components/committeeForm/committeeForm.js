import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import Select from "react-select";

import Input from "../shared/input";
import PageLayout from "../shared/pageLayout";

import sponsorOptions from "./sponsorOptions";

import "./committeeForm.css";

const CommitteeForm = props => {
  const formState = {};
  const handleChange = () => {
    console.log("I was Changed");
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Submitted");
  };

  console.log(sponsorOptions);

  return (
    <PageLayout header="Committee Charter Form">
      <Form onSubmit={handleSubmit}>
        <Select isSearchable options={sponsorOptions} />
      </Form>
    </PageLayout>
  );
};

export default CommitteeForm;
