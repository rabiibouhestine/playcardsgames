import * as PIXI from "pixi.js";

export class Header {
    constructor(gameContainer, {
        onRestartClick = () => {}
    }) {
        this.gameContainer = gameContainer;

        // Define graphic
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0x000000, 0.15);
        this.graphic.drawRoundedRect(-356, -25, 712, 50, 8);
        this.graphic.endFill();

        // Define highscore label
        this.highscoreLabel = new PIXI.Text("- - - - - - - - -", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF
        });
        this.highscoreLabel.anchor.set(0, 0.5);
        this.highscoreLabel.x = -340;
        this.highscoreLabel.y = 0;

        // Define Restart label
        this.restartLabel = new PIXI.Text("Restart Game", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF
        });
        this.restartLabel.anchor.set(1, 0.5);
        this.restartLabel.x = 340;
        this.restartLabel.y = 0;
        this.restartLabel.eventMode = 'static';
        this.restartLabel.cursor = 'pointer';
        this.restartLabel.on('pointerdown', onRestartClick);
        this.restartLabel
            .on('pointerover', () => {this.restartLabel.style.fill = 0x93c5fd})
            .on('pointerout', () => {this.restartLabel.style.fill = 0xFFFFFF})

        // Define Container
        this.container = new PIXI.Container();
        this.container.x = 360;
        this.container.y = 45;
        this.container.addChild(this.graphic);
        this.container.addChild(this.restartLabel);
        this.container.addChild(this.highscoreLabel);

        // add button to gameContainer
        this.gameContainer.addChild(this.container);
    }

}
