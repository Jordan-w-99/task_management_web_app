import { Link } from 'react-router-dom'
import { BoardDetails } from '../../models/boardDetails'
import styles from './BoardSelectorBoard.module.css'
import { useMemo, useState } from 'react'
import { StickyNote } from './StickyNote'

export interface BoardSelectorBoardProps {
    details: BoardDetails
}

export const BoardSelectorBoard = ({ details }: BoardSelectorBoardProps) => {
    const idNumberSum = useMemo(() => (details.id.split('').reduce((sum, char) => {
        if (Number.isNaN(Number.parseInt(char))) {
            return sum;
        }

        return sum + Number.parseInt(char)

    }, 0)), [details.id]);

    // const mainColors = ['#D8F636', '#44E8F1', '#EF4898', '#FECE00'];
    // const secondaryColors = ['#CFEB34', '#3EDBE2', '#E64591', '#F2C400']
    const hueRotations = [60, 120, 180, 240, 300];
    // const hueRotations = [45, 90, 135, 180, 225, 270, 315];

    const rotationFromId = idNumberSum % 10 - 5;
    const colourIdxFromId = idNumberSum % hueRotations.length;


    return (
        <Link to={`board/${details.id}`}>
            {/* <div
                className={styles.container}
                style={{
                    rotate: `${hovered ? 0 : rotationFromId}deg`,
                    scale: `${hovered ? 1.05 : 1}`,
                    boxShadow: `${hovered ? '5px 5px 8px rgba(33, 33, 33, .6)' : '5px 5px 7px rgba(33, 33, 33, .7)'}`,
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className={styles.noteTop} style={{ backgroundColor: secondaryColors[colourIdxFromId] }} />
                <div className={styles.noteBottom} style={{ backgroundColor: mainColors[colourIdxFromId] }}>
                    <p className={styles.boardName}>{details.title}</p>
                </div>
            </div> */}
            <StickyNote
                boardId={details.id}
                text={details.title}
                hueRotation={hueRotations[colourIdxFromId]}
                rotation={rotationFromId}
            // hovered={hovered}
            />
        </Link>
    )
}