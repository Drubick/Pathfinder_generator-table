import { useRef, useEffect } from "react";
import Forms from "../../UI/Forms";
export default function Canvas() {
    const canvasElementRef = useRef(null);
    const isDrawingActiveRef = useRef(false);
    const drawingPathsRef = useRef([]);


    useEffect(() => {
        const canvas = canvasElementRef.current;
        const context = canvas.getContext("2d");

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const getMousePosition = (event) => {
            return ({
                x: event.clientX - canvas.getBoundingClientRect().left,
                y: event.clientY - canvas.getBoundingClientRect().top,
            });
        };

        const handleMouseDown = (event) => {
            isDrawingActiveRef.current = true;
            const newMousePosition = getMousePosition(event);
            drawingPathsRef.current.push([newMousePosition]);
        };

        const handleMouseUp = () => {
            isDrawingActiveRef.current = false;
        };

        const handleMouseMove = (event) => {
            if (!isDrawingActiveRef.current) {
                return;
            }
            const newMousePosition = getMousePosition(event);
            const currentPath = drawingPathsRef.current[drawingPathsRef.current.length - 1];
            const lastPosition = currentPath[currentPath.length - 1];
            currentPath.push(newMousePosition);
            drawLine(lastPosition.x, lastPosition.y, newMousePosition.x, newMousePosition.y);
        };

        const drawLine = (x1, y1, x2, y2) => {
            context.strokeStyle = "black";
            context.lineWidth = 5;
            context.lineCap = "round";
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
        };

        const redrawCanvas = (paths) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            paths.forEach((path) => {
                for (let i = 1; i < path.length; i++) {
                    drawLine(path[i - 1].x, path[i - 1].y, path[i].x, path[i].y);
                }
            });
        };

        const handleUndo = (event) => {
            if (event.ctrlKey && event.key === 'z') {
                drawingPathsRef.current.pop();
                redrawCanvas(drawingPathsRef.current);
            }
        };

        window.addEventListener("keydown", handleUndo);
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("keydown", handleUndo);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="">
            <Forms type = {"checkbox"} name={"Draw"} label={"Draw"}/>
            <canvas ref={canvasElementRef} className="bg-pre-primary-light-100 border-1 border-black"></canvas>
        </div>
    );
};