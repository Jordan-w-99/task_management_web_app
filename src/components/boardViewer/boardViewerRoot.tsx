import { useParams } from "react-router-dom"
import { GetAllBoardData, GetBoard } from "../../api/getBoardData"
import { BoardViewerBoard } from "./boardViewerBoard"
import styles from './boardViewerRoot.module.css'
import { EditableTitle } from "../common/editableTitle"
import { updateBoardTitle } from "../../api/saveBoardData"

export const BoardViewerRoot = () => {
    const { id } = useParams()

    if (id == null) {
        return <></>
    }

    const boardData = GetBoard(GetAllBoardData(), id)

    const saveBoardTitle = (newTitle: string) => {
        updateBoardTitle(id, newTitle)
    }

    return (
        <div className={styles.container}>
            <EditableTitle
                defaultTitle={boardData.title}
                saveTitle={saveBoardTitle}
            />
            <BoardViewerBoard boardData={boardData} />
        </div>
    )
}