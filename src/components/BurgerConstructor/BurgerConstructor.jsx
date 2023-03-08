import React from 'react'
import PropTypes from 'prop-types'
import { useState, useCallback } from 'react';
import styles from './BurgerConstructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import ModalOrder from './ModalOrder/ModalOrder';

const BurgerConstructor = props => {
    const [modal, setOpenModal] = React.useState(false)
    const [data, setData] = React.useState(props.data)
    const [bunSelected, setBunSelected] = React.useState(props.data.find(el => el.type==='bun'))
    const [summPrice, setSummPrice] = React.useState(610)

    const handleOpenModal = (el) => {
        setOpenModal(true)
    }
    
    const handleClickCloseModal = useCallback(() => {
        setOpenModal(false)
    }, [])

    return (
        <div className={styles.content}>
            <div className={[styles.items, 'text text_type_main-default'].join(' ')}>
                <div className={[styles.item, styles.item_bun].join(' ')}>
                    <ConstructorElement  
                        type='top'
                        isLocked={true}
                        text={bunSelected.name  + " (верх)"}
                        price={bunSelected.price}
                        thumbnail={bunSelected.image}
                    />
                </div>
                <div className={styles.item_middle}>
                {data && data.filter(el => el.type!=='bun').map((el, index) =>(
                    <div key={el._id} className={styles.item}>
                        <DragIcon type='primary'/>
                        <ConstructorElement  
                            type=''
                            isLocked={false}
                            text={el.name}
                            price={el.price}
                            thumbnail={el.image}
                        />
                    </div>
                    
                ))}
                </div>
                <div className={[styles.item, styles.item_bun].join(' ')}>
                    <ConstructorElement  
                        type='bottom'
                        isLocked={true}
                        text={bunSelected.name  + " (низ)"}
                        price={bunSelected.price}
                        thumbnail={bunSelected.image}
                    />
                </div>
            </div>
            <div className={styles.order}>
                <div className={[styles.summ_price, 'text text_type_main-default mr-10'].join(' ')}>
                    <p className='text text_type_digits-medium mr-3'>
                        {summPrice}
                    </p>
                    <CurrencyIcon type='primary' />
                </div> 
                <Button htmlType='button' type='primary' size='medium' onClick={() => handleOpenModal()}>
                    Оформить заказ
                </Button>
            </div>
            {modal && (
                <Modal closeModal={handleClickCloseModal}>
                    <ModalOrder orderId='034536'/>
                </Modal>
            )}
        </div>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerConstructor