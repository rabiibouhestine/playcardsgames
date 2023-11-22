import * as PIXI from "pixi.js";

export class ResetButton {
    constructor(gameContainer, {onPointerDown}) {
        this.gameContainer = gameContainer;

        // Define button graphic
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0x000000, 0.25);
        this.graphic.drawRoundedRect(-50, -25, 100, 50, 8);
        this.graphic.endFill();

        // Define button label
        this.label = new PIXI.Text("Reset", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 24,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.label.anchor.set(0.5);

        // Define Button Container
        this.container = new PIXI.Container();
        this.container.eventMode = 'static';
        this.container.cursor = 'pointer';
        this.container.on('pointerdown', onPointerDown);
        this.container.x = 666;
        this.container.y = 585;
        this.container.addChild(this.graphic);
        this.container.addChild(this.label);
        this.gameContainer.addChild(this.container);

        this.container
            .on('pointerover', () => {this.graphic.alpha = 0.75})
            .on('pointerout', () => {this.graphic.alpha = 1})
    }
}
