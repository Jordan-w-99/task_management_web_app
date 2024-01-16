import { useContext, useState } from "react"
import { BoardList, BoardListItem } from "../../models/boardData"
import { NewItemInput } from "../common/newItemInput"
import { BoardViewerListItem } from "./BoardViewerListItem"
import styles from './boardViewerList.module.css'
import { generateNewId } from "../../utils/generateNewId"
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext"
import { updateListTitle, saveBoardList } from "../../api/saveBoardData"
import { EditableTitle } from "../common/editableTitle"
import { SquareButton } from "../common/squareButton"
import { MdDelete } from "react-icons/md"


export interface BoardViewerListProps {
    listData: BoardList
    removeList: (listId: string) => void
}

export const BoardViewerList = ({ listData, removeList }: BoardViewerListProps) => {
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

    const removeItem = (itemId: string) => {
        const itemIndex = listItems.findIndex(item => item.id === itemId)

        if (itemIndex === -1) {
            alert(`Error: Item with ID ${itemId} Not found in list.`)
            return
        }

        const updatedListItems = [...listItems]
        updatedListItems.splice(itemIndex, 1)

        setListItems(updatedListItems)
        saveBoardList(boardId, listData.id, updatedListItems)
    }

    const saveListTitle = (newTitle: string) => {
        updateListTitle(boardId, listData.id, newTitle)
    }

    return (
        <div className={styles.boardListContainer}>
            <div className={styles.boardListTitle}>
                <EditableTitle
                    defaultTitle={listData.title}
                    saveTitle={saveListTitle}
                />
                <SquareButton
                    icon={<MdDelete />}
                    onClick={() => removeList(listData.id)}
                />
            </div>
            <div className={styles.boardListItemsContainer}>
                {listItems.map(item => (
                    <BoardViewerListItem
                        key={`board=${boardId}-list-${listData.id}-item-${item.id}`}
                        itemData={item}
                        listId={listData.id}
                        removeItem={removeItem}
                    />
                ))}
            </div>
            <NewItemInput
                inputPlaceholder="Item Name..."
                buttonText="Create Item"
                action={createNewItem}
            />
        </div>
    )
}