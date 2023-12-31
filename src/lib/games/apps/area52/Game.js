import * as PIXI from 'pixi.js';

import cardsSpritesheetImage from '../../assets/images/spritesheet.png';
import cardsSpritesheetAtlas from '../../assets/json/spritesheet.json';

import { App } from '../../utils/App';
import { Cards } from '../../utils/Cards';
import { Dealer } from '../../utils/Dealer';
import { Message } from '../../utils/Message';
import { Button } from '../../utils/Button';
import { GameOverPanel } from '../../utils/GameOverPanel';
import { Header } from "../../utils/Header";

import paramsAtlas from './values.json';
import battleCardsAtlas from './defenders.json';
import { Mattress } from './Mattress';

export class Game extends App {
    constructor(canvasRef, isMute) {
        super(canvasRef, isMute);
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
        this.errorMessage = new Message(this.gameContainer, { x: 360, y: 90 }, 20);

        // game over panel
        this.gameOverPanel = new GameOverPanel(this.modalContainer, this.handleRestart.bind(this));

        // add header
        this.header = new Header(this.gameContainer, {
            onRestartClick: this.handleRestart.bind(this)
        });

        // add sacrifice button
        this.sacrificeButton = new Button(this.gameContainer, {
            width: 170,
            height: 50,
            text: "Sacrifice",
            textSize: 20,
            x: 175,
            y: 666,
            onPointerDown: this.handleSacrifice.bind(this)
        });

        // add single attack button
        this.singleAttackButton = new Button(this.gameContainer, {
            width: 170,
            height: 50,
            text: "Single Attack",
            textSize: 20,
            x: 360,
            y: 666,
            onPointerDown: this.handleSingleAttack.bind(this)
        });

        // add dual attack button
        this.dualAttackButton = new Button(this.gameContainer, {
            width: 170,
            height: 50,
            text: "Dual Attack",
            textSize: 20,
            x: 545,
            y: 666,
            onPointerDown: this.hanleDualAttack.bind(this)
        });

        // selected cards
        this.selectedCards = [];

        // wave
        this.wave = 1;

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
            position: {x: 130, y: 206},
            faceUp: false,
            counter: true,
            onPointerDown: this.onCardPointerDown.bind(this)
        });

        // add defenders pile
        this.defendersPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: this.defendersDeck,
            position: {x: 590, y: 206},
            faceUp: false,
            counter: true,
            onPointerDown: this.onCardPointerDown.bind(this)
        });

        // add discard pile
        this.discardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 450, y: 206},
            faceUp: false,
            counter: true
        });

        // add aliens stack
        this.alienStack = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'stackH',
            faceNames: [],
            position: {x: 210, y: 206},
            faceUp: true,
            counter: false,
            centered:false,
            gap: 50
        });

        // add battle cards
        this.battleCards = [];
        for (let i = 0; i < 6; i++) {
            this.battleCards[i] = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
                name: i,
                type: 'pile',
                faceNames: [],
                position: battleCardsAtlas.positions[i],
                faceUp: true,
                counter: false,
                isInteractive: true
            });
        }

        // restock
        await this.restock();

        // draw 3 alien
        await this.drawAliens();

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    async restock() {
        for (let i = 0; i < 6; i++) {
            if (!this.battleCards[i].cards.length && this.defendersPile.cards.length) {
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.defendersPile ,
                    destination: this.battleCards[i],
                    positionSource: 'top',
                    positionDestination: 'top'
                });
                await this.dealer.delay(100);
            }
        }
        return new Promise((resolve) => {
            resolve();
        });
    }

    onCardPointerDown(card) {
        this.errorMessage.clear();
        if (!this.header.isTimerRunning) {
            this.header.startTimer();
        }
        if (this.selectedCards.includes(card.faceName)) {
            this.selectedCards = this.selectedCards.filter(name => name !== card.faceName);
            this.mattress.clearHighlight(card.location);
        } else {
            this.selectedCards.push(card.faceName);
            this.mattress.setHighlighted(card.location);
        }
    }

    checkDualAttack() {
        if (this.selectedCards.length !== 2) {
            return 'A dual attack must consist of exactly 2 defenders.'
        }
        const slectionSum = this.selectedCards.reduce((accumulator, cardName) => {
            return accumulator + paramsAtlas[cardName].value;
        }, 0);
        const alienValue = this.alienStack.getTopCard().params.value;
        if (slectionSum !== alienValue) {
            return 'Defenders value must match the alien value: ' + alienValue;
        }
        return 'valid';
    }

    async hanleDualAttack() {
        const check = this.checkDualAttack();
        if (check !== 'valid') {
            this.errorMessage.setValue(check);
            return;
        }

        this.gameContainer.eventMode = 'none';

        for (let i = 0; i < 6; i++) {
            this.mattress.clearHighlight(i);
        }

        await this.dealer.moveCards({
            nbCards: 1,
            source: this.alienStack ,
            destination: this.discardPile,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.selectedCards = [];
        await this.restock();
        await this.handleWave();
        this.gameContainer.eventMode = 'static';
    }

    getColor(suit) {
        switch (suit) {
            case 'H':
                return 'Red';
            case 'D':
                return 'Red';
            case 'S':
                return 'Black';
            case 'C':
                return 'Black';
        }
    }

    checkSingleAttack() {
        if (this.selectedCards.length !== 1) {
            return 'A single attack must consist of exactly 1 defender.'
        }
        if (paramsAtlas[this.selectedCards[0]].value < this.alienStack.getTopCard().params.value) {
            return 'Selected defender is not strong enough to beat the alien.'
        }
        const defenderColor = this.getColor(paramsAtlas[this.selectedCards[0]].suit);
        const alienColor = this.getColor(this.alienStack.getTopCard().params.suit);
        if (defenderColor === alienColor) {
            return 'The defender must have the opposite color of the alien.'
        }
        return 'valid';
    }

    async handleSingleAttack() {
        const check = this.checkSingleAttack();
        if (check !== 'valid') {
            this.errorMessage.setValue(check);
            return;
        }

        this.gameContainer.eventMode = 'none';

        for (let i = 0; i < 6; i++) {
            if (this.selectedCards.includes(this.battleCards[i].getTopCard().faceName)) {
                this.mattress.clearHighlight(i);
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.battleCards[i],
                    destination: this.discardPile,
                    positionSource: 'top',
                    positionDestination: 'top'
                });
                await this.dealer.moveCards({
                    nbCards: 1,
                    source: this.alienStack ,
                    destination: this.battleCards[i],
                    positionSource: 'top',
                    positionDestination: 'top'
                });
            }
        }

        this.selectedCards = [];
        await this.restock();
        await this.handleWave();
        this.gameContainer.eventMode = 'static';
    }

    checkSacrifice() {
        if (this.selectedCards.length !== 1) {
            return 'A sacrifice must consist of exactly 1 defender.'
        }
        return 'valid';
    }

    async handleSacrifice() {
        const check = this.checkSacrifice();
        if (check !== 'valid') {
            this.errorMessage.setValue(check);
            return;
        }

        this.gameContainer.eventMode = 'none';

        for (let i = 0; i < 6; i++) {
            if (this.selectedCards.includes(this.battleCards[i].getTopCard().faceName)) {
                this.mattress.clearHighlight(i);
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.battleCards[i],
                    destination: this.discardPile,
                    positionSource: 'top',
                    positionDestination: 'top'
                });
                await this.dealer.moveCards({
                    nbCards: 1,
                    source: this.alienStack ,
                    destination: this.aliensPile,
                    positionSource: 'top',
                    positionDestination: 'bottom'
                });
            }
        }

        this.selectedCards = [];
        await this.restock();
        await this.handleWave();
        this.gameContainer.eventMode = 'static';
    }

    async drawAliens() {
        await this.dealer.moveCards({
            nbCards: Math.min(this.aliensPile.cards.length, 3),
            source: this.aliensPile ,
            destination: this.alienStack,
            positionSource: 'top',
            positionDestination: 'top',
            inSequence: false
        });
        return new Promise((resolve) => {
            resolve();
        });
    }

    async handleWave() {
        if (!this.alienStack.cards.length) {
            if (this.aliensPile.cards.length) {
                await this.drawAliens();
            } else if (this.wave === 1) {
                this.wave ++;
                this.discardPile.shuffleCards();
                await this.dealer.moveCards({
                    nbCards: this.discardPile.cards.length,
                    source: this.discardPile ,
                    destination: this.aliensPile,
                    positionSource: 'top',
                    positionDestination: 'top',
                    inSequence: false
                });
                await this.drawAliens();
            } else {
                this.handleGameOver();
            }
        }
        return new Promise((resolve) => {
            resolve();
        });
    }

    async handleRestart() {
        // disable interactions
        this.gameContainer.eventMode = 'none';

        // reset timer
        this.header.resetTimer();

        // clear highlights
        for (let i = 0; i < 6; i++) {
            this.mattress.clearHighlight(i);
        }
        
        // remove blur
        this.gameContainer.filters = [];
        this.mattressContainer.filters = [];

        // hide game over panel
        this.gameOverPanel.setVisible(false);

        // clear error message
        this.errorMessage.clear();

        // reset selection
        this.selectedCards = [];

        // reset values
        this.wave = 1;

        // collect all cards into the discard pile
        this.dealer.moveCards({
            nbCards: this.aliensPile.cards.length,
            source: this.aliensPile ,
            destination: this.discardPile,
            positionSource: 'top',
            positionDestination: 'top',
            inSequence: false
        });
        this.dealer.moveCards({
            nbCards: this.alienStack.cards.length,
            source: this.alienStack ,
            destination: this.discardPile,
            positionSource: 'top',
            positionDestination: 'top',
            inSequence: false
        });
        this.dealer.moveCards({
            nbCards: this.defendersPile.cards.length,
            source: this.defendersPile ,
            destination: this.discardPile,
            positionSource: 'top',
            positionDestination: 'top',
            inSequence: false
        });
        for (let i = 0; i < 6; i++) {
            if (this.battleCards[i].cards.length) {
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.battleCards[i],
                    destination: this.discardPile,
                    positionSource: 'top',
                    positionDestination: 'top',
                    inSequence: false
                });
            }
        }
        await this.dealer.delay(700);

        // fill aliens pile
        this.dealer.moveSelection({
            selectionNames: this.aliensDeck,
            source: this.discardPile ,
            destination: this.aliensPile,
            positionDestination: 'top',
            inSequence: false
        });

        // fill defenders pile
        this.dealer.moveSelection({
            selectionNames: this.defendersDeck,
            source: this.discardPile ,
            destination: this.defendersPile,
            positionDestination: 'top',
            inSequence: false
        });

        await this.dealer.delay(700);

        // shuffle piles
        this.aliensPile.shuffleCards();
        this.defendersPile.shuffleCards();

        // initialise game
        await this.restock();
        await this.drawAliens();

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    handleGameOver() {
        // stop timer
        this.header.stopTimer();

        // get time
        const timeformatted = new Date(this.header.getTime()).toISOString().substring(14, 19);

        // blur screen
        const blurFilter = new PIXI.BlurFilter();
        this.gameContainer.filters = [blurFilter];
        this.mattressContainer.filters = [blurFilter];

        // disable interactions
        this.gameContainer.eventMode = 'none';

        // show game over panel
        this.gameOverPanel.setScore(this.defendersPile.cards.length + ' in ' + timeformatted);
        this.gameOverPanel.setVisible(true);
    }
}
