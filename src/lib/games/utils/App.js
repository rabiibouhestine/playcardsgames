import * as PIXI from "pixi.js";

export class App {
    constructor(canvasRef, backgroundColor) {
        this.canvasRef = canvasRef;

        this.app = new PIXI.Application({
            // resizeTo: window,
            width: 720,
            height: 720,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: backgroundColor
        });

        this.resize();
        window.addEventListener('resize', () => {this.resize()});
        this.canvasRef.appendChild(this.app.view);
    }

    resize() {
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

    end() {
        this.app.stop();
        this.app.destroy(true, true);
    }
}