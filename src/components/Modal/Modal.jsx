import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import ModalWindow from './ModalWindow/ModalWindow'
import ModalOverlay from './ModalOverlay/ModalOverlay'
import styles from './Modal.module.css'

const modalRoot = document.getElementById("react-modals");

const Modal = props => {
    const { children, title, onClose } = props;

    const handleCloseModal = (e) => {
        if(e.keyCode === 27) {
            onClose()
        }
    }

    useEffect(()=>{
        // Устанавливаем слушатель события при монтировании
        document.addEventListener("keydown", handleCloseModal);
    
        // Сбрасываем слушатель события при удалении компонента из DOM
        return () => {
          document.removeEventListener("keydown", handleCloseModal);
        }
      }, [])

    return ReactDOM.createPortal(
        (
            <div className={styles.modal_window}>
            <ModalWindow title={title} onClose={onClose}>
                {children}
            </ModalWindow>
            <ModalOverlay onClose={onClose}/>
        
            </div>
        ), 
        modalRoot
    );

}

Modal.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

export default Modal