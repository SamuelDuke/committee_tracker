import React from "react";
import Select from "react-select";

const authorityCommittiees = [
  { value: "boardOfTrustees", label: "Board of Trustees" },
  { value: "presidentsCouncil", label: "President's Council" },
  { value: "facultySenate", label: "Faculty Senate" },
  { value: "pace", label: "PACE" },
  { value: "uvusa", label: "UVUSA" }
];

const AuthoritySelect = props => {
  const { name, placeholder, value, onChange } = props;
  return (
    <Select
      name={name}
      value={value}
      placeholder={placeholder}
      options={authorityCommittiees}
      onChange={onChange}
    />
  );
};

export default AuthoritySelect;
