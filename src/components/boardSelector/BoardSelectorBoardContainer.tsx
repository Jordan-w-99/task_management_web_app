import { BoardSelectorBoard } from "./BoardSelectorBoard"
import styles from './BoardSelectorBoardContainer.module.css'
import { BoardDetails } from "../../models/boardDetails"

export interface BoardSelectorBoardContainerProps {
    boards: BoardDetails[]
}

export const BoardSelectorBoardContainer = ({ boards }: BoardSelectorBoardContainerProps) => {

    return (
        <div className={styles.container}>
            {
                boards.map(board =>
                    <BoardSelectorBoard details={board} />
                )
            }
        </div>
    )
}