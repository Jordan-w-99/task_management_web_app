import { BoardDetails } from "./boardDetails";

export interface BoardData extends BoardDetails {
    lists: BoardList[]
}

export interface BoardList {
    id: string
    title: string
    items: BoardListItem[]
}

export interface BoardListItem {
    id: string
    title: string
    description: string
    complete: boolean
}