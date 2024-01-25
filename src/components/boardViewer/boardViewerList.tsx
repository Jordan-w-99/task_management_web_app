import { useContext } from "react"
import { BoardList } from "../../models/boardData"
import { NewItemInput } from "../common/newItemInput"
import { BoardViewerListItem } from "./BoardViewerListItem"
import styles from './boardViewerList.module.css'
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext"
import { updateListTitle } from "../../api/saveBoardData"
import { EditableTitle } from "../common/editableTitle"
import { SquareButton } from "../common/squareButton"
import { MdDelete } from "react-icons/md"


export interface BoardViewerListProps {
    listData: BoardList
    removeList: (listId: string) => void
}

export const BoardViewerList = ({ listData, removeList }: BoardViewerListProps) => {
    const { boardId, createNewItem, removeItem } = useContext(BoardViewerBoardContext)

    if (boardId == null) {
        throw new Error('No Board ID found in board list.')
    }

    const saveListTitle = (newTitle: string) => {
        updateListTitle(boardId, listData.id, newTitle)
    }

    return (
        <div
            className={styles.boardListContainer}
            id={`list-${listData.id}`}
        >
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
                {listData.items.map(item => (
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
                action={(title: string) => { createNewItem(listData.id, title) }}
            />
        </div>
    )
}