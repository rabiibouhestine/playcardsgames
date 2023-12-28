import * as PIXI from "pixi.js";

export class Mattress {
    constructor(mattressContainer) {
        // Dungeon Zone
        this.dungeonZone = new PIXI.Graphics();
        this.dungeonZone.beginFill(0x000000, 0.25);
        this.dungeonZone.drawRoundedRect(0, 76, 120, 170, 8);
        this.dungeonZone.endFill();
        mattressContainer.addChild(this.dungeonZone);

        // Dungeon Zone Background
        this.dungeonZoneBg = new PIXI.Graphics();
        this.dungeonZoneBg.beginFill(0x000000, 0.25);
        this.dungeonZoneBg.drawRoundedRect(20, 116, 80, 110, 8);
        this.dungeonZoneBg.endFill();
        mattressContainer.addChild(this.dungeonZoneBg);

        // Dungeon Zone Label
        this.dungeonZoneLabel = new PIXI.Text("Dungeon", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.dungeonZoneLabel.anchor.set(0.5);
        this.dungeonZoneLabel.x = 60;
        this.dungeonZoneLabel.y = 96;
        mattressContainer.addChild(this.dungeonZoneLabel);

        // Discard Zone
        this.discardZone = new PIXI.Graphics();
        this.discardZone.beginFill(0x000000, 0.25);
        this.discardZone.drawRoundedRect(600, 76, 120, 170, 8);
        this.discardZone.endFill();
        mattressContainer.addChild(this.discardZone);

        // Discard Zone Background
        this.discardZoneBg = new PIXI.Graphics();
        this.discardZoneBg.beginFill(0x000000, 0.25);
        this.discardZoneBg.drawRoundedRect(620, 116, 80, 110, 8);
        this.discardZoneBg.endFill();
        mattressContainer.addChild(this.discardZoneBg);

        // Discard Zone Label
        this.discardZoneLabel = new PIXI.Text("Discard", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.discardZoneLabel.anchor.set(0.5);
        this.discardZoneLabel.x = 660;
        this.discardZoneLabel.y = 96;
        mattressContainer.addChild(this.discardZoneLabel);

        // Room Zone
        this.roomZone = new PIXI.Graphics();
        this.roomZone.beginFill(0x000000, 0.25);
        this.roomZone.drawRoundedRect(150, 57, 420, 189, 8);
        this.roomZone.endFill();
        mattressContainer.addChild(this.roomZone);

        // Room Zone Label
        this.roomZoneLabel = new PIXI.Text("Room", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.roomZoneLabel.anchor.set(0.5);
        this.roomZoneLabel.x = 360;
        this.roomZoneLabel.y = 77;
        mattressContainer.addChild(this.roomZoneLabel);

        // Weapon Zone
        this.weaponZone = new PIXI.Graphics();
        this.weaponZone.beginFill(0x000000, 0.25);
        this.weaponZone.drawRoundedRect(0, 367, 720, 150, 8);
        this.weaponZone.endFill();
        mattressContainer.addChild(this.weaponZone);
    }
}
