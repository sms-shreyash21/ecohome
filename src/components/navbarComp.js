import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbarComp.css';
import Home from '../components/HomeComp'
import SolarForm from '../components/SolarForm';
import About from '../components/About';
import   Logo from './ecohome.png';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import about from './About';

export default class navbarComp extends Component {
  render() {
    return (
      <>
      <Navbar expand="lg" className="bar">
      <Container>
        <Navbar.Brand as={Link} to="/"> 
        <img
      src={Logo}
      alt="logo"
      style={{width:150}}
      /> 
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className='nav-items'><span>Home</span></Nav.Link>
            <Nav.Link as={Link} to="/getstarted" className='nav-items'><span>Get Started</span></Nav.Link>
            <Nav.Link as={Link} to="/about" className='nav-items'><span>About</span></Nav.Link>
            
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
    )
  }
}
