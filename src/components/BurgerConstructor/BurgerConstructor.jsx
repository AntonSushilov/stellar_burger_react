import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react';
import styles from './BurgerConstructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import ModalOrder from './ModalOrder/ModalOrder';

const BurgerConstructor = props => {
    const [modal, setOpenModal] = React.useState(false)
    const [data, setData] = React.useState(props.data)
    const [summPrice, setSummPrice] = React.useState(610)

    const openModal = () => {
        setOpenModal(true)
    }
    
    const closeModal = () => {
        setOpenModal(false)
    }

    return (
        <div className={styles.content}>
            <div className={[styles.items, 'text text_type_main-default'].join(' ')}>
                    {data && data.map((el, index) =>(
                        <div key={el._id} className={styles.item}>
                            {el.type === 'bun' ? <></> : <DragIcon type='primary'/>}
                            <ConstructorElement  
                                type={index === 0 ? 'top' : index === data.length-1 ? 'bottom' : '' }
                                isLocked={el.type === 'bun' ? true : false}
                                text={el.name}
                                price={el.price}
                                thumbnail={el.image}
                            />
                        </div>
                        
                    ))}
                
            </div>
            <div className={styles.order}>
                <div className={[styles.summ_price, 'text text_type_main-default mr-10'].join(' ')}>
                    <p className='text text_type_digits-medium mr-3'>
                        {summPrice}
                    </p>
                    <CurrencyIcon type='primary' />
                </div> 
                <Button htmlType='button' type='primary' size='medium' onClick={() => openModal()}>
                    Оформить заказ
                </Button>
            </div>
            {modal && (
                <Modal 
                    closeModal={() => closeModal()}
                >
                    <ModalOrder 
                        orderId='034536'
                    />
                </Modal>
            )}
        </div>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerConstructor