import { CSSProperties, useContext, useEffect, useRef, useState } from "react"
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

    useEffect(() => {
        if (dragging) {
            if (mousePosition == null) {
                return
            }

            const boardElement = document.elementsFromPoint(mousePosition.x, mousePosition.y).find(element => element.id.startsWith('board-'))

            if (boardElement == null) {
                return
            }

            let insertAtIndex = 0
            const thisListElement = document.getElementById(`list-${listData.id}`)
            const listFromLeft = thisListElement?.getBoundingClientRect().left ?? 0

            if (listFromLeft > 160) {
                insertAtIndex = Math.floor((listFromLeft - 160) / 320) + 1;
            }

            moveList(listData.id, insertAtIndex)
        }
    }, [mousePosition, dragging, listData.id, moveList])

    if (boardId == null) {
        throw new Error('No Board ID found in board list.')
    }

    const saveListTitle = (newTitle: string) => {
        updateListTitle(boardId, listData.id, newTitle)
    }

    const startDrag = () => {
        const bounds = divRef.current?.getBoundingClientRect()

        if (bounds && mousePosition) {
            const offset = getBoundsPointOffset(bounds, mousePosition)

            const elems = document.elementsFromPoint(mousePosition.x, mousePosition.y)

            if (elems.some(elem => elem.id.startsWith('item'))) {
                return
            }

            setListHeight(bounds.height)
            setOriginalOffset({ x: -offset.x, y: -offset.y })
            setDragging(true)
        }
    }

    const cancelDrag = () => {
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

    const listContents = (
        <>
            <div className={styles.boardListTitle}>
                <EditableTitle
                    defaultTitle={listData.title}
                    // defaultTitle={listData.id} // For debugging
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
        </>
    )

    return (
        <>
            {dragging &&
                <div
                    className={styles.boardListContainer}
                    id={`list-${listData.id}`}
                    onMouseUp={cancelDrag}
                    style={draggingStyle}
                >
                    {listContents}
                </div>
            }
            <div
                className={`${styles.boardListContainer} ${dragging ? styles.draggingPlaceholder : ''}`}
                id={`list-${listData.id}`}
                onDragStart={startDrag}
                draggable
                ref={divRef}
            >
                {
                    !dragging &&
                    listContents
                }
            </div>
        </>
    )
}