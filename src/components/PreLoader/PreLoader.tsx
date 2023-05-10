import PreloaderImg from "../../images/preloader.gif";
import styles from "./PreLoader.module.css";
const PreLoader = (): JSX.Element => {
  return (
    <img className={styles.preloader} src={PreloaderImg} alt="Загрузка..." />
  );
};

export default PreLoader;
