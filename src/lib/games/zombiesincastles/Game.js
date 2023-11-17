import * as PIXI from "pixi.js";

import cardsSpritesheetImage from '$lib/games/assets/images/cardsSpritesheet.png';
import cardsSpritesheetAtlas from '$lib/games/assets/json/cardsSpritesheet.json';

import { App } from '$lib/games/utils/App';
import { Card } from '$lib/games/utils/Card';
import { Cards } from '$lib/games/utils/Cards';
import { Dealer } from '$lib/games/utils/Dealer';

import { Layout } from "./Layout";

export class Game extends App {
    constructor(canvasRef) {
        super(canvasRef);
        this.init();
    }

    async init() {
        this.sheet = new PIXI.Spritesheet(
            PIXI.BaseTexture.from(cardsSpritesheetImage),
            cardsSpritesheetAtlas
        );
        await this.sheet.parse();

        this.layout = new Layout(this.app);

        const dealer = new Dealer();


        // GAME SETUP

        const drawDeck = dealer.shuffleCards([
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS',
            'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC',
            'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH',
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD'
        ]);

        const royalsDeck = [
            ...dealer.shuffleCards(['KD', 'KS', 'KH', 'KC']),
            ...dealer.shuffleCards(['QD', 'QS', 'QH', 'QC']),
            ...dealer.shuffleCards(['JD', 'JS', 'JH', 'JC'])
        ];

        this.jokerLeft = new Card(this.app, this.sheet, {
            faceName: 'J1',
            position: {x: 576, y: 117},
            faceUp: true,
            isInteractive: true,
            onPointerdown: this.handleJokerClick
        });

        this.jokerRight = new Card(this.app, this.sheet, {
            faceName: 'J2',
            position: {x: 666, y: 117},
            faceUp: true,
            isInteractive: true,
            onPointerdown: this.handleJokerClick
        });

        this.royalsPile = new Cards(this.app, this.sheet, {
            type: 'pile',
            faceNames: royalsDeck,
            backName: "B1",
            position: {x: 260, y: 117},
            faceUp: true,
            onPointerdown: this.handleHandClick
        });

        this.drawPile = new Cards(this.app, this.sheet, {
            type: 'pile',
            faceNames: drawDeck,
            position: {x: 666, y: 277},
            onPointerdown: this.handleHandClick
        });

        this.hand = new Cards(this.app, this.sheet, {
            type: 'tableau',
            gap: 8,
            position: {x: 360, y: 467},
            isInteractive: true
        });

        const startingHandCards = this.drawPile.removeCards(8);
        this.hand.addCards(startingHandCards);
        this.hand.adjustCards(false, true);




        // Add button
        const button = new PIXI.Graphics();
        button.beginFill(0x000000, 0.25);
        button.drawRoundedRect(260, 568, 200, 50, 8);
        button.endFill();
        this.app.stage.addChild(button);
        button.eventMode = 'static';
        button.cursor = 'pointer';
        button.on('pointerdown', () => {
            // handle button click
        });
    }

    handleJokerClick(card) {
        card.flip(false, false);
    }

    handleHandClick(card) {
        card.flip(false, false);
    }
}