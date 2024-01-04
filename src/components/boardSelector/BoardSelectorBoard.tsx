import { Link } from 'react-router-dom'
import { BoardDetails } from '../../models/boardDetails'
import styles from './BoardSelectorBoard.module.css'

export interface BoardSelectorBoardProps {
    details: BoardDetails
}

export const BoardSelectorBoard = ({ details }: BoardSelectorBoardProps) => {
    return (
        <Link to={`board/${details.id}`}>
            <div className={styles.container}>
                <p className={styles.boardName}>{details.title}</p>
            </div>
        </Link>
    )
}