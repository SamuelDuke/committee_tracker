import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Container from "react-bootstrap/Container";

import auth from "../../auth";
import ProtectedRoute from "../shared/protectedRoute";
import Header from "./header";

import AllCommitteePage from "../allCommitteesPage";
import MyCommitteeReport from "../myCommitteeReport";
import SelectForm from "../selectForm";
import EditForm from "../editForm";
import Login from "../loginPage";

import "./app.css";

export default App => {
  const [loggedIn, setLoggedIn] = useState(auth.isAuthenticated());

  return (
    <div className="App">
      <Container>
        <Router>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          {/* <AppLayout> */}
          <Route exact path="/" component={AllCommitteePage} />
          <Route
            path="/login"
            render={props => <Login {...props} setLoggedIn={setLoggedIn} />}
          />
          <ProtectedRoute path="/myCommittees" component={MyCommitteeReport} />
          <ProtectedRoute path="/newCommittee" component={SelectForm} />
          <ProtectedRoute path="/editCommittee" component={EditForm} />
          {/* </AppLayout> */}
        </Router>
      </Container>
    </div>
  );
};
