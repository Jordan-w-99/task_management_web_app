import { BoardDetails } from "./boardDetails";

export interface BoardData extends BoardDetails {
    lists: BoardList[]
}

export interface BoardList {
    title: string
    items: BoardListItem[]
}

export interface BoardListItem {
    title: string
    description: string
    complete: boolean
}