import React, { useState } from 'react';
import './Dashboard.css';
import Modal from './Modal/Modal';
import Sidemenu from '../sidemenu/Sidemenu';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="page dashboard-page">
      <h1>Dashboard</h1>
      <button className="open-modal-btn" onClick={toggleModal}>
        Open Modal
      </button>

      {isModalOpen && <Modal closeModal={toggleModal} />}
      <Sidemenu />
    </div>
  );
};

export default Dashboard;
