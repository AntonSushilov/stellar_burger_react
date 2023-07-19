import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import NotFound404 from "../../pages/NotFound404/NotFound404";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructorPage from "../../pages/BurgerConstructorPage/BurgerConstructorPage";
import FeedPage from "../../pages/FeedPage/FeedPage";
import UserProfile from "../ProfileUser/ProfileUser";
import HistoryFeed from "../HistoryFeed/HistoryFeed";
import IngredientView from "../BurgerIngredients/Ingredients/IngredientView/IngredientView";
import IngredientDetails from "../BurgerIngredients/Ingredients/IngredientDetails/IngredientDetails";
import OrderDetails from "../BurgerConstructor/OrderDetails/OrderDetails";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import styles from "./App.module.css";
import Modal from "../Modal/Modal";
// import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/User/action";
import { getIngredients } from "../../services/BurgerIngredients/action";
import OrderFeedDetails from "../OrderFeedDetails/OrderFeedDetails";
import OrdersHistory from "../OrdersHistory/OrdersHistory";
import OrdersInfo from "../OrdersInfo/OrdersInfo";
import OrdersDetails from "../OrdersDetails/OrdersDetails";
const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);

  let location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  console.log("background || location", background, location);
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <Routes location={background || location}>
          <Route path="/" element={<BurgerConstructorPage />} />
          <Route path="/feed" element={<FeedPage />}>
            <Route index element={<OrdersDetails />} />
            <Route
              path="/feed/:id"
              element={
                <div className="mt-15">
                  <OrderFeedDetails />
                </div>
              }
            />
          </Route>
          <Route
            path="/login"
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPasswordPage />} />}
          />
          <Route
            path="/order-details"
            element={
              <OnlyAuth
                component={
                  <Modal onClose={handleModalClose}>
                    <OrderDetails />
                  </Modal>
                }
              />
            }
          />
          <Route
            path="/profile"
            element={<OnlyAuth component={<ProfilePage />} />}
          >
            <Route index element={<UserProfile />} />
            <Route path="/profile/orders" element={<HistoryFeed />} />
            <Route
              path="/profile/orders/:id"
              element={
                <div className="mt-15">
                  <OrderFeedDetails />
                </div>
              }
            />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента" onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/order-details"
              element={
                <OnlyAuth
                  component={
                    <Modal onClose={handleModalClose}>
                      <OrderDetails />
                    </Modal>
                  }
                />
              }
            />
            <Route
              path="/feed/:id"
              element={
                <Modal title="Детали заказа" onClose={handleModalClose}>
                  <OrderFeedDetails />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <Modal title="Детали заказа" onClose={handleModalClose}>
                  <OrderFeedDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default App;
