import { useContext } from "react";
import { updateListItemTitle } from "../../api/saveBoardData";
import { BoardListItem } from "../../models/boardData";
import { EditableTitle } from "../common/editableTitle";
import styles from "./boardViewerListItem.module.css"
import { BoardViewerListItemModal } from "./boardViewerListItemModal";
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext";

export interface BoardViewerItemProps {
    itemData: BoardListItem
    listId: string
}

export const BoardViewerListItem = ({ itemData, listId }: BoardViewerItemProps) => {
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
            <BoardViewerListItemModal />
        </div>
    )
}