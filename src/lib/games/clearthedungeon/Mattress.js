import * as PIXI from "pixi.js";

export class Mattress {
    constructor(gameContainer) {

        // Left Monsters Zone
        const leftMonstersZone = new PIXI.Graphics();
        leftMonstersZone.beginFill(0x000000, 0.25);
        leftMonstersZone.drawRoundedRect(159, 15, 110, 220, 8);
        leftMonstersZone.endFill();
        gameContainer.addChild(leftMonstersZone);

        // Center Monsters Zone
        const centerMonstersZone = new PIXI.Graphics();
        centerMonstersZone.beginFill(0x000000, 0.25);
        centerMonstersZone.drawRoundedRect(305, 15, 110, 220, 8);
        centerMonstersZone.endFill();
        gameContainer.addChild(centerMonstersZone);

        // Right Monsters Zone
        const rightMonstersZone = new PIXI.Graphics();
        rightMonstersZone.beginFill(0x000000, 0.25);
        rightMonstersZone.drawRoundedRect(451, 15, 110, 220, 8);
        rightMonstersZone.endFill();
        gameContainer.addChild(rightMonstersZone);

        // Left Attack Zone
        const leftAttackZone = new PIXI.Graphics();
        leftAttackZone.beginFill(0x000000, 0.25);
        leftAttackZone.drawRoundedRect(159, 252, 110, 194, 8);
        leftAttackZone.endFill();
        gameContainer.addChild(leftAttackZone);

        // Center Attack Zone
        const centerAttackZone = new PIXI.Graphics();
        centerAttackZone.beginFill(0x000000, 0.25);
        centerAttackZone.drawRoundedRect(305, 252, 110, 194, 8);
        centerAttackZone.endFill();
        gameContainer.addChild(centerAttackZone);

        // Right Attack Zone
        const rightAttackZone = new PIXI.Graphics();
        rightAttackZone.beginFill(0x000000, 0.25);
        rightAttackZone.drawRoundedRect(451, 252, 110, 194, 8);
        rightAttackZone.endFill();
        gameContainer.addChild(rightAttackZone);

        // Monster Discard Zone
        const monsterDiscardZone = new PIXI.Graphics();
        monsterDiscardZone.beginFill(0x000000, 0.25);
        monsterDiscardZone.drawRoundedRect(597, 77, 110, 140, 8);
        monsterDiscardZone.endFill();
        gameContainer.addChild(monsterDiscardZone);

        // Monster Discard Zone Background
        const monsterDiscardZoneBg = new PIXI.Graphics();
        monsterDiscardZoneBg.beginFill(0x000000, 0.25);
        monsterDiscardZoneBg.drawRoundedRect(612, 92, 80, 110, 6);
        monsterDiscardZoneBg.endFill();
        gameContainer.addChild(monsterDiscardZoneBg);

        // Attack Discard Zone
        const attackDiscardZone = new PIXI.Graphics();
        attackDiscardZone.beginFill(0x000000, 0.25);
        attackDiscardZone.drawRoundedRect(597, 257, 110, 140, 8);
        attackDiscardZone.endFill();
        gameContainer.addChild(attackDiscardZone);

        // Attack Discard Zone Background
        const attackDiscardZoneBg = new PIXI.Graphics();
        attackDiscardZoneBg.beginFill(0x000000, 0.25);
        attackDiscardZoneBg.drawRoundedRect(612, 272, 80, 110, 6);
        attackDiscardZoneBg.endFill();
        gameContainer.addChild(attackDiscardZoneBg);

        // Draw Pile Zone
        const drawPileZone = new PIXI.Graphics();
        drawPileZone.beginFill(0x000000, 0.25);
        drawPileZone.drawRoundedRect(12, 495, 110, 160, 8);
        drawPileZone.endFill();
        gameContainer.addChild(drawPileZone);

        // Draw Pile Zone Background
        const drawPileZoneBg = new PIXI.Graphics();
        drawPileZoneBg.beginFill(0x000000, 0.25);
        drawPileZoneBg.drawRoundedRect(27, 510, 80, 110, 6);
        drawPileZoneBg.endFill();
        gameContainer.addChild(drawPileZoneBg);

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

        // Reserve Zone Background
        const reserveZoneBg = new PIXI.Graphics();
        reserveZoneBg.beginFill(0x000000, 0.25);
        reserveZoneBg.drawRoundedRect(613, 510, 80, 110, 6);
        reserveZoneBg.endFill();
        gameContainer.addChild(reserveZoneBg);
    }
}
