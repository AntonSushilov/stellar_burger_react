import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ModalWindow.module.css";

type TModalWindow = {
  children?: string | JSX.Element | JSX.Element[];
  title?: string;
  onClose: () => void;
};

const ModalWindow = ({
  children,
  title,
  onClose,
}: TModalWindow): JSX.Element => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <p className="text text_type_main-large">{title}</p>
          <div style={{ cursor: "pointer" }} data-cy="modal-close-icon">
            <CloseIcon type="primary" onClick={onClose}/>
          </div>
        </div>
        <div className={styles.modal_body}>{children}</div>
      </div>
    </div>
  );
};

export default ModalWindow;
