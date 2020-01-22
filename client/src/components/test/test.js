import React, { useState } from "react";

const defaultMembers = [
  { label: "Sam Winterton", value: "A123" },
  { label: "Erica Winterton", value: "A124" },
  { label: "Quinley Winterton", value: "A125" }
];

const defaultSchema = { label: "", value: "" };

const Test = props => {
  const [members, setMembers] = useState(defaultMembers);
  
  
  const add = () => {
    setMembers([...members, defaultSchema]);
  };

  const remove = e => {
    const { id } = e.target;
    const index = parseInt(id, 10);
    setMembers([
      ...members.slice(0, index),
      ...members.slice(index + 1, members.length)
    ]);
  };

  const handleOnChange = e => {
    const { id, name, value } = e.target;

    setMembers(
      members.map((member, index) => {
        if (index !== parseInt(id, 10)) {
          return member;
        }
        return {
          ...member,
          [name]: value
        };
      })
    );
  };

  const renderList = () => {
    return members.map((member, index) => {
      return (
        <div key={`member-${index}`}>
          <label>Name</label>
          <input
            name="label"
            id={index}
            onChange={handleOnChange}
            value={members[index].label}
          />
          <label>Value</label>
          <input
            name="value"
            id={index}
            onChange={handleOnChange}
            value={members[index].value}
          />
          <p>{index}</p>
          <input type="button" id={index} value="Delete" onClick={remove} />
        </div>
      );
    });
  };

  return (
    <div>
      {renderList()}
      <div onClick={add}>Add</div>
      <div onClick={() => console.log(members)}>Log Members</div>
    </div>
  );
};

export default Test;
