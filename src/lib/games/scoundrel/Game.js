import * as PIXI from "pixi.js";

import cardsSpritesheetImage from '../assets/images/spritesheetColor.png';
import cardsSpritesheetAtlas from '../assets/json/cardsSpritesheet.json';
import paramsAtlas from '../assets/json/clearTheDungeon.json';

import { App } from '../utils/App';
import { Cards } from '../utils/Cards';
import { Dealer } from '../utils/Dealer';
import { Message } from "../utils/Message";
import { Number } from "../utils/Number";
import { Button } from "../utils/Button";
import { GameOverPanel } from "../utils/GameOverPanel";

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

        // make dungeon pile deck
        const dungeonPileDeck = this.dealer.shuffleCards([
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS',
            'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
            '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH',
            '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD'
        ]);

        // add dungeon pile
        this.dungeonPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: dungeonPileDeck,
            position: {x: 60, y: 171},
            faceUp: false,
            counter: true,
            onPointerDown: this.handleCardClick.bind(this)
        });

        // add discard pile
        this.discardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 660, y: 171},
            faceUp: false,
            counter: true,
            zIndex: 52
        });

        // add room tableau
        this.roomTableau = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            name: 'room',
            type: 'tableau',
            gap: 20,
            position: {x: 360, y: 171},
            faceUp: true,
            isInteractive: true
        });

        // add weapon Stack
        this.weaponStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            name: 'weapon',
            type: 'stackH',
            gap: 40,
            position: {x: 360, y: 442},
            faceUp: true
        });

        // add skip room button
        this.skipRoomButton = new Button(this.gameContainer, {
            width: 120,
            height: 50,
            text: "Skip Room",
            x: 60,
            y: 304,
            onPointerDown: this.handleSkipRoom.bind(this)
        });

        // add heal button
        this.healButton = new Button(this.gameContainer, {
            width: 200,
            height: 50,
            text: "♥ Heal",
            x: 360,
            y: 304,
            onPointerDown: this.handleHeal.bind(this)
        });

        // add pick button
        this.pickButton = new Button(this.gameContainer, {
            width: 200,
            height: 50,
            text: "♦ Pick",
            x: 360,
            y: 304,
            onPointerDown: this.handlePick.bind(this)
        });

        // add weapon button
        this.weaponButton = new Button(this.gameContainer, {
            width: 200,
            height: 50,
            text: "Sword Attack",
            x: 250,
            y: 304,
            onPointerDown: this.handleWeapon.bind(this)
        });

        // add hand button
        this.handButton = new Button(this.gameContainer, {
            width: 200,
            height: 50,
            text: "Hand Attack",
            x: 472,
            y: 304,
            onPointerDown: this.handleHand.bind(this)
        });

        // hide buttons
        this.hideButtons();

        // add health value
        this.healthValue = new Number(this.gameContainer, { x: 360, y: 545 }, 20, { fontSize: 20 });

        // set selected card
        this.selectedCard = null;

        // draw first room
        await this.dealer.moveCards({
            nbCards: 4,
            source: this.dungeonPile ,
            destination: this.roomTableau,
            positionSource: 'top',
            positionDestination: 'bottom',
            inSequence: true,
            immediate: false
        });
    }

    async handleSkipRoom() {
        await this.dealer.moveCards({
            nbCards: this.roomTableau.cards.length,
            source: this.roomTableau,
            destination: this.dungeonPile,
            positionSource: 'bottom',
            positionDestination: 'bottom',
            inSequence: true
        });
        await this.dealer.moveCards({
            nbCards: Math.min(this.dungeonPile.cards.length, 4),
            source: this.dungeonPile,
            destination: this.roomTableau,
            positionSource: 'top',
            positionDestination: 'bottom',
            inSequence: true
        });
    }

    handleCardClick(card) {
        if (card.location === 'room') {
            this.hideButtons();
            if (this.selectedCard === null) {
                card.sprite.y = card.position.y - 20;
                this.selectedCard = card;
                this.showButtons();
            } else if (this.selectedCard.faceName === card.faceName) {
                card.sprite.y = card.position.y;
                this.selectedCard = null;
            } else {
                this.selectedCard.sprite.y = this.selectedCard.position.y;
                card.sprite.y = card.position.y - 20;
                this.selectedCard = card;
                this.showButtons();
            }
        }
    }

    hideButtons() {
        this.healButton.container.visible = false;
        this.pickButton.container.visible = false;
        this.weaponButton.container.visible = false;
        this.handButton.container.visible = false;
    }

    showButtons() {
        switch (this.selectedCard.params.suit) {
            case 'H':
                this.healButton.container.visible = true;
                break;
            case 'D':
                this.pickButton.container.visible = true;
                break;
            default:
                const monsterValue = this.selectedCard.params.value;
                const hasNewWeapon = this.weaponStack.cards.length === 1;
                const usedWeapon = this.weaponStack.cards.length >= 2;
                const canUseWeapon = usedWeapon && this.weaponStack.getTopCard().params.value >= monsterValue;
                if (hasNewWeapon || canUseWeapon) {
                    this.weaponButton.setEnabled(true);
                } else {
                    this.weaponButton.setEnabled(false);
                }
                this.weaponButton.container.visible = true;
                this.handButton.container.visible = true;
                break;
        }
    }

    async handleHeal() {
        this.hideButtons();
        this.dealer.moveSelection({
            selectionNames: this.selectedCard.faceName,
            source: this.roomTableau,
            destination: this.discardPile,
            positionDestination: 'top',
            inSequence: false
        });
        await this.healthValue.setValue(Math.min(20, this.healthValue.getValue() + this.selectedCard.params.value));
        this.updateRoom();
    }

    async handlePick() {
        this.hideButtons();
        await this.dealer.moveCards({
            nbCards: this.weaponStack.cards.length,
            source: this.weaponStack,
            destination: this.discardPile,
            positionSource: 'top',
            positionDestination: 'top',
            inSequence: true
        });
        await this.dealer.moveSelection({
            selectionNames: this.selectedCard.faceName,
            source: this.roomTableau,
            destination: this.weaponStack,
            positionDestination: 'top',
            inSequence: false
        });
        this.updateRoom();
    }

    async handleWeapon() {
        this.hideButtons();
        if (this.weaponStack.getTopCard().params.value < this.selectedCard.params.value) {
            const damage = this.selectedCard.params.value - this.weaponStack.getTopCard().params.value;
            this.healthValue.setValue(Math.max(0, this.healthValue.getValue() - damage));
        }
        await this.dealer.moveSelection({
            selectionNames: this.selectedCard.faceName,
            source: this.roomTableau,
            destination: this.weaponStack,
            positionDestination: 'top',
            inSequence: false
        });
        this.updateRoom();
    }

    async handleHand() {
        this.hideButtons();
        this.dealer.moveSelection({
            selectionNames: this.selectedCard.faceName,
            source: this.roomTableau,
            destination: this.discardPile,
            positionDestination: 'top',
            inSequence: false
        });
        await this.healthValue.setValue(Math.max(0, this.healthValue.getValue() - this.selectedCard.params.value));
        this.updateRoom();
    }

    async updateRoom() {
        if (this.roomTableau.cards.length === 1) {
            await this.dealer.moveCards({
                nbCards: 3,
                source: this.dungeonPile,
                destination: this.roomTableau,
                positionSource: 'top',
                positionDestination: 'bottom',
                inSequence: true
            });
        }
    }
}
