import PropTypes from "prop-types";
import CardIngredient from "./CardIngredient/CardIngredient";
import styles from "./Ingredients.module.css";
import { PropTypesDataObject } from "../../../utils/types.js";

const Ingredients = ({ title, titleId, ingredients, refs }) => {
  return (
    <section className={styles.ingredients}>
      <div className={styles.title} id={titleId} ref={refs}>
        <p className="text text_type_main-medium">{title}</p>
      </div>
      <div className={[styles.content].join(" ")}>
        {ingredients ? (
          ingredients.map((el) => <CardIngredient data={el} key={el._id} />)
        ) : (
          <p className="text text_type_main-default">
            Выбранные ингредиенты отсутствуют
          </p>
        )}
      </div>
    </section>
  );
};

Ingredients.propTypes = {
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypesDataObject.isRequired).isRequired,
};

export default Ingredients;
