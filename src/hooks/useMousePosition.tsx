import { useEffect, useState } from 'react';
import { Point2D } from '../models/point2D';

export const useMousePosition = () => {
    const [
        mousePosition,
        setMousePosition
    ] = useState<Point2D>();

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
};