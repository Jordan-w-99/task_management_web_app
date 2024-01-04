import { Outlet } from "react-router-dom"
import { SiteHeader } from "./components/siteHeader/siteHeader"
import styles from './Layout.module.css'

export const Layout = (): React.JSX.Element => {
    return (
        <div className={styles.appContainer}>
            <SiteHeader />
            <Outlet />
        </div>
    )
}