import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route path="/"/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="/reset-password" element={<ResetPasswordPage/>}/>
          <Route path="/profile" element={<LoginPage/>}/>
          <Route path="/ingredients/:id" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
      </main>
      {/* <div className={styles.app}>
        <AppHeader />
        <main className={styles.container}>
          <p className="text text_type_main-large mt-10 mb-5">
            Соберите бургер
          </p>
          <div className={styles.content}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </div>
        </main>
      </div> */}
      </div >
      
   
  );
};

export default App;
