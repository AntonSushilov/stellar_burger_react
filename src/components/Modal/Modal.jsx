import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import cross from '../../images/cross.png' 

const Modal = props => {

    const closeModal = () => {
        props.closeModal()
    }
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <p className='text text_type_main-large'>
                        {props.title}
                    </p>
                    <img className={styles.img_cross} src={cross} alt="Крест" onClick={() => closeModal()}/>
                </div>
                <div className={styles.modal_body}>
                    {props.children}
                </div>
                
            </div>
            
        </div>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
}

export default Modal