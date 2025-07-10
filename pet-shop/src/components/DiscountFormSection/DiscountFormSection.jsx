
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../api';
import { setDiscountEligibility } from '../../store/slices/discountSlice';
import ContactForm from '../ContactForm/ContactForm';
import styles from './DiscountFormSection.module.css';
import discountImg from '../../assets/discount-pets.png'

export default function DiscountFormSection() {
    const dispatch = useDispatch();
    
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmitDiscount = async (data, { reset }) => {
        
        try {
            
            await api.post('/sale/send', data);
            
            
            setIsSubmitted(true); 
            dispatch(setDiscountEligibility(true)); 
            reset(); 
            
            alert('Your request has been sent successfully!');
        } catch (error) {
            console.error('Не удалось отправить запрос на скидку:', error);
            alert('Что-то пошло не так. Пожалуйста, попробуйте еще раз.');
        }
    }

    
    const handleSubmitWrapper = (data, event) => {
        const form = event.target;
        handleSubmitDiscount(data, { reset: () => form.reset() });
    };

    return (
        <section className={styles.discount_section}>
          <h2>5% off on the first order</h2>
            <div className={styles.content_wrapper}>
                <div className={styles.image_content}>
                    <img src={discountImg} alt="Happy pets" />
                </div>
                <div className={styles.form_wrapper}>
                    
                    <ContactForm 
                        buttonText={isSubmitted ? "Request Submitted" : "Get a discount"}
                        onSubmit={handleSubmitWrapper}
                        buttonDisabled={isSubmitted} 
                        buttonTheme="secondary" 
                        inputTheme="transparent"
                    />
                </div>
            </div>
        </section>
    );
}



