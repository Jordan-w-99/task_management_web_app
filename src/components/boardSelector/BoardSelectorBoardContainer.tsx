import { GetBoards } from "../../api/getBoardData"
import { BoardDetails } from "../../models/boardDetails"
import { BoardSelectorBoard } from "./BoardSelectorBoard"
import styles from './BoardSelectorBoardContainer.module.css'

export const BoardSelectorBoardContainer = () => {
    const boards: BoardDetails[] = GetBoards()

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