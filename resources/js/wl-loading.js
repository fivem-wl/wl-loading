// Vanilla JS dom ready
function ready(fn) {
    if (document.readyState === "complete" || document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

ready(function () {
    const tips = [
        "[开发中]服务器正在开发中, 如果有任何玩法建议, 欢迎联系imckl@outlook.com",
        "[开发中]赛车系统开发中, 敬请期待, 催进度请联系Her0mAn",
        // "[提醒]你可以使用'/car 车名'来出生载具, 例如'/car infernus'",
        // "[提醒]'/tp qms'用于传送至秋名山底, '/tp qmsd'则是山顶",
        // "[提醒]'/tpmake'可用于创建属于你的传送点",
        // "[测试中]地图上的骷髅标点可以做警匪PvE任务",
        // "[测试中]警车上按住E, 可以触发类似GTA IV的警察任务"
        "[提醒]按M键使用玩家菜单"
    ];

    const handlers = {
        // final stage of game loading, fade out music
        loadProgress(data) {
            if (data.loadFraction * 100 >= 90) {
                setTimeout(fade, 2000);
            }
        }
    };

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
    soundFile.appendChild(src);

    //Plays the sound
    let playSound = function () {
        //Set the current time for the audio file to the beginning
        soundFile.currentTime = 0.01;
        soundFile.volume = 0.3;
        //Due to a bug in Firefox, the audio needs to be played after a delay
        setTimeout(function () { soundFile.play(); }, 1);
    }

    // make icon and legend appear more naturally
    let naturalAppear = function () {
        iconEl.classList.add("hide");
        tipsLegendEl.classList.add("hide");
        setTimeout(function () {
            tipsLegendEl.innerText = "Tips";
        }, 1000);
        setTimeout(function () {
            iconEl.classList.remove("hide");
            tipsLegendEl.classList.remove("hide");
        }, 1000);
    };

    // loop through tips
    let tipsLoop = function () {
        let index = Math.floor(Math.random() * tips.length);
        while (index === previousIndex) {
            index = Math.floor(Math.random() * tips.length);
        }
        previousIndex = index;
        tipsContentEl.classList.add("hide");
        setTimeout(function () {
            tipsContentEl.innerText = tips[index];
        }, 1000);
        setTimeout(function () {
            tipsContentEl.classList.remove("hide");
        }, 1000);
        setTimeout(tipsLoop, 7000);
    };

    // for music to fade out
    let fade = function () {
        if (soundFile.volume > 0.01) {
            soundFile.volume -= 0.05;
            setTimeout(fade, 330);
        }
    }

    soundFile.load();
    playSound();
    naturalAppear();
    tipsLoop();

    window.addEventListener('message', function (e) {
        (handlers[e.data.eventName] || function () { })(e.data);
    });
});
