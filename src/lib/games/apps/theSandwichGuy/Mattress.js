import * as PIXI from "pixi.js";

import zones from './ingredientsZones.json';

export class Mattress {
    constructor(mattressContainer) {
        this.positions = zones.positions;

        // Discard Pile Zone
        this.discardPileZone = new PIXI.Graphics();
        this.discardPileZone.beginFill(0x000000, 0.25);
        this.discardPileZone.drawRoundedRect(230, 99, 120, 170, 8);
        this.discardPileZone.endFill();
        mattressContainer.addChild(this.discardPileZone);

        // Discard Pile Zone BG
        this.discardPileZoneBG = new PIXI.Graphics();
        this.discardPileZoneBG.beginFill(0x000000, 0.25);
        this.discardPileZoneBG.drawRoundedRect(250, 139, 80, 110, 8);
        this.discardPileZoneBG.endFill();
        mattressContainer.addChild(this.discardPileZoneBG);

        // Discard Pile Label
        this.discardPileLabel = new PIXI.Text("Served", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.discardPileLabel.anchor.set(0.5);
        this.discardPileLabel.x = 290;
        this.discardPileLabel.y = 119;
        mattressContainer.addChild(this.discardPileLabel);

        // Draw Pile Zone
        this.drawPileZone = new PIXI.Graphics();
        this.drawPileZone.beginFill(0x000000, 0.25);
        this.drawPileZone.drawRoundedRect(370, 99, 120, 170, 8);
        this.drawPileZone.endFill();
        mattressContainer.addChild(this.drawPileZone);

        // Draw Pile Zone BG
        this.drawPileZoneBG = new PIXI.Graphics();
        this.drawPileZoneBG.beginFill(0x000000, 0.25);
        this.drawPileZoneBG.drawRoundedRect(390, 139, 80, 110, 8);
        this.drawPileZoneBG.endFill();
        mattressContainer.addChild(this.drawPileZoneBG);

        // Draw Pile Label
        this.drawPileLabel = new PIXI.Text("Ingredients", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.drawPileLabel.anchor.set(0.5);
        this.drawPileLabel.x = 430;
        this.drawPileLabel.y = 119;
        mattressContainer.addChild(this.drawPileLabel);

        // Ingredients Zones
        this.ingredientsZones = [];
        for (let i = 0; i < 8; i++) {
            this.ingredientsZones[i] = new PIXI.Graphics();
            this.ingredientsZones[i].beginFill(0xFFFFFF);
            this.ingredientsZones[i].drawRoundedRect(this.positions[i].x, this.positions[i].y, 120, 150, 8);
            this.ingredientsZones[i].endFill();
            this.ingredientsZones[i].tint = 0x000000;
            this.ingredientsZones[i].alpha = 0.25;
            mattressContainer.addChild(this.ingredientsZones[i]);
        }
    }

    setHighlighted(i, suit) {
        if (suit === 'H' || suit === 'D') {
            this.ingredientsZones[i].tint = 0xc026d3;
            this.ingredientsZones[i].alpha = 0.6;
        } else {
            this.ingredientsZones[i].tint = 0x0d47a1;
            this.ingredientsZones[i].alpha = 0.6;
        }
    }

    clearHighlight(i) {
        this.ingredientsZones[i].tint = 0x000000;
        this.ingredientsZones[i].alpha = 0.25;
    }
}
