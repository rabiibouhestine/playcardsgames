import * as PIXI from "pixi.js";

import cardsSpritesheetImage from '$lib/games/assets/images/cardsSpritesheet.png';
import cardsSpritesheetAtlas from '$lib/games/assets/json/cardsSpritesheet.json';
import paramsAtlas from '$lib/games/assets/json/zombiesInCastles.json';

import { App } from '../utils/App';
import { Card } from '../utils/Card';
import { Cards } from '../utils/Cards';
import { Dealer } from '../utils/Dealer';

import { Mattress } from "./Mattress";

export class Game extends App {
    constructor(canvasRef) {
        super(canvasRef);
        this.init();
    }

    async init() {
        const cardsSpritesheetTexture = await PIXI.Assets.load(cardsSpritesheetImage);
        this.spritesheet = new PIXI.Spritesheet(
            cardsSpritesheetTexture,
            cardsSpritesheetAtlas
        );
        await this.spritesheet.parse();

        this.Mattress = new Mattress(this.mattressContainer);

        this.dealer = new Dealer();

        // disable interactions
        // this.gameContainer.eventMode = 'none';


        const drawPileDeck = this.dealer.shuffleCards([
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS',
            'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC',
            'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH',
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD',
            'J1', 'J2'
        ]);

        const monstersDeck = this.dealer.shuffleCards([
            'KD', 'KS', 'KH', 'KC',
            'QD', 'QS', 'QH', 'QC',
            'JD', 'JS', 'JH', 'JC'
        ]);

        this.monsterDiscardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: monstersDeck,
            position: {x: 652, y: 147},
            faceUp: false,
            counter: true
        });

        this.leftMonsterStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 214, y: 86},
            faceUp: false,
            counter: false
        });

        this.centerMonsterStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 360, y: 86},
            faceUp: false,
            counter: false
        });

        this.rightMonsterStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 506, y: 86},
            faceUp: false,
            counter: false
        });

        this.attackDiscardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 652, y: 327},
            faceUp: false,
            counter: true
        });

        this.leftAttackStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 214, y: 323},
            faceUp: true,
            counter: false
        });

        this.centerAttackStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 360, y: 323},
            faceUp: true,
            counter: false
        });

        this.rightAttackStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 506, y: 323},
            faceUp: true,
            counter: false
        });

        this.drawPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: drawPileDeck,
            position: {x: 67, y: 565},
            faceUp: false,
            counter: true
        });

        this.hand = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'tableau',
            gap: 15,
            faceNames: [],
            position: {x: 360, y: 565},
            faceUp: true,
            isInteractive: true
        });

        this.reservePile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 653, y: 565},
            faceUp: true,
            counter: false
        });

        // fill Left Monster Stack
        this.dealer.moveCards({
            nbCards: 4,
            source: this.monsterDiscardPile ,
            destination: this.leftMonsterStack,
            positionSource: 'top',
            positionDestination: 'top',
            inSequence: false,
            immediate: true
        });

        // fill Center Monster Stack
        this.dealer.moveCards({
            nbCards: 4,
            source: this.monsterDiscardPile ,
            destination: this.centerMonsterStack,
            positionSource: 'top',
            positionDestination: 'top',
            inSequence: false,
            immediate: true
        });

        // fill Right Monster Stack
        this.dealer.moveCards({
            nbCards: 4,
            source: this.monsterDiscardPile ,
            destination: this.rightMonsterStack,
            positionSource: 'top',
            positionDestination: 'top',
            inSequence: false,
            immediate: true
        });

        // flip left monster stack top card
        this.leftMonsterStack.getTopCard().flip(true);

        // flip center monster stack top card
        this.centerMonsterStack.getTopCard().flip(true);

        // flip right monster stack top card
        this.rightMonsterStack.getTopCard().flip(true);

        // draw 3 cards
        this.dealer.moveCards({
            nbCards: 3,
            source: this.drawPile ,
            destination: this.hand,
            positionSource: 'top',
            positionDestination: 'bottom'
        });
    }

}
