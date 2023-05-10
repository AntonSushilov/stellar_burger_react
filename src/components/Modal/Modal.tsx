import { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalWindow from "./ModalWindow/ModalWindow";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

type TModal = {
  children?: string | JSX.Element | JSX.Element[];
  title?: string;
  onClose: () => void;
};

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, title, onClose }: TModal): JSX.Element => {
  const handleCloseModal = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    // Устанавливаем слушатель события при монтировании
    document.addEventListener("keydown", handleCloseModal);

    // Сбрасываем слушатель события при удалении компонента из DOM
    return () => {
      document.removeEventListener("keydown", handleCloseModal);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.modal_window}>
      <ModalWindow title={title} onClose={onClose}>
        {children}
      </ModalWindow>
      <ModalOverlay onClose={onClose} />
    </div>,
    modalRoot as HTMLDivElement
  );
};

export default Modal;
