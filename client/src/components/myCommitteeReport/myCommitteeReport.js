import React from "react";

import CommitteeListPage from "../shared/committeeListPage";

const MyCommitteesPage = props => {
  return (
    <CommitteeListPage
      heading="My Committies"
      url="/committees/me"
      auth={true}
    />
  );
};

export default MyCommitteesPage;
