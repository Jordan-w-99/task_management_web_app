import { createContext } from "react";
import { BoardListItem } from "../models/boardData";

export interface IBoardViewerBoardContext {
    boardId?: string
    moveItemToMouseOverList: (item: BoardListItem, fromListId: string) => void
    createNewItem: (listId: string, title: string) => void
    removeItem: (listId: string, itemId: string) => void
}

export const BoardViewerBoardContext = createContext<IBoardViewerBoardContext>({
    boardId: undefined,
    moveItemToMouseOverList: () => { },
    createNewItem: () => { },
    removeItem: () => { },
})