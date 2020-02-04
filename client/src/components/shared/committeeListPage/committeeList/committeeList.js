import React from "react";

import CommitteeCard from "../committeeCard";

const formatDate = dateFromServer => {
  console.log({ dateFromServer });
  const date = new Date(dateFromServer);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return year + "-" + month + "-" + dt;
};

const CommitteeCardList = props => {
  const { committees } = props;

  const renderList = () => {
    return committees.map(committee => {
      committee.startDate = formatDate(committee.startDate);
      committee.endDate = formatDate(committee.endDate) || null;
      if (committee.assignments) {
        committee.assignments = committee.assignments.map(assignment => {
          assignment.dueDate = formatDate(assignment.dueDate);
          return assignment;
        });
      }

      return <CommitteeCard key={committee._id} committee={committee} />;
    });
  };

  return <div>{renderList()}</div>;
};

export default CommitteeCardList;
