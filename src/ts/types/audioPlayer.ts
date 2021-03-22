import {MusicFileTypes} from './musicFileTypes.js'

export class AudioPlayer {
    private readonly audioEl: HTMLAudioElement;
    private readonly sourceEl: HTMLSourceElement;

    constructor(url: string, fileType: MusicFileTypes) {
        this.audioEl = document.createElement('audio');
        this.audioEl.preload = 'auto';
        this.audioEl.loop = true;
        this.audioEl.currentTime = 0.01;
        this.audioEl.volume = 0.3;

        this.sourceEl.src = url;
        this.sourceEl.type = fileType.valueOf();

        this.audioEl.appendChild(this.sourceEl);
    }

    public playMusic(): void {
        this.audioEl.load();
        this.audioEl.play()
        setTimeout(this.playMusic, 1);
    }

    public fade(): void {
        if (this.audioEl.volume > 0.01) {
            this.audioEl.volume -= 0.05;
            setTimeout(this.fade, 330);
        }
    }
}
