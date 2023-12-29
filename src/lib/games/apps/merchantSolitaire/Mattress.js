import * as PIXI from "pixi.js";

import zones from './storeItemsZones.json';
import items from './storeItems.json';
import { Sticker } from "./Sticker";

export class Mattress {
    constructor(mattressContainer, gameContainer) {
        this.highlightColor = 0x0000FF;
        this.positions = zones.positions;

        // Customer Offer
        this.customerOffer = new PIXI.Text("CUSTOMER", {
            fontFamily: 'Impact',
            fontWeight: 'bold',
            fontSize: 20,
            letterSpacing: 1,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.customerOffer.anchor.set(0.5);
        this.customerOffer.x = 288;
        this.customerOffer.y = 85;
        mattressContainer.addChild(this.customerOffer);

        // Merchant Offer
        this.merchantOffer = new PIXI.Text("MERCHANT", {
            fontFamily: 'Impact',
            fontWeight: 'bold',
            fontSize: 20,
            letterSpacing: 1,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.merchantOffer.anchor.set(0.5);
        this.merchantOffer.x = 431;
        this.merchantOffer.y = 85;
        mattressContainer.addChild(this.merchantOffer);

        // Satisfied Customers Zone
        this.satisfiedCustomersZone = new PIXI.Graphics();
        this.satisfiedCustomersZone.beginFill(0x000000, 0.25);
        this.satisfiedCustomersZone.drawRoundedRect(40, 135, 120, 170, 8);
        this.satisfiedCustomersZone.endFill();
        mattressContainer.addChild(this.satisfiedCustomersZone);

        // Satisfied Customers BG
        this.satisfiedCustomersBG = new PIXI.Graphics();
        this.satisfiedCustomersBG.beginFill(0x000000, 0.25);
        this.satisfiedCustomersBG.drawRoundedRect(60, 175, 80, 110, 8);
        this.satisfiedCustomersBG.endFill();
        mattressContainer.addChild(this.satisfiedCustomersBG);

        // Satisfied Customers Label
        this.satisfiedCustomersLabel = new PIXI.Text("Satisfied", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.satisfiedCustomersLabel.anchor.set(0.5);
        this.satisfiedCustomersLabel.x = 100;
        this.satisfiedCustomersLabel.y = 155;
        mattressContainer.addChild(this.satisfiedCustomersLabel);

        // Customers Zone
        this.customersZone = new PIXI.Graphics();
        this.customersZone.beginFill(0x000000, 0.25);
        this.customersZone.drawRoundedRect(228, 135, 120, 170, 8);
        this.customersZone.endFill();
        mattressContainer.addChild(this.customersZone);

        // Customers Label
        this.customersLabel = new PIXI.Text("Queue", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.customersLabel.anchor.set(0.5);
        this.customersLabel.x = 288;
        this.customersLabel.y = 155;
        mattressContainer.addChild(this.customersLabel);

        // Items Zone
        this.itemsZone = new PIXI.Graphics();
        this.itemsZone.beginFill(0x000000, 0.25);
        this.itemsZone.drawRoundedRect(371, 135, 120, 170, 8);
        this.itemsZone.endFill();
        mattressContainer.addChild(this.itemsZone);

        // Items Label
        this.itemsLabel = new PIXI.Text("Items", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.itemsLabel.anchor.set(0.5);
        this.itemsLabel.x = 431;
        this.itemsLabel.y = 155;
        mattressContainer.addChild(this.itemsLabel);

        // Traded Items Zone
        this.tradedItemsZone = new PIXI.Graphics();
        this.tradedItemsZone.beginFill(0x000000, 0.25);
        this.tradedItemsZone.drawRoundedRect(559, 135, 120, 170, 8);
        this.tradedItemsZone.endFill();
        mattressContainer.addChild(this.tradedItemsZone);

        // Traded Items BG
        this.tradedItemsBG = new PIXI.Graphics();
        this.tradedItemsBG.beginFill(0x000000, 0.25);
        this.tradedItemsBG.drawRoundedRect(579, 175, 80, 110, 8);
        this.tradedItemsBG.endFill();
        mattressContainer.addChild(this.tradedItemsBG);

        // Traded Items Label
        this.tradedItemsLabel = new PIXI.Text("Traded", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 20,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.tradedItemsLabel.anchor.set(0.5);
        this.tradedItemsLabel.x = 619;
        this.tradedItemsLabel.y = 155;
        mattressContainer.addChild(this.tradedItemsLabel);

        // Store Items Zones
        this.storeItemsZones = [];
        for (let i = 0; i < 10; i++) {
            this.storeItemsZones[i] = new PIXI.Graphics();
            this.storeItemsZones[i].beginFill(0xFFFFFF);
            this.storeItemsZones[i].drawRoundedRect(this.positions[i].x, this.positions[i].y, 120, 150, 8);
            this.storeItemsZones[i].endFill();
            this.storeItemsZones[i].tint = 0x000000;
            this.storeItemsZones[i].alpha = 0.25;
            mattressContainer.addChild(this.storeItemsZones[i]);
        }

        // Store Items Stickers
        this.storeItemsStickers = [];
        for (let i = 0; i < 10; i++) {
            this.storeItemsStickers[i] = new Sticker(gameContainer, items.positions[i]);
        }
    }

    setHighlighted(i, onSale) {
        if (onSale) {
            this.storeItemsZones[i].tint = 0xc026d3;
            this.storeItemsZones[i].alpha = 0.6;
            this.storeItemsStickers[i].setVisible(true);
        } else {
            this.storeItemsZones[i].tint = 0x0d47a1;
            this.storeItemsZones[i].alpha = 0.6;
            this.storeItemsStickers[i].setVisible(false);
        }
    }

    clearHighlight(i) {
        this.storeItemsZones[i].tint = 0x000000;
        this.storeItemsZones[i].alpha = 0.25;
        this.storeItemsStickers[i].setVisible(false);
    }
}
