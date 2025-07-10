import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, children, contentClassName = '' }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={`${styles.modal_content} ${contentClassName}`} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.close_button} onClick={onClose}>×</button>
      </div>
    </div>
  );
}