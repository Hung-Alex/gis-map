
import { red } from "@mui/material/colors";
import React from "react";


const TableArea = () => {
 
  const grades = [0, 10000, 30000, 50000, 80000, 100000, 200000, 300000, 500000];

  return (
    <div className="legend" style={{ marginTop: "50px" }}>
      <div style={{backgroundColor:'rgba(255,255,255,0.8)',padding:'10px 50px 10px 5px ' }}>Thông tin diện tích 
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'red',width:'20px',height:'20px',display:"block" ,marginRight:"10px"}}></div>
        <div style={{textAlign:"center"}}>{'>    '}500.000</div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'blue',width:'20px',height:'20px',display:"block" ,marginRight:"10px"}}></div>
        <div style={{textAlign:"center"}}>300.000{'-'}500.000</div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'green',width:'20px',height:'20px',display:"block" ,marginRight:"10px"}}></div>
        <div style={{textAlign:"center"}}> 200.000{'-'}300.000</div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'yellow',width:'20px',height:'20px',display:"block" ,marginRight:"10px"}}></div>
        <div style={{textAlign:"center"}}>100.000{'-'}200.000</div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'orange',width:'20px',height:'20px',display:"block" }}></div>
        <div style={{textAlign:"center"}}>80.000{'-'}100.000</div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'purple',width:'20px',height:'20px',display:"block" }}></div>
        <div style={{textAlign:"center"}}>50.000{'-'}80.000</div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'pink',width:'20px',height:'20px',display:"block" }}></div>
        <div style={{textAlign:"center"}}>30.000{'-'}50.000</div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'brown',width:'20px',height:'20px',display:"block" }}></div>
        <div style={{textAlign:"center"}}>10.000{'-'}30.000</div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'#7B68EE',width:'20px',height:'20px',display:"block" }}></div>
        <div style={{textAlign:"center"}}>1.000{'-'}10.000</div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'#CFF5E7',width:'20px',height:'20px',display:"block" }}></div>
        <div style={{textAlign:"center"}}>100{'-'}1.000</div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{backgroundColor:'gray',width:'20px',height:'20px',display:"block" }}></div>
        <div style={{textAlign:"center"}}>0</div>
      </div>

     
      
      </div>
    </div>
  );
};

export default TableArea;