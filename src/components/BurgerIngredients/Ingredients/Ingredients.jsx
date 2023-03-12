import React from 'react'
import { useCallback } from 'react'
import PropTypes from 'prop-types'
import CardIngredient from './CardIngredient/CardIngredient'
import Modal from '../../Modal/Modal'
import ModalIngredient from './IngredientDetails/IngredientDetails'
import styles from './Ingredients.module.css'
import { PropTypesDataObject } from '../../../utils/types.js'

const Ingredients = props => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [ingredient, setIngredient] = React.useState()


    const handleOpenModal = (el) => {
        setModalVisible(true)
        setIngredient(el)
    }
    
    const handleClickCloseModal = useCallback(() => {
        setModalVisible(false)
    }, [])

    return (
        <section className={styles.ingredients}>
            <div className={styles.title}>
                <p className="text text_type_main-medium">
                    {props.title}
                </p>
            </div>
            <div className={ [styles.content, 'mb-10'].join(" ")}>
                {props.data
                ? (
                    <>
                    {props.data && props.data.map(el =>(
                    <div className={styles.card} key={el._id} onClick={() => handleOpenModal(el)}>
                        <CardIngredient data={el} />
                    </div>
                    
                    ))}
                    </>
                )
                : (
                    <p className="text text_type_main-default">
                        Выбранные ингредиенты отсутствуют
                    </p>
                )}
                
                
            </div>
            {modalVisible && (
                <Modal onClose={handleClickCloseModal} title='Детали ингредиента'>
                    <ModalIngredient data={ingredient}/>
                </Modal>
            )}
        </section>
    )
}

Ingredients.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypesDataObject)
}

export default Ingredients