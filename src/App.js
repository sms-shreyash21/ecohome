
import './App.css';
// import Home from './components/HomeComp'
import Navbar from './components/navbarComp'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
// import { Route, Routes } from "react-router-dom";
// import SolarForm from './components/SolarForm';
// import About from './components/About';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={image} className="App-logo" alt="logo" />
        <p>
          Shreyash Shinde
        </p>
 
      </header> */}
      <>
      <Navbar />
      <Footer/>
      <div className="container">
        
      </div>
      {/* <Footer/> */}
    </>
    </div>
  );
}

export default App;
