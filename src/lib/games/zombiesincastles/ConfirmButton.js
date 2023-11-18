import * as PIXI from "pixi.js";

export class ConfirmButton {
    constructor(app, {onPointerDown}) {
        // Attack (0)
        // Discard {20} (0)
        // Resolving

        this.app = app;

        // Define button graphic
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0x000000, 0.25);
        this.graphic.drawRoundedRect(-100, -25, 200, 50, 8);
        this.graphic.endFill();
        
        // Define button label
        this.label = new PIXI.Text("test", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.label.anchor.set(0.5);

        // Define Button Container
        this.container = new PIXI.Container();
        this.container.eventMode = 'static';
        this.container.cursor = 'pointer';
        this.container.on('pointerdown', onPointerDown);
        this.container.x = 360;
        this.container.y = 585;
        this.container.addChild(this.graphic);
        this.container.addChild(this.label);
        this.app.stage.addChild(this.container);
    }
}
