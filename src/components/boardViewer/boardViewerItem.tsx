import { BoardListItem } from "../../models/boardData";

export interface BoardViewerItemProps {
    itemData: BoardListItem
}

export const BoardViewerItem = ({ itemData }: BoardViewerItemProps) => {
    return (
        <div>
            {itemData.title}
            {itemData.description}
        </div>
    )
}