import { useCallback, useMemo, useState } from "react"
import { BoardData, BoardList, BoardListItem } from "../../models/boardData"
import { NewItemInput } from "../common/newItemInput"
import { BoardViewerList } from "./boardViewerList"
import { generateNewId } from "../../utils/generateNewId"
import styles from './boardViewerBoard.module.css'
import { saveBoard } from "../../api/saveBoardData"
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext"
import { useMousePosition } from "../../hooks/useMousePosition"
import { clampNumber } from "../../utils/clampNumber"

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

    const createNewItem = useCallback((listId: string, itemTitle: string) => {
        const listIndex = lists.findIndex(list => list.id === listId);

        if (listIndex === -1) {
            return
        }

        const listItems = lists[listIndex].items

        const newItem: BoardListItem = {
            id: generateNewId(),
            title: itemTitle,
            description: '',
            complete: false
        }

        const updatedListItems = [...listItems, newItem]

        const updatedLists = [...lists]
        updatedLists[listIndex].items = updatedListItems

        setLists(updatedLists)
        saveBoard(boardData.id, updatedLists)
    }, [boardData.id, lists])

    const removeItem = useCallback((listId: string, itemId: string) => {
        const listIndex = lists.findIndex(list => list.id === listId);

        if (listIndex === -1) {
            return
        }

        const listItems = lists[listIndex].items

        const itemIndex = listItems.findIndex(item => item.id === itemId)

        if (itemIndex === -1) {
            alert(`Error: Item with ID ${itemId} Not found in list.`)
            return
        }

        const updatedListItems = [...listItems]
        updatedListItems.splice(itemIndex, 1)

        const updatedLists = [...lists]
        updatedLists[listIndex].items = updatedListItems

        setLists(updatedLists)
        saveBoard(boardData.id, updatedLists)
    }, [boardData.id, lists])

    const addItemToList = useCallback((listId: string, item: BoardListItem, insertAtIndex?: number) => {
        const listIndex = lists.findIndex(list => list.id === listId);

        if (listIndex === -1) {
            return
        }

        const listItems = lists[listIndex].items

        const updatedListItems = [...listItems]

        if (insertAtIndex == null) {
            updatedListItems.push(item)
        }
        else {
            updatedListItems.splice(clampNumber(insertAtIndex, 0, updatedListItems.length), 0, item)
        }

        const updatedLists = [...lists]
        updatedLists[listIndex].items = updatedListItems

        setLists(updatedLists)
        saveBoard(boardData.id, updatedLists)
    }, [boardData.id, lists]);

    const moveItemToMouseOverList = useCallback((item: BoardListItem, fromListId: string) => {
        if (mousePosition == null) {
            return
        }

        const listElement = document.elementsFromPoint(mousePosition.x, mousePosition.y).find(element => element.id.startsWith('list-'))

        if (listElement == null) {
            return
        }

        const listBounds = listElement.getBoundingClientRect()
        const mouseDistFromTop = mousePosition.y - listBounds.top

        let insertAtIndex = 0
        if (mouseDistFromTop > 20) {
            insertAtIndex = Math.floor(mouseDistFromTop / 40) - 1
        }

        const toListId = listElement.id.substring(5, 15)

        if (toListId == null) {


            return
        }

        removeItem(fromListId, item.id)
        addItemToList(toListId, item, insertAtIndex)
    }, [mousePosition, removeItem, addItemToList]);

    const moveList = useCallback((listId: string, insertAtIndex: number) => {
        const updatedLists = [...lists]

        const oldListIndex = updatedLists.findIndex(list => list.id === listId)
        const listCopy: BoardList = { ...updatedLists[oldListIndex] }

        if (oldListIndex === -1) {
            return
        }

        updatedLists.splice(oldListIndex, 1)
        updatedLists.splice(clampNumber(insertAtIndex, 0, updatedLists.length), 0, listCopy)

        setLists(updatedLists)
        saveBoard(boardData.id, updatedLists)
    }, [boardData.id, lists]);

    const contextVals = useMemo(() => ({
        boardId: boardData.id,
        moveItemToMouseOverList,
        createNewItem,
        removeItem,
        moveList
    }), [boardData.id, moveItemToMouseOverList, createNewItem, removeItem, moveList])

    return (
        <BoardViewerBoardContext.Provider
            value={contextVals}
        >
            <div className={styles.boardContainer} id={`board-${boardData.id}`}>
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