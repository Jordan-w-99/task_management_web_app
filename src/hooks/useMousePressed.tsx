import { useEffect, useState } from 'react';

export const useMouseDown = () => {
    const [
        mouseDown,
        setMouseDown
    ] = useState<boolean>(false);

    useEffect(() => {
        const updateMouseDown = (ev: MouseEvent) => {
            setMouseDown(ev.type === 'mousedown');
        };
        window.addEventListener('mouseup', updateMouseDown);
        window.addEventListener('mousedown', updateMouseDown);
        return () => {
            window.removeEventListener('mouseup', updateMouseDown);
            window.addEventListener('mousedown', updateMouseDown);
        };
    }, []);

    return mouseDown;
};