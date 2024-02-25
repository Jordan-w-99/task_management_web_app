// Inspiration & Credit: https://dev.to/thormeier/fully-responsive-html-css-sticky-note-4okl
import { useState } from 'react'
import styles from './StickyNote.module.css'
import { Link } from 'react-router-dom'

export interface StickyNoteProps {
    boardId: string
    text: string
    hueRotation?: number
    rotation?: number
    buttonRight?: React.JSX.Element
}

export const StickyNote = ({ boardId, text, hueRotation, rotation, buttonRight }: StickyNoteProps) => {
    const [hovered, setHovered] = useState(false)

    const normalPath = "M 0 0 Q 0 0.69, 0.03 0.96 L 0.93 0.96 Q 0.89 0.69, 0.89 0 L 0 0";
    const hoverPath = "M 0 0 Q 0 0.75, 0.1 0.9 L 1 0.88 Q 0.89 0.75, 0.89 0 L 0 0"

    return (
        <div
            className={styles.stickyContainer}
            style={{
                transformOrigin: 'center',
                rotate: hovered ? '0deg' : `${rotation ?? 0}deg`,
                // rotate: `${rotation ?? 0}deg`,
                transform: hovered ? 'perspective(400px) translateZ(30px)' : '',
                transition: 'all 200ms'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.stickyOuter}>
                <div className={styles.sticky}>
                    <svg width="0" height="0">
                        <defs>
                            <clipPath id={`stickyClip-${boardId}`} clipPathUnits="objectBoundingBox">
                                <path
                                    d={hovered ? hoverPath : normalPath}
                                    strokeLinejoin="round"
                                    strokeLinecap="square"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                    <div className={styles.stickyContent} style={{ filter: `hue-rotate(${hueRotation ?? 0}deg)`, clipPath: `url(#stickyClip-${boardId})` }}>
                        {buttonRight &&
                            <div style={{
                                position: 'absolute',
                                top: 5,
                                right: 34
                            }}>
                                {buttonRight}
                            </div>
                        }
                        <Link to={`board/${boardId}`}>
                            <div
                                style={{
                                    rotate: hovered ? '-1deg' : '-1deg',
                                    translate: hovered ? '-2px -2px' : '0',
                                    transform: hovered ? 'skew(7deg)' : '',
                                    scale: hovered ? '95%' : '',
                                    // transition: 'all 200ms'
                                }}
                            >
                                {text}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}