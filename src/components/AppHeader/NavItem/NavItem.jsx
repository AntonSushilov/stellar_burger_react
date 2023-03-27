import PropTypes from "prop-types";
import styles from "./NavItem.module.css";

const NavItem = ({children}) => {
  return (
    <div className={[styles.nav_item, "pl-5 pr-5"].join(" ")}>
      {children}
    </div>
  );
};

NavItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavItem;
