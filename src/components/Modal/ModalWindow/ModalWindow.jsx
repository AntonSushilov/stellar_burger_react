import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ModalWindow.module.css";

const ModalWindow = ({ children, title, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <p className="text text_type_main-large">{title}</p>
          <div style={{ cursor: "pointer" }}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        <div className={styles.modal_body}>{children}</div>
      </div>
    </div>
  );
};

ModalWindow.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ModalWindow;
