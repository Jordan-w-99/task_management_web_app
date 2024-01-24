import { Point2D } from "../models/point2D";

export const getBoundsPointOffset = (bounds: DOMRect, mouse: Point2D): Point2D => {
    console.log({
        x: mouse.x - bounds.left,
        y: mouse.y - bounds.top
    })

    return {
        x: Math.abs((mouse.x - bounds.left) % bounds.width),
        y: Math.abs((mouse.y - bounds.top) % bounds.height)
    }
}