import * as PIXI from "pixi.js";
import { Layout } from "./Layout";

export class Game {
    constructor(canvasRef) {
        this.init(canvasRef);
    }

    async init(canvasRef) {
        this.canvasRef = canvasRef;

        this.app = new PIXI.Application({
            // resizeTo: window,
            width: 720,
            height: 720,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x475569
        });

        this.layout = new Layout(this.app);

        this.resize();
        window.addEventListener('resize', () => {this.resize()});
        this.canvasRef.appendChild(this.app.view);
    }

    resize() {
        console.log("this.canvasRef.offsetHeight:", this.canvasRef.offsetHeight);
        const canvasWidth = this.canvasRef.offsetWidth;
        const canvasHeight = this.canvasRef.offsetHeight;
        const stageScale = Math.min(canvasWidth, canvasHeight) / 720;

        // Update renderer dimensions
        this.app.renderer.resize(canvasWidth, canvasHeight);

        // Update stage scale
        this.app.stage.scale.set(stageScale);

        // Center the stage
        this.app.stage.x = (canvasWidth - 720 * stageScale ) / 2;
        // this.app.stage.y = (canvasHeight - 720 * stageScale ) / 2;
    }

}