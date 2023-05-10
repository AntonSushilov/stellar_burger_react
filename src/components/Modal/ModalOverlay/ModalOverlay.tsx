import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";

type TModalOverlay = {
  onClose: () => void;
};
const ModalOverlay = ({ onClose }: TModalOverlay): JSX.Element => {
  return <div className={styles.modal_overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
