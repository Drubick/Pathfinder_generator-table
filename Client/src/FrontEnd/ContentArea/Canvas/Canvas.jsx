import { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
import Button from "../../UI/Button";
import Forms from "../../UI/Forms";
import AddedMonstersList from "../EncounterBuilder/AddedMonstersList";

export default function Canvas({ savedMonsters, setSavedMonsters }) {
    const imageCanvasRef = useRef(null);
    const drawCanvasRef = useRef(null);
    const contextRef = useRef(null);
    const actionRef = useRef("");
    const containerRef = useRef(null);
    const [drawColor, setDrawColor] = useState("#000000");
    const [drawWidth, setDrawWidth] = useState(2);
    const [restoreArray, setRestoreArray] = useState([]);
    const [index, setIndex] = useState(0);
    const [action, setAction] = useState("");
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const offsetRef = useRef({ x: 0, y: 0 });

    const handleRadioChange = (event) => {
        const newAction = event.target.value;
        setAction(newAction);
        actionRef.current = newAction;
    };

    const undo = useCallback(() => {
        if (index <= 1) 
            return;
        const currentIndex = index - 2;
        const imageData = restoreArray[currentIndex];
        if (imageData && imageData instanceof ImageData) {
            const canvas = drawCanvasRef.current;
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.putImageData(imageData, 0, 0);
            setIndex(currentIndex + 1);
            setRestoreArray((prevArray) => prevArray.slice(0, currentIndex + 1));
        }
    }, [index, restoreArray]);

    const clearCanvas = () => {
        const canvas = drawCanvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        const newImageData = context.getImageData(0, 0, canvas.width, canvas.height);
        setRestoreArray([newImageData]);
        setIndex(1);
    };

    const zoomIn = () => {
        setScale(prevScale => Math.min(prevScale * 1.2, 5));
    };

    const zoomOut = () => {
        setScale(prevScale => Math.max(prevScale / 1.2, 0.1));
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

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (event) => {
            event.preventDefault();
            const delta = event.deltaY;
            
            if (delta < 0) {
                // Scroll up - zoom in
                setScale(prevScale => Math.min(prevScale * 1.1, 5));
            } else {
                // Scroll down - zoom out
                setScale(prevScale => Math.max(prevScale / 1.1, 0.1));
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    useLayoutEffect(() => {
        let mouseDown = false;
        let startDragPos = { x: 0, y: 0 };
        const canvas = drawCanvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
        
        // Set context properties
        context.strokeStyle = drawColor;
        context.lineWidth = drawWidth;
        
        const initialImageData = context.getImageData(0, 0, canvas.width, canvas.height);

        if (restoreArray.length === 0) {
            setRestoreArray([initialImageData]);
            setIndex(1);
        }
  
        const start = (event) => {
            mouseDown = true;
            const isCtrlPressed = event.ctrlKey || event.metaKey;
            
            if (actionRef.current === "Move" || isCtrlPressed) {
                startDragPos = {
                    x: event.clientX - offsetRef.current.x,
                    y: event.clientY - offsetRef.current.y
                };
                if (containerRef.current) {
                    containerRef.current.style.cursor = "grabbing";
                }
                event.preventDefault();
            } else if (actionRef.current === "Draw" || actionRef.current === "Erase") {
                const rect = canvas.getBoundingClientRect();
                const x = (event.clientX - rect.left) * (canvas.width / rect.width);
                const y = (event.clientY - rect.top) * (canvas.height / rect.height);
                context.beginPath();
                context.moveTo(x, y);
                event.preventDefault();
            }
        };

        const draw = (event) => {
            const isCtrlPressed = event.ctrlKey || event.metaKey;
            
            if (mouseDown && (actionRef.current === "Move" || isCtrlPressed)) {
                const newX = event.clientX - startDragPos.x;
                const newY = event.clientY - startDragPos.y;
                offsetRef.current = { x: newX, y: newY };
                setOffset({ x: newX, y: newY });
                event.preventDefault();
            } else if (mouseDown && (actionRef.current === "Draw" || actionRef.current === "Erase")) {
                const rect = canvas.getBoundingClientRect();
                const x = (event.clientX - rect.left) * (canvas.width / rect.width);
                const y = (event.clientY - rect.top) * (canvas.height / rect.height);
                
                context.lineTo(x, y);
                context.lineCap = "round";
                context.lineJoin = "round";
                if (actionRef.current === "Erase"){
                    context.globalCompositeOperation = "destination-out";
                    context.strokeStyle = "rgba(0,0,0,1)";
                }else{
                    context.globalCompositeOperation = "source-over";
                    context.strokeStyle = drawColor;
                    context.lineWidth = drawWidth;
                }
                context.stroke();
            }
        };

        const stop = (event) => {
            event.preventDefault();
            
            if ((actionRef.current === "Move" || event.ctrlKey || event.metaKey) && containerRef.current) {
                containerRef.current.style.cursor = actionRef.current === "Move" ? "grab" : "default";
            }
            
            if (mouseDown && (actionRef.current === "Draw" || actionRef.current === "Erase") && !event.ctrlKey && !event.metaKey) {
                context.stroke();
                context.closePath();
                
                // Save state after drawing
                const newImageData = context.getImageData(0, 0, canvas.width, canvas.height);
                setRestoreArray((prevArray) => [...prevArray, newImageData]);
                setIndex((prevIndex) => prevIndex + 1);
            }
            
            mouseDown = false;
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
    }, [drawColor, drawWidth, restoreArray.length]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'z') {
                undo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [undo]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (event) => {
            event.preventDefault();
            const delta = event.deltaY;
            
            if (delta < 0) {
                setScale(prevScale => Math.min(prevScale * 1.1, 5));
            } else {
                setScale(prevScale => Math.max(prevScale / 1.1, 0.1));
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    useLayoutEffect(() => {
        let mouseDown = false;
        let startDragPos = { x: 0, y: 0 };
        const canvas = drawCanvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
        
        context.strokeStyle = drawColor;
        context.lineWidth = drawWidth;
        
        const initialImageData = context.getImageData(0, 0, canvas.width, canvas.height);

        if (restoreArray.length === 0) {
            setRestoreArray([initialImageData]);
            setIndex(1);
        }
  
        const start = (event) => {
            mouseDown = true;
            const isCtrlPressed = event.ctrlKey || event.metaKey;
            
            if (actionRef.current === "Move" || isCtrlPressed) {
                startDragPos = {
                    x: event.clientX - offsetRef.current.x,
                    y: event.clientY - offsetRef.current.y
                };
                if (containerRef.current) {
                    containerRef.current.style.cursor = "grabbing";
                }
                event.preventDefault();
            } else if (actionRef.current === "Draw" || actionRef.current === "Erase") {
                const rect = canvas.getBoundingClientRect();
                const x = (event.clientX - rect.left) * (canvas.width / rect.width);
                const y = (event.clientY - rect.top) * (canvas.height / rect.height);
                context.beginPath();
                context.moveTo(x, y);
                event.preventDefault();
            }
        };

        const draw = (event) => {
            const isCtrlPressed = event.ctrlKey || event.metaKey;
            
            if (mouseDown && (actionRef.current === "Move" || isCtrlPressed)) {
                const newX = event.clientX - startDragPos.x;
                const newY = event.clientY - startDragPos.y;
                offsetRef.current = { x: newX, y: newY };
                setOffset({ x: newX, y: newY });
                event.preventDefault();
            } else if (mouseDown && (actionRef.current === "Draw" || actionRef.current === "Erase")) {
                const rect = canvas.getBoundingClientRect();
                const x = (event.clientX - rect.left) * (canvas.width / rect.width);
                const y = (event.clientY - rect.top) * (canvas.height / rect.height);
                
                context.lineTo(x, y);
                context.lineCap = "round";
                context.lineJoin = "round";
                if (actionRef.current === "Erase"){
                    context.globalCompositeOperation = "destination-out";
                    context.strokeStyle = "rgba(0,0,0,1)";
                }else{
                    context.globalCompositeOperation = "source-over";
                    context.strokeStyle = drawColor;
                    context.lineWidth = drawWidth;
                }
                context.stroke();
            }
        };

        const stop = (event) => {
            event.preventDefault();
            
            if ((actionRef.current === "Move" || event.ctrlKey || event.metaKey) && containerRef.current) {
                containerRef.current.style.cursor = actionRef.current === "Move" ? "grab" : "default";
            }
            
            if (mouseDown && (actionRef.current === "Draw" || actionRef.current === "Erase") && !event.ctrlKey && !event.metaKey) {
                context.stroke();
                context.closePath();
                
                const newImageData = context.getImageData(0, 0, canvas.width, canvas.height);
                setRestoreArray((prevArray) => [...prevArray, newImageData]);
                setIndex((prevIndex) => prevIndex + 1);
            }
            
            mouseDown = false;
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
    }, [drawColor, drawWidth, restoreArray.length]);

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

    const handleMonsterClick = (monster) => {
        if (selectedMonster?.name === monster.name) {
            setSelectedMonster(null);
        } else {
            setSelectedMonster(monster);
        }
    };

    const handleRemoveMonster = (monster, index) => {
        setSavedMonsters(prev => prev.filter((_, i) => i !== index));
        
        if (selectedMonster?.name === monster.name) {
            setSelectedMonster(null);
        }
    };

    const handleClearAll = () => {
        setSavedMonsters([]);
        setSelectedMonster(null);
    };

    const isMonsterSelected = (monster) => {
        if (selectedMonster?.name === monster.name) {
            return 'bg-pre-primary-light-100 dark:bg-pre-primary-dark-100';
        }
        return '';
    };

    return (
        <div className="overflow-hidden min-h-screen w-full p-1 sm:p-2 flex flex-col lg:flex-row gap-2 sm:gap-4 bg-pre-primary-light dark:bg-pre-primary-dark">
            <div className="flex-1 flex flex-col min-h-0">
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-pre-primary-light dark:bg-pre-primary-dark border-b border-accent-light dark:border-accent-dark">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Forms 
                        type={"radio"} 
                        label={"Action"} 
                        name={"action"} 
                        options={["Draw", "Erase", "Move"]}
                        handleRadioChange={handleRadioChange} 
                    />
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto">
                    <Button text={"Undo"} action={undo} />
                    <Button text={"Clear"} action={clearCanvas} />
                    <Button text={"Zoom In"} action={zoomIn}/>
                    <Button text={"Zoom Out"} action={zoomOut}/>
                </div>
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:ml-auto">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <label className="text-xs sm:text-sm">Color:</label>
                        <input 
                            type="color"
                            value={drawColor}
                            onChange={handleColorChange}
                            className="w-8 h-6 sm:w-12 sm:h-8 rounded border-2 border-tertiary-light dark:border-tertiary-dark cursor-pointer bg-pre-primary-light dark:bg-pre-primary-dark"
                        />
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <label className="text-xs sm:text-sm">Width:</label>
                        <input 
                            type="range"
                            value={drawWidth}
                            onChange={handleWidthChange}
                            min={0.1} max={100}
                            className="w-20 sm:w-32 accent-accent-light dark:accent-accent-dark"
                        />
                        <span className="text-xs sm:text-sm w-6 sm:w-8 text-right">{Math.round(drawWidth)}</span>
                    </div>
                    <span className="text-xs sm:text-sm">Zoom: {Math.round(scale * 100)}%</span>
                    <Button 
                        text="Upload" 
                        isFileUpload={true}
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
            </div>
            <div 
                ref={containerRef} 
                className="relative w-full flex-1 overflow-hidden flex items-center justify-center touch-none"
                style={{ cursor: action === "Move" ? "grab" : "default" }}
            >
                <div 
                    style={{ 
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                        transformOrigin: 'center'
                    }}
                    className="relative"
                >
                    <canvas 
                        ref={imageCanvasRef}
                        width={1920} 
                        height={1080} 
                        className="border border-accent-light dark:border-accent-dark max-w-full h-auto"
                        style={{ display: 'block' }}
                    />
                    <canvas 
                        ref={drawCanvasRef} 
                        width={1920} 
                        height={1080}  
                        className="absolute top-0 left-0 max-w-full h-auto"
                        style={{ display: 'block' }}
                    />
                </div>
            </div>
            </div>
            <div className="w-full lg:w-80 h-[40vh] lg:h-full flex flex-col flex-shrink-0">
                <div className="h-full overflow-hidden">
                    <AddedMonstersList
                        savedMonsters={savedMonsters}
                        selectedMonster={selectedMonster}
                        onMonsterClick={handleMonsterClick}
                        onRemoveMonster={handleRemoveMonster}
                        onClearAll={handleClearAll}
                        isMonsterSelected={isMonsterSelected}
                        inCanvas={true}
                    />
                </div>
            </div>
        </div>
    );
}