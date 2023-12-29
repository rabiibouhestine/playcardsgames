import * as PIXI from "pixi.js";

export class Header {
    constructor(gameContainer, {
        onRestartClick = () => {}
    }) {
        this.gameContainer = gameContainer;
        this.timerId = null;
        this.isTimerRunning = false;
        this.currentTime = 0;

        // Define graphic
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0x000000, 0.15);
        this.graphic.drawRoundedRect(-356, -25, 712, 50, 8);
        this.graphic.endFill();

        // Define timer Text
        this.timerText = new PIXI.Text("00:00", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF
        });
        this.timerText.alpha = 0.8;
        this.timerText.anchor.set(0.5);
        this.timerText.x = 0;
        this.timerText.y = 0;

        // Define highscore Text
        this.highscoreText = new PIXI.Text("- - - - - - - - -", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF
        });
        this.highscoreText.alpha = 0.8;
        this.highscoreText.anchor.set(0, 0.5);
        this.highscoreText.x = -340;
        this.highscoreText.y = 0;

        // Define Restart Text
        this.restartText = new PIXI.Text("Restart Game", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF
        });
        this.restartText.alpha = 0.8;
        this.restartText.anchor.set(1, 0.5);
        this.restartText.x = 340;
        this.restartText.y = 0;
        this.restartText.eventMode = 'static';
        this.restartText.cursor = 'pointer';
        this.restartText.on('pointerdown', onRestartClick);
        this.restartText
            .on('pointerover', () => {this.restartText.style.fill = 0x93c5fd})
            .on('pointerout', () => {this.restartText.style.fill = 0xFFFFFF})

        // Define Container
        this.container = new PIXI.Container();
        this.container.x = 360;
        this.container.y = 45;
        this.container.addChild(this.graphic);
        this.container.addChild(this.restartText);
        this.container.addChild(this.highscoreText);
        this.container.addChild(this.timerText);

        // add button to gameContainer
        this.gameContainer.addChild(this.container);
    }

    getTime() {
        return this.currentTime;
    }

    startTimer() {
        if (!this.isTimerRunning) {
          this.isTimerRunning = true;
          this.timerId = setInterval(() => {
            this.currentTime += 1000; // Add one second
            this.timerText.text = new Date(this.currentTime).toISOString().substring(14, 19);
          }, 1000);
        }
    }

    stopTimer() {
        if (this.isTimerRunning) {
            clearInterval(this.timerId);
            this.isTimerRunning = false;
        }
    }

    resetTimer() {
        this.stopTimer();
        this.currentTime = 0;
        this.timerText.text = new Date(this.currentTime).toISOString().substring(14, 19);
    }
}
