export default class Brush {
  constructor(ctx, size) {
    this.ctx = ctx;
    this.size = size;
    this.brushColor = document.querySelector('input[name=color]:checked').value;

    document.querySelectorAll('input[name=color]').forEach((radio) => {
      radio.addEventListener('change', () => {
        this.brushColor = document.querySelector('input[name=color]:checked').value;
      });
    });
  }

  setBrushColor(mouse) {
    switch (this.brushColor) {
      case 'brush2':
        this.brush2(mouse);
        break;
      case 'brush3':
        this.brush3(mouse);
        break;
      case 'brush4':
        this.brush4(mouse);
        break;
      case 'brush5':
        this.brush5(mouse);
        break;
      default:
        this.defaultBrush(mouse);
        break;
    }
  }

  brush2(mouse) {
    this.ctx.strokeStyle = `hsl(${(160 / this.size) * mouse.x}, 55%, 37%)`;
    this.ctx.shadowColor = `hsl(${(160 / this.size) * mouse.x}, 55%, 37%)`;
  }

  brush3(mouse) {
    this.ctx.strokeStyle = `rgb(40, ${(255 / this.size) * mouse.y}, ${(200 / this.size) * mouse.x})`;
    this.ctx.shadowColor = `rgb(40, ${(255 / this.size) * mouse.y}, ${(200 / this.size) * mouse.x})`;
  }

  brush4(mouse) {
    this.ctx.strokeStyle = `hsl(${(75 / this.size) * mouse.x}, 55%, 50%)`;
    this.ctx.shadowColor = `hsl(${(75 / this.size) * mouse.x}, 55%, 50%)`;
  }

  brush5(mouse) {
    const grad = this.ctx.createLinearGradient(150, 0, 280, 0);
    grad.addColorStop('0', 'rgba(255, 200, 0, 1)');
    grad.addColorStop('0.5', `rgba(174, 0, ${(255 / this.size) * mouse.y}, 1)`);
    grad.addColorStop('1', 'rgba(13, 0, 200, 1)');
    this.ctx.strokeStyle = grad;
    this.ctx.shadowBlur = 0;
    this.ctx.lineWidth = '5';
  }

  defaultBrush(mouse) {
    this.ctx.strokeStyle = `rgb(${(200 / this.size) * mouse.x}, 40, ${(255 / this.size) * mouse.y})`;
    this.ctx.shadowColor = `rgb(${(200 / this.size) * mouse.x}, 40, ${(255 / this.size) * mouse.y})`;
  }
}
