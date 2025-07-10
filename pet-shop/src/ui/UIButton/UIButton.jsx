import styles from './UIButton.module.css';


export default function UIButton({ children, theme = 'primary', ...props }) {
  
  const buttonClasses = `${styles.btn} ${styles[theme]}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}