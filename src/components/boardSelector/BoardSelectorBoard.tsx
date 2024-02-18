import { Link } from 'react-router-dom'
import { BoardDetails } from '../../models/boardDetails'
import styles from './BoardSelectorBoard.module.css'
import { useMemo } from 'react'

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

    return (
        <Link to={`board/${details.id}`}>
            <div className={styles.container} style={{ rotate: `${rotationFromId}deg` }}>
                <div className={styles.noteTop} />
                <div className={styles.noteBottom}>
                    <p className={styles.boardName}>{details.title}</p>
                </div>
            </div>
        </Link>
    )
}