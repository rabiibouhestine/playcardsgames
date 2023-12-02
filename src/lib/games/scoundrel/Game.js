import * as PIXI from "pixi.js";

import cardsSpritesheetImage from '../assets/images/spritesheetColor.png';
import cardsSpritesheetAtlas from '../assets/json/cardsSpritesheet.json';
import paramsAtlas from '../assets/json/scoundrel.json';

import { App } from '../utils/App';
import { Cards } from '../utils/Cards';
import { Dealer } from '../utils/Dealer';
import { ProgressBar } from "../utils/ProgressBar";
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

        // disable interactions
        this.gameContainer.eventMode = 'none';

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

        // add restart button
        this.restartButton = new Button(this.gameContainer, {
            width: 120,
            height: 50,
            text: "Restart",
            x: 660,
            y: 304,
            onPointerDown: this.handleRestart.bind(this)
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
        this.healthValue = new ProgressBar(this.gameContainer, {
            x: 0,
            y: 530,
            width: 720,
            height: 20,
            value: 20,
            maxValue: 20
        });

        // set selected card
        this.selectedCard = null;

        // set used heal in round
        this.usedHeal = false;

        // game over panel
        this.gameOverPanel = new GameOverPanel(this.modalContainer, this.handleRestart.bind(this), "Score:");

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

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    async handleSkipRoom() {
        // disable interactions
        this.gameContainer.eventMode = 'none';

        this.hideButtons();
        this.skipRoomButton.setEnabled(false);
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

        // enable interactions
        this.gameContainer.eventMode = 'static';
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
        // disable interactions
        this.gameContainer.eventMode = 'none';

        this.hideButtons();
        if (!this.usedHeal) {
            this.healthValue.setValue(Math.min(20, this.healthValue.getValue() + this.selectedCard.params.value));
            this.usedHeal = true;
        }
        await this.dealer.moveSelection({
            selectionNames: this.selectedCard.faceName,
            source: this.roomTableau,
            destination: this.discardPile,
            positionDestination: 'top',
            inSequence: false
        });
        this.updateRoom();

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    async handlePick() {
        // disable interactions
        this.gameContainer.eventMode = 'none';

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

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    async handleWeapon() {
        // disable interactions
        this.gameContainer.eventMode = 'none';

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

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    async handleHand() {
        // disable interactions
        this.gameContainer.eventMode = 'none';

        this.hideButtons();
        this.healthValue.setValue(Math.max(0, this.healthValue.getValue() - this.selectedCard.params.value));
        await this.dealer.moveSelection({
            selectionNames: this.selectedCard.faceName,
            source: this.roomTableau,
            destination: this.discardPile,
            positionDestination: 'top',
            inSequence: false
        });
        this.updateRoom();

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    async updateRoom() {
        if (this.roomTableau.cards.length < 4) {
            this.skipRoomButton.setEnabled(false);
        }
        if (this.roomTableau.cards.length === 1 && this.dungeonPile.cards.length) {
            this.usedHeal = false;
            this.skipRoomButton.setEnabled(true);
            await this.dealer.moveCards({
                nbCards: Math.min(3, this.dungeonPile.cards.length),
                source: this.dungeonPile,
                destination: this.roomTableau,
                positionSource: 'top',
                positionDestination: 'bottom',
                inSequence: true
            });
        }
        if (!this.roomTableau.cards.length && !this.dungeonPile.cards.length && this.healthValue.getValue() > 0) {
            let score = 0;
            if (this.selectedCard !== null && this.selectedCard.params.suit === 'H') {
                score += this.selectedCard.params.value;
            }
            score += this.healthValue.getValue();
            this.handleGameOver(score);
        }
        if (this.healthValue.getValue() <= 0) {
            this.handleGameOver(-this.getMonstersValue());
        }
        this.selectedCard = null;
    }

    async handleRestart() {
        // disable interactions
        this.gameContainer.eventMode = 'none';
        // remove blur
        this.gameContainer.filters = [];
        this.mattressContainer.filters = [];

        this.gameOverPanel.setVisible(false);
        this.hideButtons();
        this.selectedCard = null;
        if (this.roomTableau.cards.length) {
            await this.dealer.moveCards({
                nbCards: this.roomTableau.cards.length,
                source: this.roomTableau,
                destination: this.dungeonPile,
                positionSource: 'bottom',
                positionDestination: 'top',
                inSequence: false
            });
        }
        if (this.discardPile.cards.length) {
            await this.dealer.moveCards({
                nbCards: this.discardPile.cards.length,
                source: this.discardPile,
                destination: this.dungeonPile,
                positionSource: 'top',
                positionDestination: 'top',
                inSequence: false
            });
        }
        if (this.weaponStack.cards.length) {
            await this.dealer.moveCards({
                nbCards: this.weaponStack.cards.length,
                source: this.weaponStack,
                destination: this.dungeonPile,
                positionSource: 'top',
                positionDestination: 'top',
                inSequence: false
            });
        }
        this.dungeonPile.shuffleCards();
        this.healthValue.setValue(20);
        await this.dealer.moveCards({
            nbCards: 4,
            source: this.dungeonPile,
            destination: this.roomTableau,
            positionSource: 'top',
            positionDestination: 'bottom',
            inSequence: true
        });
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

    getMonstersValue() {
        const roomMonsters = this.roomTableau.cards.filter(card => card.params.suit === "C" || card.params.suit === "S");
        const dungeonMonsters = this.dungeonPile.cards.filter(card => card.params.suit === "C" || card.params.suit === "S");

        const roomMonstersValue = roomMonsters.reduce((accumulator, card) => {
            return accumulator + card.params.value;
        }, 0);
        const dungeonMonstersValue = dungeonMonsters.reduce((accumulator, card) => {
            return accumulator + card.params.value;
        }, 0);

        return roomMonstersValue + dungeonMonstersValue;
    }
}
