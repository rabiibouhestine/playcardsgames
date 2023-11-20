import * as PIXI from "pixi.js";

export class Layout {
    constructor(app) {

        // Add hand zone to mattress
        const handZone = new PIXI.Graphics();
        handZone.beginFill(0x000000, 0.25);
        handZone.drawRoundedRect(4, 392, 712, 150, 8);
        handZone.endFill();
        app.stage.addChild(handZone);

        // Add field zone to mattress
        const fieldZone = new PIXI.Graphics();
        fieldZone.beginFill(0x000000, 0.25);
        fieldZone.drawRoundedRect(4, 192, 512, 150, 8);
        fieldZone.endFill();
        app.stage.addChild(fieldZone);

        // Add base zone to mattress
        const baseZone = new PIXI.Graphics();
        baseZone.beginFill(0x000000, 0.25);
        baseZone.drawRoundedRect(526, 192, 190, 150, 8);
        baseZone.endFill();
        app.stage.addChild(baseZone);

        // Add discard pile background to mattress
        const discardPileBackground = new PIXI.Graphics();
        discardPileBackground.beginFill(0x000000, 0.25);
        discardPileBackground.drawRoundedRect(536, 222, 80, 110, 6);
        discardPileBackground.endFill();
        app.stage.addChild(discardPileBackground);

        // Add draw pile background to mattress
        const drawPileBackground = new PIXI.Graphics();
        drawPileBackground.beginFill(0x000000, 0.25);
        drawPileBackground.drawRoundedRect(626, 222, 80, 110, 6);
        drawPileBackground.endFill();
        app.stage.addChild(drawPileBackground);

        // Add discard pile label
        const discardPileLabel = new PIXI.Text("Fallen", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        discardPileLabel.anchor.set(0.5);
        discardPileLabel.x = 576;
        discardPileLabel.y = 207;
        app.stage.addChild(discardPileLabel);

        // Add draw pile label
        const drawPileLabel = new PIXI.Text("Horde", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        drawPileLabel.anchor.set(0.5);
        drawPileLabel.x = 666;
        drawPileLabel.y = 207;
        app.stage.addChild(drawPileLabel);

        // Add jokers zone to mattress
        const jokersZone = new PIXI.Graphics();
        jokersZone.beginFill(0x000000, 0.25);
        jokersZone.drawRoundedRect(526, 32, 190, 150, 8);
        jokersZone.endFill();
        app.stage.addChild(jokersZone);

        // Add jokers labels
        const jokersLabel = new PIXI.Text("Battle Wails", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        jokersLabel.anchor.set(0.5);
        jokersLabel.x = 621;
        jokersLabel.y = 47;
        app.stage.addChild(jokersLabel);

        // Add castle zone to mattress
        const castleZone = new PIXI.Graphics();
        castleZone.beginFill(0x000000, 0.25);
        castleZone.drawRoundedRect(210, 32, 100, 150, 8);
        castleZone.endFill();
        app.stage.addChild(castleZone);
    }
}
