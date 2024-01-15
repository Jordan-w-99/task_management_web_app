import { createContext } from "react";

export interface IBoardViewerBoardContext {
    boardId?: string
}

export const BoardViewerBoardContext = createContext<IBoardViewerBoardContext>({
    boardId: undefined
})