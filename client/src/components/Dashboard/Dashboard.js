import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Modal from './Modal/Modal';
import Sidemenu from '../sidemenu/Sidemenu';
import { getFolder } from '../../actions/clientAction';
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state) => state.user
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getFolder());
    }
  }, [isAuthenticated,dispatch]);
  console.log("isAuthenticatedisAuthenticated",isAuthenticated)

  return (
    <div className="dashboard dashboard-page">
      <h1>Dashboard</h1>
      <button className="open-modal-btn" onClick={toggleModal}>
        Open Modal
      </button>

      {isModalOpen && <Modal closeModal={toggleModal} />}
      {/* <Sidemenu /> */}
    </div>
  );
};

export default Dashboard;
