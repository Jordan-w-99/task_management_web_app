import { useState } from "react"
import { BoardList, BoardListItem } from "../../models/boardData"
import { NewItemInput } from "../common/newItemInput"
import { BoardViewerItem } from "./boardViewerItem"
import styles from './boardViewerList.module.css'
import { generateNewId } from "../../utils/generateNewId"


export interface BoardViewerListProps {
    listData: BoardList
}

export const BoardViewerList = ({ listData }: BoardViewerListProps) => {
    const [listItems, setListItems] = useState(listData.items)

    const createNewItem = (itemTitle: string) => {
        const newItem: BoardListItem = {
            id: generateNewId(),
            title: itemTitle,
            description: '',
            complete: false
        }

        console.log(newItem, listData)

        setListItems([...listItems, newItem])
    }

    return (
        <div className={styles.boardListContainer}>
            {listData.title}
            <div className={styles.boardListItemsContainer}>
                <div className={styles.boardListItems}>
                    {listItems.map(item => <BoardViewerItem itemData={item} />)}
                </div>
            </div>
            <NewItemInput
                inputPlaceholder="Item Name..."
                buttonText="Create Item"
                action={createNewItem}
            />
        </div>
    )
}