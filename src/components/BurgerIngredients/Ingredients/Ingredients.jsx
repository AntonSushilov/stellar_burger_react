import React from 'react'
import PropTypes from 'prop-types'
import CardIngredient from './CardIngredient/CardIngredient'
import Modal from '../../Modal/Modal'
import ModalIngredient from './ModalIngredient/ModalIngredient'
import styles from './Ingredients.module.css'

const Ingredients = props => {
    const [modal, setOpenModal] = React.useState(false)
    const [ingredient, setIngredient] = React.useState()


    const openModal = (el) => {
        setOpenModal(true)
        setIngredient(el)
    }
    
    const closeModal = () => {
        setOpenModal(false)
    }

    return (
        <section className={styles.ingredients}>
            <div className={styles.title}>
                <p className="text text_type_main-medium">
                    {props.title}
                </p>
            </div>
            <div className={ [styles.content, 'mb-10'].join(" ")}>
                {props.data && props.data.map(el =>(
                    <div className={styles.card} key={el._id} onClick={() => openModal(el)}>
                        <CardIngredient data={el} />
                    </div>
                    
                ))}
                
            </div>
            {modal && (
                <Modal 
                    closeModal={() => closeModal()}
                    title='Детали ингредиента'
                >
                   <ModalIngredient 
                        data={ingredient}
                   />
                </Modal>
            )}
        </section>
    )
}

Ingredients.propTypes = {

}

export default Ingredients