import { useState } from "react";

export const FullScreenBtn = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const openFullscreen = () => {
        const elem = document.documentElement; 
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } 
        setIsFullscreen(false);
    };

    const toggleFullscreen = () => {
        if (isFullscreen) {
            closeFullscreen();
        } else {
            openFullscreen();
        }
    };

    return (
        <button onClick={toggleFullscreen} className="text-primary text-[16px] hidden sm:block">
            {isFullscreen ? <i className="fas fa-compress"></i> : <i className="fas fa-expand"></i>}
        </button>
    );
}
