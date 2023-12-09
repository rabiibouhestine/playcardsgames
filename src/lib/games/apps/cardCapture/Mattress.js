import * as PIXI from "pixi.js";

export class Mattress {
    constructor(mattressContainer) {

        // Enemy Draw Pile Zone
        this.enemyDrawPileZone = new PIXI.Graphics();
        this.enemyDrawPileZone.beginFill(0x000000, 0.25);
        this.enemyDrawPileZone.drawRoundedRect(0, 113, 120, 170, 8);
        this.enemyDrawPileZone.endFill();
        mattressContainer.addChild(this.enemyDrawPileZone);

        // Enemy Draw Pile Label
        this.enemyDrawPileLabel = new PIXI.Text("Enemy Deck", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.enemyDrawPileLabel.anchor.set(0.5);
        this.enemyDrawPileLabel.x = 60;
        this.enemyDrawPileLabel.y = 133;
        mattressContainer.addChild(this.enemyDrawPileLabel);

        // Enemy Discard Pile Zone
        this.enemyDiscardPileZone = new PIXI.Graphics();
        this.enemyDiscardPileZone.beginFill(0x000000, 0.25);
        this.enemyDiscardPileZone.drawRoundedRect(600, 113, 120, 170, 8);
        this.enemyDiscardPileZone.endFill();
        mattressContainer.addChild(this.enemyDiscardPileZone);

        // Enemy Discard Pile Label
        this.enemyDiscardPileLabel = new PIXI.Text("Captured", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.enemyDiscardPileLabel.anchor.set(0.5);
        this.enemyDiscardPileLabel.x = 660;
        this.enemyDiscardPileLabel.y = 133;
        mattressContainer.addChild(this.enemyDiscardPileLabel);

        // Enemy Tableau Zone
        this.enemyTableauZone = new PIXI.Graphics();
        this.enemyTableauZone.beginFill(0x000000, 0.25);
        this.enemyTableauZone.drawRoundedRect(150, 113, 420, 170, 8);
        this.enemyTableauZone.endFill();
        mattressContainer.addChild(this.enemyTableauZone);












        // Player Draw Pile Zone
        this.playerDrawPileZone = new PIXI.Graphics();
        this.playerDrawPileZone.beginFill(0x000000, 0.25);
        this.playerDrawPileZone.drawRoundedRect(0, 360, 120, 170, 8);
        this.playerDrawPileZone.endFill();
        mattressContainer.addChild(this.playerDrawPileZone);

        // Player Draw Pile Label
        this.playerDrawPileLabel = new PIXI.Text("Draw Deck", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.playerDrawPileLabel.anchor.set(0.5);
        this.playerDrawPileLabel.x = 60;
        this.playerDrawPileLabel.y = 380;
        mattressContainer.addChild(this.playerDrawPileLabel);

        // Player Discard Pile Zone
        this.playerDiscardPileZone = new PIXI.Graphics();
        this.playerDiscardPileZone.beginFill(0x000000, 0.25);
        this.playerDiscardPileZone.drawRoundedRect(600, 360, 120, 170, 8);
        this.playerDiscardPileZone.endFill();
        mattressContainer.addChild(this.playerDiscardPileZone);

        // Player Discard Pile Label
        this.playerDiscardPileLabel = new PIXI.Text("Captured", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.playerDiscardPileLabel.anchor.set(0.5);
        this.playerDiscardPileLabel.x = 660;
        this.playerDiscardPileLabel.y = 380;
        mattressContainer.addChild(this.playerDiscardPileLabel);

        // Player Tableau Zone
        this.playerTableauZone = new PIXI.Graphics();
        this.playerTableauZone.beginFill(0x000000, 0.25);
        this.playerTableauZone.drawRoundedRect(150, 360, 420, 170, 8);
        this.playerTableauZone.endFill();
        mattressContainer.addChild(this.playerTableauZone);
    }
}
