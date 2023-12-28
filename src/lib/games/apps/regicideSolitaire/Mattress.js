import * as PIXI from "pixi.js";

export class Mattress {
    constructor(gameContainer) {

        // Add hand zone to mattress
        const handZone = new PIXI.Graphics();
        handZone.beginFill(0x000000, 0.25);
        handZone.drawRoundedRect(4, 500, 712, 150, 8);
        handZone.endFill();
        gameContainer.addChild(handZone);

        // Add field zone to mattress
        const fieldZone = new PIXI.Graphics();
        fieldZone.beginFill(0x000000, 0.25);
        fieldZone.drawRoundedRect(4, 280, 482, 180, 8);
        fieldZone.endFill();
        gameContainer.addChild(fieldZone);

        // Add base zone to mattress
        const baseZone = new PIXI.Graphics();
        baseZone.beginFill(0x000000, 0.25);
        baseZone.drawRoundedRect(496, 280, 220, 180, 8);
        baseZone.endFill();
        gameContainer.addChild(baseZone);

        // Add discard pile background to mattress
        const discardPileBackground = new PIXI.Graphics();
        discardPileBackground.beginFill(0x000000, 0.25);
        discardPileBackground.drawRoundedRect(516, 330, 80, 110, 6);
        discardPileBackground.endFill();
        gameContainer.addChild(discardPileBackground);

        // Add draw pile background to mattress
        const drawPileBackground = new PIXI.Graphics();
        drawPileBackground.beginFill(0x000000, 0.25);
        drawPileBackground.drawRoundedRect(616, 330, 80, 110, 6);
        drawPileBackground.endFill();
        gameContainer.addChild(drawPileBackground);

        // Add discard pile label
        const discardPileLabel = new PIXI.Text("Discard", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        discardPileLabel.anchor.set(0.5);
        discardPileLabel.x = 556;
        discardPileLabel.y = 305;
        gameContainer.addChild(discardPileLabel);

        // Add draw pile label
        const drawPileLabel = new PIXI.Text("Tavern", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        drawPileLabel.anchor.set(0.5);
        drawPileLabel.x = 656;
        drawPileLabel.y = 305;
        gameContainer.addChild(drawPileLabel);

        // Add jokers zone to mattress
        const jokersZone = new PIXI.Graphics();
        jokersZone.beginFill(0x000000, 0.25);
        jokersZone.drawRoundedRect(526, 32, 190, 150, 8);
        jokersZone.endFill();
        gameContainer.addChild(jokersZone);

        // Add jokers labels
        const jokersLabel = new PIXI.Text("Jesters", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        jokersLabel.anchor.set(0.5);
        jokersLabel.x = 621;
        jokersLabel.y = 47;
        gameContainer.addChild(jokersLabel);

        // Add castle zone to mattress
        const castleZone = new PIXI.Graphics();
        castleZone.beginFill(0x000000, 0.25);
        castleZone.drawRoundedRect(210, 32, 100, 150, 8);
        castleZone.endFill();
        gameContainer.addChild(castleZone);

        // Add royal attack label
        const royalAttackLabel = new PIXI.Text("Attack", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 32,
            fill: 0xFFFFFF,
            align: 'center'
        });
        royalAttackLabel.anchor.set(0.5);
        royalAttackLabel.x = 385;
        royalAttackLabel.y = 57;
        gameContainer.addChild(royalAttackLabel);

        // Add royal health label
        const royalHealthLabel = new PIXI.Text("Health", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 32,
            fill: 0xFFFFFF,
            align: 'center'
        });
        royalHealthLabel.anchor.set(0.5);
        royalHealthLabel.x = 135;
        royalHealthLabel.y = 57;
        gameContainer.addChild(royalHealthLabel);

    }
}
