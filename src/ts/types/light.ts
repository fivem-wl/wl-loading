import {lerp, normalize, random, toRGB} from "../utils";
import {TWO_PI} from './brokehConstants.js'

export class Light {
    graphics: CanvasRenderingContext2D;
    position: any;
    radius: number;
    color: string;
    alpha: number;
    softness: number;
    twinkle: any;

    constructor({
                    position = {x: 0, y: 0},
                    radius = 0,
                    color = '#FFFFFF',
                    alpha = 0.5,
                    softness = 0.1,
                } = {}) {

        this.graphics = document.createElement('canvas').getContext('2d');
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.alpha = alpha;
        this.softness = softness;

        this.twinkle = random() > 0.7 ? false : {
            phase: random(TWO_PI),
            speed: random(0.0001, 0.001),
            alpha: 0
        };

        this.render();
    }

    get canvas() {
        return this.graphics.canvas;
    }

    render() {

        const {graphics, radius, color, alpha, softness} = this;
        const [r, g, b] = toRGB(color);
        const gradient = graphics.createRadialGradient(0, 0, radius, 0, 0, 0);

        gradient.addColorStop(0, `rgba(${r},${g},${b},0)`);
        gradient.addColorStop(softness, `rgba(${r},${g},${b},${alpha})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},${alpha})`);

        this.canvas.width = radius * 2.1;
        this.canvas.height = radius * 2.1;

        graphics.translate(radius, radius);
        graphics.beginPath();
        graphics.arc(0, 0, radius, 0, TWO_PI);
        graphics.fillStyle = gradient;
        graphics.fill();
    }

    update(time) {

        if (!this.twinkle) return;

        const {phase, speed} = this.twinkle;
        const theta = phase + time * speed;
        const value = normalize(Math.sin(theta), -1, 1);

        this.twinkle.alpha = lerp(value, 0.1, 1);
    }

    draw(context) {

        context.save();
        context.translate(this.position.x, this.position.y);

        if (this.twinkle) {
            const {scale, alpha} = this.twinkle;
            context.scale(scale, scale);
            context.globalAlpha = alpha;
        }

        context.drawImage(this.canvas, -this.radius, -this.radius);
        context.restore();
    }
}