// Vanilla JS dom ready
function ready(fn) {
    if (document.readyState === "complete"  || document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

ready(function(){
    const tips = [
        "[欢迎]服务器正在开发/测试中, 如果有任何玩法建议, 欢迎加入QQ群:49948262并分享您的建议 :)",
        "[开发中]赛车系统开发中, 敬请期待",
        "[提醒]你可以使用'/car 车名'来出生载具, 例如'/car infernus'",
        "[提醒]'/tp qms'用于传送至秋名山底, '/tp qmsd'则是山顶",
        "[提醒]'/tpmake'可用于创建属于你的传送点",
        "[提醒]按M键使用玩家菜单",
        "[测试中]地图上的骷髅标点可以做警匪PvE任务",
        "[测试中]警车上按住E, 可以触发类似GTA IV的警察任务"
    ];

    let iconEl = document.getElementById("loading-icon");
    let tipsLegendEl = document.getElementById("tips-legend");
    let tipsContentEl = document.getElementById("tips-content");
    let previousIndex;

    let naturalAppear = function(){
        iconEl.classList.add("hide");
        tipsLegendEl.classList.add("hide");

        setTimeout(function() {
            tipsLegendEl.innerText = "Tips";
        }, 1000);

        setTimeout(function() {
            iconEl.classList.remove("hide");
            tipsLegendEl.classList.remove("hide");
        }, 1000);
    };

    let tipsLoop = function(){
        let index = Math.floor(Math.random()*tips.length);

        while (index === previousIndex) {
            index = Math.floor(Math.random()*tips.length);
        }

        previousIndex = index;

        tipsContentEl.classList.add("hide");

        setTimeout(function() {
            tipsContentEl.innerText = tips[index];
        }, 1000);

        setTimeout(function() {
            tipsContentEl.classList.remove("hide");
        }, 1000);

        setTimeout(tipsLoop, 7000);
    };

    // make icon and legend appear more naturally
    naturalAppear();
    // loop through tips
    tipsLoop();
});
