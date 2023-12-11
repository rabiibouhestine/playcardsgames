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

        // add error message
        this.errorMessage = new Message(this.gameContainer, { x: 360, y: 265 }, 20);

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
        this.errorMessage.clear();
        if (this.selectedCards.includes(card.faceName)) {
            this.selectedCards = this.selectedCards.filter(name => name !== card.faceName);
            this.mattress.clearHighlight(card.location);
        } else {
            this.selectedCards.push(card.faceName);
            this.mattress.setHighlighted(card.location, card.params.suit);
        }
    }

    permute(arr) {
        const result = [];
      
        function swap(a, b) {
          const temp = arr[a];
          arr[a] = arr[b];
          arr[b] = temp;
        }
      
        function generatePermutations(n) {
          if (n === 1) {
            result.push([...arr]);
            return;
          }
      
          for (let i = 0; i < n; i++) {
            generatePermutations(n - 1);
            if (n % 2 === 0) {
              swap(i, n - 1);
            } else {
              swap(0, n - 1);
            }
          }
        }
      
        generatePermutations(arr.length);
        return result;
    }

    checkSelection() {
        if (this.selectedCards.length !== 3) {
            return 'A sandwich must consist of exactly 3 cards.';
        }
        const permutations = this.permute(this.selectedCards);
        for (let permutation of permutations) {
            const value1 = paramsAtlas[permutation[0]].value;
            const value2 = paramsAtlas[permutation[1]].value;
            const value3 = paramsAtlas[permutation[2]].value;

            let diff1;
            let diff2;

            if (value1 <= value2) {
                diff1 = value2 - value1;
            } else {
                diff1 = 13 + value2 - value1;
            }

            if (value2 <= value3) {
                diff2 = value3 - value2;
            } else {
                diff1 = 13 + value3 - value2;
            }

            if (diff1 === diff2) {
                return 'valid';
            }
        }
        return 'The selected cards do not make a valid sandwich.';
    }

    checkQuality() {
        const suitColors = {
            H: 'red',
            D: 'red',
            C: 'black',
            S: 'black',
        };

        const suit1 = paramsAtlas[this.selectedCards[0]].suit;
        const suit2 = paramsAtlas[this.selectedCards[1]].suit;
        const suit3 = paramsAtlas[this.selectedCards[2]].suit;

        const sameSuit = suit1 === suit2 && suit2 === suit3;
        const sameSuitColor = suitColors[suit1] === suitColors[suit2] && suitColors[suit2] === suitColors[suit3];
    
        if (sameSuit) {
            return 4;
        } else if (sameSuitColor) {
            return 3;
        } else {
            return 2;
        }
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
