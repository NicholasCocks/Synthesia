import { synth } from './sampler';
class Visualizer {
  constructor() {
    this.samples = document.querySelector('#samples');
    this.sampleValue = this.samples.options[this.samples.selectedIndex].value;
    this.visualizer = document.querySelector('#visualizer');

    this.setVisualizerScale = this.setVisualizerScale.bind(this);
    this.drawVisualizer = this.drawVisualizer.bind(this);
    this.resizeVisualizer = this.resizeVisualizer.bind(this);
  }

  setVisualizerScale() {
    this.sampleValue = this.samples.options[this.samples.selectedIndex].value;
    document.getElementById('ksamples').innerText = this.sampleValue;
  }

  drawVisualizer() {
    requestAnimationFrame(this.drawVisualizer);

    const dataArray = synth.fft.getValue();
    const width = this.visualizer.width;
    const height = this.visualizer.height;
    const barWidth = width / this.sampleValue;

    const canvasContext = this.visualizer.getContext('2d');
    canvasContext.clearRect(0, 0, width, height);

    dataArray.forEach((item, index) => {
      if (Math.abs(item) !== Infinity) {
        const y = Math.abs(item);
        const x = barWidth * index;

        canvasContext.fillStyle = `hsl(${(y / height) * 90 + 150}, 100%, ${(y / height) * 100}%)`;
        canvasContext.fillRect(x, height - y - height / 2, barWidth, y - item);
      }
    });
  }

  resizeVisualizer() {
    this.visualizer.width = this.visualizer.clientWidth * window.devicePixelRatio;
    this.visualizer.height = this.visualizer.clientHeight * window.devicePixelRatio;
  }
}

export const visualizer = new Visualizer();