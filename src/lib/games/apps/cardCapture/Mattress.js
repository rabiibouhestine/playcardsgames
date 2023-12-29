import * as PIXI from "pixi.js";

export class Mattress {
    constructor(mattressContainer) {

        // Enemy Draw Pile Zone
        this.enemyDrawPileZone = new PIXI.Graphics();
        this.enemyDrawPileZone.beginFill(0x000000, 0.25);
        this.enemyDrawPileZone.drawRoundedRect(10, 184, 120, 170, 8);
        this.enemyDrawPileZone.endFill();
        mattressContainer.addChild(this.enemyDrawPileZone);

        // Enemy Draw Pile Zone BG
        this.enemyDrawPileZoneBG = new PIXI.Graphics();
        this.enemyDrawPileZoneBG.beginFill(0x000000, 0.25);
        this.enemyDrawPileZoneBG.drawRoundedRect(30, 224, 80, 110, 8);
        this.enemyDrawPileZoneBG.endFill();
        mattressContainer.addChild(this.enemyDrawPileZoneBG);

        // Enemy Draw Pile Label
        this.enemyDrawPileLabel = new PIXI.Text("Enemies", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.enemyDrawPileLabel.anchor.set(0.5);
        this.enemyDrawPileLabel.x = 70;
        this.enemyDrawPileLabel.y = 204;
        mattressContainer.addChild(this.enemyDrawPileLabel);

        // Enemy Discard Pile Zone
        this.enemyDiscardPileZone = new PIXI.Graphics();
        this.enemyDiscardPileZone.beginFill(0x000000, 0.25);
        this.enemyDiscardPileZone.drawRoundedRect(590, 184, 120, 170, 8);
        this.enemyDiscardPileZone.endFill();
        mattressContainer.addChild(this.enemyDiscardPileZone);

        // Enemy Discard Pile Zone BG
        this.enemyDiscardPileZoneBG = new PIXI.Graphics();
        this.enemyDiscardPileZoneBG.beginFill(0x000000, 0.25);
        this.enemyDiscardPileZoneBG.drawRoundedRect(610, 224, 80, 110, 8);
        this.enemyDiscardPileZoneBG.endFill();
        mattressContainer.addChild(this.enemyDiscardPileZoneBG);

        // Enemy Discard Pile Label
        this.enemyDiscardPileLabel = new PIXI.Text("Captured", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.enemyDiscardPileLabel.anchor.set(0.5);
        this.enemyDiscardPileLabel.x = 650;
        this.enemyDiscardPileLabel.y = 204;
        mattressContainer.addChild(this.enemyDiscardPileLabel);

        // Enemy Tableau Zone
        this.enemyTableauZone = new PIXI.Graphics();
        this.enemyTableauZone.beginFill(0x000000, 0.25);
        this.enemyTableauZone.drawRoundedRect(150, 184, 420, 170, 8);
        this.enemyTableauZone.endFill();
        mattressContainer.addChild(this.enemyTableauZone);

        // Player Draw Pile Zone
        this.playerDrawPileZone = new PIXI.Graphics();
        this.playerDrawPileZone.beginFill(0x000000, 0.25);
        this.playerDrawPileZone.drawRoundedRect(10, 374, 120, 170, 8);
        this.playerDrawPileZone.endFill();
        mattressContainer.addChild(this.playerDrawPileZone);

        // Player Draw Pile Zone BG
        this.playerDrawPileZoneBG = new PIXI.Graphics();
        this.playerDrawPileZoneBG.beginFill(0x000000, 0.25);
        this.playerDrawPileZoneBG.drawRoundedRect(30, 414, 80, 110, 8);
        this.playerDrawPileZoneBG.endFill();
        mattressContainer.addChild(this.playerDrawPileZoneBG);

        // Player Draw Pile Label
        this.playerDrawPileLabel = new PIXI.Text("Draw Pile", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.playerDrawPileLabel.anchor.set(0.5);
        this.playerDrawPileLabel.x = 70;
        this.playerDrawPileLabel.y = 394;
        mattressContainer.addChild(this.playerDrawPileLabel);

        // Player Discard Pile Zone
        this.playerDiscardPileZone = new PIXI.Graphics();
        this.playerDiscardPileZone.beginFill(0x000000, 0.25);
        this.playerDiscardPileZone.drawRoundedRect(590, 374, 120, 170, 8);
        this.playerDiscardPileZone.endFill();
        mattressContainer.addChild(this.playerDiscardPileZone);

        // Player Discard Pile Zone BG
        this.playerDiscardPileZoneBG = new PIXI.Graphics();
        this.playerDiscardPileZoneBG.beginFill(0x000000, 0.25);
        this.playerDiscardPileZoneBG.drawRoundedRect(610, 414, 80, 110, 8);
        this.playerDiscardPileZoneBG.endFill();
        mattressContainer.addChild(this.playerDiscardPileZoneBG);

        // Player Discard Pile Label
        this.playerDiscardPileLabel = new PIXI.Text("Captured", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.playerDiscardPileLabel.anchor.set(0.5);
        this.playerDiscardPileLabel.x = 650;
        this.playerDiscardPileLabel.y = 394;
        mattressContainer.addChild(this.playerDiscardPileLabel);

        // Player Tableau Zone
        this.playerTableauZone = new PIXI.Graphics();
        this.playerTableauZone.beginFill(0x000000, 0.25);
        this.playerTableauZone.drawRoundedRect(150, 374, 420, 170, 8);
        this.playerTableauZone.endFill();
        mattressContainer.addChild(this.playerTableauZone);
    }
}
