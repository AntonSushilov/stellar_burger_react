import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { dataImport } from '../../utils/data.js'
import { dataConstructorImport } from '../../utils/constructor.js'


const MyApp = (props) => {
    const [data, setData] = React.useState(dataImport)
    const [dataConstructor, setDataConstructor] = React.useState(dataConstructorImport)

    return (
        <div className={ styles.app }>
            <AppHeader />
            <main className={styles.container}>
                <p className="text text_type_main-large mt-10 mb-5">
                    Соберите бургер
                </p>
                <div className={styles.content}>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={dataConstructor}/>

                </div>
                
                
            </main>

        </div>
    );
};

export default MyApp;