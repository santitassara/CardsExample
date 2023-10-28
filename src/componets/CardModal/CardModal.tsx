import React, { useState } from 'react';
import './CardModal.css';


interface CardData {
  nombre: string;
  descripcion: string;
  operaciones: Array<String>;
  img: string;
  dominios: Array<String>;
  hostname: string;
  ip: string;
  status: string;
  price: string;
  extras:number;
  total:number;
}

interface CardModalProps {
  cardData: CardData
  
  handleClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ cardData, handleClose }) => {



  return (
    <div className="cardModal">
      <div className="cardModal-header">
        <img src={cardData.img} alt={cardData.img} className="cardModal-image" />
        <p>{cardData.nombre}</p>
      </div>
      <div className="cardModal-content">
        <div className="cardModal-label" >
          <label>Price</label>
          {/* <label>{cardData.price === "free" ? `${cardData.price}` : `u$s ${cardData.price.toUpperCase()}`}</label> */}
          <div className='cardModal-payment'>
            {cardData.price !== "free" && <label>u$s</label>}
            {cardData.price !== "free" ? <label>{Number(cardData.price).toFixed(2)}</label> : <label>{cardData.price.toUpperCase()}</label>}
          </div>
        </div>
        <div className="cardModal-label" >
          <label>Extras</label>
          <div className='cardModal-payment' >
            <label>u$s</label>
            <label>{cardData.extras.toFixed(2)}</label>
          </div>
        </div>
        <div className="cardModal-label" >
          <label>Total</label>
          <div className='cardModal-payment' >
            <label>u$s</label>
            <label>{cardData.total.toFixed(2)}</label>
          </div>
        </div>
        {/* <div className="cardModal-data">
        
        </div> */}
      </div>
      <div className='buttonModal-content'>
        <button className='button' type="button" onClick={handleClose}  >Back to requests</button>
        <button className='button' type="submit" >Update Cart</button>

      </div>


    </div>
  );
};

export default CardModal;
