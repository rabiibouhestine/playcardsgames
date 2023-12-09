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

        // add phase label
        this.errorMessage = new Message(this.gameContainer, { x: 360, y: 271 }, 20);

        // add player sacrifice button
        this.playerSacrificeButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Sacrifice Cards",
            textSize: 16,
            x: 190,
            y: 575,
            onPointerDown: this.handlePlayerSacrifice.bind(this)
        });

        // add enemy capture button
        this.enemyCaptureButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Get Captured",
            textSize: 16,
            x: 360,
            y: 575,
            onPointerDown: this.handleEnemyCapture.bind(this)
        });

        // add player capture button
        this.playerCaptureButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Capture Card",
            textSize: 16,
            x: 530,
            y: 575,
            onPointerDown: this.handlePlayerCapture.bind(this)
        });

        // add player discard button
        this.playerDiscardButton = new Button(this.gameContainer, {
            width: 160,
            height: 50,
            text: "Discard / Proceed",
            textSize: 16,
            x: 360,
            y: 575,
            onPointerDown: this.handlePlayerDiscard.bind(this)
        });

        // set capture phase
        this.setCaptureButtons(false);

        // enemy selected card
        this.enemySelectedCard = null;

        // player selected cards
        this.playerSelectedCards = [];

        // define targets
        this.targets = [
            'JH', 'QH', 'KH', 'AH',
            'JD', 'QD', 'KD', 'AD',
            'JS', 'QS', 'KS', 'AS',
            'JC', 'QC', 'KC', 'AC'
        ];

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
            positionDestination: 'bottom',
            inSequence: true
        });

        // initialise player tableau
        this.dealer.moveCards({
            nbCards: 4,
            source: this.playerDrawPile ,
            destination: this.playerTableau,
            positionSource: 'top',
            positionDestination: 'bottom',
            inSequence: true
        });

        // wait for initialisation
        await this.dealer.delay(800);

        // move face cards and aces back to enemy deck
        for (let card of this.enemyTableau.cards) {
            if (this.targets.includes(card.faceName)) {
                await this.dealer.moveSelection({
                    selectionNames: card.faceName,
                    source: this.enemyTableau,
                    destination: this.enemyDrawPile,
                    positionDestination: 'bottom',
                    inSequence: false
                });
            }
        }

        // refill enemy tableau
        await this.dealer.moveCards({
            nbCards: 4 - this.enemyTableau.cards.length,
            source: this.enemyDrawPile ,
            destination: this.enemyTableau,
            positionSource: 'top',
            positionDestination: 'bottom',
            inSequence: true
        });

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    setCaptureButtons(isCaptureButtons) {
        if (isCaptureButtons) {
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
        this.errorMessage.clear();
        if (card.location === 'player') {
            if (this.playerSelectedCards.includes(card.faceName)) {
                card.sprite.y = card.position.y;
                this.playerSelectedCards = this.playerSelectedCards.filter(name => name !== card.faceName);
            } else {
                card.sprite.y = card.position.y - 20;
                this.playerSelectedCards.push(card.faceName);
            }
        }
        if (card.location === 'enemy') {
            if (this.enemySelectedCard === null) {
                card.sprite.y = card.position.y - 20;
                this.enemySelectedCard = card;
            } else if (this.enemySelectedCard.faceName === card.faceName) {
                card.sprite.y = card.position.y;
                this.enemySelectedCard = null;
            } else {
                this.enemySelectedCard.sprite.y = this.enemySelectedCard.position.y;
                card.sprite.y = card.position.y - 20;
                this.enemySelectedCard = card;
            }
        }
    }

    resetSelection() {
        // reset enemy selected card position
        if (this.enemySelectedCard !== null) {
            this.enemySelectedCard.sprite.y = this.enemySelectedCard.position.y;
            this.enemySelectedCard = null;
        }

        // reset player cards positions
        for (let i = 0; i < this.playerTableau.cards.length; i++) {
            this.playerTableau.cards[i].sprite.y = this.playerTableau.cards[i].position.y;
        }
        this.playerSelectedCards = [];
    }

    checkPlayerSacrifice() {
        if (this.playerSelectedCards.length !== 2) {
            return 'You must select 2 cards to sacrifice.';
        }
        if (this.enemySelectedCard === null) {
            return 'You must select 1 card from the enemy cards.';
        }
        for (let card of this.playerSelectedCards) {
            if (this.targets.includes(card)) {
                return 'You cannot sacrifice a face card or an Ace.';
            }
        }
        return 'valid';
    }

    async handlePlayerSacrifice() {
        const check = this.checkPlayerSacrifice();
        if (check !== 'valid') {
            this.resetSelection();
            this.errorMessage.setValue(check);
            return;
        }

        this.gameContainer.eventMode = 'none';

        this.dealer.moveSelection({
            selectionNames: this.enemySelectedCard.faceName,
            source: this.enemyTableau,
            destination: this.enemyDrawPile,
            positionDestination: 'bottom',
            inSequence: false
        });

        await this.dealer.moveSelection({
            selectionNames: this.playerSelectedCards,
            source: this.playerTableau ,
            destination: this.enemyDiscardPile,
            positionDestination: 'top',
            inSequence: false
        });

        this.setCaptureButtons(false);
        this.resetSelection();

        await this.dealer.moveCards({
            nbCards: 1,
            source: this.enemyDrawPile ,
            destination: this.enemyTableau,
            positionSource: 'top',
            positionDestination: 'bottom',
            inSequence: false
        });

        this.gameContainer.eventMode = 'static';
    }

    checkEnemyCapture() {
        if (this.playerSelectedCards.length !== 1) {
            return 'You must select 1 card to get captured.';
        }
        if (this.targets.includes(this.enemyTableau.getTopCard().faceName)) {
            return 'Enemy face cards and Aces cannot capture your cards.';
        }
        for (let card of this.playerSelectedCards) {
            if (this.targets.includes(card)) {
                return 'You cannot let a face card or an Ace get captured.';
            }
        }
        return 'valid';
    }

    async handleEnemyCapture() {
        const check = this.checkEnemyCapture();
        if (check !== 'valid') {
            this.resetSelection();
            this.errorMessage.setValue(check);
            return;
        }

        this.gameContainer.eventMode = 'none';

        this.dealer.moveSelection({
            selectionNames: this.enemyTableau.getTopCard().faceName,
            source: this.enemyTableau,
            destination: this.enemyDiscardPile,
            positionDestination: 'top',
            inSequence: false
        });

        await this.dealer.moveSelection({
            selectionNames: this.playerSelectedCards,
            source: this.playerTableau ,
            destination: this.enemyDiscardPile,
            positionDestination: 'top',
            inSequence: false
        });

        this.setCaptureButtons(false);
        this.resetSelection();

        await this.dealer.moveCards({
            nbCards: 1,
            source: this.enemyDrawPile ,
            destination: this.enemyTableau,
            positionSource: 'top',
            positionDestination: 'bottom',
            inSequence: false
        });

        this.gameContainer.eventMode = 'static';
    }

    getPlayerSelectedCardsValue() {
        let max = 0;
        for (let card of this.playerSelectedCards) {
            if (paramsAtlas[card].value > max) {
                max = paramsAtlas[card].value;
            }
        }
        const cardsValue = this.playerSelectedCards.reduce((accumulator, card) => {
            if (paramsAtlas[card].suit === 'J') {
                return accumulator + max;
            } else {
                return accumulator + paramsAtlas[card].value;
            }
        }, 0);
        return cardsValue;
    }

    checkPlayerCapture() {
        if (!this.playerSelectedCards.length) {
            return 'You must select cards to capture the enemy card.';
        }
        if (this.enemySelectedCard === null) {
            return 'You must select an enemy card to capture.';
        }
        for (let card of this.playerSelectedCards) {
            if (paramsAtlas[card].suit !== 'J' && paramsAtlas[card].suit !== this.enemySelectedCard.params.suit) {
                return 'All cards must have the same suit.';
            }
        }
        if (this.getPlayerSelectedCardsValue() < this.enemySelectedCard.params.value) {
            return 'Selected cards are not powerful enough to capture enemy.';
        }
        return 'valid';
    }

    async handlePlayerCapture() {
        const check = this.checkPlayerCapture();
        if (check !== 'valid') {
            this.resetSelection();
            this.errorMessage.setValue(check);
            return;
        }

        this.gameContainer.eventMode = 'none';

        this.dealer.moveSelection({
            selectionNames: this.enemySelectedCard.faceName,
            source: this.enemyTableau,
            destination: this.playerDiscardPile,
            positionDestination: 'top',
            inSequence: false
        });

        await this.dealer.moveSelection({
            selectionNames: this.playerSelectedCards,
            source: this.playerTableau ,
            destination: this.playerDiscardPile,
            positionDestination: 'top',
            inSequence: false
        });

        this.setCaptureButtons(false);
        this.resetSelection();

        await this.dealer.moveCards({
            nbCards: 1,
            source: this.enemyDrawPile ,
            destination: this.enemyTableau,
            positionSource: 'top',
            positionDestination: 'bottom',
            inSequence: false
        });

        this.gameContainer.eventMode = 'static';
    }

    async handlePlayerDiscard() {
        this.gameContainer.eventMode = 'none';

        if (this.playerSelectedCards.length) {
            await this.dealer.moveSelection({
                selectionNames: this.playerSelectedCards,
                source: this.playerTableau ,
                destination: this.playerDiscardPile,
                positionDestination: 'top',
                inSequence: false
            });
        }

        this.setCaptureButtons(true);
        this.resetSelection();

        if (this.playerTableau.cards.length < 4) {
            await this.dealer.moveCards({
                nbCards: 4 - this.playerTableau.cards.length,
                source: this.playerDrawPile ,
                destination: this.playerTableau,
                positionSource: 'top',
                positionDestination: 'bottom',
                inSequence: true
            });
        }

        this.gameContainer.eventMode = 'static';
    }

}
