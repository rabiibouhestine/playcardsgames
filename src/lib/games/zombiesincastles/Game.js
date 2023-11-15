import * as PIXI from "pixi.js";
import { App } from "../utils/App";
import { Layout } from "./Layout";
import cardsSpritesheetImage from '$lib/games/assets/images/cardsSpritesheet.png';
import cardsSpritesheetAtlas from '$lib/games/assets/json/cardsSpritesheet.json';

import { Card } from '$lib/games/utils/Card';
import { Cards } from '$lib/games/utils/Cards';

export class Game extends App {
    constructor(canvasRef) {
        super(canvasRef, 0x7d80ca);
        this.init();
    }

    async init() {
        this.sheet = new PIXI.Spritesheet(
            PIXI.BaseTexture.from(cardsSpritesheetImage),
            cardsSpritesheetAtlas
        );
        await this.sheet.parse();

        this.layout = new Layout(this.app);
        const card = new Card(this.app, this.sheet, "KH", "B1", {x: 350, y: 100}, true, true, false);
        const pile = new Cards(this.app, this.sheet, {
            type: 'pile',
            faceNames: ["AH", "2S", "5C"],
            backName: "B1",
            position: {x: 600, y: 350},
            faceUp: false
        });
        const stack1 = new Cards(this.app, this.sheet, {
            type: 'tableau',
            faceNames: ["AD", "2D", "5S"],
            backName: "B1",
            position: {x: 200, y: 250},
            faceUp: true,
            gap: 10
        });
        const stack2 = new Cards(this.app, this.sheet, {
            type: 'tableau',
            faceNames: ["KD", "9H", "2C"],
            backName: "B1",
            position: {x: 200, y: 400},
            faceUp: true,
            gap: 10
        });

        // Add button
        const castleZone = new PIXI.Graphics();
        castleZone.beginFill(0x000000, 0.25);
        castleZone.drawRoundedRect(260, 508, 200, 50, 8);
        castleZone.endFill();
        this.app.stage.addChild(castleZone);
        castleZone.eventMode = 'static';
        castleZone.cursor = 'pointer';
        castleZone.on('pointerdown', () => {
            // card.flip(!card.faceUp);
            // card.moveTo(
            //     Math.floor(Math.random() * (600 - 50 + 1)) + 50,
            //     Math.floor(Math.random() * (600 - 50 + 1)) + 50,
            //     false
            // )
            const movedCards = stack1.removeCards(2, 'top');
            stack2.addCards(movedCards, 'top');
            const movedCards2 = stack2.removeCards(1, 'top');
            movedCards2[0].moveTo(
                500,
                350,
                false
            );
        });
    }
}