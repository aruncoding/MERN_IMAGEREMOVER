import React, { useState, useEffect } from 'react';
import './Modal.css';
import { addClient } from '../../../actions/clientAction';
import { useDispatch, useSelector } from "react-redux";
const Modal = ({ closeModal }) => {
  const dispatch =  useDispatch();

  const [client, setClient] = useState({
    name: "",
    mobile: ""
  });

  const formClient = (e)=> {
    const { name, value } = e.target;
    setClient((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addClient(client.name, client.mobile))
    closeModal();
  };

 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>&times;</button>
        <h2>Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={client.name}
              onChange={formClient}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="number"
              id="mobile"
              name="mobile"
              value={client.mobile}
              onChange={formClient}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
