import React from "react";

import "./CommitteeCard.css";

import auth from "../../auth";

import useExpandElement from "../../hooks/useExpandElement";

// import MissionStatement from "./MissionStatement";
// import MemberList from "./MemberList";

const CommitteeCard = props => {
  const { chair, title, mission, members } = props.committee;

  //   const [expanded, handleClick] = useExpandElement();

  return (
    <div>
      <div>chair: {chair}</div>
      <div>title: {title}</div>
      <div>mission: {mission}</div>
    </div>
    // <article
    //   onClick={handleClick}
    //   className={`card card-expand ${!expanded ? "card-condensed" : ""} `}
    // >
    //   <header className="card-header">{title}</header>

    //   <div className={`card-body  ${!expanded ? "card-body-condensed" : ""} `}>
    //     <div className="card-members-list ">
    //       <div>
    //         <span className="card-body-heading">Chair: </span>
    //         <span>
    //           {chair.firstName} {chair.lastName}{" "}
    //           {auth.userId === chair._id ? "Owner" : null}
    //         </span>
    //       </div>
    //       <div>
    //         <span className="card-body-heading">Members: </span>

    //         <MemberList members={members} />
    //       </div>
    //     </div>

    //     <div className="card-main-mission ">
    //       <MissionStatement title={title} mission={mission} />
    //     </div>
    //   </div>
    // </article>
  );
};

export default CommitteeCard;
