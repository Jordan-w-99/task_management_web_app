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
    const listDivRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (dragging) {
            if (mousePosition == null) {
                return
            }

            const elems = document.elementsFromPoint(mousePosition.x, mousePosition.y)

            const boardElement = elems.find(element => element.id.startsWith('board-'))
            const listOverIds = elems.filter(element => element.id.startsWith('list-')).map(list => list.id.split('-')[1])

            if (boardElement == null || listOverIds.every(listId => listId === listData.id)) {
                return
            }

            let insertAtIndex = 0
            const thisListElement = document.getElementById(`list-${listData.id}`)
            const listFromLeft = thisListElement?.getBoundingClientRect().x ?? 0

            if (listFromLeft > 160) {
                insertAtIndex = Math.floor((listFromLeft - 160 + boardElement.scrollLeft) / 320) + 1;
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

    const DRAG_HEIGHT_ADJUST = 20
    const adjustedListHeight = listHeight ? listHeight - DRAG_HEIGHT_ADJUST : undefined

    const draggingStyle: CSSProperties = dragging && mousePosition != null && originalOffset != null
        ? {
            position: 'absolute',
            top: mousePosition.y + originalOffset.y,
            left: mousePosition.x + originalOffset.x,
            minHeight: adjustedListHeight,
            maxHeight: adjustedListHeight,
            zIndex: 9999,
            transform: `scale(1.05) rotate(3deg)`
        }
        : {}

    const listContents = (
        <>
            <div className={styles.paperHeader} />
            <div className={styles.boardListTitle}>
                <EditableTitle
                    defaultTitle={listData.title}
                    // defaultTitle={listData.id} // For debugging
                    saveTitle={saveListTitle}
                />
                <SquareButton
                    icon={<MdDelete size={16} />}
                    onClick={() => removeList(listData.id)}
                />
            </div>
            <div className={styles.divider} />
            <div className={styles.boardListItemsContainer} ref={listDivRef}>
                {listData.items.map(item => (
                    <BoardViewerListItem
                        key={`board=${boardId}-list-${listData.id}-item-${item.id}`}
                        itemData={item}
                        listId={listData.id}
                        removeItem={removeItem}
                    />
                ))}
            </div>
            <div style={{ marginTop: 5 }}>
                <NewItemInput
                    inputPlaceholder="Item Name..."
                    action={(title: string) => {
                        createNewItem(listData.id, title)
                    }}
                />
            </div>
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
                style={{
                    minHeight: dragging ? adjustedListHeight : 'unset',
                    maxHeight: dragging ? adjustedListHeight : undefined
                }}
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