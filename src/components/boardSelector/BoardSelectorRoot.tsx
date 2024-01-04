import { BoardSelectorBoardContainer } from './BoardSelectorBoardContainer'
import styles from './BoardSelectorRoot.module.css'

export const BoardSelectorRoot = () => {
    return (
        <div className={styles.container}>
            <BoardSelectorBoardContainer />
        </div>
    )
}