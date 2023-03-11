import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Modal from './Modal/Modal'
import ModalOverlay from './ModalOverlay/ModalOverlay'
import styles from './ModalWindow.module.css'

const modalRoot = document.getElementById("react-modals");

const ModalWindow = props => {
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
            <Modal title={title} onClose={onClose}>
                {children}
            </Modal>
            <ModalOverlay onClose={onClose}/>
        
            </div>
        ), 
        modalRoot
    );

}

ModalWindow.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

export default ModalWindow