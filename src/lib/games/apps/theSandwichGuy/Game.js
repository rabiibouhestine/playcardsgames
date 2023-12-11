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
import ingredientsAtlas from './ingredients.json';
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

        // add giveup button
        this.giveupButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Give up",
            textSize: 16,
            x: 267,
            y: 654,
            // onPointerDown: this.handleServe.bind(this)
        });

        // add serve button
        this.serveButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Serve",
            textSize: 16,
            x: 452,
            y: 654,
            onPointerDown: this.handleServe.bind(this)
        });

        // selected cards
        this.selectedCards = [];

        // make shuffled deck
        this.deck = this.dealer.shuffleCards([
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS',
            'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
            'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD'
        ]);

        // add draw pile
        this.drawPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: this.deck,
            position: {x: 430, y: 165},
            faceUp: false,
            counter: true,
            onPointerDown: this.onCardPointerDown.bind(this)
        });

        // add discard pile
        this.discardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 290, y: 165},
            faceUp: false,
            counter: true
        });

        // add ingredients
        this.ingredients = [];
        for (let i = 0; i < 8; i++) {
            this.ingredients[i] = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
                name: i,
                type: 'pile',
                faceNames: [],
                position: ingredientsAtlas.positions[i],
                faceUp: true,
                counter: false,
                isInteractive: true
            });
        }

        // restock
        this.restock(8);
        await this.dealer.delay(600);

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    async restock(n) {
        let j = 0;
        for (let i = 0; i < 8; i++) {
            if (!this.ingredients[i].cards.length) {
                j ++;
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.drawPile ,
                    destination: this.ingredients[i],
                    positionSource: 'top',
                    positionDestination: 'top'
                });
                await this.dealer.delay(100);
            }
            if (j === n) {
                return;
            }
        }
    }

    discardSelectedCards() {
        for (let i = 0; i < 8; i++) {
            if (this.ingredients[i].cards.length && this.selectedCards.includes(this.ingredients[i].getTopCard().faceName)) {
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.ingredients[i],
                    destination: this.discardPile,
                    positionSource: 'top',
                    positionDestination: 'top'
                });
                this.mattress.clearHighlight(i);
            }
        }
    }

    onCardPointerDown(card) {
        if (this.selectedCards.includes(card.faceName)) {
            this.selectedCards = this.selectedCards.filter(name => name !== card.faceName);
            this.mattress.clearHighlight(card.location);
        } else {
            this.selectedCards.push(card.faceName);
            this.mattress.setHighlighted(card.location, card.params.suit);
        }
    }

    checkSelection() {
        return 'valid';
    }

    checkQuality() {
        return 2;
    }

    async handleServe() {
        const check = this.checkSelection();
        if (check !== 'valid') {
            this.errorMessage.setValue(check);
            return;
        }

        this.discardSelectedCards();
        await this.dealer.delay(600);

        this.restock(this.checkQuality());
        await this.dealer.delay(600);

        this.selectedCards = [];
    }
}
