import * as PIXI from "pixi.js";

export class App {
    constructor(canvasRef) {
        this.canvasRef = canvasRef;

        this.app = new PIXI.Application({
            // resizeTo: window,
            width: 720,
            height: 720,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundAlpha: 0
        });

        this.resize();
        window.addEventListener('resize', () => {this.resize()});
        this.canvasRef.appendChild(this.app.view);

        this.mouseCoords = { x: 0, y: 0 };

        this.mattressContainer = new PIXI.Container();
        this.app.stage.addChild(this.mattressContainer);

        this.gameContainer = new PIXI.Container();
        this.gameContainer.sortableChildren = true;
        this.gameContainer.eventMode = 'static';
        this.gameContainer.hitArea = this.app.screen;
        this.gameContainer.on('mousemove', (event) =>
        {
            this.mouseCoords.x = event.global.x;
            this.mouseCoords.y = event.global.y;
        });
        this.gameContainer.on('touchmove', (event) =>
        {
            this.mouseCoords.x = event.global.x;
            this.mouseCoords.y = event.global.y;
        });
        this.app.stage.addChild(this.gameContainer);

        this.modalContainer = new PIXI.Container();
        this.app.stage.addChild(this.modalContainer);
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