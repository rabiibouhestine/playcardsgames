import * as PIXI from 'pixi.js';

import cardsSpritesheetImage from '../../assets/images/spritesheetColor.png';
import cardsSpritesheetAtlas from '../../assets/json/cardsSpritesheet.json';

import { App } from '../../utils/App';
import { Cards } from '../../utils/Cards';
import { Dealer } from '../../utils/Dealer';
import { Message } from '../../utils/Message';
import { Number } from '../../utils/Number';
import { Button } from '../../utils/Button';
import { GameOverPanel } from '../../utils/GameOverPanel';

import paramsAtlas from './values.json';
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

        // add player sacrifice button
        this.playerSacrificeButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Sacrifice Cards",
            textSize: 16,
            x: 190,
            y: 575,
            // onPointerDown: this.handlePlayerSacrifice.bind(this)
        });

        // add enemy capture button
        this.enemyCaptureButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Get Captured",
            textSize: 16,
            x: 360,
            y: 575,
            // onPointerDown: this.handleEnemyCapture.bind(this)
        });

        // add player capture button
        this.playerCaptureButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Capture Card",
            textSize: 16,
            x: 530,
            y: 575,
            // onPointerDown: this.handlePlayerCapture.bind(this)
        });

        // add player discard button
        this.playerDiscardButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Discard",
            textSize: 16,
            x: 360,
            y: 575,
            // onPointerDown: this.handlePlayerDiscard.bind(this)
        });

        // set capture phase
        this.setCapturePhase(true);

        // enemy selected cards
        this.enemySelectedCards = [];

        // player selected cards
        this.playerSelectedCards = [];

        // make enemy deck
        const enemyDeck = this.dealer.shuffleCards([
            'AS', '5S', '6S', '7S', '8S', '9S', 'TS',
            'AC', '5C', '6C', '7C', '8C', '9C', 'TC',
            'AH', '5H', '6H', '7H', '8H', '9H', 'TH',
            'AD', '5D', '6D', '7D', '8D', '9D', 'TD',
            'KD', 'KS', 'KH', 'KC',
            'QD', 'QS', 'QH', 'QC',
            'JD', 'JS', 'JH', 'JC'
        ]);

        // make player deck
        const playerDeck = this.dealer.shuffleCards([
            '2S', '3S', '4S',
            '2C', '3C', '4C',
            '2H', '3H', '4H',
            '2D', '3D', '4D',
            'J1', 'J2'
        ]);

        // add enemy draw pile
        this.enemyDrawPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: enemyDeck,
            position: {x: 60, y: 157},
            faceUp: false,
            counter: true,
            onPointerDown: this.onCardPointerDown.bind(this)
        });

        // add enemy discard pile
        this.enemyDiscardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 660, y: 157},
            faceUp: false,
            counter: true
        });

        // add enemy tableau
        this.enemyTableau = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'tableau',
            name: 'enemy',
            faceNames: [],
            position: {x: 360, y: 157},
            faceUp: true,
            gap: 20,
            isInteractive: true
        });

        // add player draw pile
        this.playerDrawPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: playerDeck,
            position: {x: 60, y: 404},
            faceUp: false,
            counter: true,
            onPointerDown: this.onCardPointerDown.bind(this)
        });

        // add player discard pile
        this.playerDiscardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 660, y: 404},
            faceUp: false,
            counter: true
        });

        // add player tableau
        this.playerTableau = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'tableau',
            name: 'player',
            faceNames: [],
            position: {x: 360, y: 404},
            faceUp: true,
            gap: 20,
            isInteractive: true
        });

        // initialise enemy tableau
        this.dealer.moveCards({
            nbCards: 4,
            source: this.enemyDrawPile ,
            destination: this.enemyTableau,
            positionSource: 'top',
            positionDestination: 'bottom'
        });

        // initialise player tableau
        this.dealer.moveCards({
            nbCards: 4,
            source: this.playerDrawPile ,
            destination: this.playerTableau,
            positionSource: 'top',
            positionDestination: 'bottom'
        });

        // enable interactions
        this.dealer.delay(600);
        this.gameContainer.eventMode = 'static';
    }

    setCapturePhase(isCapturePhase) {
        if (isCapturePhase) {
            this.playerDiscardButton.container.visible = false;
            this.playerSacrificeButton.container.visible = true;
            this.playerCaptureButton.container.visible = true;
            this.enemyCaptureButton.container.visible = true;
        } else {
            this.playerDiscardButton.container.visible = true;
            this.playerSacrificeButton.container.visible = false;
            this.playerCaptureButton.container.visible = false;
            this.enemyCaptureButton.container.visible = false;
        }
    }

    onCardPointerDown(card) {
        alert("I am in the tableau of the " + card.location);
    }

}
