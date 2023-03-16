import React from "react";
import PropTypes from "prop-types";
import PreloaderImg from "../../images/preloader.gif";
import styles from "./PreLoader.module.css";
const PreLoader = () => {
  return (
    <img className={styles.preloader} src={PreloaderImg} alt="Загрузка..." />
  );
};

PreLoader.propTypes = {};

export default PreLoader;
