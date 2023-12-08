import * as PIXI from "pixi.js";
import '@pixi/graphics-extras';
import {Howl} from 'howler';

import sfxCash from '../../assets/audio/cash_register_purchase.ogg';

import cardsSpritesheetImage from '../../assets/images/spritesheetColor.png';
import cardsSpritesheetAtlas from '../../assets/json/cardsSpritesheet.json';

import { App } from '../../utils/App';
import { Cards } from '../../utils/Cards';
import { Dealer } from '../../utils/Dealer';
import { Number } from "../../utils/Number";
import { Button } from "../../utils/Button";
import { GameOverPanel } from "../../utils/GameOverPanel";

import { Mattress } from "./Mattress";

import paramsAtlas from './values.json';
import items from './storeItems.json';

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

        // cash sfx
        this.sfxCashHowl = new Howl({
            src: [sfxCash]
        });

        // selected items
        this.selectedItems = [];

        // items on sale
        this.selectedItemsOnSale = [];

        // add dealer
        this.dealer = new Dealer();

        // add mattress
        this.mattress = new Mattress(this.mattressContainer, this.gameContainer);

        // add restart button
        this.restartButton = new Button(this.gameContainer, {
            width: 120,
            height: 50,
            text: "Restart",
            x: 630,
            y: 39,
            onPointerDown: this.handleRestart.bind(this)
        });

        // add trade button
        this.tradeButton = new Button(this.gameContainer, {
            width: 250,
            height: 50,
            color: 0x0d47a1,
            alpha: 0.5,
            text: "Happy to trade with you!",
            textSize: 16,
            x: 513,
            y: 671,
            onPointerDown: this.handleTrade.bind(this)
        });

        // disable trade button
        this.tradeButton.setEnabled(false);

        // add failed button
        this.failedButton = new Button(this.gameContainer, {
            width: 250,
            height: 50,
            color: 0xbf360c,
            alpha: 0.5,
            text: "I can’t trade with you..",
            textSize: 16,
            x: 201,
            y: 671,
            onPointerDown: this.handleFail.bind(this)
        });

        // add customer offer
        this.customerOffer = new Number(this.gameContainer, { x: 285, y: 65 }, 0, { fontSize: 36 });

        // add merchant offer
        this.merchantOffer = new Number(this.gameContainer, { x: 435, y: 65 }, 0, { fontSize: 36 });

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
            faceNames: itemsDeck,
            position: {x: 431, y: 195},
            faceUp: false,
            counter: false,
            onPointerDown: this.onCardPointerDown.bind(this)
        });

        // add customers pile
        this.customersPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: customersDeck,
            position: {x: 288, y: 195},
            faceUp: false,
            counter: false
        });

        // add items discard pile
        this.itemsDiscardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 630, y: 195},
            faceUp: false,
            counter: true
        });

        // add customers discard pile
        this.customersDiscardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 90, y: 195},
            faceUp: false,
            counter: true
        });

        // add store items
        this.storeItems = [];
        for (let i = 0; i < 10; i++) {
            this.storeItems[i] = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
                name: i,
                type: 'pile',
                faceNames: [],
                position: items.positions[i],
                faceUp: true,
                counter: false,
                isInteractive: true
            });
        }

        // game over panel
        this.gameOverPanel = new GameOverPanel(this.modalContainer, this.handleRestart.bind(this), "Satisfied Customers:");

        // initialise store stock
        await this.restock();

        // reveal next customer
        this.customersPile.getTopCard().flip(true);

        // reveal next item
        this.itemsPile.getTopCard().flip(true);

        // update customer offer
        this.customerOffer.setValue(this.getCustomerOffer());

        // enable interactions
        this.gameContainer.eventMode = 'static';

        // game over panel
        this.gameOverPanel = new GameOverPanel(this.modalContainer, this.handleRestart.bind(this), "Satisfied Customers:");
    }

    onCardPointerDown(card) {
        if (card.params.value !== 11) {
            if (this.selectedItems.includes(card.faceName)) {
                this.selectedItems = this.selectedItems.filter(name => name !== card.faceName);
                this.mattress.clearHighlight(card.location);
            } else {
                this.selectedItems.push(card.faceName);
                this.mattress.setHighlighted(card.location, false);
            }
        } else {
            if (this.selectedItems.includes(card.faceName)) {
                this.selectedItems = this.selectedItems.filter(name => name !== card.faceName);
                this.mattress.clearHighlight(card.location);
            } else if (this.selectedItemsOnSale.includes(card.faceName)) {
                this.selectedItemsOnSale = this.selectedItemsOnSale.filter(name => name !== card.faceName);
                this.selectedItems.push(card.faceName);
                this.mattress.setHighlighted(card.location, false);
            } else {
                this.selectedItemsOnSale.push(card.faceName);
                this.mattress.setHighlighted(card.location, true);
            }
        }
        this.merchantOffer.setValue(this.getMerchantOffer(), true);

        const isTradeFair = this.merchantOffer.getValue() === this.customerOffer.getValue();
        const isThreeItems = this.selectedItems.length + this.selectedItemsOnSale.length === 3;
        if (isThreeItems && isTradeFair) {
            this.tradeButton.setEnabled(true);
        } else {
            this.tradeButton.setEnabled(false);
        }
    }

    async restock() {
        for (let i = 0; i < 10; i++) {
            if (!this.itemsPile.cards.length) {
                this.itemsDiscardPile.shuffleCards();
                await this.dealer.moveCards({
                    nbCards: this.itemsDiscardPile.cards.length,
                    source: this.itemsDiscardPile ,
                    destination: this.itemsPile,
                    positionSource: 'top',
                    positionDestination: 'top',
                    inSequence: false
                });
            }
            if (!this.storeItems[i].cards.length) {
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.itemsPile ,
                    destination: this.storeItems[i],
                    positionSource: 'top',
                    positionDestination: 'top'
                });
                await this.dealer.delay(100);
            }
        }
    }

    discardSelectedCards() {
        for (let i = 0; i < 10; i++) {
            const isSelected = this.selectedItems.includes(this.storeItems[i].getTopCard().faceName);
            const isSelectedOnSale = this.selectedItemsOnSale.includes(this.storeItems[i].getTopCard().faceName);
            if (isSelected || isSelectedOnSale) {
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.storeItems[i],
                    destination: this.itemsDiscardPile,
                    positionSource: 'top',
                    positionDestination: 'top'
                });
                this.mattress.clearHighlight(i);
            }
        }
    }

    handleFail() {
        this.handleGameOver(this.customersDiscardPile.cards.length);
    }

    async handleTrade() {
        this.gameContainer.eventMode = 'none';

        this.sfxCashHowl.play();

        this.tradeButton.setEnabled(false);
        this.discardSelectedCards();
        this.merchantOffer.setValue(0, true);
        this.selectedItems = [];
        this.selectedItemsOnSale = [];
        await this.dealer.delay(600);

        this.dealer.moveCards({
            nbCards: 1,
            source: this.itemsPile,
            destination: this.itemsDiscardPile,
            positionSource: 'top',
            positionDestination: 'top'
        });
        this.dealer.moveCards({
            nbCards: 1,
            source: this.customersPile,
            destination: this.customersDiscardPile,
            positionSource: 'top',
            positionDestination: 'top'
        });
        this.customerOffer.setValue(0, true);
        await this.dealer.delay(600);

        await this.restock();

        if (this.customersPile.cards.length) {
            this.itemsPile.getTopCard().flip(true);
            this.customersPile.getTopCard().flip(true);
            this.customerOffer.setValue(this.getCustomerOffer());
    
            this.gameContainer.eventMode = 'static';
        } else {
            this.handleGameOver(this.customersDiscardPile.cards.length);
        }
    }

    getCustomerOffer() {
        const customerMoney = this.customersPile.getTopCard().params.value;
        const customerItemValue = this.itemsPile.getTopCard().params.value;
        return customerMoney + customerItemValue;
    }

    getMerchantOffer() {
        const selectedItemsValue = this.selectedItems.reduce((accumulator, cardName) => {
            if (paramsAtlas[cardName].suit !== this.itemsPile.getTopCard().params.suit) {
                return accumulator + paramsAtlas[cardName].value;
            } else {
                return accumulator;
            }
        }, 0);
        const selectedItemsOnSaleValue = this.selectedItemsOnSale.reduce((accumulator, cardName) => {
            if (paramsAtlas[cardName].suit !== this.itemsPile.getTopCard().params.suit) {
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);
        return selectedItemsValue + selectedItemsOnSaleValue;
    }

    async handleRestart() {
        // disable interactions
        this.gameContainer.eventMode = 'none';

        // remove blur
        this.gameContainer.filters = [];
        this.mattressContainer.filters = [];

        // hide game over panel
        this.gameOverPanel.setVisible(false);

        this.customerOffer.setValue(0, true);
        this.merchantOffer.setValue(0, true);

        if (this.customersPile.cards.length) {
            this.customersPile.getTopCard().flip(false);
        }
        if (this.itemsPile.cards.length) {
            this.itemsPile.getTopCard().flip(false);
        }
        if (this.customersDiscardPile.cards.length) {
            this.dealer.moveCards({
                nbCards: this.customersDiscardPile.cards.length,
                source: this.customersDiscardPile,
                destination: this.customersPile,
                positionSource: 'top',
                positionDestination: 'top',
                inSequence: false
            });
        }
        if (this.itemsDiscardPile.cards.length) {
            this.dealer.moveCards({
                nbCards: this.itemsDiscardPile.cards.length,
                source: this.itemsDiscardPile,
                destination: this.itemsPile,
                positionSource: 'top',
                positionDestination: 'top',
                inSequence: false
            });
        }
        for (let i = 0; i < 10; i++) {
            if (this.storeItems[i].cards.length) {
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.storeItems[i],
                    destination: this.itemsPile,
                    positionSource: 'top',
                    positionDestination: 'top'
                });
            }
            this.mattress.clearHighlight(i);
        }

        await this.dealer.delay(600);

        this.itemsPile.shuffleCards();
        this.customersPile.shuffleCards();

        // initialise store stock
        await this.restock();

        // reveal next customer
        this.customersPile.getTopCard().flip(true);

        // reveal next item
        this.itemsPile.getTopCard().flip(true);

        // update customer offer
        this.customerOffer.setValue(this.getCustomerOffer());

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    handleGameOver(score) {
        // blur screen
        const blurFilter = new PIXI.BlurFilter();
        this.gameContainer.filters = [blurFilter];
        this.mattressContainer.filters = [blurFilter];

        // disable interactions
        this.gameContainer.eventMode = 'none';

        // show game over panel
        this.gameOverPanel.setVisible(true, score);
    }
}
