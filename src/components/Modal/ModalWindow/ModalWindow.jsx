import React from 'react'
import PropTypes from 'prop-types'
import styles from './ModalWindow.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'




const ModalWindow = props => {
    const { children, title, onClose } = props;

    
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <p className='text text_type_main-large'>
                        {props.title}
                    </p>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                <div className={styles.modal_body}>
                    {props.children}
                </div>  
            </div>
            
        </div>
    )
}

ModalWindow.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

export default ModalWindow