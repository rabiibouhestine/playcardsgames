import * as PIXI from "pixi.js";

import cardsSpritesheetImage from '../../assets/images/spritesheetColor.png';
import cardsSpritesheetAtlas from '../../assets/json/cardsSpritesheet.json';
import paramsAtlas from '../../assets/json/clearTheDungeon.json';

import { App } from '../../utils/App';
import { Cards } from '../../utils/Cards';
import { Dealer } from '../../utils/Dealer';
import { Number } from "../../utils/Number";
import { Button } from "../../utils/Button";
import { GameOverPanel } from "../../utils/GameOverPanel";

import { Mattress } from "./Mattress";

export class Game extends App {
    constructor(canvasRef) {
        super(canvasRef);
        this.init();
    }

    async init() {
        // load spritesheet
        const cardsSpritesheetTexture = await PIXI.Assets.load(cardsSpritesheetImage);
        this.spritesheet = new PIXI.Spritesheet(
            cardsSpritesheetTexture,
            cardsSpritesheetAtlas
        );
        await this.spritesheet.parse();

        // disable interactions
        this.gameContainer.eventMode = 'none';

        // add dealer
        this.dealer = new Dealer();

        // add mattress
        this.mattress = new Mattress(this.mattressContainer);

        // add restart button
        this.restartButton = new Button(this.gameContainer, {
            width: 120,
            height: 50,
            text: "Restart",
            x: 630,
            y: 39,
            // onPointerDown: this.handleRestart.bind(this)
        });

        // add customer offer
        this.customerOffer = new Number(this.gameContainer, { x: 285, y: 65 }, 0, { fontSize: 48 });

        // add merchant offer
        this.merchantOffer = new Number(this.gameContainer, { x: 435, y: 65 }, 0, { fontSize: 48 });

        // make items deck
        const itemsDeck = this.dealer.shuffleCards([
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS',
            'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC',
            'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH',
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD'
        ]);

        // make customers deck
        const customersDeck = this.dealer.shuffleCards([
            'KD', 'KS', 'KH', 'KC',
            'QD', 'QS', 'QH', 'QC',
            'JD', 'JS', 'JH', 'JC'
        ]);

        // add items pile
        this.itemsPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: customersDeck,
            position: {x: 431, y: 195},
            faceUp: false,
            counter: false
        });

        // add customers pile
        this.customersPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: customersDeck,
            position: {x: 288, y: 195},
            faceUp: false,
            counter: false
        });

        // enable interactions
        this.gameContainer.eventMode = 'static';

        // game over panel
        this.gameOverPanel = new GameOverPanel(this.modalContainer, this.handleRestart.bind(this), "Satisfied Customers:");
    }



}
