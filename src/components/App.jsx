import React, {useState, useEffect} from "react";
import CityInput from "./CityInput";
import DisplayInfo from "./DisplayInfo";
import SkyColor from "./SkyColor"
import '../css/App.css';


function App() {

  //States
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('Berlin');
  const [city,setCity] = useState("");
  const [submit,setSubmit] = useState(false);
  
  //Get city from Input
  function handleCityInput(e){
    e.preventDefault();
    setCity(e.target.value)
  }

  //Get info on enter
  function handleSubmitOnEnter(e){
    if (e.key === "Enter") {
      e.preventDefault();
      setSearch(city);
      setCity(city);
      setSubmit(true)
    }
  }

  //Fetch API
  const API_KEY = process.env.REACT_APP_API_KEY 
  const URI = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    fetch(URI)
      .then((response) => response.json())
      .then((results) => setData(results))
      .catch((error) => {
        console.error('Error', error);
      });
  }, [URI]);

  const time = new Date();

  //convert to TimeZone
    function convertTimeZone(originalTime){
      const offset = data.timezone / 3600;
      let utcOriginalTime =
        originalTime.getTime() + originalTime.getTimezoneOffset() * 60000;
      let newDateTimeZone = new Date(utcOriginalTime + 3600000 * offset);
      let day = time.getDate()
      //Make sure it doesn't convert to the next day
      newDateTimeZone.setDate(day)
      return newDateTimeZone
  }
 
  const dateTimeZone = convertTimeZone(time);
  //Format Clock
  let hour = ("0" + dateTimeZone.getHours()).slice(-2);
  let mins = ("0" + dateTimeZone.getMinutes()).slice(-2);
  let currentTime = `${hour}:${mins}`;

  return (
    <>
      {/* Input */}
      {!submit && <CityInput
        city={city}
        handleCityInput={handleCityInput}
        handleSubmitOnEnter={handleSubmitOnEnter}
      />}

      {/* Display */}
      {submit && <DisplayInfo 
        setSubmit={setSubmit}
        city={city}
        temp={data.main.temp}
        desc={data.weather[0].description}
        currentTime={currentTime} 
        clouds={data.clouds.all}
        sunset={data.sys.sunset}
        sunrise={data.sys.sunrise}
        convertTimeZone={convertTimeZone}
      />}
      
      {submit &&
        <SkyColor
        dateTimeZone={dateTimeZone}
        convertTimeZone={convertTimeZone}
        lat={data.coord.lat}
        lon={data.coord.lon}
        clouds={data.clouds.all}
        />}

    </>
  );
}

export default App;
