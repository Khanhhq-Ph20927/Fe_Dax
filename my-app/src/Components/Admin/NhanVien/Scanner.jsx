import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';


function Scanner({closeModal}){
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
}
function error(err){
console.warn(err);
}
},[]);

return(
    
    <div>
        <button onClick={()=>closeModal(false)}>X</button>
        {scanResult
        ? <div>Success: <a href={scanResult}>{scanResult}</a></div>
        : <div id='reader'></div>
        }
    </div>
    
    
)
}
export default Scanner;
