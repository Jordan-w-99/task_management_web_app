import { useContext } from "react";
import { updateListItemTitle } from "../../api/saveBoardData";
import { BoardListItem } from "../../models/boardData";
import { EditableTitle } from "../common/editableTitle";
import styles from "./boardViewerListItem.module.css"
import { BoardViewerListItemModal } from "./boardViewerListItemModal";
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext";
import { SquareButton } from "../common/squareButton";
import { MdDelete } from "react-icons/md";

export interface BoardViewerItemProps {
    itemData: BoardListItem
    listId: string
    removeItem: (itemId: string) => void
}

export const BoardViewerListItem = ({ itemData, listId, removeItem }: BoardViewerItemProps) => {
    const { boardId } = useContext(BoardViewerBoardContext)

    const saveItemTitle = (newTitle: string) => {
        if (boardId == null) {
            throw new Error("Cannot Save Title, Board ID not found.")
        }

        updateListItemTitle(boardId, listId, itemData.id, newTitle)
    }

    return (
        <div className={styles.boardViewerItem}>
            <EditableTitle
                defaultTitle={itemData.title}
                saveTitle={saveItemTitle}
            />
            <SquareButton
                icon={<MdDelete />}
                onClick={() => removeItem(itemData.id)}
            />
            <BoardViewerListItemModal />
        </div>
    )
}