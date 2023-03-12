import React from "react";
import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";

const modalRoot = document.getElementById("react-modals");

const ModalOverlay = (props) => {
  const { onClose } = props;

  return <div className={styles.modal_overlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
