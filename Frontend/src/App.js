import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import YourSongs from "./YourSongs";
import Recommendations from "./Recommendations";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function App() {
  return (
    <><Navbar className="bg-dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Tuney<i className="fa-solid fa-music"></i></Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">YourSongs</Nav.Link>
      <Nav.Link href="/recommendations">Recommendations</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    <Router>
        <Routes>
          <Route path="/" element={<YourSongs></YourSongs>}>
          </Route>
          <Route path="/recommendations" element={<Recommendations></Recommendations>}>
          </Route>
        </Routes>
    </Router>
    </>
  );
}