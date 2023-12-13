import * as PIXI from 'pixi.js';

import cardsSpritesheetImage from '../../assets/images/spritesheetColor.png';
import cardsSpritesheetAtlas from '../../assets/json/cardsSpritesheet.json';

import { App } from '../../utils/App';
import { Cards } from '../../utils/Cards';
import { Dealer } from '../../utils/Dealer';
import { Message } from '../../utils/Message';
import { Button } from '../../utils/Button';
import { GameOverPanel } from '../../utils/GameOverPanel';

import paramsAtlas from './values.json';
import defendersAtlas from './defenders.json';
import { Mattress } from './Mattress';

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

        // add error message
        this.errorMessage = new Message(this.gameContainer, { x: 360, y: 265 }, 20);

        // add sacrifice button
        this.sacrificeButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Sacrifice",
            textSize: 16,
            x: 175,
            y: 666,
            // onPointerDown: this.handleRestart.bind(this)
        });

        // add giveup button
        this.singleAttackButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Single Attack",
            textSize: 16,
            x: 360,
            y: 666,
            // onPointerDown: this.handleGiveup.bind(this)
        });

        // add serve button
        this.dualAttackButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Dual Attack",
            textSize: 16,
            x: 545,
            y: 666,
            // onPointerDown: this.handleServe.bind(this)
        });

        // selected cards
        this.selectedCards = [];

        // make shuffled aliens
        this.aliensDeck = this.dealer.shuffleCards([
            'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD'
        ]);

        // make shuffled defenders
        this.defendersDeck = this.dealer.shuffleCards([
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS',
            'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC'
        ]);

        // add aliens pile
        this.aliensPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: this.aliensDeck,
            position: {x: 130, y: 170},
            faceUp: false,
            counter: true,
            // onPointerDown: this.onCardPointerDown.bind(this)
        });

        // add defenders pile
        this.defendersPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: this.defendersDeck,
            position: {x: 590, y: 170},
            faceUp: false,
            counter: true,
            // onPointerDown: this.onCardPointerDown.bind(this)
        });

        // add discard pile
        this.discardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 450, y: 170},
            faceUp: false,
            counter: true,
            // onPointerDown: this.onCardPointerDown.bind(this)
        });

        // add aliens stack
        this.alienStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackH',
            faceNames: ['2H', '3D', '4H'],
            position: {x: 230, y: 170},
            faceUp: true,
            counter: false,
            centered:false,
            gap: 40
            // onPointerDown: this.onCardPointerDown.bind(this)
        });

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

}
