import React from "react";

import CommitteeCard from "../committeeCard";

const CommitteeCardList = props => {
  const { committees } = props;

  const renderList = () => {
    return committees.map(committee => {
      return <CommitteeCard key={committee._id} committee={committee} />;
    });
  };

  return <div>{renderList()}</div>;
};

export default CommitteeCardList;
