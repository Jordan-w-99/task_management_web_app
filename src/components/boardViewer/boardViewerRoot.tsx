import { useParams } from "react-router-dom"
import { GetBoardData } from "../../api/getBoardData"
import { BoardViewerBoard } from "./boardViewerBoard"
import styles from './boardViewerRoot.module.css'

export const BoardViewerRoot = () => {
    const { id } = useParams()

    if (id == null) {
        return <></>
    }

    const boardData = GetBoardData(id)

    return (
        <div className={styles.container}>
            {boardData.title}
            <BoardViewerBoard boardData={boardData} />
        </div>
    )
}