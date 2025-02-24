export const drawAdaptiveGrid = (context, width, height, viewState) => {
    const baseGridSize = 128;
    const scale = 1 / viewState.scale;
    const gridScale = 2 ** Math.floor(Math.log2(baseGridSize * scale));
    const startX = Math.floor(-viewState.offsetX * scale / gridScale) * gridScale;
    const startY = Math.floor(-viewState.offsetY * scale / gridScale) * gridScale;
    const size = Math.max(width, height) * scale + gridScale * 2;
  
    context.setTransform(viewState.scale, 0, 0, viewState.scale, viewState.offsetX, viewState.offsetY);
    context.lineWidth = 1;
    context.strokeStyle = "#000";
    context.beginPath();
    for (let x = startX; x < startX + size; x += gridScale) {
      context.moveTo(x, startY);
      context.lineTo(x, startY + size);
    }
    for (let y = startY; y < startY + size; y += gridScale) {
      context.moveTo(startX, y);
      context.lineTo(startX + size, y);
    }
    context.stroke();
    context.setTransform(1, 0, 0, 1, 0, 0);
  };