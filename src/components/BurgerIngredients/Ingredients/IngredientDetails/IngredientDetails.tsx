import { shallowEqual } from "react-redux";
import { useParams } from "react-router";
import { useRootSelector } from "../../../../hooks/UseRootSelector";
import styles from "./IngredientDetails.module.css";
import { TIngredient } from "../../../../utils/types";
const IngredientDetails = () => {
  const { id } = useParams();
  const selectedIngredient = useRootSelector(
    (store) => store.ingredientsReducer.ingredients.find((el: TIngredient) => el._id === id),
    // shallowEqual
  );
  return (
    <div className={styles.modal_content}>
      {selectedIngredient && (
        <>
          <img
            className="mb-15"
            src={selectedIngredient.image_large}
            alt={selectedIngredient.name}
          />

          <p className="text text_type_main-medium  mb-15">
            {selectedIngredient.name}
          </p>
          <div className={styles.compose}>
            <section className={styles.compose_item}>
              <p className="text text_type_main-default text_color_inactive">
                Калории,ккал
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {selectedIngredient.calories}
              </p>
            </section>
            <section className={styles.compose_item}>
              <p className="text text_type_main-default text_color_inactive">
                Белки, г
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {selectedIngredient.proteins}
              </p>
            </section>
            <section className={styles.compose_item}>
              <p className="text text_type_main-default text_color_inactive">
                Жиры, г
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {selectedIngredient.fat}
              </p>
            </section>
            <section>
              <p className="text text_type_main-default text_color_inactive">
                Углеводы, г
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {selectedIngredient.carbohydrates}
              </p>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientDetails;
