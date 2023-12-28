import * as PIXI from "pixi.js";

export class ConfirmButton {
    constructor(gameContainer, {onPointerDown}) {
        this.gameContainer = gameContainer;

        // Define button graphic
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0xFFFFFF, 1);
        this.graphic.drawRoundedRect(-125, -25, 250, 50, 8);
        this.graphic.endFill();
        
        // Define button label
        this.label = new PIXI.Text("test", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
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
        this.container.y = 685;
        this.container.addChild(this.graphic);
        this.container.addChild(this.label);
        this.gameContainer.addChild(this.container);

        this.container
            .on('pointerover', () => {this.graphic.alpha = 0.75})
            .on('pointerout', () => {this.graphic.alpha = 0.50})
    }

    update(phase, selectionValue = 0) {
        switch (phase) {
            case 'attack':
                this.label.text = "Deal " + selectionValue + " damage";
                this.container.eventMode = 'static';
                this.container.cursor = 'pointer';
                this.graphic.tint = 0x0d47a1;
                this.graphic.alpha = 0.5;
                break;
            case 'discard':
                this.label.text = "Take " + selectionValue + " damage";
                this.container.eventMode = 'static';
                this.container.cursor = 'pointer';
                this.graphic.tint = 0xbf360c;
                this.graphic.alpha = 0.5;
                break;
            case 'reset':
                this.label.text = "Restting game";
                this.container.eventMode = 'none';
                this.container.cursor = 'default';
                this.graphic.tint = 0x000000;
                this.graphic.alpha = 0.25;
                break;
            case 'resolving':
                this.label.text = "Resolving effects";
                this.container.eventMode = 'none';
                this.container.cursor = 'default';
                this.graphic.tint = 0x000000;
                this.graphic.alpha = 0.25;
                break;
            default:
                break;
        }
    }
}
