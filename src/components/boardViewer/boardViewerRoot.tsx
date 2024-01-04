import { useParams } from "react-router-dom"
import { GetBoardData } from "../../api/getBoardData"

export const BoardViewerRoot = () => {
    const { id } = useParams()

    if (id == null) {
        return <></>
    }

    const boardData = GetBoardData(id)

    return (
        <div>
            {boardData.title}
        </div>
    )
}