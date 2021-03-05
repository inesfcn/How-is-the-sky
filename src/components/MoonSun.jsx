import React, { useEffect, useState } from "react";

function MoonSun ({dateTimeZone, sunsetTime,sunriseTime,cloudAmount}){

    const [moon,setMoon]= useState(false)
    const [sun,setSun]=useState(true)

    useEffect(()=>{
        if (dateTimeZone >= sunsetTime|| dateTimeZone<= sunriseTime) {
            setMoon(true);
            setSun(false);
        }else{
            setSun(true);
            setMoon(false)
        }
    },[dateTimeZone,sunriseTime,sunsetTime])
        
    //SunCalc 
    const SunCalc = require('suncalc');
    const moonData = SunCalc.getMoonIllumination(dateTimeZone);
    const moonPhase = moonData.phase

    const boxShadowPX=-Math.abs(moonPhase * 210) ;
    const opacityClouds =1- (cloudAmount * 0.01);

    const moonStyle = {
        boxShadow: `inset ${boxShadowPX}px 0px rgba(241, 238, 225, ${opacityClouds})`,
    };

    const sunStyle = {
        backgroundColor: `rgba(255, 217, 0, ${opacityClouds})`,
    }

    return(
    <>
    {moon&&
    <div className="moon" style={moonStyle}></div>
    }
    {sun&&
    <div className="sun" style={sunStyle}></div>
    }
    </>)
}

 export default MoonSun;