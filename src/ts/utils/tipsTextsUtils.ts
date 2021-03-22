import {Game} from 'fivem-js'

// Returns an Array of tips strings according to game UI language
export function getTipsByUiLanguage() {
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

    switch (Game.Language) {
        case 0: {
            return tipsEN;
        }

        default: {
            return tipsCN;
        }
    }
}