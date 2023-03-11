import React from 'react'
import PropTypes from 'prop-types'
import styles from './IngredientDetails.module.css'

const ModalIngredient = props => {
  return (
    <div className={styles.modal_content}>
        <img className='mb-15' src={props.data.image_large} alt={props.data.name}/>

        <p className='text text_type_main-medium  mb-15'>
            {props.data.name}
        </p>
        <div className={styles.compose}>
            <section className={styles.compose_item}>
                <p className='text text_type_main-default text_color_inactive'>
                    Калории,ккал
                </p>
                <p className='text text_type_main-default text_color_inactive'>
                    {props.data.calories}
                </p>
            </section>
            <section className={styles.compose_item}>
                <p className='text text_type_main-default text_color_inactive'>
                    Белки, г
                </p>
                <p className='text text_type_main-default text_color_inactive'>
                    {props.data.proteins}
                </p>
            </section>
            <section className={styles.compose_item}>
                <p className='text text_type_main-default text_color_inactive'>
                    Жиры, г
                </p>
                <p className='text text_type_main-default text_color_inactive'>
                    {props.data.fat}
                </p>
            </section>
            <section>
                <p className='text text_type_main-default text_color_inactive'>
                    Углеводы, г
                </p>
                <p className='text text_type_main-default text_color_inactive'>
                    {props.data.carbohydrates}
                </p>
            </section>
        </div>
        
    </div>
  )
}

ModalIngredient.propTypes = {
    data: PropTypes.object.isRequired,
}

export default ModalIngredient