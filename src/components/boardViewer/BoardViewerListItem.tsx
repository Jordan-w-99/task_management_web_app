import { CSSProperties, useContext, useRef, useState } from "react";
import { updateListItemTitle } from "../../api/saveBoardData";
import { BoardListItem } from "../../models/boardData";
import { EditableTitle } from "../common/editableTitle";
import styles from "./boardViewerListItem.module.css"
import { BoardViewerListItemModal } from "./boardViewerListItemModal";
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext";
import { SquareButton } from "../common/squareButton";
import { MdDelete } from "react-icons/md";
import { useMousePosition } from "../../hooks/useMousePosition";
import { Point2D } from "../../models/point2D";
import { getBoundsPointOffset } from "../../utils/getBoundsPointOffset";

export interface BoardViewerItemProps {
    itemData: BoardListItem
    listId: string
    removeItem: (listId: string, itemId: string) => void
}

export const BoardViewerListItem = ({ itemData, listId, removeItem }: BoardViewerItemProps) => {
    const { boardId, moveItemToMouseOverList } = useContext(BoardViewerBoardContext)

    const [isMouseDown, setIsMouseDown] = useState(false)
    const [dragging, setDragging] = useState(false)

    const [originalOffset, setOriginalOffset] = useState<Point2D>()

    const mousePosition = useMousePosition()

    const bgCol = (isMouseDown && dragging) ? 'red' : 'lightgray'

    const saveItemTitle = (newTitle: string) => {
        if (boardId == null) {
            throw new Error("Cannot Save Title, Board ID not found.")
        }

        updateListItemTitle(boardId, listId, itemData.id, newTitle)
    }

    const startDrag = () => {
        setDragging(true)

        const bounds = divRef.current?.getBoundingClientRect()

        if (bounds && mousePosition) {
            const offset = getBoundsPointOffset(bounds, mousePosition)

            setOriginalOffset({ x: -offset.x, y: -offset.y })
        }
    }

    const cancelDrag = () => {
        moveItemToMouseOverList(itemData, listId)
        setIsMouseDown(false)
        setDragging(false)
    }

    const divRef = useRef<HTMLDivElement>(null)

    const draggingStyle: CSSProperties = dragging && mousePosition != null && originalOffset != null
        ? {
            position: 'absolute',
            top: mousePosition.y + originalOffset.y,
            left: mousePosition.x + originalOffset.x,
            minWidth: 290
        }
        : {}

    return (
        <>
            {
                dragging &&
                <div
                    className={styles.boardViewerItem}
                    onMouseUp={cancelDrag}
                    style={{
                        backgroundColor: bgCol,
                        ...draggingStyle
                    }}
                >
                    <EditableTitle
                        defaultTitle={itemData.title}
                        saveTitle={saveItemTitle}
                    />
                    <SquareButton
                        icon={<MdDelete />}
                        onClick={() => removeItem(listId, itemData.id)}
                    />
                    <BoardViewerListItemModal />
                </div>
            }
            <div
                className={styles.boardViewerItem}
                style={{
                    backgroundColor: bgCol
                }}
                ref={divRef}
                onDragStart={startDrag}
                draggable
            >
                <EditableTitle
                    defaultTitle={itemData.title}
                    saveTitle={saveItemTitle}
                />
                <SquareButton
                    icon={<MdDelete />}
                    onClick={() => removeItem(listId, itemData.id)}
                />
                <BoardViewerListItemModal />
            </div>
        </>
    )
}