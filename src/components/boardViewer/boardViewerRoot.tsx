import { Link, useParams } from "react-router-dom"
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
            <div className={styles.titleContainer}>
                <Link className={`${styles.titleText} ${styles.boardHeaderAction}`} to={"/"}>{'<-'}</Link>
                <div className={styles.titleTextContainer}>
                    <EditableTitle
                        defaultTitle={boardData.title}
                        saveTitle={saveBoardTitle}
                        textClassName={styles.titleText}
                        centerText
                    />
                </div>
                <div className={`${styles.titleText} ${styles.boardHeaderAction}`}></div>
            </div>
            <BoardViewerBoard boardData={boardData} />
        </div>
    )
}