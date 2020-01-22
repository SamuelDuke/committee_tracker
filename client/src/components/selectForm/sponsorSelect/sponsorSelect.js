import React from "react";
import AsyncSelect from "react-select/async";

import api, { authHeader } from "../../../apis/backend";

const promiseOptions = () => {
    return api
      .get(`/api/users/sponsors`, authHeader())
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

const SponsorSelect = props => {
    const {name,value, placeholder, onChange} = props
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

export default SponsorSelect;
