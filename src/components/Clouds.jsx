import React from "react";
import cloud from "../assets/cloud.png"

function Clouds({cloudAmount}){


    return(
        <div className="clouds">
            {cloudAmount>10&&
            <img src={cloud} alt="cloud" className="cloud1"></img>
            }
            {cloudAmount>20&&
            <img src={cloud} alt="cloud" className="cloud2"></img>
            }
            {cloudAmount>30&&
            <img src={cloud} alt="cloud" className="cloud3"></img>
            }
            {cloudAmount>40&&
            <img src={cloud} alt="cloud" className="cloud4"></img>
            }
            {cloudAmount>50&& 
            <img src={cloud} alt="cloud" className="cloud5"></img>
            }
            {cloudAmount>60&&
            <img src={cloud} alt="cloud" className="cloud6"></img>
            }
            {cloudAmount>70&&
            <img src={cloud} alt="cloud" className="cloud7"></img>
            }
            {cloudAmount>80&&
            <img src={cloud} alt="cloud" className="cloud8"></img>
            }
            {cloudAmount>90&&
            <img src={cloud} alt="cloud" className="cloud9"></img>
            }
            
        </div>
    )
}

export default Clouds;
