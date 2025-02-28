import { useEffect, useLayoutEffect, useState, useRef } from "react";
import Forms from "../../UI/Forms";
export default function Canvas() {
    const canvasRef = useRef(null);
    const [element, setElement] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [action, setAction] = useState("");
    const handleRadioChange = (event) => {
        setAction(event.target.value);
        console.log(event.target.value); // Log the value to ensure it's correct
    };

    const history = (initialState, overWrite) =>{
        const [index, setIndex] = useState(0);
        const[history, setHistory] = useState([]);
        const setState=(state) =>{
            const newState = typeof state === "function" ? state(history[index]) : state;
            setHistory(prevState => [...prevState, newState]);
            setIndex(prevState => prevState+1);

        }

        return[history[index], setHistory]
    };

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let currentPath = [];
        let lastPoint = null;

        const handleMouseDown = (event) => {
            if(action === "Draw"){
                setDrawing(true);
                const startPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };
                currentPath = [startPoint];
                lastPoint = startPoint;
                ctx.beginPath();
                ctx.moveTo(startPoint.x, startPoint.y);
            }
        };

        const handleMouseMove = (event) => {
            if(action === "Draw")
            {
                if (!drawing) return;
                const newPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };
                currentPath.push(newPoint);
                if (lastPoint) {
                    const midPoint = {
                        x: (lastPoint.x + newPoint.x) / 2,
                        y: (lastPoint.y + newPoint.y) / 2,
                    };
                    ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, midPoint.x, midPoint.y);
                    ctx.stroke();
                }
                lastPoint = newPoint;
           } 
        };

        const handleMouseUp = () => {
            if(action=== "Draw"){
                setDrawing(false);
                setElement(prevElements => [...prevElements, currentPath]);
            }
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", handleMouseUp);
        };
    }, [action, drawing]);

    return (
        <div>
            <div>
            <Forms 
                type={"radio"} 
                label={"Action"} 
                name={"action"} 
                options={["Draw", "Erase", "Move"]} 
                handleRadioChange={handleRadioChange} 
            />            
            </div>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
        </div>
    );
}