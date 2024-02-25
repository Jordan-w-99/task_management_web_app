import { CSSProperties, useContext, useEffect, useMemo, useRef } from "react";
import { updateListItemTitle } from "../../api/saveBoardData";
import { BoardListItem } from "../../models/boardData";
import styles from "./boardViewerListItem.module.css"
import { BoardViewerBoardContext } from "../../context/boardViewerBoardContext";
import { useMousePosition } from "../../hooks/useMousePosition";
import { getBoundsPointOffset } from "../../utils/getBoundsPointOffset";
import { StickyTag } from "../boardSelector/StickyTag";

export interface BoardViewerItemProps {
    itemData: BoardListItem
    listId: string
    removeItem: (listId: string, itemId: string) => void
}

export const BoardViewerListItem = ({ itemData, listId, removeItem }: BoardViewerItemProps) => {
    const { boardId, moveItem, setDraggingItem, draggingItem } = useContext(BoardViewerBoardContext)
    const mousePosition = useMousePosition()

    const dragging = draggingItem?.itemId === itemData.id;
    const originalOffset = draggingItem?.originalOffset;

    const divRef = useRef<HTMLDivElement>(null)

    const saveItemTitle = (newTitle: string) => {
        if (boardId == null) {
            throw new Error("Cannot Save Title, Board ID not found.")
        }

        updateListItemTitle(boardId, listId, itemData.id, newTitle)
    }

    useEffect(() => {
        if (dragging) {
            if (mousePosition == null) {
                return
            }

            const mouseOverElems = document.elementsFromPoint(mousePosition.x, mousePosition.y);

            const listElement = mouseOverElems.find(element => element.id.startsWith('list-'))
            const itemOverIds = mouseOverElems.filter(element => element.id.startsWith('item-')).map(list => list.id.split('-')[1])

            if (listElement == null) {
                return
            }

            const toListId = listElement.id.substring(5, 15)

            if (toListId === listId && itemOverIds.every(itemId => itemId === itemData.id)) {
                return
            }

            const listBounds = listElement.getBoundingClientRect()
            const mouseDistFromTop = mousePosition.y - listBounds.top

            const insertAtIndex = Math.floor(((mouseDistFromTop - 31.5) / 63)) - 1

            if (toListId == null) {
                return
            }

            moveItem(itemData.id, listId, toListId, insertAtIndex)
        }
    }, [dragging, itemData.id, listId, mousePosition, moveItem])

    const startDrag = () => {
        const bounds = divRef.current?.getBoundingClientRect()

        if (bounds && mousePosition) {
            const offset = getBoundsPointOffset(bounds, mousePosition)

            setDraggingItem({
                itemId: itemData.id,
                originalOffset: { x: -offset.x, y: -offset.y }
            })
        }
    }

    const cancelDrag = () => {
        setDraggingItem(undefined)
    }

    const idNumberSum = useMemo(() => (itemData.id.split('').reduce((sum, char) => {
        if (Number.isNaN(Number.parseInt(char))) {
            return sum;
        }

        return sum + Number.parseInt(char)

    }, 0)), [itemData.id]);

    const hueRotations = [60, 120, 180, 240, 300];

    const rotationFromId = idNumberSum % 10 - 5;
    const colourIdxFromId = idNumberSum % hueRotations.length;

    const draggingStyle: CSSProperties = dragging && mousePosition != null && originalOffset != null
        ? {
            position: 'absolute',
            top: mousePosition.y + originalOffset.y,
            left: mousePosition.x + originalOffset.x,
            minWidth: 290,
            zIndex: 999,
            transform: 'scale(1.15)'
        }
        : {}

    const itemContents: React.JSX.Element = <>
        <StickyTag
            itemId={itemData.id}
            text={itemData.title}
            hueRotation={hueRotations[colourIdxFromId]}
            rotation={rotationFromId}
            updateTitle={saveItemTitle}
            removeItem={() => removeItem(listId, itemData.id)}
        />
    </>

    return (
        <>
            {
                dragging &&
                <div
                    id={`item-${itemData.id}`}
                    className={`${styles.boardViewerItem}`}
                    onMouseUp={cancelDrag}
                    style={{
                        ...draggingStyle
                    }}
                >
                    {itemContents}
                </div>
            }
            <div
                key={`item-${itemData.id}`}
                id={`item-${itemData.id}`}
                className={`${styles.boardViewerItem} ${dragging ? styles.draggingPlaceholder : ''}`}
                ref={divRef}
                onDragStart={startDrag}
                draggable
            >
                {!dragging && itemContents}
            </div>
        </>
    )
}