import * as PIXI from "pixi.js";

import cardsSpritesheetImage from '../assets/images/cardsSpritesheet.png';
import cardsSpritesheetAtlas from '../assets/json/cardsSpritesheet.json';
import paramsAtlas from '../assets/json/clearTheDungeon.json';

import { App } from '../utils/App';
import { Cards } from '../utils/Cards';
import { Dealer } from '../utils/Dealer';
import { Message } from "../utils/Message";
import { Number } from "../utils/Number";
import { Button } from "../utils/Button";

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
   
        // add dealer
        this.dealer = new Dealer();

        // add mattress
        this.mattress = new Mattress(this.mattressContainer);

        // add message
        this.message = new Message(this.gameContainer, {x: 360, y: 471});

        // add restart button
        this.restartButton = new Button(this.gameContainer, {
            width: 110,
            height: 50,
            textSize: 20,
            text: "Restart",
            x: 652,
            y: 40,
            onPointerDown: this.handleRestart.bind(this)
        });

        // disable interactions
        this.gameContainer.eventMode = 'none';

        // make dra pile deck
        const drawPileDeck = this.dealer.shuffleCards([
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS',
            'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC',
            'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH',
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD',
            'J1', 'J2'
        ]);

        // make monster deck
        const monstersDeck = this.dealer.shuffleCards([
            'KD', 'KS', 'KH', 'KC',
            'QD', 'QS', 'QH', 'QC',
            'JD', 'JS', 'JH', 'JC'
        ]);

        // add monster discard pile
        this.monsterDiscardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: monstersDeck,
            position: {x: 652, y: 147},
            faceUp: false,
            counter: true
        });

        // add left monsters health counter
        this.leftMonstersHealth = new Number(this.gameContainer, { x: 214, y: 30 }, 0, { fontSize: 20 });

        // add center monsters health counter
        this.centerMonstersHealth = new Number(this.gameContainer, { x: 360, y: 30 }, 0, { fontSize: 20 });
        
        // add right monsters health counter
        this.rightMonstersHealth = new Number(this.gameContainer, { x: 506, y: 30 }, 0, { fontSize: 20 });

        // add left monsters stack
        this.leftMonsterStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 214, y: 99},
            faceUp: false,
            counter: false
        });

        // add center mosters stack
        this.centerMonsterStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 360, y: 99},
            faceUp: false,
            counter: false
        });

        // add right monsters stack
        this.rightMonsterStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 506, y: 99},
            faceUp: false,
            counter: false
        });

        // add attack discard pile
        this.attackDiscardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 652, y: 327},
            faceUp: false,
            counter: true
        });

        // add left attack stak
        this.leftAttackStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 214, y: 323},
            faceUp: true,
            counter: false
        });

        // add center attack stack
        this.centerAttackStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 360, y: 323},
            faceUp: true,
            counter: false
        });

        // add right attack stack
        this.rightAttackStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackV',
            gap: 26,
            centered: false,
            faceNames: [],
            position: {x: 506, y: 323},
            faceUp: true,
            counter: false
        });

        // add draw pile
        this.drawPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: drawPileDeck,
            position: {x: 67, y: 565},
            faceUp: false,
            counter: true,
            onPointerDown: this.onCardPointerDown.bind(this),
            onPointerUp: this.onCardPointerUp.bind(this)
        });

        // add hand
        this.hand = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'tableau',
            name: 'hand',
            gap: 15,
            faceNames: [],
            position: {x: 360, y: 565},
            faceUp: true,
            isInteractive: true,
            isDraggable: true
        });

        // add reserve pile
        this.reservePile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            name: 'reserve',
            faceNames: [],
            position: {x: 653, y: 565},
            faceUp: true,
            isInteractive: true,
            isDraggable: true
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

        // set left monster health
        this.leftMonstersHealth.setValue(this.leftMonsterStack.getTopCard().params.value);

        // set center monster health
        this.centerMonstersHealth.setValue(this.centerMonsterStack.getTopCard().params.value);

        // set right monster health
        this.rightMonstersHealth.setValue(this.rightMonsterStack.getTopCard().params.value);

        // flip left monster stack top card
        this.leftMonsterStack.getTopCard().flip(true);

        // flip center monster stack top card
        this.centerMonsterStack.getTopCard().flip(true);

        // flip right monster stack top card
        this.rightMonsterStack.getTopCard().flip(true);

        // draw 3 cards
        await this.dealer.moveCards({
            nbCards: 3,
            source: this.drawPile ,
            destination: this.hand,
            positionSource: 'top',
            positionDestination: 'bottom'
        });

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    onCardPointerDown(card) {
        this.mattress.setHighlighted(true);
        this.message.clear();
    }

    async onCardPointerUp(card) {
        // disable interactions
        this.gameContainer.eventMode = 'none';

        this.mattress.setHighlighted(false);

        let validMove = false;

        const isMouseOverLeftAttackZone = this.dealer.checkMouseOver(this.mouseCoords, this.mattress.leftAttackZone);
        const isMouseOverCenterAttackZone = this.dealer.checkMouseOver(this.mouseCoords, this.mattress.centerAttackZone);
        const isMouseOverRightAttackZone = this.dealer.checkMouseOver(this.mouseCoords, this.mattress.rightAttackZone);
        const isMouseOverReserveZone = this.dealer.checkMouseOver(this.mouseCoords, this.mattress.reserveZone);

        card.setInteractive(false);
        card.onPointerOut();

        if (!isMouseOverLeftAttackZone && !isMouseOverCenterAttackZone && !isMouseOverRightAttackZone && !isMouseOverReserveZone) {
            this.message.setValue('place the card in one of the highlighted zones');
        }

        if (isMouseOverLeftAttackZone) {
            const attackCheckResponse = this.attackCheck(this.leftMonsterStack, this.leftAttackStack, card);
            if (attackCheckResponse === 'valid') {
                validMove = true;
                switch (card.location) {
                    case 'hand':
                        await this.dealer.moveSelection({
                            selectionNames: [card.faceName],
                            source: this.hand,
                            destination: this.leftAttackStack,
                            positionDestination: 'top'
                        });
                        break;
                    case 'reserve':
                        await this.dealer.moveSelection({
                            selectionNames: [card.faceName],
                            source: this.reservePile,
                            destination: this.leftAttackStack,
                            positionDestination: 'top'
                        });
                        break;
                    default:
                        break;
                }
                if (this.leftAttackStack.cards.length === 3) {
                    await this.dealer.moveCards({
                        nbCards: 3,
                        source: this.leftAttackStack,
                        destination: this.attackDiscardPile,
                        positionSource: 'top',
                        positionDestination: 'top'
                    });
                    this.dealer.moveCards({
                        nbCards: 1,
                        source: this.leftMonsterStack,
                        destination: this.monsterDiscardPile,
                        positionSource: 'top',
                        positionDestination: 'top'
                    });
                    if ( this.leftMonsterStack.cards.length) {
                        // flip top card
                        this.leftMonsterStack.getTopCard().flip(true);
                        // set health
                        this.leftMonstersHealth.setValue(this.leftMonsterStack.getTopCard().params.value);
                    }
                }
            } else {
                this.message.setValue(attackCheckResponse);
            }
        }

        if (isMouseOverCenterAttackZone) {
            const attackCheckResponse = this.attackCheck(this.centerMonsterStack, this.centerAttackStack, card);
            if (attackCheckResponse === 'valid') {
                validMove = true;
                switch (card.location) {
                    case 'hand':
                        await this.dealer.moveSelection({
                            selectionNames: [card.faceName],
                            source: this.hand,
                            destination: this.centerAttackStack,
                            positionDestination: 'top'
                        });
                        break;
                    case 'reserve':
                        await this.dealer.moveSelection({
                            selectionNames: [card.faceName],
                            source: this.reservePile,
                            destination: this.centerAttackStack,
                            positionDestination: 'top'
                        });
                        break;
                    default:
                        break;
                }
                if (this.centerAttackStack.cards.length === 3) {
                    await this.dealer.moveCards({
                        nbCards: 3,
                        source: this.centerAttackStack,
                        destination: this.attackDiscardPile,
                        positionSource: 'top',
                        positionDestination: 'top'
                    });
                    this.dealer.moveCards({
                        nbCards: 1,
                        source: this.centerMonsterStack,
                        destination: this.monsterDiscardPile,
                        positionSource: 'top',
                        positionDestination: 'top'
                    });
                    if (this.centerMonsterStack.cards.length) {
                        // flip top card
                        this.centerMonsterStack.getTopCard().flip(true);
                        // set health
                        this.centerMonstersHealth.setValue(this.centerMonsterStack.getTopCard().params.value);
                    }
                }
            } else {
                this.message.setValue(attackCheckResponse);
            }
        }

        if (isMouseOverRightAttackZone) {
            const attackCheckResponse = this.attackCheck(this.rightMonsterStack, this.rightAttackStack, card);
            if (attackCheckResponse === 'valid') {
                validMove = true;
                switch (card.location) {
                    case 'hand':
                        await this.dealer.moveSelection({
                            selectionNames: [card.faceName],
                            source: this.hand,
                            destination: this.rightAttackStack,
                            positionDestination: 'top'
                        });
                        break;
                    case 'reserve':
                        await this.dealer.moveSelection({
                            selectionNames: [card.faceName],
                            source: this.reservePile,
                            destination: this.rightAttackStack,
                            positionDestination: 'top'
                        });
                        break;
                    default:
                        break;
                }
                if (this.rightAttackStack.cards.length === 3) {
                    await this.dealer.moveCards({
                        nbCards: 3,
                        source: this.rightAttackStack,
                        destination: this.attackDiscardPile,
                        positionSource: 'top',
                        positionDestination: 'top'
                    });
                    this.dealer.moveCards({
                        nbCards: 1,
                        source: this.rightMonsterStack,
                        destination: this.monsterDiscardPile,
                        positionSource: 'top',
                        positionDestination: 'top'
                    });
                    if (this.rightMonsterStack.cards.length) {
                        // flip top card
                        this.rightMonsterStack.getTopCard().flip(true);
                        // set health
                        this.rightMonstersHealth.setValue(this.rightMonsterStack.getTopCard().params.value);
                    }
                }
            } else {
                this.message.setValue(attackCheckResponse);
            }
        }

        if (isMouseOverReserveZone) {
            validMove = true;
            switch (card.location) {
                case 'hand':
                    this.dealer.moveSelection({
                        selectionNames: [card.faceName],
                        source: this.hand,
                        destination: this.reservePile,
                        positionDestination: 'top'
                    });
                    break;
                case 'reserve':
                    this.reservePile.adjustCards({ immediate: false });
                    break;
                default:
                    break;
            }
        }

        if (!validMove) {
            switch (card.location) {
                case 'hand':
                    this.hand.adjustCards({ immediate: false });
                    break;
                case 'reserve':
                    this.reservePile.adjustCards({ immediate: false });
                    break;
                default:
                    break;
            }
        }

        if (!this.hand.cards.length) {
            // draw 3 cards
            await this.dealer.moveCards({
                nbCards: 3,
                source: this.drawPile ,
                destination: this.hand,
                positionSource: 'top',
                positionDestination: 'bottom'
            });
        }

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    checkAttack(monsterStack, attackStack, card) {
        const monsterValue = monsterStack.getTopCard().params.value;
        const monsterSuit = monsterStack.getTopCard().params.suit;
        const newAttackStackCards = [...attackStack.cards, card];
        const newAttackStackValue = newAttackStackCards.reduce((accumulator, card) => {
            return accumulator + card.params.value;
        }, 0);
        const isEmpty = attackStack.cards.length === 0 && card.params.value !== 1 && card.params.value !== 2;
        const isAceEnough = attackStack.cards.length === 0 && card.params.value === 1 && monsterValue <= 11;
        const isTwoEnough = attackStack.cards.length === 0 && card.params.value === 2 && monsterValue <= 12;
        const isDamageEnough = attackStack.cards.length === 1 && newAttackStackValue >= monsterValue;
        const isSuitCorrect = attackStack.cards.length === 2 && card.params.suit === monsterSuit;

        return isEmpty || isAceEnough || isTwoEnough || isDamageEnough || isSuitCorrect;
    }

    attackCheck(monsterStack, attackStack, card) {
        const monsterValue = monsterStack.getTopCard().params.value;
        const monsterSuit = monsterStack.getTopCard().params.suit;
        const newAttackStackCards = [...attackStack.cards, card];
        const newAttackStackValue = newAttackStackCards.reduce((accumulator, card) => {
            return accumulator + card.params.value;
        }, 0);

        if (newAttackStackCards.length === 3 && card.params.suit !== monsterSuit) {
            return 'Third card needs to have the same suit as the monster';
        }

        if (newAttackStackCards.length === 2 && newAttackStackValue < monsterValue) {
            return newAttackStackCards[0].params.value + ' + ' + newAttackStackCards[1].params.value + ' < ' + monsterValue;
        }

        if (newAttackStackCards.length === 1 && card.params.value === 1 && monsterValue > 11) {
            return 'Ace with any other card will be less than ' + monsterValue;
        }

        if (newAttackStackCards.length === 1 && card.params.value === 2 && monsterValue > 12) {
            return '2 with any other card will be less than ' + monsterValue;
        }

        return 'valid';
    }

    async handleRestart() {
        // disable interactions
        this.gameContainer.eventMode = 'none';

        this.rightMonstersHealth.setValue(0);
        this.centerMonstersHealth.setValue(0);
        this.leftMonstersHealth.setValue(0);

        this.dealer.moveCards({
            nbCards: this.rightMonsterStack.cards.length,
            source: this.rightMonsterStack ,
            destination: this.monsterDiscardPile,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.dealer.moveCards({
            nbCards: this.centerMonsterStack.cards.length,
            source: this.centerMonsterStack ,
            destination: this.monsterDiscardPile,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.dealer.moveCards({
            nbCards: this.leftMonsterStack.cards.length,
            source: this.leftMonsterStack ,
            destination: this.monsterDiscardPile,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.dealer.moveCards({
            nbCards: this.leftAttackStack.cards.length,
            source: this.leftAttackStack ,
            destination: this.drawPile,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.dealer.moveCards({
            nbCards: this.centerAttackStack.cards.length,
            source: this.centerAttackStack ,
            destination: this.drawPile,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.dealer.moveCards({
            nbCards: this.rightAttackStack.cards.length,
            source: this.rightAttackStack ,
            destination: this.drawPile,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.dealer.moveCards({
            nbCards: this.hand.cards.length,
            source: this.hand ,
            destination: this.drawPile,
            positionSource: 'bottom',
            positionDestination: 'top'
        });

        this.dealer.moveCards({
            nbCards: this.attackDiscardPile.cards.length,
            source: this.attackDiscardPile ,
            destination: this.drawPile,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.dealer.moveCards({
            nbCards: this.reservePile.cards.length,
            source: this.reservePile ,
            destination: this.drawPile,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.drawPile.shuffleCards();

        await this.dealer.delay(1000);

        this.monsterDiscardPile.shuffleCards();

        this.dealer.moveCards({
            nbCards: 4,
            source: this.monsterDiscardPile ,
            destination: this.leftMonsterStack,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.dealer.moveCards({
            nbCards: 4,
            source: this.monsterDiscardPile ,
            destination: this.centerMonsterStack,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.dealer.moveCards({
            nbCards: 4,
            source: this.monsterDiscardPile ,
            destination: this.rightMonsterStack,
            positionSource: 'top',
            positionDestination: 'top'
        });

        await this.dealer.delay(1000);

        this.leftMonstersHealth.setValue(this.leftMonsterStack.getTopCard().params.value);
        this.centerMonstersHealth.setValue(this.centerMonsterStack.getTopCard().params.value);
        this.rightMonstersHealth.setValue(this.rightMonsterStack.getTopCard().params.value);

        this.leftMonsterStack.getTopCard().flip(true);
        this.centerMonsterStack.getTopCard().flip(true);
        this.rightMonsterStack.getTopCard().flip(true);

        await this.dealer.moveCards({
            nbCards: 3,
            source: this.drawPile ,
            destination: this.hand,
            positionSource: 'top',
            positionDestination: 'bottom'
        });

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

}
