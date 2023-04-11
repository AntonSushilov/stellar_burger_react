import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";

const App = () => {  
  


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
        <div className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </main>
    </div>
  );
};

export default App;
