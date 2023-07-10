import './scripts/about_tab';
import { synth } from './scripts/sampler';
import { visualizer } from './scripts/visualizer';
import Brush from './scripts/brush';

let drawing = false;
let debounce = 0;
let drawingPoints = [];

// Canvas
const canvas = document.querySelector('#canvas');
const container = document.querySelector('#page_container');
const size = 500;
const scale = window.devicePixelRatio;

canvas.style.width = size + 'px';
canvas.style.height = size + 'px';

canvas.width = Math.floor(size * scale);
canvas.height = Math.floor(size * scale);

// Context (ctx)
const ctx = canvas.getContext('2d');
ctx.scale(scale, scale);
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.shadowBlur = 3;

// My Classes
const brush = new Brush(ctx, size);

const fillLine = () => {
  const startingPoint = drawingPoints[0];
  ctx.beginPath();
  ctx.arc(startingPoint.x, startingPoint.y, ctx.lineWidth / 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
};

const fillQuadraticLine = () => {
  ctx.beginPath();
  ctx.moveTo(drawingPoints[0].x, drawingPoints[0].y);

  for (let i = 1; i < drawingPoints.length - 2; i++) {
    const c = (drawingPoints[i].x + drawingPoints[i + 1].x) / 2;
    const d = (drawingPoints[i].y + drawingPoints[i + 1].y) / 2;
    ctx.quadraticCurveTo(
            drawingPoints[i].x, 
            drawingPoints[i].y, 
            c, 
            d
        );
    }

    ctx.stroke();
};

const startDraw = (e) => {
  if (e.which === 1) {
    drawing = true;
    draw(e);
  }
};

const finishDraw = () => {
  drawing = false;
  drawingPoints = [];
};

const draw = (e) => {
  if (!drawing) return;

  debounce += 1;

  const mouse = { x: 0, y: 0 };
  mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
  mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
  drawingPoints.push({ x: mouse.x, y: mouse.y });

  brush.setBrushColor(mouse);

  if (debounce === 4) {
    debounce = 0;
    synth.triggerNote(mouse);
  }

  if (drawingPoints.length < 6) {
    fillLine();
    return;
  }

  fillQuadraticLine();
};

visualizer.resizeVisualizer();
visualizer.drawVisualizer();

// Event handlers
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', finishDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return false;
});
container.addEventListener('mouseover', finishDraw);
visualizer.samples.addEventListener('change', visualizer.setVisualizerScale);
