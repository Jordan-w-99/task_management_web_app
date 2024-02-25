import { useState } from 'react'
import styles from './StickyTag.module.css'
import { EditableTitle } from '../common/editableTitle'
import { SquareButton } from '../common/squareButton'
import { MdDelete } from 'react-icons/md'

export interface StickyTagProps {
    itemId: string
    text: string
    complete: boolean
    hueRotation?: number
    rotation?: number
    updateTitle: (title: string) => void
    removeItem: () => void
    updateItemComplete: (complete: boolean) => void
}

export const StickyTag = ({ itemId, text, complete, hueRotation, updateTitle, removeItem, updateItemComplete }: StickyTagProps) => {
    const [hovered, setHovered] = useState(false)

    const normalPath = "M 0 0.1 L 0 0.9 Q 0.8 0.92, 1 0.88 L 1 0.08 Q 0.8 0.12, 0 0.1";
    const hoverPath = "M 0 0.1 L 0 0.9 Q 0.75 0.9, 0.98 0.8 L 0.98 0.0 Q 0.75 0.1, 0 0.1";

    return (
        <div
            className={styles.stickyContainer}
            style={{
                // rotate: hovered ? '0deg' : `${rotation ?? 0}deg`,
                // rotate: `${rotation ?? 0}deg`,
                // transform: hovered ? 'perspective(400px) translateZ(30px)' : '',
                // transition: 'all 200ms'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.stickyOuter}>
                <div className={styles.sticky}>
                    <svg width="0" height="0">
                        <defs>
                            <clipPath id={`stickyClip-${itemId}`} clipPathUnits="objectBoundingBox">
                                <path
                                    d={hovered ? hoverPath : normalPath}
                                    strokeLinejoin="round"
                                    strokeLinecap="square"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                    <div className={styles.stickyContent} style={{ filter: `hue-rotate(${hueRotation ?? 0}deg)`, clipPath: `url(#stickyClip-${itemId})` }}>
                        <div
                            style={{
                                // translate: hovered ? '-2px -2px' : '0',]
                                transformOrigin: 'left center',
                                rotate: hovered ? '-0.6deg' : '0deg',
                                transform: hovered ? 'skew(5deg)' : '',
                                // scale: hovered ? '95%' : '',
                                width: '90%',
                                display: 'flex',
                                gap: 5
                            }}
                        >
                            <input className={styles.itemCheckbox} type='checkbox' defaultChecked={complete} onChange={(e) => updateItemComplete(e.target.checked)} />
                            <EditableTitle
                                defaultTitle={text}
                                saveTitle={updateTitle}
                            />
                            <SquareButton
                                icon={<MdDelete />}
                                onClick={() => removeItem()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}