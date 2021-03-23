import {random} from '../utils'
import {Light} from './light'
import {COLORS} from './brokehConstants'

export class Background {
    baseColor: string;
    graphics: CanvasRenderingContext2D;

    constructor({baseColor = '#0C0000'} = {}) {
        this.baseColor = baseColor;
        this.graphics = document.createElement('canvas').getContext('2d');
        this.render();
    }

    get canvas() {
        return this.graphics.canvas;
    }

    render() {

        const width = window.innerWidth;
        const height = window.innerHeight;
        const centerY = height / 2;
        const count = Math.floor(0.05 * width);
        const context = this.graphics;

        context.canvas.width = width;
        context.canvas.height = height;
        context.globalCompositeOperation = 'lighter';
        context.beginPath();
        context.fillStyle = this.baseColor;
        context.fillRect(0, 0, width, height);

        for (let i = 0; i < count; i++) {

            const light = new Light({
                radius: random(200, 250),
                alpha: random(0.01, 0.05),
                color: random(COLORS),
                softness: random(0.25, 0.9)
            });

            context.drawImage(
                light.canvas,
                random(width) - light.radius,
                centerY - light.radius + random(-200, 200)
            );
        }
    }

    draw(context) {
        context.drawImage(this.canvas, 0, 0);
    }
}