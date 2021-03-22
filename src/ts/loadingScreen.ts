import {ready, getTipsByUiLanguage} from './utils'
import {AudioPlayer, MusicFileTypes} from "./types";

ready(function () {
    let player = new AudioPlayer("./music/gtav-outro.ogg", MusicFileTypes.OGG);

    // make loading icon appear more naturally
    let loadingIconLoop = function () {
        let iconEl = document.getElementById("spinner");
        iconEl.classList.add("hide");
        setTimeout(function () {
            iconEl.classList.remove("hide");
        }, 1000);
    };


    let previousIndex;
    // loop through tips
    let tipsLoop = function (tipsList) {
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

    player.playMusic();
    loadingIconLoop();
    tipsLoop(getTipsByUiLanguage);

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
