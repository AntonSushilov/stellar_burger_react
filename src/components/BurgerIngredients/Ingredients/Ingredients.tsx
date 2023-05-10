import PropTypes from "prop-types";
import { forwardRef } from "react";
import { TIngredient, TIngredientsList } from "../../../utils/types";
import CardIngredient from "./CardIngredient/CardIngredient";
import styles from "./Ingredients.module.css";
// import { PropTypesDataObject } from "../../../utils/types.js";
type TIngredientsProps = {
  title: string;
  titleId: string;
  ingredients: TIngredientsList;
};

const Ingredients = forwardRef<HTMLDivElement, TIngredientsProps>(
  ({ title, titleId, ingredients }, ref) => (
    <section className={styles.ingredients}>
      <div className={styles.title} id={titleId} ref={ref}>
        <p className="text text_type_main-medium">{title}</p>
      </div>
      <div className={[styles.content].join(" ")}>
        {ingredients ? (
          ingredients.map((el: TIngredient) => (
            <CardIngredient data={el} key={el._id} />
          ))
        ) : (
          <p className="text text_type_main-default">
            Выбранные ингредиенты отсутствуют
          </p>
        )}
      </div>
    </section>
  )
);

// const Ingredients = ({
//   title,
//   titleId,
//   ingredients,
//   refs,
// }: TIngredientsProps): JSX.Element => {
//   return (
//     <section className={styles.ingredients}>
//       <div className={styles.title} id={titleId} ref={refs}>
//         <p className="text text_type_main-medium">{title}</p>
//       </div>
//       <div className={[styles.content].join(" ")}>
//         {ingredients ? (
//           ingredients.map((el: TIngredient) => (
//             <CardIngredient data={el} key={el._id} />
//           ))
//         ) : (
//           <p className="text text_type_main-default">
//             Выбранные ингредиенты отсутствуют
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// // Ingredients.propTypes = {
// // title: PropTypes.string.isRequired,
// // titleId: PropTypes.string.isRequired,
// // ingredients: PropTypes.arrayOf(PropTypesDataObject.isRequired).isRequired,
// // };

export default Ingredients;
