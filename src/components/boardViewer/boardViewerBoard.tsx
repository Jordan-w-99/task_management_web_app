import { useState } from "react"
import { BoardData, BoardList, BoardListItem } from "../../models/boardData"
import { NewItemInput } from "../common/newItemInput"
import { BoardViewerList } from "./boardViewerList"
import { generateNewId } from "../../utils/generateNewId"
import styles from './boardViewerBoard.module.css'
import { saveBoard } from "../../api/saveBoardData"
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext"
import { useMousePosition } from "../../hooks/useMousePosition"

export interface BoardViewerBoardProps {
    boardData: BoardData
}

export const BoardViewerBoard = ({ boardData }: BoardViewerBoardProps) => {
    const [lists, setLists] = useState(boardData.lists)

    // const [listRefs, setListRefs] = useState<RefObject<HTMLDivElement>[]>([])
    const mousePosition = useMousePosition()

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

    const createNewItem = (listId: string, itemTitle: string) => {
        const listIndex = boardData.lists.findIndex(list => list.id === listId);

        if (listIndex === -1) {
            return
        }

        const listItems = boardData.lists[listIndex].items

        const newItem: BoardListItem = {
            id: generateNewId(),
            title: itemTitle,
            description: '',
            complete: false
        }

        const updatedListItems = [...listItems, newItem]

        const updatedLists = [...boardData.lists]
        updatedLists[listIndex].items = updatedListItems

        setLists(updatedLists)
        saveBoard(boardData.id, updatedLists)
    }

    const removeItem = (listId: string, itemId: string) => {
        const listIndex = boardData.lists.findIndex(list => list.id === listId);

        if (listIndex === -1) {
            return
        }

        const listItems = boardData.lists[listIndex].items

        const itemIndex = listItems.findIndex(item => item.id === itemId)

        if (itemIndex === -1) {
            alert(`Error: Item with ID ${itemId} Not found in list.`)
            return
        }

        const updatedListItems = [...listItems]
        updatedListItems.splice(itemIndex, 1)

        const updatedLists = [...boardData.lists]
        updatedLists[listIndex].items = updatedListItems

        setLists(updatedLists)
        saveBoard(boardData.id, updatedLists)
    }

    const addItemToList = (listId: string, item: BoardListItem) => {
        const listIndex = boardData.lists.findIndex(list => list.id === listId);

        if (listIndex === -1) {
            return
        }

        const listItems = boardData.lists[listIndex].items

        const updatedListItems = [...listItems, item]

        const updatedLists = [...boardData.lists]
        updatedLists[listIndex].items = updatedListItems

        setLists(updatedLists)
        saveBoard(boardData.id, updatedLists)
    }

    const moveItemToMouseOverList = (item: BoardListItem, fromListId: string) => {
        if (mousePosition == null) {
            return
        }

        const toListId = document.elementsFromPoint(mousePosition.x, mousePosition.y).find(element => element.id.startsWith('list-'))?.id.substring(5, 15)

        if (toListId == null || toListId === fromListId) {
            return
        }

        removeItem(fromListId, item.id)
        addItemToList(toListId, item)
    }

    return (
        <BoardViewerBoardContext.Provider
            value={{
                boardId: boardData.id,
                moveItemToMouseOverList,
                createNewItem,
                removeItem
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