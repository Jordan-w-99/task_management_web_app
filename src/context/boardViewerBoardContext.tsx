import { createContext } from "react";
import { Point2D } from "../models/point2D";

export interface IDraggingItem {
    itemId: string
    originalOffset: Point2D
}

export interface IBoardViewerBoardContext {
    boardId?: string
    draggingItem?: IDraggingItem
    setDraggingItem: (draggingItem?: IDraggingItem) => void
    moveItem: (itemId: string, fromListId: string, toListId: string, insertAtIndex: number) => void
    createNewItem: (listId: string, title: string) => void
    removeItem: (listId: string, itemId: string) => void
    moveList: (listId: string, insertAtIndex: number) => void
}

export const BoardViewerBoardContext = createContext<IBoardViewerBoardContext>({
    boardId: undefined,
    draggingItem: undefined,
    setDraggingItem: () => { },
    moveItem: () => { },
    createNewItem: () => { },
    removeItem: () => { },
    moveList: () => { }
})