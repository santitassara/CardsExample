import React, { useState } from 'react';
import './Card.css';
import OrderModal from ".././/OrderModal/OrderModal"

interface CardData {
  nombre: string;
  descripcion: string;
  operaciones:string[];
  img: string;
  dominios:string[];
  hostname:string;
  ip:string;
  status:string;
  price: string;
  extras:number;
  total:number;
}

interface CardProps {
  cardData:CardData
}

const Card: React.FC<CardProps> = ({ cardData }) => {
  const [showMore, setShowMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleOnClick = () => {
    setSelectedCard(cardData);
    setModalOpen(true);
  };

  return (
    <div className="card">
      <div className="card-header">
        <img src={cardData.img} alt={cardData.img} className="card-image" />
        <span className='cardStatus'>{cardData.status}</span>
      </div>
      <div className="card-content">
        <h2>{cardData.nombre}</h2>
        <div className="card-data">
          <p>{showMore ? cardData.descripcion : `${cardData.descripcion.slice(0, 100)}...`}</p>
          <span className="show-more" onClick={toggleShowMore}>
            {showMore ? 'Less' : 'More'}
          </span>
        </div>
      </div>
      <div className='button-content'>
        <button className='order-button' onClick={handleOnClick} type="submit">Order</button>
      </div>

      {modalOpen && (
        <OrderModal show={true} handleClose={() => setModalOpen(false)} cardData={cardData} />
      )}
    </div>
  );
};

export default Card;
