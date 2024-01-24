import { createContext } from "react";
import { BoardListItem } from "../models/boardData";

export interface IBoardViewerBoardContext {
    boardId?: string
    updateDraggingListItemData: (data: BoardListItem) => void
}

export const BoardViewerBoardContext = createContext<IBoardViewerBoardContext>({
    boardId: undefined,
    updateDraggingListItemData: () => { }
})