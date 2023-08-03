import React, { useState  } from 'react';
import axios from 'axios';
import './solarform.css';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const SolarForm = () => {
 //// 
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [roofArea, setRoofArea] = useState();
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState({});
  const [availableRoofArea,setAvailableRoofArea] = useState();
  const [eleBill,setEleBill] = useState();
  let state;
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=931a796735343ed4908c046b6bcf0efd`)
      .then((response) => {
        const { lat, lon } = response.data[0];
        state = response.data[0].state;
        // console.log(response.data) //[0].state
        // console.log(lat,lon)
        // console.log(state)
        axios.get(`https://re.jrc.ec.europa.eu/api/MRcalc?lat=${lat}&lon=${lon}&horirrad=1&optrad=1&mr_dni=1&outputformat=json`)
          .then((response) => {
            
             let dni=0;          
            //  daily normal 
            let dhi=0;
            // console.log(response.data.outputs.monthly.length);
            for (let i = 0; i < response.data.outputs.monthly.length; i++) {
              dhi += response.data.outputs.monthly[i]["H(h)_m"];
              dni += response.data.outputs.monthly[i]["Hb(n)_m"];
              
            }
            //console.log(dni,dhi);
            dni /= response.data.outputs.monthly.length;
            dhi /= response.data.outputs.monthly.length;
            // console.log(response.data)
           
            let reqRoofArea = roofArea*availableRoofArea/100;
            const dailyEnergyDemand = (reqRoofArea * 450)/ 1000;
            const psh = dni/30;
            const systemSize = dailyEnergyDemand / psh;
            const ratedPowerOfPanels = 0.335;
            const systemEfficiency = 0.85;
            const numberOfPanels = Math.round(systemSize / (ratedPowerOfPanels * systemEfficiency));
            const solarPanelCapacity = numberOfPanels * ratedPowerOfPanels;
            const avgSolarConst = 1.361;
            const dailySunlightHours = (dni + dhi)/(30*avgSolarConst);
            const estimatedEnergyOutput = solarPanelCapacity * dailySunlightHours * 365;
            const requiredEnergy = eleBill*12;
            const totalCostOfSystem = numberOfPanels * 11500;
            let reqPanels,actualReqRoofArea,actualCost;
            if (requiredEnergy<=estimatedEnergyOutput) {
              let energyDiff = estimatedEnergyOutput - requiredEnergy;
              let panelCapacityDiff = energyDiff/(dailySunlightHours*365);
              let numberOfPanelsDiff = Math.floor(panelCapacityDiff/ratedPowerOfPanels);
              reqPanels = numberOfPanels - numberOfPanelsDiff;
              let systemSizeDiff = numberOfPanelsDiff*ratedPowerOfPanels*systemEfficiency;
              let dailyEnergyDemandDiff = psh*systemSizeDiff;
              let roofAreaDiff = dailyEnergyDemandDiff*1000/450;
              actualReqRoofArea = reqRoofArea - roofAreaDiff;
              actualCost = reqPanels*11500;
            }
            // const totalSolarRadiation = dni + dhi;
            //     const systemEfficiencypercentage = (estimatedEnergyOutput / totalSolarRadiation) * 100;
            
            const annualEnergySavings = estimatedEnergyOutput * 150;
            const paybackPeriod = totalCostOfSystem / annualEnergySavings;
            let water = 0
            let tot_rain = 0
            axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2022-06-01&end_date=2023-05-31&daily=precipitation_sum,rain_sum,snowfall_sum&timezone=auto`).then((response) => {
              console.log(response.data)
              
              for (let i = 0; i < response.data.daily.rain_sum.length; i++) {
                tot_rain += response.data.daily.rain_sum[i];
                
              }
              water = roofArea*tot_rain;
              console.log(water);
            
            setReportData({
              roofArea:roofArea,
              dni:dni,
              dhi:dhi,
              systemSize: systemSize.toFixed(2),
              numberOfPanels:numberOfPanels*2,
              solarPanelCapacity: solarPanelCapacity.toFixed(2),
              dailySunlightHours: dailySunlightHours.toFixed(2),
              estimatedEnergyOutput: estimatedEnergyOutput.toFixed(2),
              //          setSystemEfficiency : systemEfficiency.toFixed(2),
              totalCostOfSystem: totalCostOfSystem.toFixed(2)*2,
              annualEnergySavings: annualEnergySavings.toFixed(2),
              paybackPeriod,
              location:location,
              tot_rain:tot_rain.toFixed(2),
              reqPanels:reqPanels*2,
              actualReqRoofArea:actualReqRoofArea.toFixed(2),
              actualCost:actualCost.toFixed(2)*2,
              state:state,
              water:Math.round(water),
            });
            
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    })
      setShowReport(true);
      //console.log(reportData)
  };

  
  const handleDownload = () => {
    const documentDefinition = {
      content: [
        { text: "Solar Panel Report", style: "header" },
        { text: "Report according to your input area : "},
        {
          ul: [
            `Name: ${name}`,
            `Address: ${location}`,
            `State: ${reportData.state}`,
            `Email: ${email}`,
            `Roof Area: ${roofArea} sq m`,
            `Solar Panel Capacity: ${reportData.solarPanelCapacity} units`,
            `System Size: ${reportData.systemSize} kW`,
            `Number of Panels: ${reportData.numberOfPanels}`,
            `Annual Energy Savings: ${reportData.annualEnergySavings}`,
            `Total Cost Of System: ${reportData.totalCostOfSystem} Rs.`,
            `Estimated Energy Output: ${reportData.estimatedEnergyOutput}`,
            // `Payback Period: ${reportData.paybackPeriod} years`,
            
          ],
          style: "list",
        },
        { text: "  "},
        { text: "Report as per your need : "},
        {
          ul:[
            `Actual required Number of Panels: ${reportData.reqPanels}`,
            `Actual required Roof Area : ${reportData.actualReqRoofArea} sq m`,
            `Actual required Cost of System : ${reportData.actualCost} Rs.`,

          ],
          style: "list",
        },
        { text: "  "},
        { text: "Rain Water Harvesting Report", style: "header" },
        {
          ul:[
            `Your Roof Area: ${roofArea} sq m`,
            `Total Average Rain in Your Area: ${reportData.tot_rain} mm`,
            `Total Average Water can be Collected From Roof in One Year: ${reportData.water} litres`,
          ],
          style:"list",
        },
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        list: {
          margin: [0, 10, 0, 0],
        },
      },
    };
  
    pdfMake.createPdf(documentDefinition).download("report.pdf");
  };
  
  
  return (
    
    <div className='solForm'>
      <h1>Solar Panel and RainWater Harvesting Report Generator</h1>
      <form>
        <div className='input-form'>
          <label htmlFor="name">Name</label> <br/>
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>    
        <div className='input-form'>
          <label htmlFor="location">Address</label> <br/>
          <input type="text" id="location" value={location} onChange={(event) => setLocation(event.target.value)} required />
        </div>
        <div className='input-form'>
          <label htmlFor="email">Email</label> <br/>
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
        </div>
        <div className='input-form'>
          <label htmlFor="roofArea">Roof Area</label> <br/>
          <input type="number" id="roofArea" value={roofArea} onChange={(event) => setRoofArea(event.target.value)} required/>
        </div>
        <div className='input-form'>
          <label htmlFor="roofArea">Percentage Available Roof Area %</label> <br/>
          <input type="number" id="AroofArea" value={availableRoofArea} onChange={(event) => setAvailableRoofArea(event.target.value)} required />
        </div>
        <div className='input-form'>
          <label htmlFor="roofArea">Monthly Units of Electricity required(Monthly Eletricity Bill)</label> <br/>
          <input type="number" id="bill" value={eleBill} onChange={(event) => setEleBill(event.target.value)} required/>
        </div>
        <button className='bu' type="submit" onClick={handleSubmit}>Generate Report</button>
      </form>
        {showReport && (<div className='report'>
          <h1>Solar Panel Report</h1> <br/>
          <p>Location : {reportData.location}</p> <br/>
          <p>State: {reportData.state}</p> <br/>
          <p>System Size: {reportData.systemSize} kW</p> <br/>
          <p>Number of Panels: {reportData.numberOfPanels}</p> <br/>
          <p>Estimated Energy Output: {reportData.estimatedEnergyOutput} kWh/year</p> <br/>
          <p>Total Cost Of System: {reportData.totalCostOfSystem} Rs.</p> <br/>
          {/* <p>Payback Period: {reportData.paybackPeriod} years</p> */}
          <h2>As per your need :</h2> <br/>
          <p>Actual required Panels : {reportData.reqPanels} </p> <br/>
          <p>Actual required Roof Area : {reportData.actualReqRoofArea}</p> <br/>
          <p>Actual required Cost of System : {reportData.actualCost} Rs.</p> 
          <br/>
          <h1>Rain Water Harvesting Report</h1> <br/>
          <p>Your Roof Area: {roofArea}</p> <br/>
          <p>Total Average Rain in Your Area: {reportData.tot_rain} mm</p> <br/>
          <p>Total Average Water can be Collected From Roof in One Year: {reportData.water} litres</p> <br/>
        <button className='bu' onClick={handleDownload}>Download Report</button> <br/>

      
    </div>)}
    
    </div>
  );
};
export default SolarForm;
