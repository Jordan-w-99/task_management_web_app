import { CSSProperties, ReactNode } from "react"
import styles from './squareButton.module.css'

export interface SquareButtonProps {
    icon: ReactNode,
    style?: CSSProperties,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const SquareButton = ({
    icon,
    style,
    onClick
}: SquareButtonProps) => {
    return (
        <button className={styles.button} style={style} onClick={onClick}>
            {icon}
        </button>
    )
}