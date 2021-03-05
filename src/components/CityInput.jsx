import React from "react";

function CityInput({city,handleCityInput,handleSubmitOnEnter}){
    return(<>
        <div className="inputCityDiv">
            <form>
                <label htmlFor="city-input">How is the sky in: </label>
                <input type="text" name="city-input" value={city} onChange={(e)=>handleCityInput(e)}  onKeyDown={(e)=>handleSubmitOnEnter(e)} />
            </form>
        </div>
    </>)
}

export default CityInput ;