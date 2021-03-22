import {ready, lerp, fill, random} from './utils'
import {TWO_PI, Light, Background} from "./types";

ready(function () {
    /*
        Christmas light by Nik from https://codepen.io/nikrowell/pen/xmKjya
    */
    const colors = [
        '#FF8C00', '#D98E48', '#EBBF83', '#9932CC', '#6495ED', '#FFFFFF'
    ];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    document.body.appendChild(canvas);

    const background = new Background();

    let lights = [];

    function draw(time) {

        const {width, height} = canvas;

        context.save();
        context.clearRect(0, 0, width, height);
        context.globalCompositeOperation = 'lighter';

        background.draw(context);

        lights.forEach(light => {
            light.update(time);
            light.draw(context);
        });

        context.restore();
        requestAnimationFrame(draw);
    }

    function resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function reset() {

        const {width, height} = canvas;
        const count = Math.floor(width * 0.02);
        const theta = random(TWO_PI);
        const amplitude = height * 0.08;
        const cx = width / 2;
        const cy = height / 2;

        lights = fill(count, i => {

            const percent = (i / count);
            const x = percent * width;
            const distanceToCenter = 1 - Math.abs(cx - x) / cx;
            const varianceRange = lerp(distanceToCenter, 50, 200);
            const variance = random(-varianceRange, varianceRange);
            const offset = Math.sin(theta + percent * TWO_PI) * amplitude + variance;
            const y = cy + offset;

            return new Light({
                position: {x, y},
                radius: random(100, Math.max(1, 80 * distanceToCenter)),
                color: random(colors),
                alpha: random(0.1, 0.5),
                softness: random(0.1, 0.5)
            });
        });
    }

    function init() {
        resize();
        reset();
        requestAnimationFrame(draw);
    }

    init();
});