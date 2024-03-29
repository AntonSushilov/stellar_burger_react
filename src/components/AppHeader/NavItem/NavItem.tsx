import styles from "./NavItem.module.css";

type TNavItemProps = {
  children: string | JSX.Element | JSX.Element[];
};

const NavItem = ({ children }: TNavItemProps): JSX.Element => {
  return (
    <div className={[styles.nav_item, "pl-5 pr-5"].join(" ")}>{children}</div>
  );
};

export default NavItem;
