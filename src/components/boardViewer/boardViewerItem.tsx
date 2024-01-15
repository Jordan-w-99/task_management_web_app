import { BoardListItem } from "../../models/boardData";
import styles from "./boardViewerItem.module.css"
import { BoardViewerItemModal } from "./boardViewerItemModal";

export interface BoardViewerItemProps {
    itemData: BoardListItem
}

export const BoardViewerItem = ({ itemData }: BoardViewerItemProps) => {
    return (
        <div className={styles.boardViewerItem}>
            {itemData.title}
            <BoardViewerItemModal />
        </div>
    )
}