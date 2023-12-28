import * as PIXI from "pixi.js";

export class Header {
    constructor(gameContainer, {
        onRestartClick = () => {}
    }) {
        this.gameContainer = gameContainer;

        // Define graphic
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0x000000, 0.15);
        this.graphic.drawRoundedRect(4, 20, 712, 50, 8);
        this.graphic.endFill();

        // Define label
        // this.label = new PIXI.Text(text, {
        //     fontFamily: 'Arial',
        //     fontWeight: 'bold',
        //     fontSize: textSize,
        //     fill: textColor,
        //     align: 'center'
        // });
        // this.label.anchor.set(0.5);

        // Define Container
        // this.container = new PIXI.Container();
        // this.container.eventMode = 'static';
        // this.container.cursor = 'pointer';
        // this.container.on('pointerdown', onPointerDown);
        // this.container.x = x;
        // this.container.y = y;
        // this.container.addChild(this.graphic);
        // this.container.addChild(this.label);

        // add button to gameContainer
        this.gameContainer.addChild(this.graphic);
    }

}
