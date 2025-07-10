import { useForm } from 'react-hook-form'
import UIButton from '../../ui/UIButton/UIButton'
import styles from './ContactForm.module.css'

export default function ContactForm({
  buttonText,
  onSubmit,
  buttonTheme = 'secondary',
  buttonDisabled = false,
  inputTheme = 'primary',
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const inputClasses = `${styles.input} ${styles[inputTheme]}`
  const errorClasses = `${styles.error_message} ${
    styles[`error_message_${inputTheme}`]
  }`

  return (
    <form className={styles.form_content} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input_wrapper}>
        <input
          type="text"
          placeholder="Name"
          className={inputClasses}
          {...register('name', { required: 'Name is required' })}
        />

        {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
      </div>

      <div className={styles.input_wrapper}>
        <input
          type="tel"
          placeholder="Phone number"
          className={inputClasses}
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^\+?[0-9\s\-()]{10,}$/,
              message: 'Invalid phone number format',
            },
          })}
        />
        {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
      </div>

      <div className={styles.input_wrapper}>
        <input
          type="email"
          placeholder="Email"
          className={inputClasses}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
      </div>

      <UIButton theme={buttonTheme} type="submit" disabled={buttonDisabled}>
        {buttonText}
      </UIButton>
    </form>
  )
}
