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

const regex = /\b\d{12}\b/;
const match = result.match(regex);
const cmndNumber = match ? match[0] : null;
setScanResult(cmndNumber);
onScan(cmndNumber);
}
function error(err){
console.warn(err);
}
return()=>{
    scanner.clear();
};
},[]);

return(
    
    <div>
       
        {scanResult
        ? (
            <div>
                Số CMND: {scanResult}
            </div>
            )
        : (<div id='reader'></div>
       ) }
    </div>

    
);
}
export default Scanner;
