import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import UIButton from '../../ui/UIButton/UIButton';
import image_404 from '../../assets/404_image.png'; 

export default function NotFoundPage() {
    return (
        <div className={styles.not_found_page}>
            <div className={styles.content}>
                <div className={styles.number_404}>
                    <span className={styles.digit}>4</span>
                    <img src={image_404} alt="Sad pet" className={styles.image} />
                    <span className={styles.digit}>4</span>
                </div>
                <h2>Page Not Found</h2>
                <p>We're sorry, the page you requested could not be found. Please go back to the homepage.</p>
                <Link to="/">
                    <UIButton theme="primary">Go Home</UIButton>
                </Link>
            </div>
        </div>
    );
}