import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './App.module.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { dataImport } from '../../utils/data.js'
// import { dataConstructorImport } from '../../utils/constructor.js'


const App = (props) => {
    const mainUrl = 'https://norma.nomoreparties.space'
    const [state, setState] = useState({
        productsData: null,
        hasError: false,
        loading: true
    })
    // const [dataConstructor, setDataConstructor] = React.useState(dataConstructorImport)

    
    useEffect(()=>{
        const getProductsData = async () => {
            setState({...state, loading: true});
            const res = await fetch(`${mainUrl}/api/ingredients`);
            const data = await res.json();
            if (data.success === true){
                setState({ ...state, productsData: data.data, loading: false });
            }else{
                setState({ ...state, hasError: true, loading: false });
            }
           
        }
        getProductsData()
    }, []) 


    return (
        <ErrorBoundary>
        <div className={ styles.app }>
            <AppHeader />
            <main className={styles.container}>
            
            <p className="text text_type_main-large mt-10 mb-5">
            {state.loading 
            ? 
                "Идет загрузка данных..."
            :
                state.hasError 
                ? "Возникла ошибка"
                : "Соберите бургер"
            }
            </p>
            {state.productsData &&
                <div className={styles.content}>
                    <BurgerIngredients data={state.productsData}/>
                    <BurgerConstructor data={state.productsData}/>
                </div>
            }       
                
            </main>

        </div>
        
        </ErrorBoundary>
        
    );
};

export default App;