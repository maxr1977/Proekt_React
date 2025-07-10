import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.css'

export default function Breadcrumbs({ paths }) {
  return (
    <nav className={styles.breadcrumbs}>
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1
        return (
          <React.Fragment key={index}>
            <div className={isLast ? styles.active_crumb : styles.crumb}>
              {isLast ? (
                <span>{path.label}</span>
              ) : (
                <Link to={path.path}>{path.label}</Link>
              )}
            </div>
           
            {!isLast && <div className={styles.separator}></div>}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
