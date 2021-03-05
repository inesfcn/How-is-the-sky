import React from "react";

function DisplayInfo({city,setSubmit,temp,desc,currentTime,clouds,sunrise,sunset,convertTimeZone}){
    // No decimal value for temperature
    let temperature = parseInt(temp)

     //Convert UNIX sunrise and sunset
     function unixToFormat(unixDate){
        let newDate = new Date(unixDate * 1000)
        let newDateTZ = convertTimeZone(newDate)
        let hour = ("0" + newDateTZ.getHours()).slice(-2);
        let mins = ("0" + newDateTZ.getMinutes()).slice(-2);
        let formattedDate = `${hour}:${mins}`;
        return formattedDate;
    }
    const sunriseFormatted = unixToFormat(sunrise);
    const sunsetFormatted = unixToFormat(sunset);
   
    return(
    <div className="info-displays">
        <div className="infoDisplay">
            <h1 className="city-info">{city}</h1>
            <h1 className="time-info"> | {currentTime}</h1>
            <h1 className="temp-info"> | {temperature}°C</h1>
            <h1 className="temp-desc"> | {desc}</h1>
            <h1 className="temp-clouds"> | Clouds: {clouds}%</h1>
            <h1 className="temp-sunrise"> | Sunrise: {sunriseFormatted}</h1>
            <h1 className="temp-sunrise"> | Sunset: {sunsetFormatted}</h1>
        </div>
        <button type="button" className="anotherCity" onClick={()=>setSubmit(false)}>Check another city</button>
	</div>
    )
}

export default DisplayInfo;