
import Card from "../Card/Card";
import serviciosData from "../../api/MockUp/Services.json";
import "./CardsContainer.css"



export default function CardsContainer() {


    return (
        <div className="cardsContainer">
            {serviciosData.servicios.map((el,index)=>(<Card cardData={el} key={index}/>))}
        </div>
    )
} 
