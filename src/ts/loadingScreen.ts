import {ready, getTipsByLocale, random, fill, lerp} from './utils'
import {AudioPlayer, Background, COLORS, Light, MusicFileTypes, TWO_PI} from "./types";

ready(function () {
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
                color: random(COLORS),
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

    // make loading icon appear more naturally
    let loadingIconLoop = function () {
        let iconEl = document.getElementById("spinner");
        iconEl.classList.add("hide");
        setTimeout(function () {
            iconEl.classList.remove("hide");
        }, 1000);
    };

    let previousIndex;
    let tipsTexts = getTipsByLocale();
    // loop through tips
    let tipsLoop = function (tipsList: string[]) {
        let tipsLegendEl = document.getElementById("tips-legend");
        let tipsContentEl = document.getElementById("tips-content");

        let index = Math.floor(Math.random() * tipsList.length);
        while (index === previousIndex) {
            index = Math.floor(Math.random() * tipsList.length);
        }
        previousIndex = index;

        let splitTipEntry = tipsList[index].split("|");
        tipsLegendEl.classList.add("hide");
        tipsContentEl.classList.add("hide");
        setTimeout(function () {
            tipsLegendEl.innerText = splitTipEntry[0];
            tipsContentEl.innerText = splitTipEntry[1];
        }, 1000);
        setTimeout(function () {
            tipsLegendEl.classList.remove("hide");
            tipsContentEl.classList.remove("hide");
        }, 1000);
        setTimeout(function () {
            tipsLoop(tipsList)
        }, 7000);
    };

    let player = new AudioPlayer("./music/gtav-outro.ogg", MusicFileTypes.OGG);
    player.playMusic();
    loadingIconLoop();
    tipsLoop(tipsTexts);

    const handlers = {
        // final stage of game loading, fade out music
        loadProgress(data) {
            if (data.loadFraction >= 0.90) {
                setTimeout(player.fade, 2000);
            }
        }
    };

    window.addEventListener('message', function (e) {
        (handlers[e.data.eventName] || function () {
        })(e.data);
    });
});
