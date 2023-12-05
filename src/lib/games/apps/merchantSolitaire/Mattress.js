import * as PIXI from "pixi.js";

const positions = [
    {
        x: 30,
        y: 304
    },
    {
        x: 165,
        y: 304
    },
    {
        x: 300,
        y: 304
    },
    {
        x: 435,
        y: 304
    },
    {
        x: 570,
        y: 304
    },
    {
        x: 30,
        y: 465
    },
    {
        x: 165,
        y: 465
    },
    {
        x: 300,
        y: 465
    },
    {
        x: 435,
        y: 465
    },
    {
        x: 570,
        y: 465
    }
]

export class Mattress {
    constructor(mattressContainer) {
        this.highlightColor = 0x0000FF;

        // Customer Offer
        this.customerOffer = new PIXI.Text("Customer Offer", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.customerOffer.anchor.set(0.5);
        this.customerOffer.x = 285;
        this.customerOffer.y = 24;
        mattressContainer.addChild(this.customerOffer);

        // Merchant Offer
        this.merchantOffer = new PIXI.Text("Merchant Offer", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.merchantOffer.anchor.set(0.5);
        this.merchantOffer.x = 435;
        this.merchantOffer.y = 24;
        mattressContainer.addChild(this.merchantOffer);

        // Satisfied Customers Zone
        this.satisfiedCustomersZone = new PIXI.Graphics();
        this.satisfiedCustomersZone.beginFill(0x000000, 0.25);
        this.satisfiedCustomersZone.drawRoundedRect(30, 90, 120, 180, 8);
        this.satisfiedCustomersZone.endFill();
        mattressContainer.addChild(this.satisfiedCustomersZone);

        // Satisfied Customers Label
        this.satisfiedCustomersLabel = new PIXI.Text("Satisfied Customers", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 80
        });
        this.satisfiedCustomersLabel.anchor.set(0.5);
        this.satisfiedCustomersLabel.x = 90;
        this.satisfiedCustomersLabel.y = 115;
        mattressContainer.addChild(this.satisfiedCustomersLabel);

        // Customers Zone
        this.customersZone = new PIXI.Graphics();
        this.customersZone.beginFill(0x000000, 0.25);
        this.customersZone.drawRoundedRect(228, 100, 120, 170, 8);
        this.customersZone.endFill();
        mattressContainer.addChild(this.customersZone);

        // Customers Label
        this.customersLabel = new PIXI.Text("Customers", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.customersLabel.anchor.set(0.5);
        this.customersLabel.x = 288;
        this.customersLabel.y = 120;
        mattressContainer.addChild(this.customersLabel);

        // Items Zone
        this.itemsZone = new PIXI.Graphics();
        this.itemsZone.beginFill(0x000000, 0.25);
        this.itemsZone.drawRoundedRect(371, 100, 120, 170, 8);
        this.itemsZone.endFill();
        mattressContainer.addChild(this.itemsZone);

        // Items Label
        this.itemsLabel = new PIXI.Text("Items", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.itemsLabel.anchor.set(0.5);
        this.itemsLabel.x = 431;
        this.itemsLabel.y = 120;
        mattressContainer.addChild(this.itemsLabel);

        // Traded Items Zone
        this.tradedItemsZone = new PIXI.Graphics();
        this.tradedItemsZone.beginFill(0x000000, 0.25);
        this.tradedItemsZone.drawRoundedRect(570, 90, 120, 180, 8);
        this.tradedItemsZone.endFill();
        mattressContainer.addChild(this.tradedItemsZone);

        // Traded Items Label
        this.tradedItemsLabel = new PIXI.Text("Traded Items", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 16,
            fill: 0xFFFFFF,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 80
        });
        this.tradedItemsLabel.anchor.set(0.5);
        this.tradedItemsLabel.x = 630;
        this.tradedItemsLabel.y = 115;
        mattressContainer.addChild(this.tradedItemsLabel);

        // Store Items Zones
        this.storeItemsZones = [];
        for (let i = 0; i < 10; i++) {
            this.storeItemsZones[i] = new PIXI.Graphics();
            this.storeItemsZones[i].beginFill(0x000000, 0.25);
            this.storeItemsZones[i].drawRoundedRect(positions[i].x, positions[i].y, 120, 150, 8);
            this.storeItemsZones[i].endFill();
            mattressContainer.addChild(this.storeItemsZones[i]);
        }

        // Store Items Zones Highlights
        this.storeItemsZonesHighlights = [];
        for (let i = 0; i < 10; i++) {
            this.storeItemsZonesHighlights[i] = new PIXI.Graphics();
            this.storeItemsZonesHighlights[i].beginFill(0x0000FF);
            this.storeItemsZonesHighlights[i].drawRoundedRect(positions[i].x, positions[i].y, 120, 150, 8);
            this.storeItemsZonesHighlights[i].endFill();
            this.storeItemsZonesHighlights[i].alpha = 0;
            mattressContainer.addChild(this.storeItemsZonesHighlights[i]);
        }
    }

    setHighlighted(isHighlighted) {
        const alpha = 0.15;
        this.leftAttackZoneHighlight.alpha = isHighlighted ? alpha : 0;
        this.centerAttackZoneHighlight.alpha = isHighlighted ? alpha : 0;
        this.rightAttackZoneHighlight.alpha = isHighlighted ? alpha : 0;
        this.reserveZoneHighlight.alpha = isHighlighted ? alpha : 0;
    }
}
