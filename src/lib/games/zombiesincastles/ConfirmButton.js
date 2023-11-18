import * as PIXI from "pixi.js";

export class ConfirmButton {
    constructor(app, {onPointerDown}) {
        // Attack (0)
        // Discard {20} (0)
        // Resolving

        this.app = app;

        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0x000000, 0.25);
        this.graphic.drawRoundedRect(260, 568, 200, 50, 8);
        this.graphic.endFill();
        this.app.stage.addChild(this.graphic);

        this.graphic.eventMode = 'static';
        this.graphic.cursor = 'pointer';
        this.graphic.on('pointerdown', onPointerDown);
    }
}
