import React from "react";

const MemberList = props => {
  const { members } = props;

  const renderMembers = () => {
    return members.map((member, index) => {
      const { label, value } = member;
      return <li key={`${value}_${index}`}>{label}</li>;
    });
  };
  return <ul>{renderMembers()}</ul>;
};

export default MemberList;
