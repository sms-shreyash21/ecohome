import React, { Component } from "react";
import './HomeComp.css';
// import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import img2 from "./images/img2.png"
import img1 from "./images/img1.jpg"
import img3 from "./images/img3.png"
import img4 from "./images/img4.jpg"

// import ExampleCarouselImage from 'components/ExampleCarouselImage';


export default class HomeComp extends Component {
    
    render() {
        
        return (
            <>
            <div className="main-hero">
                <div className="section-hero-data">
                    <h4 className="greens">
                        Eco Home is Future
                    </h4>
                    <h3 className="hero-heading greens">
                        "Unleashing the Power of the Sun and Rain: Your Personal Eco-Friendly Home Advisor"
                    </h3>
                    {/* <button onClick={navigateToForm}>Home</button> */}
                    <a style={{fontFamily:'fantasy'}} href="/getstarted"><h4>Get Started</h4></a>
                </div>
                <div className="section-hero-image">
                    <picture>
                        <img className="image1" src={require('./home.png')} alt="" />
                    </picture>


                </div>

            </div>

            <div style={{ display: 'block', width: '100%'}}>
      <h2 style={{marginTop:40,marginBottom:40,fontWeight:'bold'}}>Why to choose ECO-HOME ???</h2>
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
src={img1}
            alt="Image One"
          />
          <Carousel.Caption>
            <h3 className="blacks">Personalized Estimates</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
src={img2}
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3 className="blacks">Sustainable Solution</h3>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
src={img3}
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3 className="blacks">Effective Cost Saving</h3>
   
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
src={img4}
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3 className="blacks">Transparency and Accuracy</h3>
       
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>
    </div>
            </>
        )
    }
}


