import { NavLink, useMatch } from "react-router-dom";
import NavItem from "./NavItem/NavItem";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

const AppHeader = (): JSX.Element => {
  const isConstructor = !!useMatch({ path: "/" });
  const isFeed = !!useMatch("/feed");
  const isProfile = !!useMatch("/profile/*");

  // const userName = useSelector((store) => store.user.user?.name)

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <section className={styles.section_left}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "" : "text_color_inactive"
            }
          >
            <NavItem>
              <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </NavItem>
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? "" : "text_color_inactive"
            }
          >
            <NavItem>
              <ListIcon type={isFeed ? "primary" : "secondary"} />
              <p className="text text_type_main-default ml-2">Лента заказов</p>
            </NavItem>
          </NavLink>
        </section>
        <section className={styles.section_center}>
          <Logo />
        </section>
        <section className={styles.section_right}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "" : "text_color_inactive"
            }
          >
            <NavItem>
              <ProfileIcon type={isProfile ? "primary" : "secondary"} />
              <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </NavItem>
          </NavLink>
        </section>
      </nav>
    </header>
  );
};

export default AppHeader;
