import * as PIXI from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js';
import { Button } from "../utils/Button";

export class GameOverPanel {
    constructor(modalContainer, onPointerDown) {

        // Add Panel
        this.panelGraphic = new PIXI.Graphics();
        this.panelGraphic.beginFill(0x1e88e5);
        this.panelGraphic.drawRoundedRect(-300, -250, 600, 500, 10);
        this.panelGraphic.endFill();

        // Add 'Game Over' text
        this.gameOverText = new PIXI.Text("Game Over", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 48,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.gameOverText.anchor.set(0.5);
        this.gameOverText.y = -150;

        // Add score label text
        this.scoreLabelText = new PIXI.Text('score', {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 24,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.scoreLabelText.anchor.set(0.5);
        this.scoreLabelText.y = -20;

        // Add score value text
        this.scoreValueText = new PIXI.Text("", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 24,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.scoreValueText.anchor.set(0.5);
        this.scoreValueText.y = 20;

        // Make Panel Container
        this.panelContainer = new PIXI.Container();
        this.panelContainer.addChild(this.panelGraphic);
        this.panelContainer.addChild(this.gameOverText);
        this.panelContainer.addChild(this.scoreLabelText);
        this.panelContainer.addChild(this.scoreValueText);
        this.panelContainer.alpha = 0;
        this.panelContainer.eventMode = 'none';
        this.panelContainer.x = 350;
        this.panelContainer.y = 350;

        // Add Reset button
        this.resetButton = new Button(this.panelContainer, {
            width: 150,
            height: 50,
            color: 0x000000,
            text: "Play Again",
            textSize: 24,
            textColor: 0xFFFFFF,
            x: 0,
            y: 150,
            onPointerDown: onPointerDown
        });

        // add game over modal to app modal container
        modalContainer.addChild(this.panelContainer);
    }

    setScore(score) {
        this.scoreValueText.text = score;
    }

    setVisible(isVisible) {
        this.panelContainer.eventMode = isVisible ? 'static' : 'none';
        this.tweenOpacity(isVisible ? 1 : 0);
    }

    tweenOpacity(alpha) {
        const propreties = {
            alpha: this.panelContainer.alpha
        };

        const tween = new TWEEN.Tween(propreties, false)
            .to({ alpha: alpha }, 1200)
            .easing(TWEEN.Easing.Exponential.Out)
            .onUpdate(() => {
                this.panelContainer.alpha = propreties.alpha;
            })
            .start()

        const updateAlpha = (delta) => {
            if (!tween.isPlaying()) return;
            tween.update(delta);
            requestAnimationFrame(updateAlpha);
        };
    
        requestAnimationFrame(updateAlpha);
    }
}
