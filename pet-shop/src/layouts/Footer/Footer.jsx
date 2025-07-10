import styles from './Footer.module.css'
import InstagramIcon from '../../assets/instagram.svg'
import WhatsAppIcon from '../../assets/whatsapp.svg'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer_container} container`}>
        <h2>Contact</h2>
        <div className={styles.info_grid}>
          {/* Блок с телефоном */}
          <div className={styles.info_box}>
            <p className={styles.box_title}>Phone</p>
            <a href="tel:+493091588492" className={styles.box_content_large}>
              +49 30 915-88492
            </a>
          </div>

          <div className={styles.info_box}>
            <p className={styles.box_title}>Socials</p>
            <div className={styles.socials_icons}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src={InstagramIcon} alt="Instagram" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <img src={WhatsAppIcon} alt="WhatsApp" />
              </a>
            </div>
          </div>

          <div className={styles.info_box}>
            <p className={styles.box_title}>Address</p>
            <p className={styles.box_content}>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </p>
          </div>

          <div className={styles.info_box}>
            <p className={styles.box_title}>Working Hours</p>
            <p className={styles.box_content_large}>24 hours a day</p>
          </div>
        </div>

        <div className={styles.map_section}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.328073842669!2d13.404250876569145!3d52.50855097205606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e1df590184b%3A0x1c948d0816E85D4B!2sWallstra%C3%9Fe%2C%2010179%20Berlin!5e0!3m2!1sen!2sde!4v1720593922339!5m2!1sen!2sde"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location of the Pet Shop on Google Maps"
          ></iframe>
        </div>
      </div>
    </footer>
  )
}
