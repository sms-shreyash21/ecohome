import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbarComp.css';
import Home from '../components/HomeComp';
import SolarForm from '../components/SolarForm';
import About from '../components/About';
import Logo from './ecohome.png';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const NavbarComp = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavCollapse = () => {
    setExpanded(false);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setExpanded(false);
  };

  return (
    <>
      <Navbar expand="lg" className="bar" expanded={expanded}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={Logo} alt="logo" style={{ width: 150 }} />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" onSelect={handleNavCollapse}>
              <Nav.Link
                as={Link}
                to="/"
                className="nav-items"
                onClick={() => handleLinkClick('/')}
              >
                <span>Home</span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/getstarted"
                className="nav-items"
                onClick={() => handleLinkClick('/getstarted')}
              >
                <span>Get Started</span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className="nav-items"
                onClick={() => handleLinkClick('/about')}
              >
                <span>About</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstarted" element={<SolarForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default NavbarComp;
