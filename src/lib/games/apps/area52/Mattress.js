import * as PIXI from "pixi.js";

import zones from './defendersZones.json';

export class Mattress {
    constructor(mattressContainer) {
        this.positions = zones.positions;

        // Aliens Zone
        this.aliensZone = new PIXI.Graphics();
        this.aliensZone.beginFill(0x000000, 0.25);
        this.aliensZone.drawRoundedRect(70, 75, 300, 170, 8);
        this.aliensZone.endFill();
        mattressContainer.addChild(this.aliensZone);

        // Aliens Pile BG
        this.aliensPileBG = new PIXI.Graphics();
        this.aliensPileBG.beginFill(0x000000, 0.25);
        this.aliensPileBG.drawRoundedRect(90, 115, 80, 110, 8);
        this.aliensPileBG.endFill();
        mattressContainer.addChild(this.aliensPileBG);

        // Aliens Label
        this.aliensLabel = new PIXI.Text("Aliens", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.aliensLabel.anchor.set(0.5);
        this.aliensLabel.x = 220;
        this.aliensLabel.y = 95;
        mattressContainer.addChild(this.aliensLabel);

        // Discard Pile Zone
        this.discardPileZone = new PIXI.Graphics();
        this.discardPileZone.beginFill(0x000000, 0.25);
        this.discardPileZone.drawRoundedRect(390, 75, 120, 170, 8);
        this.discardPileZone.endFill();
        mattressContainer.addChild(this.discardPileZone);

        // Discard Pile BG
        this.discardPileBG = new PIXI.Graphics();
        this.discardPileBG.beginFill(0x000000, 0.25);
        this.discardPileBG.drawRoundedRect(410, 115, 80, 110, 8);
        this.discardPileBG.endFill();
        mattressContainer.addChild(this.discardPileBG);

        // Discard Pile Label
        this.discardPileLabel = new PIXI.Text("Discard", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.discardPileLabel.anchor.set(0.5);
        this.discardPileLabel.x = 450;
        this.discardPileLabel.y = 95;
        mattressContainer.addChild(this.discardPileLabel);

        // Defenders Pile Zone
        this.defendersPileZone = new PIXI.Graphics();
        this.defendersPileZone.beginFill(0x000000, 0.25);
        this.defendersPileZone.drawRoundedRect(530, 75, 120, 170, 8);
        this.defendersPileZone.endFill();
        mattressContainer.addChild(this.defendersPileZone);

        // Defenders Pile BG
        this.defendersPileBG = new PIXI.Graphics();
        this.defendersPileBG.beginFill(0x000000, 0.25);
        this.defendersPileBG.drawRoundedRect(550, 115, 80, 110, 8);
        this.defendersPileBG.endFill();
        mattressContainer.addChild(this.defendersPileBG);

        // Defenders Pile Label
        this.defendersPileLabel = new PIXI.Text("Defenders", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.defendersPileLabel.anchor.set(0.5);
        this.defendersPileLabel.x = 590;
        this.defendersPileLabel.y = 95;
        mattressContainer.addChild(this.defendersPileLabel);

        // Battle Zones
        this.battleZones = [];
        for (let i = 0; i < 6; i++) {
            this.battleZones[i] = new PIXI.Graphics();
            this.battleZones[i].beginFill(0xFFFFFF);
            this.battleZones[i].drawRoundedRect(this.positions[i].x, this.positions[i].y, 120, 150, 8);
            this.battleZones[i].endFill();
            this.battleZones[i].tint = 0x000000;
            this.battleZones[i].alpha = 0.25;
            mattressContainer.addChild(this.battleZones[i]);
        }
    }

    setHighlighted(i, suit) {
        if (suit === 'H' || suit === 'D') {
            this.battleZones[i].tint = 0xc026d3;
            this.battleZones[i].alpha = 0.6;
        } else {
            this.battleZones[i].tint = 0x0d47a1;
            this.battleZones[i].alpha = 0.6;
        }
    }

    clearHighlight(i) {
        this.battleZones[i].tint = 0x000000;
        this.battleZones[i].alpha = 0.25;
    }
}
