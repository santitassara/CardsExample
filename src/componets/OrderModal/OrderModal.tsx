import React, { ChangeEvent, useRef, useState } from 'react';
import "./OrderModal.css"
import CardModal from '../CardModal/CardModal';
import axios from 'axios';

interface ModalProps {
  handleClose: () => void;
  show: boolean;

  cardData: {
    nombre: string;
    descripcion: string;
    operaciones: string[];
    img: string;
    dominios: string[];
    hostname: string;
    ip: string;
    status: string;
    price: string;
    extras: number;
    total: number;
  }
}
interface FormData {
  dominio: string,
  hostname: string,
  ip: string,
}


const Modal: React.FC<ModalProps> = ({ handleClose, show, cardData }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [formData, setFormData] = useState<FormData>({
    dominio: cardData.dominios[0],
    hostname: '',
    ip: '',
  });;
  const formRef = useRef<HTMLFormElement>(null);
  const ipInputRef = useRef<HTMLInputElement>(null);

  const isIPAddressValid = (ipAddress: string) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipRegex.test(ipAddress);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (!formData.dominio || !formData.hostname || !formData.ip) {
      alert('Por favor complete todos los campos');
      return;
    }
    const ipInput = ipInputRef.current;
    if (ipInput && !isIPAddressValid(ipInput.value)) {
      ipInput.setCustomValidity('Por favor ingrese una dirección de IP válida');
      ipInput.reportValidity();
      return;
    }
    const requestData = {
      dominio: formData.dominio,
      hostname: formData.hostname,
      ip: formData.ip
    };


    axios.post('https://eo9cv6t1i39c6r6.m.pipedream.net', requestData) //Endpoint de prueba para chequear el correcto envío de los datos del Form.
                                                                      // Cambiar URL en caso de querer recibir los datos en otro endpoint.
      .then(response => {
        alert('Solicitud enviada exitosamente');
        setFormData({ dominio: cardData.dominios[0], hostname: '', ip: '' });
        formRef.current?.reset();
        ipInputRef.current?.setCustomValidity('');
        ipInputRef.current?.reportValidity();
        
        console.log('Solicitud enviada exitosamente:', response);
        handleClose();
      })
      .catch(error => {

        console.error('Error al enviar la solicitud:', error);

      });
  };


  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <form onSubmit={handleCardSubmit} ref={formRef}>
          <div className="modal-content">
            <div className="modal-content-data">
              <div className='chosen-service'>
                <p>{cardData.nombre}</p>
              </div>
              <div className='service-characteristics'>
                <div className='service-characteristics-content'>
                  <p>{`Para solicitar el alta de un nuevo registro A en los ${cardData.nombre} por favor complete el siguiente formulario`}</p>
                  <div className="input-container">
                    <div className="input-label">
                      <span>Dominio *</span>
                    </div>
                    <select
                      name='dominio'
                      value={formData.dominio}
                      onChange={handleChange}
                      className="select"
                    >
                      {cardData.dominios.map((opcion, index) => (
                        <option key={index} value={opcion} >
                          {opcion}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-container">
                    <div className="input-label">
                      <span>Hostname *</span>
                    </div>
                    <input
                      type="text"
                      name="hostname"
                      value={formData.hostname}
                      onChange={handleChange}

                    />


                  </div>
                  <div className="input-container">
                    <div className="input-label">
                      <span>Direccion de IP *</span>
                    </div>
                    <input
                      type="text"
                      name="ip"
                      value={formData.ip}
                      onChange={handleChange}
                      ref={ipInputRef}
                      pattern="^(\d{1,3}\.){3}\d{1,3}$"
                    />

                  </div>
                </div>
              </div>
            </div>

            <div className='card-modal-data'>
              <CardModal cardData={cardData} handleClose={handleClose} />
            </div>
          </div>


        </form>

      </section>
    </div>
  );
};

export default Modal;
