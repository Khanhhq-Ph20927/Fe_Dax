import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
// import QrReader from 'react-qr-reader';

function Scanner({closeModal,onScan}){
    const [scanResult,setScanResult]=useState(null);
   
useEffect(()=>{ 
   
 const scanner=new Html5QrcodeScanner('reader',{
qrbox:{
 width: 250,
 height: 250,
},
fps: 5,
});
scanner.render(success,error);

function success(result){
scanner.clear();
setScanResult(result);
onScan(result);
}
function error(err){
console.warn(err);
}
},[]);
// const [error, setError] = useState(null);

//   const handleScan = (data) => {
//     if (data) {
//       onScan(data);
//       closeModal(false);
//     }
//   };

//   const handleError = (err) => {
//     setError(err);
//   };
return(
    
    <div>
        <button onClick={()=>closeModal(false)}>X</button>
        {scanResult
        ? <div>Success: <a href={scanResult}>{scanResult}</a></div>
        : <div id='reader'></div>
        }
    </div>
  //   <div>
  //   <button onClick={() => closeModal(false)}>X</button>
  //   {error ? (
  //     <div>Failed to load QR scanner. Please try again later.</div>
  //   ) : (
  //     <QrReader
  //       delay={300}
  //       onError={handleError}
  //       onScan={handleScan}
  //       style={{ width: '100%' }}
  //     />
  //   )}
  // </div>
    
);
}
export default Scanner;
