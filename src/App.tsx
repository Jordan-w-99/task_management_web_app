import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./Layout"
import { BoardSelectorRoot } from "./components/boardSelector/BoardSelectorRoot"
import { BoardViewerRoot } from "./components/boardViewer/boardViewerRoot"

function App() {
  return (
    <BrowserRouter basename="task_management_web_app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BoardSelectorRoot />} />
          <Route path="board/:id" element={<BoardViewerRoot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
