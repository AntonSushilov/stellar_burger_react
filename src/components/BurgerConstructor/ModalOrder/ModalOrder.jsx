import React from 'react'
import PropTypes from 'prop-types'
import done from '../../../images/done.png'

import styles from './ModalOrder.module.css'


const ModalOrder = props => {
  return (
    <div className={styles.modal_content}>
        <div className='mb-8'>
            <p className='text text_type_digits-large'>
                {props.orderId}
            </p>
        </div>
        <p className='text text_type_main-medium  mb-15'>
            Идентификатор заказа
        </p>
        <img className='mb-15' src={done} alt='Заказ оформлен'/>
        <p className='text text_type_main-medium  mb-2'>
            Ваш заказ начали готовить
        </p>
        <p className='text text_type_main-default text_color_inactive'>
            Дождитесь готовности на орбитальной станции
        </p>
    </div>
  )
}

ModalOrder.propTypes = {}

export default ModalOrder