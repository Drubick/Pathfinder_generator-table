import { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
import Button from "../../UI/Button";
import Forms from "../../UI/Forms";

export default function Canvas() {
    const imageCanvasRef = useRef(null);
    const drawCanvasRef = useRef(null);
    const contextRef = useRef(null);
    const [drawColor, setDrawColor] = useState("#000000");
    const [drawWidth, setDrawWidth] = useState(2);
    const [restoreArray, setRestoreArray] = useState([]);
    const [index, setIndex] = useState(0);
    const [action, setAction] = useState("");
    const handleRadioChange = (event) => {
        setAction(event.target.value);
    };

    const undo = useCallback(() => {
        if (index <= 1) 
            return;
        const currentIndex = index - 2;
        const imageData = restoreArray[currentIndex];
        if (imageData && imageData instanceof ImageData) {
            const canvas = drawCanvasRef.current;
            const context = canvas.getContext("2d");
            context.putImageData(imageData, 0, 0);
        } else {
            console.error("restoreArray[index] is not an ImageData object");
            return;
        }
        setIndex(currentIndex + 1);
        setRestoreArray((prevArray) => prevArray.slice(0, currentIndex + 1));
    }, [index, restoreArray]);

    const clearCanvas = () => {
        const canvas = drawCanvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        setRestoreArray([]);
        setIndex(0);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = imageCanvasRef.current;
                    const context = canvas.getContext("2d");
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'z') {
                console.log('Undo triggered');
                undo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [undo]);

    useLayoutEffect(() => {
        let isDrawing = false;
        const canvas = drawCanvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
        const initialImageData = context.getImageData(0, 0, canvas.width, canvas.height);

        setRestoreArray([initialImageData]);
        setIndex(1);
  
        const start = (event) => {
            isDrawing = true;
            context.beginPath();
            context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            event.preventDefault();
        };

        const draw = (event) => {
            if (isDrawing) {
                context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
                context.lineCap = "round";
                context.lineJoin = "round";
                context.stroke();
            }
        };

        const stop = (event) => {
            if (isDrawing) {
                context.stroke();
                context.closePath();
                isDrawing = false;
            }
            event.preventDefault();

            const newImageData = context.getImageData(0, 0, canvas.width, canvas.height);
            setRestoreArray((prevArray) => [...prevArray, newImageData]);
            setIndex((prevIndex) => prevIndex + 1);
        };

        canvas.addEventListener("mousedown", start, false);
        canvas.addEventListener("touchstart", start, false);
        canvas.addEventListener("mouseup", stop, false);
        canvas.addEventListener("touchend", stop, false);
        canvas.addEventListener("mousemove", draw, false);
        canvas.addEventListener("touchmove", draw, false);

        return () => {
            canvas.removeEventListener("mousedown", start);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("mouseup", stop);
            canvas.removeEventListener("touchstart", start);
            canvas.removeEventListener("touchmove", draw);
            canvas.removeEventListener("touchend", stop);
        };
    }, []);

    const handleColorChange = (event) => {
        const newColor = event.target.value;
        setDrawColor(newColor);
        if (contextRef.current) {
            contextRef.current.strokeStyle = newColor;
        }
    };

    const handleWidthChange = (event) => {
        const newWidth = Number(event.target.value);
        setDrawWidth(newWidth);
        if (contextRef.current) {
            contextRef.current.lineWidth = newWidth;
        }
    };

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
                <Button text={"Undo"} action={undo} />
                <Button text={"Clear"} action={clearCanvas} />
                <input 
                    type="color"
                    value={drawColor}
                    onChange={handleColorChange}
                />
                <input 
                    type="range"
                    value={drawWidth}
                    onChange={handleWidthChange}
                    min={1} max={100}
                />
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>
            <div style={{ position: "relative" }}>
                <canvas 
                    ref={imageCanvasRef} 
                    width={window.innerWidth} 
                    height={window.innerHeight} 
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
                />
                <canvas 
                    ref={drawCanvasRef} 
                    width={window.innerWidth} 
                    height={window.innerHeight} 
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                />
            </div>
        </div>
    );
}