import { useEffect, useState } from 'react';
import { Point2D } from '../models/point2D';

export interface MousePos extends Point2D {
    dx: number,
    dy: number
}

export const useMousePosition = () => {
    const [
        mousePosition,
        setMousePosition
    ] = useState<MousePos>();

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY, dx: ev.movementX, dy: ev.movementX });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
};