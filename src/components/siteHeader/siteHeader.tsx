import React from 'react'
import styles from './siteHeader.module.css'
import { Link } from 'react-router-dom'

export const SiteHeader = (): React.JSX.Element => {
    return (
        <div className={styles.siteHeader}>
            <nav>
                <Link to='/'>
                    <button className={styles.linkBtn}>
                        Boards
                    </button>
                </Link>
            </nav>
        </div>
    )
}