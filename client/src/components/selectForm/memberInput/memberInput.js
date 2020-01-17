import React from "react";
import AsyncSelect from "react-select/async";
import { Form, Col } from "react-bootstrap";

// import Input from "../../shared/input";
// import InputWithButton from "../../shared/inputWithButton";

export const defaultMember = {
  firstName: "",
  lastName: "",
  uvID: ""
};

const MemberInput = props => {
  const { state, handleAsyncSelect, uniqueId, handleDynamicRemove } = props;

  return (
    <div id={uniqueId}>
      <AsyncSelect
        // value={state[valueKey]}
        name="TestName"
        cacheOptions
        defaultOptions
        // loadOptions={promiseOptions}
        onChange={handleAsyncSelect("chair")}
      />
      <button onClick={handleDynamicRemove}>Remove</button>
    </div>
  );
};

export default MemberInput;
