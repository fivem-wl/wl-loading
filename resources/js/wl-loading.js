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
        "你可以使用'/car 车名'来出生载具",
        "'/tp qms'用于传送至秋名山底, '/tp qmsd'则是山顶",
        "'/tpmake'可用于创建你自己的传送点",
        "M键可以使用vMenu",
        "我们正在积极开发中, 如果发现bug可以汇报到https://github.com/imckl/wl"
    ];

    let iconEl = document.getElementById("spinner");
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