import React from 'react'
import PropTypes from 'prop-types'
import { useState, useCallback } from 'react';
import styles from './BurgerConstructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
// import Modal from '../ModalWindow/Modal/Modal'
import Modal from '../Modal/Modal';
import OrderDetails from './OrderDetails/OrderDetails';

const BurgerConstructor = props => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [data, setData] = React.useState(props.data)
    const [bunSelected, setBunSelected] = React.useState(props.data.find(el => el.type==='bun'))
    const [summPrice, setSummPrice] = React.useState(610)

    const handleOpenModal = (el) => {
        setModalVisible(true)
    }
    
    const handleClickCloseModal = useCallback(() => {
        setModalVisible(false)
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
            {modalVisible && (
                <Modal onClose={handleClickCloseModal}>
                    <OrderDetails orderId='034536'/>
                </Modal>
            )}
        </div>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        _v: PropTypes.number,
    }))
}

export default BurgerConstructor