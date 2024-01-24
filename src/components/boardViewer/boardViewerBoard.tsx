import { useState } from "react"
import { BoardData, BoardList, BoardListItem } from "../../models/boardData"
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
    const [draggingListItemData, setDraggingListItemData] = useState<BoardListItem>()

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

    const removeList = (listId: string) => {
        const listIndex = lists.findIndex(list => list.id === listId)

        if (listIndex === -1) {
            alert(`Error: Item with ID ${listId} Not found in list.`)
            return
        }

        const updatedLists = [...lists]
        updatedLists.splice(listIndex, 1)

        setLists(updatedLists)
        saveBoard(boardData.id, updatedLists)
    }

    const updateDraggingListItemData = (data: BoardListItem) => {
        setDraggingListItemData(data)
    }

    return (
        <BoardViewerBoardContext.Provider
            value={{
                boardId: boardData.id,
                updateDraggingListItemData
            }}
        >
            <div className={styles.boardContainer}>
                {lists.map(list => (
                    <BoardViewerList
                        key={`board=${boardData.id}-list-${list.id}`}
                        listData={list}
                        removeList={removeList}
                    />
                ))}
                <NewItemInput
                    inputPlaceholder="List Name..."
                    buttonText="Create List"
                    action={createNewList}
                />
                <div className={styles.cardMoveOverlay}>

                </div>
            </div>
        </BoardViewerBoardContext.Provider>
    )
}