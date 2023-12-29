import * as PIXI from "pixi.js";

export class Mattress {
    constructor(mattressContainer) {
        this.hoveredLocation = null;
        this.highlightColor = 0x0000FF;

        // Left Monsters Zone
        this.leftMonstersZone = new PIXI.Graphics();
        this.leftMonstersZone.beginFill(0x000000, 0.25);
        this.leftMonstersZone.drawRoundedRect(200, 80, 100, 229, 8);
        this.leftMonstersZone.endFill();
        mattressContainer.addChild(this.leftMonstersZone);

        // Center Monsters Zone
        this.centerMonstersZone = new PIXI.Graphics();
        this.centerMonstersZone.beginFill(0x000000, 0.25);
        this.centerMonstersZone.drawRoundedRect(310, 80, 100, 229, 8);
        this.centerMonstersZone.endFill();
        mattressContainer.addChild(this.centerMonstersZone);

        // Right Monsters Zone
        this.rightMonstersZone = new PIXI.Graphics();
        this.rightMonstersZone.beginFill(0x000000, 0.25);
        this.rightMonstersZone.drawRoundedRect(420, 81, 100, 229, 8);
        this.rightMonstersZone.endFill();
        mattressContainer.addChild(this.rightMonstersZone);

        // Left Attack Zone
        this.leftAttackZone = new PIXI.Graphics();
        this.leftAttackZone.beginFill(0x000000, 0.25);
        this.leftAttackZone.drawRoundedRect(200, 319, 100, 196, 8);
        this.leftAttackZone.endFill();
        mattressContainer.addChild(this.leftAttackZone);

        // Left Attack Zone Highlight
        this.leftAttackZoneHighlight = new PIXI.Graphics();
        this.leftAttackZoneHighlight.beginFill(this.highlightColor);
        this.leftAttackZoneHighlight.drawRoundedRect(200, 319, 100, 196, 8);
        this.leftAttackZoneHighlight.endFill();
        this.leftAttackZoneHighlight.alpha = 0;
        mattressContainer.addChild(this.leftAttackZoneHighlight);

        // Center Attack Zone
        this.centerAttackZone = new PIXI.Graphics();
        this.centerAttackZone.beginFill(0x000000, 0.25);
        this.centerAttackZone.drawRoundedRect(310, 319, 100, 196, 8);
        this.centerAttackZone.endFill();
        mattressContainer.addChild(this.centerAttackZone);

        // Center Attack Zone Highlight
        this.centerAttackZoneHighlight = new PIXI.Graphics();
        this.centerAttackZoneHighlight.beginFill(this.highlightColor);
        this.centerAttackZoneHighlight.drawRoundedRect(310, 319, 100, 196, 8);
        this.centerAttackZoneHighlight.endFill();
        this.centerAttackZoneHighlight.alpha = 0;
        mattressContainer.addChild(this.centerAttackZoneHighlight);

        // Right Attack Zone
        this.rightAttackZone = new PIXI.Graphics();
        this.rightAttackZone.beginFill(0x000000, 0.25);
        this.rightAttackZone.drawRoundedRect(420, 319, 100, 196, 8);
        this.rightAttackZone.endFill();
        mattressContainer.addChild(this.rightAttackZone);

        // Right Attack Zone Highlight
        this.rightAttackZoneHighlight = new PIXI.Graphics();
        this.rightAttackZoneHighlight.beginFill(this.highlightColor);
        this.rightAttackZoneHighlight.drawRoundedRect(420, 319, 100, 196, 8);
        this.rightAttackZoneHighlight.endFill();
        this.rightAttackZoneHighlight.alpha = 0;
        mattressContainer.addChild(this.rightAttackZoneHighlight);

        // Monster Discard Zone
        this.monsterDiscardZone = new PIXI.Graphics();
        this.monsterDiscardZone.beginFill(0x000000, 0.25);
        this.monsterDiscardZone.drawRoundedRect(560, 320, 120, 170, 8);
        this.monsterDiscardZone.endFill();
        mattressContainer.addChild(this.monsterDiscardZone);

        // Monster Discard Zone Background
        this.monsterDiscardZoneBg = new PIXI.Graphics();
        this.monsterDiscardZoneBg.beginFill(0x000000, 0.25);
        this.monsterDiscardZoneBg.drawRoundedRect(580, 360, 80, 110, 6);
        this.monsterDiscardZoneBg.endFill();
        mattressContainer.addChild(this.monsterDiscardZoneBg);

        // Monsters Discard Label
        this.monstersDiscardLabel = new PIXI.Text("Defeated", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.monstersDiscardLabel.anchor.set(0.5);
        this.monstersDiscardLabel.x = 620;
        this.monstersDiscardLabel.y = 340;
        mattressContainer.addChild(this.monstersDiscardLabel);

        // Attack Discard Zone
        this.attackDiscardZone = new PIXI.Graphics();
        this.attackDiscardZone.beginFill(0x000000, 0.25);
        this.attackDiscardZone.drawRoundedRect(40, 319, 120, 170, 8);
        this.attackDiscardZone.endFill();
        mattressContainer.addChild(this.attackDiscardZone);

        // Attack Discard Zone Background
        this.attackDiscardZoneBg = new PIXI.Graphics();
        this.attackDiscardZoneBg.beginFill(0x000000, 0.25);
        this.attackDiscardZoneBg.drawRoundedRect(60, 359, 80, 110, 6);
        this.attackDiscardZoneBg.endFill();
        mattressContainer.addChild(this.attackDiscardZoneBg);

        // Attack Discard Label
        this.attackDiscardLabel = new PIXI.Text("Discarded", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.attackDiscardLabel.anchor.set(0.5);
        this.attackDiscardLabel.x = 100;
        this.attackDiscardLabel.y = 339;
        mattressContainer.addChild(this.attackDiscardLabel);

        // Draw Pile Zone
        this.drawPileZone = new PIXI.Graphics();
        this.drawPileZone.beginFill(0x000000, 0.25);
        this.drawPileZone.drawRoundedRect(40, 542, 120, 170, 8);
        this.drawPileZone.endFill();
        mattressContainer.addChild(this.drawPileZone);

        // Draw Pile Zone Background
        this.drawPileZoneBg = new PIXI.Graphics();
        this.drawPileZoneBg.beginFill(0x000000, 0.25);
        this.drawPileZoneBg.drawRoundedRect(60, 582, 80, 110, 6);
        this.drawPileZoneBg.endFill();
        mattressContainer.addChild(this.drawPileZoneBg);

        // Draw Pile Label
        this.drawPileLabel = new PIXI.Text("Draw Pile", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.drawPileLabel.anchor.set(0.5);
        this.drawPileLabel.x = 100;
        this.drawPileLabel.y = 562;
        mattressContainer.addChild(this.drawPileLabel);

        // Hand Zone
        this.handZone = new PIXI.Graphics();
        this.handZone.beginFill(0x000000, 0.25);
        this.handZone.drawRoundedRect(210, 495, 300, 140, 8);
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

        // Reserve Label
        this.reserveLabel = new PIXI.Text("Reserve", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.reserveLabel.anchor.set(0.5);
        this.reserveLabel.x = 653;
        this.reserveLabel.y = 637;
        mattressContainer.addChild(this.reserveLabel);
    }

    setHighlighted(isHighlighted) {
        const alpha = 0.15;
        this.leftAttackZoneHighlight.alpha = isHighlighted ? alpha : 0;
        this.centerAttackZoneHighlight.alpha = isHighlighted ? alpha : 0;
        this.rightAttackZoneHighlight.alpha = isHighlighted ? alpha : 0;
        this.reserveZoneHighlight.alpha = isHighlighted ? alpha : 0;
    }
}
