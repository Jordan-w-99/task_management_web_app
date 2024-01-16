import { useState } from "react"
import { BoardData, BoardList } from "../../models/boardData"
import { NewItemInput } from "../common/newItemInput"
import { BoardViewerList } from "./boardViewerList"
import { generateNewId } from "../../utils/generateNewId"
import styles from './boardViewerBoard.module.css'
import { saveBoard } from "../../api/saveBoardData"
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext"

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

        const updatedLists = [...lists, newList]

        setLists(updatedLists)
        saveBoard(boardData.id, updatedLists)
    }

    return (
        <BoardViewerBoardContext.Provider value={{ boardId: boardData.id }}>
            <div className={styles.boardContainer}>
                {lists.map(list => <BoardViewerList key={`board=${boardData.id}-list-${list.id}`} listData={list} />)}
                <NewItemInput
                    inputPlaceholder="List Name..."
                    buttonText="Create List"
                    action={createNewList}
                />
            </div>
        </BoardViewerBoardContext.Provider>
    )
}