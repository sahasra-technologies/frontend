import Styles from "./CarouselButton.module.css";

function CarouselButton({ text }) {
  return <button className={Styles.btn}>{text}</button>;
}

export default CarouselButton;
