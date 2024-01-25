import { CSSProperties, useContext, useRef, useState } from "react"
import { BoardList } from "../../models/boardData"
import { NewItemInput } from "../common/newItemInput"
import { BoardViewerListItem } from "./BoardViewerListItem"
import styles from './boardViewerList.module.css'
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext"
import { updateListTitle } from "../../api/saveBoardData"
import { EditableTitle } from "../common/editableTitle"
import { SquareButton } from "../common/squareButton"
import { MdDelete } from "react-icons/md"
import { Point2D } from "../../models/point2D"
import { getBoundsPointOffset } from "../../utils/getBoundsPointOffset"
import { useMousePosition } from "../../hooks/useMousePosition"


export interface BoardViewerListProps {
    listData: BoardList
    removeList: (listId: string) => void
}

export const BoardViewerList = ({ listData, removeList }: BoardViewerListProps) => {
    const { boardId, createNewItem, removeItem, moveList } = useContext(BoardViewerBoardContext)
    const mousePosition = useMousePosition()

    const [dragging, setDragging] = useState(false)
    const [originalOffset, setOriginalOffset] = useState<Point2D>()
    const [listHeight, setListHeight] = useState<number>()

    const divRef = useRef<HTMLDivElement>(null)

    if (boardId == null) {
        throw new Error('No Board ID found in board list.')
    }

    const saveListTitle = (newTitle: string) => {
        updateListTitle(boardId, listData.id, newTitle)
    }

    const startDrag = () => {
        console.log("dragging")

        setDragging(true)

        const bounds = divRef.current?.getBoundingClientRect()

        if (bounds && mousePosition) {
            const offset = getBoundsPointOffset(bounds, mousePosition)

            setListHeight(bounds.height)
            setOriginalOffset({ x: -offset.x, y: -offset.y })
        }
    }

    const cancelDrag = () => {
        moveList(listData.id)
        setDragging(false)
    }

    const draggingStyle: CSSProperties = dragging && mousePosition != null && originalOffset != null
        ? {
            position: 'absolute',
            top: mousePosition.y + originalOffset.y,
            left: mousePosition.x + originalOffset.x,
            minHeight: listHeight
        }
        : {}

    return (
        <>
            {dragging &&
                <div
                    className={styles.boardListContainer}
                    id={`list-${listData.id}`}
                    onMouseUp={cancelDrag}
                    style={draggingStyle}
                >
                    <div className={styles.boardListTitle}>
                        <EditableTitle
                            defaultTitle={listData.title}
                            saveTitle={saveListTitle}
                        />
                        <SquareButton
                            icon={<MdDelete />}
                            onClick={() => removeList(listData.id)}
                        />
                    </div>
                    <div className={styles.boardListItemsContainer}>
                        {listData.items.map(item => (
                            <BoardViewerListItem
                                key={`board=${boardId}-list-${listData.id}-item-${item.id}`}
                                itemData={item}
                                listId={listData.id}
                                removeItem={removeItem}
                            />
                        ))}
                    </div>
                    <NewItemInput
                        inputPlaceholder="Item Name..."
                        buttonText="Create Item"
                        action={(title: string) => { createNewItem(listData.id, title) }}
                    />
                </div>
            }
            <div
                className={styles.boardListContainer}
                id={`list-${listData.id}`}
                onDragStart={startDrag}
                draggable
                ref={divRef}
            >
                <div className={styles.boardListTitle}>
                    <EditableTitle
                        defaultTitle={listData.title}
                        saveTitle={saveListTitle}
                    />
                    <SquareButton
                        icon={<MdDelete />}
                        onClick={() => removeList(listData.id)}
                    />
                </div>
                <div className={styles.boardListItemsContainer}>
                    {listData.items.map(item => (
                        <BoardViewerListItem
                            key={`board=${boardId}-list-${listData.id}-item-${item.id}`}
                            itemData={item}
                            listId={listData.id}
                            removeItem={removeItem}
                        />
                    ))}
                </div>
                <NewItemInput
                    inputPlaceholder="Item Name..."
                    buttonText="Create Item"
                    action={(title: string) => { createNewItem(listData.id, title) }}
                />
            </div>
        </>
    )
}