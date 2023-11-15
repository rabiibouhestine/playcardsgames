import * as PIXI from "pixi.js";
import { App } from "../utils/App";
import { Layout } from "./Layout";
import cardsSpritesheetImage from '$lib/games/assets/images/cardsSpritesheet.png';
import cardsSpritesheetAtlas from '$lib/games/assets/json/cardsSpritesheet.json';

import { Card } from '$lib/games/utils/Engine';

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
        const card = new Card(this.app, this.sheet, "KH", {x: 350, y: 350});

        // Add button
        const castleZone = new PIXI.Graphics();
        castleZone.beginFill(0x000000, 0.25);
        castleZone.drawRoundedRect(260, 508, 200, 50, 8);
        castleZone.endFill();
        this.app.stage.addChild(castleZone);
        castleZone.eventMode = 'static';
        castleZone.cursor = 'pointer';
        castleZone.on('pointerdown', () => {
            card.moveTo(
                Math.floor(Math.random() * (600 - 50 + 1)) + 50,
                Math.floor(Math.random() * (600 - 50 + 1)) + 50,
                true
            )
        });
    }
}