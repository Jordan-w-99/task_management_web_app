import { useContext, useState } from "react"
import { BoardList, BoardListItem } from "../../models/boardData"
import { NewItemInput } from "../common/newItemInput"
import { BoardViewerListItem } from "./BoardViewerListItem"
import styles from './boardViewerList.module.css'
import { generateNewId } from "../../utils/generateNewId"
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext"
import { updateListTitle, saveBoardList } from "../../api/saveBoardData"
import { EditableTitle } from "../common/editableTitle"


export interface BoardViewerListProps {
    listData: BoardList
}

export const BoardViewerList = ({ listData }: BoardViewerListProps) => {
    const [listItems, setListItems] = useState(listData.items)

    const { boardId } = useContext(BoardViewerBoardContext)

    if (boardId == null) {
        throw new Error('No Board ID found in board list.')
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

    const saveListTitle = (newTitle: string) => {
        updateListTitle(boardId, listData.id, newTitle)
    }

    return (
        <div className={styles.boardListContainer}>
            <EditableTitle
                defaultTitle={listData.title}
                saveTitle={saveListTitle}
            />
            <div className={styles.boardListItemsContainer}>
                {listItems.map(item => <BoardViewerListItem key={`board=${boardId}-list-${listData.id}-item-${item.id}`} itemData={item} listId={listData.id} />)}
            </div>
            <NewItemInput
                inputPlaceholder="Item Name..."
                buttonText="Create Item"
                action={createNewItem}
            />
        </div>
    )
}