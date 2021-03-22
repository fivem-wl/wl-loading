import {Game} from 'fivem-js'

// Vanilla JS dom ready
function ready(fn) {
    if (document.readyState === "complete" || document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

ready(function () {
    // "|" is the separator for tips legend and tips content
    const tipsEN = [
        "Develop|The server is undergoing development, if you have any suggestions, feel free to contact imckl@outlook.com",
        "Develop|Racing system is undergoing development, please look forward to it. @Her0mAn if you want it done faster :)",
        "Tips|Press M to use player menu"
    ];

    const tipsCN = [
        "开发|服务器正在开发中, 如果有任何玩法建议, 欢迎联系imckl@outlook.com",
        "开发|赛车系统开发中, 敬请期待, 催进度请联系Her0mAn",
        "提醒|按M键使用玩家菜单"
    ];

    const handlers = {
        // final stage of game loading, fade out music
        loadProgress(data) {
            if (data.loadFraction >= 0.90) {
                setTimeout(fade, 2000);
            }
        }
    };

    const locale = Game.Language;
    
    let iconEl = document.getElementById("spinner");
    let tipsLegendEl = document.getElementById("tips-legend");
    let tipsContentEl = document.getElementById("tips-content");
    let previousIndex;

    let soundFile = document.createElement('audio');
    soundFile.preload = 'auto';
    soundFile.loop = true;

    let src = document.createElement('source');
    src.src = 'music/gtav-outro.ogg';
    src.type = 'audio/ogg';

    //Plays the sound
    let playMusic = function () {
        soundFile.appendChild(src);
        soundFile.load();
        soundFile.currentTime = 0.01;
        soundFile.volume = 0.3;
        //Due to a bug in Firefox, the audio needs to be played after a delay
        setTimeout(function () {
            soundFile.play();
        }, 1);
    }

    // make loading icon appear more naturally
    let naturalAppear = function () {
        iconEl.classList.add("hide");
        setTimeout(function () {
            iconEl.classList.remove("hide");
        }, 1000);
    };

    // loop through tips
    let tipsLoop = function (tipsList) {
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

    // for music to fade out
    let fade = function () {
        if (soundFile.volume > 0.01) {
            soundFile.volume -= 0.05;
            setTimeout(fade, 330);
        }
    }

    playMusic();
    naturalAppear();
    if (locale === 9 || locale === 12) {
        tipsLoop(tipsCN);
    } else {
        tipsLoop(tipsEN);
    }


    window.addEventListener('message', function (e) {
        (handlers[e.data.eventName] || function () {
        })(e.data);
    });
});
