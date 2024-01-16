import { ReactNode } from "react"
import styles from './squareButton.module.css'

export interface SquareButtonProps {
    icon: ReactNode,
    onClick: () => void
}

export const SquareButton = ({
    icon,
    onClick
}: SquareButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {icon}
        </button>
    )
}