import React from "react";
import { Link, Redirect } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import auth from "../../../auth";

import "./header.css";

const Header = props => {
  const { loggedIn, setLoggedIn } = props;
  return (
    <header>
      <nav>
        <Navbar variant="dark" expand="lg" fixed="top">
          <Navbar.Brand as={Link} to="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link as={Link} to="/">
                  All Committees
                </Nav.Link>
              </Nav.Item>

              {loggedIn ? (
                <React.Fragment>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/myCommittees">
                      My Committees
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/newCommittee">
                      New Committee
                    </Nav.Link>
                  </Nav.Item>
                </React.Fragment>
              ) : (
                <div></div>
              )}
              {loggedIn ? (
                <Nav.Item
                  onClick={() => {
                    auth.logout(() => {
                      setLoggedIn(auth.isAuthenticated());
                      return (
                        <Redirect
                          to={{
                            pathname: "/login",
                            state: {
                              from: props.location
                            }
                          }}
                        />
                      );
                    });
                  }}
                >
                  <Nav.Link as={Link} to="/login">
                    Logout
                  </Nav.Link>
                </Nav.Item>
              ) : (
                <Nav.Item>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </nav>
    </header>
  );
};

export default Header;
