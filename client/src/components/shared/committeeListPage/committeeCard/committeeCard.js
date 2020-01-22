import React from "react";

import "./committeeCard.css";

import auth from "../../../../auth";

import useExpandElement from "../../../../hooks/useExpandElement";

// import MissionStatement from "./MissionStatement";
import Purpose from "./purpose";
import MemberList from "./memberList";

const CommitteeCard = props => {
  const { chair, title, members, purpose } = props.committee;

  const [expanded, handleClick] = useExpandElement();

  return (
    <article
      onClick={handleClick}
      className={`card card-expand ${!expanded ? "card-condensed" : ""} `}
    >
      <header className="card-header">{title}</header>

      <div className={`card-body  ${!expanded ? "card-body-condensed" : ""} `}>
        <div className="card-members-list ">
          <div>
            <span className="card-body-heading">Chair: </span>
            <span>
              {chair.label}{" "}
              {auth.userPositionNumber === chair.value ? "Owner" : null}
            </span>
          </div>
          <div>
            <span className="card-body-heading">Members: </span>
            <MemberList members={members} />
          </div>
        </div>

        <div className="card-main-mission ">
          <Purpose purpose={purpose} />
        </div>
      </div>
    </article>
  );
};

export default CommitteeCard;
