import { useState } from "react"
import { BoardData, BoardList } from "../../models/boardData"
import { NewItemInput } from "../common/newItemInput"
import { BoardViewerList } from "./boardViewerList"
import { generateNewId } from "../../utils/generateNewId"
import styles from './boardViewerBoard.module.css'

export interface BoardViewerBoardProps {
    boardData: BoardData
}

export const BoardViewerBoard = ({ boardData }: BoardViewerBoardProps) => {
    const [lists, setLists] = useState(boardData.lists)

    const createNewList = (listTitle: string) => {
        const newList: BoardList = {
            id: generateNewId(),
            title: listTitle,
            items: []
        }

        setLists([...lists, newList])
    }

    return (
        <div className={styles.boardContainer}>
            {lists.map(list => <BoardViewerList listData={list} />)}
            <NewItemInput
                inputPlaceholder="List Name..."
                buttonText="Create List"
                action={createNewList}
            />
        </div>
    )
}