import React from "react";

import CommitteeListPage from "../shared/committeeListPage";
const AllCommitteesPage = props => {
  return (
    <CommitteeListPage
      heading="All Committies"
      url="/committees"
      auth={false}
    />
  );
};

export default AllCommitteesPage;
