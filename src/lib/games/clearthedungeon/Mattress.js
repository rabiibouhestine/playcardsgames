import * as PIXI from "pixi.js";

export class Mattress {
    constructor(gameContainer) {

        // Left Monsters Zone
        const leftMonstersZone = new PIXI.Graphics();
        leftMonstersZone.beginFill(0x000000, 0.25);
        leftMonstersZone.drawRoundedRect(159, 37, 110, 140, 8);
        leftMonstersZone.endFill();
        gameContainer.addChild(leftMonstersZone);

        // Center Monsters Zone
        const centerMonstersZone = new PIXI.Graphics();
        centerMonstersZone.beginFill(0x000000, 0.25);
        centerMonstersZone.drawRoundedRect(305, 37, 110, 140, 8);
        centerMonstersZone.endFill();
        gameContainer.addChild(centerMonstersZone);

        // Right Monsters Zone
        const rightMonstersZone = new PIXI.Graphics();
        rightMonstersZone.beginFill(0x000000, 0.25);
        rightMonstersZone.drawRoundedRect(451, 37, 110, 140, 8);
        rightMonstersZone.endFill();
        gameContainer.addChild(rightMonstersZone);

        // Left Attack Zone
        const leftAttackZone = new PIXI.Graphics();
        leftAttackZone.beginFill(0x000000, 0.25);
        leftAttackZone.drawRoundedRect(159, 203, 110, 194, 8);
        leftAttackZone.endFill();
        gameContainer.addChild(leftAttackZone);

        // Center Attack Zone
        const centerAttackZone = new PIXI.Graphics();
        centerAttackZone.beginFill(0x000000, 0.25);
        centerAttackZone.drawRoundedRect(305, 204, 110, 194, 8);
        centerAttackZone.endFill();
        gameContainer.addChild(centerAttackZone);

        // Right Attack Zone
        const rightAttackZone = new PIXI.Graphics();
        rightAttackZone.beginFill(0x000000, 0.25);
        rightAttackZone.drawRoundedRect(451, 204, 110, 194, 8);
        rightAttackZone.endFill();
        gameContainer.addChild(rightAttackZone);

        // Monster Discard Zone
        const monsterDiscardZone = new PIXI.Graphics();
        monsterDiscardZone.beginFill(0x000000, 0.25);
        monsterDiscardZone.drawRoundedRect(597, 77, 110, 140, 8);
        monsterDiscardZone.endFill();
        gameContainer.addChild(monsterDiscardZone);

        // Attack Discard Zone
        const attackDiscardZone = new PIXI.Graphics();
        attackDiscardZone.beginFill(0x000000, 0.25);
        attackDiscardZone.drawRoundedRect(597, 257, 110, 140, 8);
        attackDiscardZone.endFill();
        gameContainer.addChild(attackDiscardZone);

        // Draw Pile Zone
        const drawPileZone = new PIXI.Graphics();
        drawPileZone.beginFill(0x000000, 0.25);
        drawPileZone.drawRoundedRect(32, 495, 110, 160, 8);
        drawPileZone.endFill();
        gameContainer.addChild(drawPileZone);

        // Hand Zone
        const handZone = new PIXI.Graphics();
        handZone.beginFill(0x000000, 0.25);
        handZone.drawRoundedRect(210, 495, 300, 160, 8);
        handZone.endFill();
        gameContainer.addChild(handZone);

        // Reserve Zone
        const reserveZone = new PIXI.Graphics();
        reserveZone.beginFill(0x000000, 0.25);
        reserveZone.drawRoundedRect(598, 495, 110, 160, 8);
        reserveZone.endFill();
        gameContainer.addChild(reserveZone);
    }
}
