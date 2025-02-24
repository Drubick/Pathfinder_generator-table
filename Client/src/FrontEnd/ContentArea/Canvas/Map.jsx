import { useRef, useState } from "react";
import Gridlines from "./Gridlines";

export default function Map() {
    const mapRef = useRef(null);
    const containerRef = useRef(null);
    const [zoom, setZoom] = useState(1);
    const [mapPosition, setMapPosition] = useState({ left: 0, top: 0 });

    const zoomSpeed = 0.1;
    const minZoom = 0.1;

    const handleZoom = (event) => {
        const map = mapRef.current;
        let newZoom = zoom;
        if (event.deltaY > 0) {
            newZoom -= zoomSpeed;
            if (newZoom < minZoom) {
                newZoom = minZoom;
            }
        } else {
            newZoom += zoomSpeed;
        }
        setZoom(newZoom);
        map.style.transform = `scale(${newZoom})`;
    };

    const handleMousePress = (event) => {
        const map = mapRef.current;
        const container = containerRef.current;
        container.style.cursor = "grabbing";
        map.dataset.mousePress = true;
        map.dataset.coordsStartX = event.clientX - map.offsetLeft;
        map.dataset.coordsStartY = event.clientY - map.offsetTop;
    };

    const handleMouseRelease = () => {
        const container = containerRef.current;
        const map = mapRef.current;
        container.style.cursor = "grab";
        map.dataset.mousePress = false;
    };

    const handleDragStart = (event) => {
        event.preventDefault();
    };

    const handleMouseMove = (event) => {
        const map = mapRef.current;
        if (map.dataset.mousePress === "true") {
            const newLeft = event.clientX - map.dataset.coordsStartX;
            const newTop = event.clientY - map.dataset.coordsStartY;
            setMapPosition({ left: newLeft, top: newTop });
            map.style.left = `${newLeft}px`;
            map.style.top = `${newTop}px`;
        }
    };

    return (
        <div
            className="h-[90%] w-[90%] m-auto overflow-hidden relative py-40 cursor-grab border-4"
            onMouseDown={handleMousePress}
            onMouseUp={handleMouseRelease}
            onMouseMove={handleMouseMove}
            onWheel={handleZoom}
            ref={containerRef}
        >
            <Gridlines zoom={zoom} mapPosition={mapPosition} />
            <img
                className="h-auto w-auto max-w-none absolute top-0 left-0 z-1"
                src="../../../../public/img/border.png"
                alt="Map"
                ref={mapRef}
                onDragStart={handleDragStart}
            />
        </div>
    );
}