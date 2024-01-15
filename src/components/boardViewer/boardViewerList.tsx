import { useContext, useState } from "react"
import { BoardList, BoardListItem } from "../../models/boardData"
import { NewItemInput } from "../common/newItemInput"
import { BoardViewerItem } from "./boardViewerItem"
import styles from './boardViewerList.module.css'
import { generateNewId } from "../../utils/generateNewId"
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext"
import { saveBoardList } from "../../api/saveBoardData"


export interface BoardViewerListProps {
    listData: BoardList
}

export const BoardViewerList = ({ listData }: BoardViewerListProps) => {
    const [listItems, setListItems] = useState(listData.items)
    const { boardId } = useContext(BoardViewerBoardContext)

    if (boardId == null) {
        throw new Error('No Board ID found in board list.')
        return
    }

    const createNewItem = (itemTitle: string) => {
        const newItem: BoardListItem = {
            id: generateNewId(),
            title: itemTitle,
            description: '',
            complete: false
        }

        const updatedListItems = [...listItems, newItem]

        setListItems(updatedListItems)
        saveBoardList(boardId, listData.id, updatedListItems)
    }

    return (
        <div className={styles.boardListContainer}>
            {listData.title}
            <div className={styles.boardListItemsContainer}>
                {listItems.map(item => <BoardViewerItem itemData={item} />)}
            </div>
            <NewItemInput
                inputPlaceholder="Item Name..."
                buttonText="Create Item"
                action={createNewItem}
            />
        </div>
    )
}