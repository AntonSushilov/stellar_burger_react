import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import NotFound404 from "../../pages/NotFound404/NotFound404";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructorPage from "../../pages/BurgerConstructorPage/BurgerConstructorPage";
import FeedPage from "../../pages/FeedPage/FeedPage";
import UserProfile from "../UserProfile/UserProfile";
import HistoryFeed from "../HistoryFeed/HistoryFeed";
import IngredientView from "../BurgerIngredients/Ingredients/IngredientView/IngredientView";
import IngredientDetails from "../BurgerIngredients/Ingredients/IngredientDetails/IngredientDetails";
import OrderDetails from "../BurgerConstructor/OrderDetails/OrderDetails";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import styles from "./App.module.css";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/User/action";
import { getIngredients } from "../../services/BurgerIngredients/action";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(checkUserAuth());
      dispatch(getIngredients());

  }, []);

  let location = useLocation();
  let state = location.state


  return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.container}>
          <Routes location={state?.backgroundLocation || location}>
            <Route path="/" element={<BurgerConstructorPage />}/>
            <Route path="/feed" element={<FeedPage />}/>
            <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<OnlyAuth component={<ProfilePage />}/>}>
              <Route index element={<UserProfile />}/>
              <Route path="history-feed" element={<HistoryFeed />}/>
            </Route>
            <Route path="/ingredients/:id" element={<IngredientView />} />
            <Route path="*" element={<NotFound404/>}/>
          </Routes>

          {state?.backgroundLocation && (
            <Routes>
              <Route path="/ingredients/:id" element={<Modal title="Детали ингредиента"><IngredientDetails /></Modal>}/>
              <Route path="/order-details" element={<Modal><OrderDetails /></Modal>} />

            </Routes>
          )}
        </main>
    
     
    </div>
  );
};

export default App;
