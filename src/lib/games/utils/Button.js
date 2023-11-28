import * as PIXI from "pixi.js";

export class Button {
    constructor(buttonContainer, {
        width = 100,
        height = 50,
        color = 0x000000,
        text = "Restart",
        textSize = 20,
        textColor = 0xFFFFFF,
        x = 666,
        y = 585,
        onPointerDown = () => {}
    }) {
        this.buttonContainer = buttonContainer;

        // Define graphic
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(color);
        this.graphic.drawRoundedRect(-(width / 2), -(height / 2), width, height, 8);
        this.graphic.endFill();
        this.graphic.alpha = 0.25;

        // Define label
        this.label = new PIXI.Text(text, {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: textSize,
            fill: textColor,
            align: 'center'
        });
        this.label.anchor.set(0.5);

        // Define Container
        this.container = new PIXI.Container();
        this.container.eventMode = 'static';
        this.container.cursor = 'pointer';
        this.container.on('pointerdown', onPointerDown);
        this.container.x = x;
        this.container.y = y;
        this.container.addChild(this.graphic);
        this.container.addChild(this.label);
        this.container
            .on('pointerover', () => {this.graphic.alpha = 0.50})
            .on('pointerout', () => {this.graphic.alpha = 0.25})

        // add button to buttonContainer
        this.buttonContainer.addChild(this.container);
    }
}
