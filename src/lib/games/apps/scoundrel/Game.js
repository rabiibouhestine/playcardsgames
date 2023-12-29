import * as PIXI from "pixi.js";

import cardsSpritesheetImage from '../../assets/images/spritesheet.png';
import cardsSpritesheetAtlas from '../../assets/json/spritesheet.json';

import { App } from '../../utils/App';
import { Cards } from '../../utils/Cards';
import { Dealer } from '../../utils/Dealer';
import { Number } from "../../utils/Number";
import { Button } from "../../utils/Button";
import { GameOverPanel } from "../../utils/GameOverPanel";
import { Header } from "../../utils/Header";

import { Mattress } from "./Mattress";
import paramsAtlas from './values.json';

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

        // add header
        this.header = new Header(this.gameContainer, {
            onRestartClick: this.handleRestart.bind(this)
        });

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
            position: {x: 70, y: 205},
            faceUp: false,
            counter: true,
            onPointerDown: this.handleCardClick.bind(this)
        });

        // add discard pile
        this.discardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 650, y: 205},
            faceUp: false,
            counter: true,
            zIndex: 52
        });

        // add room tableau
        this.roomTableau = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            name: 'room',
            type: 'tableau',
            gap: 20,
            position: {x: 360, y: 205},
            faceUp: true,
            isInteractive: true
        });

        // add weapon Stack
        this.weaponStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            name: 'weapon',
            type: 'stackH',
            gap: 50,
            position: {x: 360, y: 515},
            faceUp: true
        });

        // add skip room button
        this.skipRoomButton = new Button(this.gameContainer, {
            width: 380,
            height: 50,
            text: "Skip Room",
            x: 360,
            y: 305,
            onPointerDown: this.handleSkipRoom.bind(this)
        });

        // add heal button
        this.healButton = new Button(this.gameContainer, {
            width: 80,
            height: 50,
            text: "Heal",
            x: 70,
            y: 395,
            onPointerDown: this.handleHeal.bind(this)
        });

        // add pick button
        this.pickButton = new Button(this.gameContainer, {
            width: 80,
            height: 50,
            text: "Pick",
            x: 650,
            y: 395,
            onPointerDown: this.handlePick.bind(this)
        });

        // add weapon button
        this.weaponButton = new Button(this.gameContainer, {
            width: 220,
            height: 50,
            text: "Attack with Weapon",
            x: 240,
            y: 395,
            onPointerDown: this.handleWeapon.bind(this)
        });

        // add hand button
        this.handButton = new Button(this.gameContainer, {
            width: 220,
            height: 50,
            text: "Attack barehanded",
            x: 480,
            y: 395,
            onPointerDown: this.handleHand.bind(this)
        });

        // hide buttons
        this.disableButtons();

        // add health value
        this.healthValue = new Number(this.gameContainer, {x:275, y: 670}, 20, {});

        // add weapon value
        this.weaponValue = new Number(this.gameContainer, {x:445, y: 670}, 0, {});

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
        if (!this.header.isTimerRunning) {
            this.header.startTimer();
        }
        // disable interactions
        this.gameContainer.eventMode = 'none';

        this.disableButtons();
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
        if (!this.header.isTimerRunning) {
            this.header.startTimer();
        }
        if (card.location === 'room') {
            this.disableButtons();
            if (this.selectedCard === null) {
                card.sprite.y = card.position.y - 20;
                this.selectedCard = card;
                this.enableButtons();
            } else if (this.selectedCard.faceName === card.faceName) {
                card.sprite.y = card.position.y;
                this.selectedCard = null;
            } else {
                this.selectedCard.sprite.y = this.selectedCard.position.y;
                card.sprite.y = card.position.y - 20;
                this.selectedCard = card;
                this.enableButtons();
            }
        }
    }

    disableButtons() {
        this.healButton.setEnabled(false);
        this.pickButton.setEnabled(false);
        this.weaponButton.setEnabled(false);
        this.handButton.setEnabled(false);
    }

    enableButtons() {
        switch (this.selectedCard.params.suit) {
            case 'H':
                this.healButton.setEnabled(true);
                break;
            case 'D':
                this.pickButton.setEnabled(true);
                break;
            default:
                this.handButton.setEnabled(true);
                const monsterValue = this.selectedCard.params.value;
                const hasNewWeapon = this.weaponStack.cards.length === 1;
                const usedWeapon = this.weaponStack.cards.length >= 2;
                const canUseWeapon = usedWeapon && this.weaponStack.getTopCard().params.value >= monsterValue;
                if (hasNewWeapon || canUseWeapon) {
                    this.weaponButton.setEnabled(true);
                } else {
                    this.weaponButton.setEnabled(false);
                }
                break;
        }
    }

    async handleHeal() {
        // disable interactions
        this.gameContainer.eventMode = 'none';

        this.disableButtons();
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

        this.disableButtons();
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

        this.disableButtons();
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

        this.disableButtons();
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
        if (!this.roomTableau.cards.length && !this.dungeonPile.cards.length && this.healthValue.getValue() > 0) {
            let score = 0;
            if (this.selectedCard !== null && this.selectedCard.params.suit === 'H') {
                score += this.selectedCard.params.value;
            }
            score += this.healthValue.getValue();
            this.handleGameOver(score);
            return;
        }
        if (this.healthValue.getValue() <= 0) {
            this.handleGameOver(-this.getMonstersValue());
            return;
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
        this.selectedCard = null;
    }

    async handleRestart() {
        // reset timer
        this.header.resetTimer();

        // disable interactions
        this.gameContainer.eventMode = 'none';
        // remove blur
        this.gameContainer.filters = [];
        this.mattressContainer.filters = [];

        this.gameOverPanel.setVisible(false);
        this.disableButtons();
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
        // stop timer
        this.header.stopTimer();

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
