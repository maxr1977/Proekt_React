import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { useSelector } from 'react-redux'

import logo from '../../assets/logo.svg'
import cartIcon from '../../assets/cart.svg'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartItems = useSelector((state) => state.cart.list)
  const uniqueItemsCount = cartItems.length

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={`${styles.header_container} container`}>
        <Link to="/" onClick={closeMenu}>
          <img className={styles.logo} src={logo} alt="Pet-Shop logo" />
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.nav_open : ''}`}>
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Main Page
          </NavLink>
          <NavLink
            to="/categories"
            end
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Categories
          </NavLink>
          <NavLink
            to="/products"
            end
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            All products
          </NavLink>
          <NavLink
            to="/sales"
            end
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            All sales
          </NavLink>
        </nav>

        <div className={styles.controls}>
          <Link to="/cart" onClick={closeMenu} className={styles.cart_link}>
            <img
              className={styles.cart_icon}
              src={cartIcon}
              alt="Shopping cart"
            />
            {uniqueItemsCount > 0 && (
              <span className={styles.cart_count}>{uniqueItemsCount}</span>
            )}
          </Link>

          <button
            className={styles.hamburger_btn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>
    </header>
  )
}
