import * as PIXI from "pixi.js";

export class Layout {
    constructor(app) {

        // Add hand zone to mattress
        const handZone = new PIXI.Graphics();
        handZone.beginFill(0x000000, 0.25);
        handZone.drawRoundedRect(4, 360, 712, 128, 8);
        handZone.endFill();
        app.stage.addChild(handZone);

        // Add field zone to mattress
        const fieldZone = new PIXI.Graphics();
        fieldZone.beginFill(0x000000, 0.25);
        fieldZone.drawRoundedRect(4, 202, 492, 138, 8);
        fieldZone.endFill();
        app.stage.addChild(fieldZone);

        // Add base zone to mattress
        const baseZone = new PIXI.Graphics();
        baseZone.beginFill(0x000000, 0.25);
        baseZone.drawRoundedRect(516, 202, 200, 138, 8);
        baseZone.endFill();
        app.stage.addChild(baseZone);

        // Add jokers zone to mattress
        const jokersZone = new PIXI.Graphics();
        jokersZone.beginFill(0x000000, 0.25);
        jokersZone.drawRoundedRect(516, 44, 200, 138, 8);
        jokersZone.endFill();
        app.stage.addChild(jokersZone);

        // Add castle zone to mattress
        const castleZone = new PIXI.Graphics();
        castleZone.beginFill(0x000000, 0.25);
        castleZone.drawRoundedRect(213, 47, 110, 138, 8);
        castleZone.endFill();
        app.stage.addChild(castleZone);
    }
}
