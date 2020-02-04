import React from "react";

import SelectFrom from "../selectForm";



const EditForm = props => {
  const {
    title,
    chair,
    sponsor,
    authorityBody,
    startDate,
    endDate,
    purpose,
    delegatedAuthority,
    standing,
    assignments,
    members
  } = props.location.state;

  console.log("Edit Form Dates", {
    startDate,
    endDate
  });

  return <SelectFrom edit={true} defaultState={props.location.state} />;
};

export default EditForm;
