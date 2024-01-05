/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

export const BoardSelectorContext = createContext({
    createNewBoard: (_title: string): void => { return }
})