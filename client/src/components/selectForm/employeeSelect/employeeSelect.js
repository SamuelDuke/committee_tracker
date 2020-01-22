import React from "react";
import AsyncSelect from "react-select/async";

import api, { authHeader } from "../../../apis/backend";

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
  const { name, value, placeholder, onChange } = props;
  return (
    <AsyncSelect
      name={name}
      value={value}
      placeholder={placeholder}
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      onChange={onChange}
    />
  );
};

export default EmployeeSelect;
