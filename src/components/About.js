import React from 'react';
// import { ReactDOM } from 'react-dom';

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './About.css'
import Shreyash from './images/Shreyash.jpeg'
import Yash from './images/Yash.jpg'
import linkedin from './images/linkedin.png'

import { Link } from "react-router-dom";
import rushi from './images/rushi.jpg'
import akanksha from './images/akanksha.jpg'
const About = () => {
    const cardsData = [
        {
          title: 'Shreyash Shinde',
          imageUrl: Shreyash,
          description: 'This is card 1 description.',
          inurl:'https://www.linkedin.com/in/shreyashshinde',
        },
        {
          title: 'Yash Kapse',
          imageUrl: Yash,
          description: 'This is card 2 description.',
          inurl:'https://www.linkedin.com/in/yash-kapse',
        },
        {
          title: 'Rushikesh Pandirkar',
          imageUrl: rushi,
          description: 'This is card 3 description.',
          inurl:'https://www.linkedin.com/in/rushikesh-pandirkar-2887a4236',
        },
        {
          title: 'Akanksha Kadam',
          imageUrl: akanksha,
          description: 'This is card 4 description.',
          inurl:'https://www.linkedin.com/in/akanksha-kadam-182472210',
        },
      ];
  return (
    <>
    
    <p>
    
    <h3>Welcome to Eco Home: Your Sustainable Living Companion !</h3>
    At Eco Home, we are dedicated to empowering you to make informed decisions for a greener and more sustainable future. Our mission is to revolutionize the way we think about energy and water consumption by providing accurate estimates for solar and water harvesting system installations.

    </p>
    <p>
    
    <h3>Your Eco Home Journey Starts Here !</h3>
    

Join us on this exciting journey towards sustainable living. With Eco Home, take charge of your energy and water needs, and let's create a brighter and eco-friendlier future together. Embrace the power of renewable energy and water conservation, and watch as your home transforms into an eco-friendly oasis.


    </p>
    <p>
    <a style={{fontFamily:'fantasy'}} href="/ecohome/#/getstarted"><h3> Start  Exploring Now !</h3></a>
    
    

Begin by entering your property details, and let Eco Home calculate the estimated installation cost for your solar and water harvesting systems. Empower yourself with the knowledge to make a difference.

    <div style={{marginTop:60}}></div>
  
    </p >
    <span className='title'>Our Team</span> 
    <br/>
  
  
  </>
  );
};

export default About;