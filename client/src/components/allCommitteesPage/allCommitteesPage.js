import React, { useState } from "react";

import "./allCommitteesPage.css";

import CommitteeListPage from "../shared/committeeListPage";
const AllCommitteesPage = props => {
  const [report, setReport] = useState({ heading: "All Committies", url: "" });
  return (
    <div>
      <div>
     
          <input
          className="committee-filter"
            value="Board of Trustees"
            type="button"
            onClick={() =>
              setReport({
                heading: "Board of Trustees",
                url: "boardOfTrustees"
              })
            }
          />
        
          <input
          className="committee-filter"
            value="President's Council"
            type="button"
            onClick={() =>
              setReport({
                heading: "President's Council",
                url: "presidentsCouncil"
              })
            }
          />
        
          <input
          className="committee-filter"
            value="Faculty Senate"
            type="button"
            onClick={() =>
              setReport({ heading: "Faculty Senate", url: "facultySenate" })
            }
          />
        
          <input
          className="committee-filter"
            value="PACE"
            type="button"
            onClick={() => setReport({ heading: "PACE", url: "pace" })}
          />
       
          <input
          className="committee-filter"
            value="UVUSA"
            type="button"
            onClick={() =>
              setReport({ heading: "UVUSA Committies", url: "uvusa" })
            }
          />
       
      </div>

      <CommitteeListPage
        heading={report.heading}
        url={`/committees/${report.url}`}
        auth={false}
      />
    </div>
  );
};

export default AllCommitteesPage;
