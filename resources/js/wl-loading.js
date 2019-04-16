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

    let tipsLegendEl = document.getElementById("tips-legend");
    let tipsContentEl = document.getElementById("tips-content");

    let legendAppear = function(){
        tipsLegendEl.classList.add("hide");

        setTimeout(function() {
            tipsLegendEl.innerText = "Tips";
        }, 500);

        setTimeout(function() {
            tipsLegendEl.classList.remove("hide");
        }, 500);
    };

    let tipsLoop = function(){
        tipsContentEl.classList.add("hide");

        setTimeout(function() {
            tipsContentEl.innerText = tips[Math.floor(Math.random()*tips.length)];
        }, 500);

        setTimeout(function() {
            tipsContentEl.classList.remove("hide");
        }, 500);

        setTimeout(tipsLoop, 7000);
    };

    // make tips's legend appear more naturally
    legendAppear();
    // loop through tips
    tipsLoop();

});