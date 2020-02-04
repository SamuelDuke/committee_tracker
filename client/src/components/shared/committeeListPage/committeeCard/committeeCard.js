import React from "react";
import { Link, Redirect } from "react-router-dom";

import Nav from "react-bootstrap/Nav";

import "./committeeCard.css";

import auth from "../../../../auth";

import useExpandElement from "../../../../hooks/useExpandElement";

// import MissionStatement from "./MissionStatement";
import TeraText from "./teraText";
import MemberList from "./memberList";

const CommitteeCard = props => {
  const {
    chair,
    title,
    members,
    purpose,
    delegatedAuthority
  } = props.committee;

  const [expanded, handleClick] = useExpandElement();

  return (
    <article
      onClick={handleClick}
      className={`card card-expand ${!expanded ? "card-condensed" : ""} `}
    >
      <header className="card-header">
        {title}
        {auth.userPositionNumber === chair.value ? (
          <Link
            className="card-edit"
            to={{ pathname: "/editCommittee", state: props.committee }}
          >
            Edit Charter
          </Link>
        ) : null}
      </header>

      <div className={`card-body  ${!expanded ? "card-body-condensed" : ""} `}>
        <div className="card-members-list ">
          <div>
            <span className="card-body-heading">Chair: </span>
            <span>{chair.label} </span>
          </div>
          <div>
            <span className="card-body-heading">Members: </span>
            <MemberList members={members} />
          </div>

          <div>
            <TeraText text={delegatedAuthority} title="Delegated Authority" />
          </div>
        </div>

        <div className="card-main-mission ">
          <TeraText text={purpose} title="Purpose" />
        </div>
      </div>
    </article>
  );
};

export default CommitteeCard;
