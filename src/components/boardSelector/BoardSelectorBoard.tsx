import { BoardDetails } from '../../models/boardDetails'
import { useMemo } from 'react'
import { StickyNote } from './StickyNote'
import { SquareButton } from '../common/squareButton'
import { FaTrash } from 'react-icons/fa'

export interface BoardSelectorBoardProps {
    details: BoardDetails
    removeBoard: (id: string) => void
}

export const BoardSelectorBoard = ({ details, removeBoard }: BoardSelectorBoardProps) => {
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
        <StickyNote
            boardId={details.id}
            text={details.title}
            hueRotation={hueRotations[colourIdxFromId]}
            rotation={rotationFromId}
            buttonRight={
                <SquareButton
                    onClick={() => {
                        removeBoard(details.id)
                    }}
                    icon={<FaTrash />}
                    style={{
                        opacity: 0.2
                    }}
                />
            }
        />
    )
}