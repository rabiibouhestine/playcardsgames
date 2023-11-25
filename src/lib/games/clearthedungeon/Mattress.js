import * as PIXI from "pixi.js";

export class Mattress {
    constructor(mattressContainer) {
        this.hoveredLocation = null;
        this.highlightColor = 0x0000FF;

        // Left Monsters Zone
        this.leftMonstersZone = new PIXI.Graphics();
        this.leftMonstersZone.beginFill(0x000000, 0.25);
        this.leftMonstersZone.drawRoundedRect(159, 15, 110, 220, 8);
        this.leftMonstersZone.endFill();
        mattressContainer.addChild(this.leftMonstersZone);

        // Center Monsters Zone
        this.centerMonstersZone = new PIXI.Graphics();
        this.centerMonstersZone.beginFill(0x000000, 0.25);
        this.centerMonstersZone.drawRoundedRect(305, 15, 110, 220, 8);
        this.centerMonstersZone.endFill();
        mattressContainer.addChild(this.centerMonstersZone);

        // Right Monsters Zone
        this.rightMonstersZone = new PIXI.Graphics();
        this.rightMonstersZone.beginFill(0x000000, 0.25);
        this.rightMonstersZone.drawRoundedRect(451, 15, 110, 220, 8);
        this.rightMonstersZone.endFill();
        mattressContainer.addChild(this.rightMonstersZone);

        // Left Attack Zone
        this.leftAttackZone = new PIXI.Graphics();
        this.leftAttackZone.beginFill(0x000000, 0.25);
        this.leftAttackZone.drawRoundedRect(159, 252, 110, 194, 8);
        this.leftAttackZone.endFill();
        mattressContainer.addChild(this.leftAttackZone);

        // Left Attack Zone Highlight
        this.leftAttackZoneHighlight = new PIXI.Graphics();
        this.leftAttackZoneHighlight.beginFill(this.highlightColor);
        this.leftAttackZoneHighlight.drawRoundedRect(159, 252, 110, 194, 8);
        this.leftAttackZoneHighlight.endFill();
        this.leftAttackZoneHighlight.alpha = 0;
        mattressContainer.addChild(this.leftAttackZoneHighlight);

        // Center Attack Zone
        this.centerAttackZone = new PIXI.Graphics();
        this.centerAttackZone.beginFill(0x000000, 0.25);
        this.centerAttackZone.drawRoundedRect(305, 252, 110, 194, 8);
        this.centerAttackZone.endFill();
        mattressContainer.addChild(this.centerAttackZone);

        // Center Attack Zone Highlight
        this.centerAttackZoneHighlight = new PIXI.Graphics();
        this.centerAttackZoneHighlight.beginFill(this.highlightColor);
        this.centerAttackZoneHighlight.drawRoundedRect(305, 252, 110, 194, 8);
        this.centerAttackZoneHighlight.endFill();
        this.centerAttackZoneHighlight.alpha = 0;
        mattressContainer.addChild(this.centerAttackZoneHighlight);

        // Right Attack Zone
        this.rightAttackZone = new PIXI.Graphics();
        this.rightAttackZone.beginFill(0x000000, 0.25);
        this.rightAttackZone.drawRoundedRect(451, 252, 110, 194, 8);
        this.rightAttackZone.endFill();
        mattressContainer.addChild(this.rightAttackZone);

        // Right Attack Zone Highlight
        this.rightAttackZoneHighlight = new PIXI.Graphics();
        this.rightAttackZoneHighlight.beginFill(this.highlightColor);
        this.rightAttackZoneHighlight.drawRoundedRect(451, 252, 110, 194, 8);
        this.rightAttackZoneHighlight.endFill();
        this.rightAttackZoneHighlight.alpha = 0;
        mattressContainer.addChild(this.rightAttackZoneHighlight);

        // Monster Discard Zone
        this.monsterDiscardZone = new PIXI.Graphics();
        this.monsterDiscardZone.beginFill(0x000000, 0.25);
        this.monsterDiscardZone.drawRoundedRect(597, 77, 110, 140, 8);
        this.monsterDiscardZone.endFill();
        mattressContainer.addChild(this.monsterDiscardZone);

        // Monster Discard Zone Background
        this.monsterDiscardZoneBg = new PIXI.Graphics();
        this.monsterDiscardZoneBg.beginFill(0x000000, 0.25);
        this.monsterDiscardZoneBg.drawRoundedRect(612, 92, 80, 110, 6);
        this.monsterDiscardZoneBg.endFill();
        mattressContainer.addChild(this.monsterDiscardZoneBg);

        // Attack Discard Zone
        this.attackDiscardZone = new PIXI.Graphics();
        this.attackDiscardZone.beginFill(0x000000, 0.25);
        this.attackDiscardZone.drawRoundedRect(597, 257, 110, 140, 8);
        this.attackDiscardZone.endFill();
        mattressContainer.addChild(this.attackDiscardZone);

        // Attack Discard Zone Background
        this.attackDiscardZoneBg = new PIXI.Graphics();
        this.attackDiscardZoneBg.beginFill(0x000000, 0.25);
        this.attackDiscardZoneBg.drawRoundedRect(612, 272, 80, 110, 6);
        this.attackDiscardZoneBg.endFill();
        mattressContainer.addChild(this.attackDiscardZoneBg);

        // Draw Pile Zone
        this.drawPileZone = new PIXI.Graphics();
        this.drawPileZone.beginFill(0x000000, 0.25);
        this.drawPileZone.drawRoundedRect(12, 495, 110, 160, 8);
        this.drawPileZone.endFill();
        mattressContainer.addChild(this.drawPileZone);

        // Draw Pile Zone Background
        this.drawPileZoneBg = new PIXI.Graphics();
        this.drawPileZoneBg.beginFill(0x000000, 0.25);
        this.drawPileZoneBg.drawRoundedRect(27, 510, 80, 110, 6);
        this.drawPileZoneBg.endFill();
        mattressContainer.addChild(this.drawPileZoneBg);

        // Hand Zone
        this.handZone = new PIXI.Graphics();
        this.handZone.beginFill(0x000000, 0.25);
        this.handZone.drawRoundedRect(210, 495, 300, 160, 8);
        this.handZone.endFill();
        mattressContainer.addChild(this.handZone);

        // Reserve Zone
        this.reserveZone = new PIXI.Graphics();
        this.reserveZone.beginFill(0x000000, 0.25);
        this.reserveZone.drawRoundedRect(598, 495, 110, 160, 8);
        this.reserveZone.endFill();
        mattressContainer.addChild(this.reserveZone);

        // Reserve Zone Highlight
        this.reserveZoneHighlight = new PIXI.Graphics();
        this.reserveZoneHighlight.beginFill(this.highlightColor);
        this.reserveZoneHighlight.drawRoundedRect(598, 495, 110, 160, 8);
        this.reserveZoneHighlight.endFill();
        this.reserveZoneHighlight.alpha = 0;
        mattressContainer.addChild(this.reserveZoneHighlight);

        // Reserve Zone Background
        this.reserveZoneBg = new PIXI.Graphics();
        this.reserveZoneBg.beginFill(0x000000, 0.25);
        this.reserveZoneBg.drawRoundedRect(613, 510, 80, 110, 6);
        this.reserveZoneBg.endFill();
        mattressContainer.addChild(this.reserveZoneBg);
    }

    setHighlighted(isHighlighted) {
        const alpha = 0.15;
        this.leftAttackZoneHighlight.alpha = isHighlighted ? alpha : 0;
        this.centerAttackZoneHighlight.alpha = isHighlighted ? alpha : 0;
        this.rightAttackZoneHighlight.alpha = isHighlighted ? alpha : 0;
        this.reserveZoneHighlight.alpha = isHighlighted ? alpha : 0;
    }
}
