import React from "react";
import Clouds from "./Clouds";
import MoonSun from "./MoonSun"

function SkyColor ({dateTimeZone,lat,lon,convertTimeZone,clouds}){

    // *******GOLDEN HOUR**********
    //Call library SunCalc
    const SunCalc = require('suncalc');
    const sunCalcData = SunCalc.getTimes(dateTimeZone,lat,lon);

    //Golden Hour Morning with Time Zone convert
    const goldenHourMorning = convertTimeZone(sunCalcData.goldenHourEnd)
    const sunriseTime = convertTimeZone(sunCalcData.sunrise);

    //Golden Hour Evening with Time Zone convert
    const goldenHourEvening = convertTimeZone(sunCalcData.goldenHour);
    const sunsetTime = convertTimeZone(sunCalcData.sunset);

     console.log(`goldenHourMorning:${goldenHourMorning}\n sunrise:${sunriseTime}\n goldenHourEvening:${goldenHourEvening} \n sunset: ${sunsetTime}`); 

    let cloudAmountGradient = 1.2 -(Number(clouds) *0.01);

    let skyBlueInitRGBA = [135, 206, 250, 1];

    //Define individual RGBA values according to cloud amount
    let cloudAmount = Number(clouds);
    skyBlueInitRGBA[1] -= cloudAmount;
    skyBlueInitRGBA[0] -= cloudAmount - cloudAmount / 2;
    skyBlueInitRGBA[2] -= cloudAmount;
    skyBlueInitRGBA[3] -= cloudAmount * 0.01;
  

    //Sunset 
    if (dateTimeZone>=goldenHourEvening && dateTimeZone<=sunsetTime) {
        document.body.style.background = `linear-gradient(353deg, rgba(182,110,0, ${cloudAmountGradient}) 0%, rgba(230,170,15,${cloudAmountGradient}) 35%, rgba(255,214,0,${cloudAmountGradient}) 100%)`;
        document.body.style.backgroundAttachment="fixed"
        document.body.style.backgroundRepeat="no-repeat"
    }
    //Sunrise 
    else if (dateTimeZone>=sunriseTime && dateTimeZone<=goldenHourMorning) {
        document.body.style.background = `linear-gradient(180deg, rgba(214,254,250,${cloudAmountGradient}) 0%, rgba(68,210,247,${cloudAmountGradient}) 65%, rgba(142,143,213,${cloudAmountGradient}) 100%)`;
        document.body.style.backgroundAttachment="fixed"
        document.body.style.backgroundRepeat="no-repeat"
    }
    //Night
    else  if (dateTimeZone >= sunsetTime|| dateTimeZone<= sunriseTime) {
        document.body.style.backgroundColor = "#2f3e46";
    }
    //Blue Sky with Clouds
    else {
        document.body.style.backgroundColor = `rgba(${skyBlueInitRGBA[0]},${skyBlueInitRGBA[1]},${skyBlueInitRGBA[2]},${skyBlueInitRGBA[3]})`;
    }


    return(<>
    <Clouds
        cloudAmount={cloudAmount}
    />

    <MoonSun
        dateTimeZone={dateTimeZone}
        sunsetTime={sunsetTime}
        sunriseTime={sunriseTime}
        cloudAmount={cloudAmount}
    />
    </>)
}

export default SkyColor;