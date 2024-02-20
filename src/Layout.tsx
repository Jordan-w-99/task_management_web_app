import { Outlet } from "react-router-dom"
import styles from './Layout.module.css'

export const Layout = (): React.JSX.Element => {
    return (
        <div className={styles.appContainer}>
            <Outlet />
        </div>
    )
}