import { Link } from 'react-router-dom';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ title, buttonText, linkTo }) {
  return (
    <div className={styles.header}>
      <h2>{title}</h2>
      <div className={styles.line}></div>
      <Link to={linkTo} className={styles.button}>
        {buttonText}
      </Link>
    </div>
  );
}