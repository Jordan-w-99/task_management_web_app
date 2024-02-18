import { Link } from 'react-router-dom'
import { BoardDetails } from '../../models/boardDetails'
import styles from './BoardSelectorBoard.module.css'
import { useMemo, useState } from 'react'

export interface BoardSelectorBoardProps {
    details: BoardDetails
}

export const BoardSelectorBoard = ({ details }: BoardSelectorBoardProps) => {
    const rotationFromId = useMemo(() => (details.id.split('').reduce((sum, char) => {
        if (Number.isNaN(Number.parseInt(char))) {
            return sum;
        }

        return sum + Number.parseInt(char)

    }, 0) % 20) - 10
        , [details.id]);

    const [hovered, setHovered] = useState(false)

    return (
        <Link to={`board/${details.id}`}>
            <div
                className={styles.container}
                style={{
                    rotate: `${hovered ? 0 : rotationFromId}deg`,
                    scale: `${hovered ? 1.05 : 1}`,
                    boxShadow: `${hovered ? '5px 5px 8px rgba(33, 33, 33, .6)' : '5px 5px 7px rgba(33, 33, 33, .7)'}`,
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className={styles.noteTop} />
                <div className={styles.noteBottom}>
                    <p className={styles.boardName}>{details.title}</p>
                </div>
            </div>
        </Link>
    )
}