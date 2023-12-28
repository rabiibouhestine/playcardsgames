import * as PIXI from "pixi.js";

import cardsSpritesheetImage from '../../assets/images/spritesheet.png';
import cardsSpritesheetAtlas from '../../assets/json/spritesheet.json';

import { App } from '../../utils/App';
import { Card } from '../../utils/Card';
import { Cards } from '../../utils/Cards';
import { Dealer } from '../../utils/Dealer';
import { Number } from "../../utils/Number";
import { Message } from "../../utils/Message";
import { Button } from "../../utils/Button";
import { GameOverPanel } from "../../utils/GameOverPanel";

import { Mattress } from "./Mattress";
import { ConfirmButton } from "./ConfirmButton";
import { RoyalSuits } from "./RoyalSuits";
import paramsAtlas from './values.json';

export class Game extends App {
    constructor(canvasRef) {
        super(canvasRef);
        this.init();
    }

    async init() {
        const cardsSpritesheetTexture = await PIXI.Assets.load(cardsSpritesheetImage);
        this.spritesheet = new PIXI.Spritesheet(
            cardsSpritesheetTexture,
            cardsSpritesheetAtlas
        );
        await this.spritesheet.parse();

        this.Mattress = new Mattress(this.mattressContainer);

        this.dealer = new Dealer();

        // disable interactions
        this.gameContainer.eventMode = 'none';

        // GAME SETUP

        const pileDeck = this.dealer.shuffleCards([
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS',
            'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC',
            'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH',
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD'
        ]);

        const royalsDeck = [
            ...this.dealer.shuffleCards(['KD', 'KS', 'KH', 'KC']),
            ...this.dealer.shuffleCards(['QD', 'QS', 'QH', 'QC']),
            ...this.dealer.shuffleCards(['JD', 'JS', 'JH', 'JC'])
        ];

        this.jokerLeft = new Card(this.gameContainer, this.spritesheet, paramsAtlas, {
            faceName: 'J1',
            position: {x: 556, y: 195},
            faceUp: true,
            isInteractive: true,
            location: "jokerLeft",
            onPointerUp: this.handleJoker.bind(this)
        });

        this.jokerRight = new Card(this.gameContainer, this.spritesheet, paramsAtlas, {
            faceName: 'J2',
            position: {x: 656, y: 195},
            faceUp: true,
            isInteractive: true,
            location: "jokerRight",
            onPointerUp: this.handleJoker.bind(this)
        });

        this.royalsPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: royalsDeck,
            backName: "B1",
            position: {x: 244, y: 195},
            faceUp: false,
            onPointerUp: this.handleCardClick.bind(this),
            onPointerOver: this.handleCardOver.bind(this),
            onPointerOut: this.handleCardOut.bind(this)
        });

        this.drawPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: pileDeck,
            position: {x: 656, y: 385},
            faceUp: false,
            counter: true,
            onPointerUp: this.handleCardClick.bind(this),
            onPointerOver: this.handleCardOver.bind(this),
            onPointerOut: this.handleCardOut.bind(this)
        });

        this.discardPile = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 556, y: 385},
            faceUp: true,
            counter: false,
            onPointerUp: this.handleCardClick.bind(this),
            onPointerOver: this.handleCardOver.bind(this),
            onPointerOut: this.handleCardOut.bind(this)
        });

        this.field = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            name: 'field',
            type: 'stackH',
            gap: 50,
            position: {x: 245, y: 370},
            faceUp: true,
            onPointerUp: this.handleCardClick.bind(this),
            onPointerOver: this.handleCardOver.bind(this),
            onPointerOut: this.handleCardOut.bind(this)
        });

        this.hand = new Cards(this.gameContainer, this.spritesheet, paramsAtlas, {
            name: 'hand',
            type: 'tableau',
            gap: 4,
            position: {x: 360, y: 575},
            faceUp: true,
            isInteractive: true,
            onPointerUp: this.handleCardClick.bind(this),
            onPointerOver: this.handleCardOver.bind(this),
            onPointerOut: this.handleCardOut.bind(this)
        });

        // Info Panel
        this.Message = new Message(this.gameContainer, {x: 350, y: 480});

        // Confirm Button
        this.confirmButton = new ConfirmButton(this.gameContainer, {
            onPointerDown: this.handleConfirm.bind(this)
        });
        
        // Reset Button
        this.resetButton = new Button(this.gameContainer, {
            onPointerDown: this.handleReset.bind(this),
            x: 666,
            y: 685
        });

        // Game Variables
        this.jokerLeftAlive = true;
        this.jokerRightAlive = true;
        this.phase = 'attack';
        this.selectionNames = [];
        this.confirmButton.update(this.phase, this.getSelectionValue());
        this.gameOverEvent = new Event("gameOver", { bubbles: true, cancelable: false });
        this.royalsDefeated = 0;

        // flip top royal
        this.royalsPile.getTopCard().flip(true);

        // Royal Stats
        this.royalHealth = new Number(this.gameContainer, {x:109, y: 170}, 0, {});
        this.royalAttack = new Number(this.gameContainer, {x:380, y: 170}, 0, {});

        this.royalHealth.setValue(20);
        this.royalAttack.setValue(10);

        // royalSuits
        this.royalSuits = new RoyalSuits(this.gameContainer);

        // draw 8 cards
        await this.dealer.moveCards({
            nbCards: 8,
            source: this.drawPile ,
            destination: this.hand,
            positionSource: 'top',
            positionDestination: 'top'
        });

        // enable interactions
        this.gameContainer.eventMode = 'static';

        // game over panel
        this.gameOverPanel = new GameOverPanel(this.modalContainer, this.handleReset.bind(this), "Royals defeated:");
    }

    async handleReset() {
        // hide game over panel
        this.gameOverPanel.setVisible(false);

        // remove blur
        this.gameContainer.filters = [];
        this.mattressContainer.filters = [];

        // disable interactions
        this.gameContainer.eventMode = 'none';

        // reset royals defeated
        this.royalsDefeated = 0;

        // set phase to reset
        this.selectionNames = [];
        this.phase = 'reset';
        this.confirmButton.update(this.phase, this.getSelectionValue());

        // reset jokers
        this.jokerLeftAlive = true;
        this.jokerRightAlive = true;
        this.jokerLeft.flip(true, false, true);
        this.jokerRight.flip(true, false, true);

        this.royalSuits.setAllSuits(false);

        this.dealer.moveCards({
            nbCards: this.hand.cards.length,
            source: this.hand ,
            destination: this.drawPile,
            inSequence: false
        });

        this.dealer.moveCards({
            nbCards: this.field.cards.length,
            source: this.field ,
            destination: this.drawPile,
            inSequence: false
        });

        this.dealer.moveCards({
            nbCards: this.royalsPile.cards.length,
            source: this.royalsPile ,
            destination: this.drawPile,
            inSequence: false
        });

        this.dealer.moveCards({
            nbCards: this.discardPile.cards.length,
            source: this.discardPile ,
            destination: this.drawPile,
            inSequence: false
        });

        this.royalHealth.setValue(0);
        this.royalAttack.setValue(0);

        await this.dealer.delay(800);

        this.dealer.moveSelection({
            selectionNames: ['KD', 'KS', 'KH', 'KC'],
            source: this.drawPile ,
            destination: this.royalsPile,
            inSequence: false,
            shuffle: true
        });

        this.dealer.moveSelection({
            selectionNames: ['QD', 'QS', 'QH', 'QC'],
            source: this.drawPile ,
            destination: this.royalsPile,
            inSequence: false,
            shuffle: true
        });

        this.dealer.moveSelection({
            selectionNames: ['JD', 'JS', 'JH', 'JC'],
            source: this.drawPile ,
            destination: this.royalsPile,
            inSequence: false,
            shuffle: true
        });

        await this.dealer.delay(600);

        this.royalSuits.setAllSuits(true);

        this.royalsPile.getTopCard().flip(true, false, true);
        this.royalHealth.setValue(20);
        this.royalAttack.setValue(10);

        this.drawPile.shuffleCards();
        await this.dealer.moveCards({
            nbCards: 8,
            source: this.drawPile ,
            destination: this.hand,
            positionSource: 'top',
            positionDestination: 'top'
        });

        this.jokerLeft.setInteractive(true);
        this.jokerRight.setInteractive(true);

        this.selectionNames = [];
        this.phase = 'attack';
        this.confirmButton.update(this.phase, this.getSelectionValue());

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    async handleJoker(card) {
        // disable interactions
        this.gameContainer.eventMode = 'none';

        // disable joker
        card.setInteractive(false);

        // set joker dead
        if (card.location === 'jokerLeft') {
            this.jokerLeftAlive = false;
        } else {
            this.jokerRightAlive = false;
        }

        // flip joker card
        card.flip(false, false, true);

        // discard hand
        await this.dealer.moveCards({
            nbCards: this.hand.cards.length,
            source: this.hand ,
            destination: this.discardPile,
            positionSource: 'top',
            positionDestination: 'top',
            inSequence: false
        });

        // draw 8 cards
        await this.dealer.moveCards({
            nbCards: 8,
            source: this.drawPile ,
            destination: this.hand,
            positionSource: 'top',
            positionDestination: 'top'
        });

        // reset selection
        this.selectionNames = [];
        this.phase = 'attack';
        this.confirmButton.update(this.phase, this.getSelectionValue());

        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

    handleCardClick(card) {
        if (card.location === 'hand') {
            if (this.selectionNames.includes(card.faceName)) {
                card.sprite.y = card.position.y;
                this.selectionNames = this.selectionNames.filter(name => name !== card.faceName);
            } else {
                card.sprite.y = card.position.y - 20;
                this.selectionNames.push(card.faceName);
            }

            if (this.phase === 'attack') {
                let damage = this.getSelectionValue();
                const royalSuit = paramsAtlas[this.royalsPile.getTopCard().faceName].suit;
                if (this.selectionNames.some(cardName => paramsAtlas[cardName].suit === "C" && royalSuit !== "C")) {
                    damage = damage * 2
                }
                this.confirmButton.update(this.phase, damage);
            }
            if (this.phase === 'discard') {
                this.confirmButton.update(this.phase, this.getSelectionValue());
            }
        }
    }

    handleCardOver(card) {
        if (card.location === 'hand') {
            let effect;
            switch (card.params.suit) {
                case 'H':
                    effect = "♥ Recovers discard";
                    break;
                case 'D':
                    effect = "♦ Draws cards";
                    break;
                case 'S':
                    effect = "♠ Reduces enemy attack";
                    break;
                case 'C':
                    effect = "♣ Doubles damage";
                    break;
                default:
                    break;
            }
            const royalSuit = paramsAtlas[this.royalsPile.getTopCard().faceName].suit;
            if (card.params.suit === royalSuit) {
                effect = "Current target is immune to effect"
            }
            const infoText = "Value: " + card.params.value + " ( " + effect + " )";
            this.Message.setValue(infoText);
        }
    }

    handleCardOut(card) {
        if (card.location === 'hand') {
            this.Message.clear();
        }
    }

    handleConfirm() {
        if (this.phase === 'attack') {
            const selectionCheck = this.checkAttackSelection();
            if (selectionCheck === 'valid') {
                this.handleAttack();
            } else {
                this.Message.setValue(selectionCheck);
            }
        } else {
            const selectionCheck = this.checkDiscardSelection();
            if (selectionCheck === 'valid') {
                this.handleDiscard();
            } else {
                this.Message.setValue(selectionCheck);
            }
        }
    }

    async handleAttack() {
        // disable interactions
        this.gameContainer.eventMode = 'none';

        // update phase
        this.phase = 'resolving';
        this.confirmButton.update(this.phase);

        // royal suit
        const royalSuit = paramsAtlas[this.royalsPile.getTopCard().faceName].suit;

        // selection value
        const selectionValue = this.selectionNames.reduce((accumulator, cardName) => {
            return accumulator + paramsAtlas[cardName].value;
        }, 0);

        // selection damage
        let damage = selectionValue;

        // move selected cards to field
        await this.dealer.moveSelection({
            selectionNames: this.selectionNames,
            source: this.hand ,
            destination: this.field,
            positionDestination: 'top',
            inSequence: false
        });

        // resolve hearts
        if (this.selectionNames.some(cardName => paramsAtlas[cardName].suit === "H" && royalSuit !== "H") && this.discardPile.cards.length) {
            this.discardPile.shuffleCards();

            await this.dealer.moveCards({
                nbCards: Math.min(selectionValue, this.discardPile.cards.length),
                source: this.discardPile ,
                destination: this.drawPile,
                positionSource: 'top',
                positionDestination: 'bottom'
            });
        }

        // resolve diamonds
        if (this.selectionNames.some(cardName => paramsAtlas[cardName].suit === "D" && royalSuit !== "D") && this.drawPile.cards.length) {
            const nbMissing = 8 -  this.hand.cards.length;
            const nbDraw = Math.min(nbMissing, selectionValue);

            await this.dealer.moveCards({
                nbCards: Math.min(nbDraw, this.drawPile.cards.length),
                source: this.drawPile ,
                destination: this.hand,
                positionSource: 'top',
                positionDestination: 'top'
            });
        }

        // resolve spades
        if (this.selectionNames.some(cardName => paramsAtlas[cardName].suit === "S" && royalSuit !== "S")) {
            const newRoyalAttack = Math.max(0, this.royalAttack.getValue() - selectionValue);
            await this.royalAttack.setValue(newRoyalAttack, false, true);
        }

        // resolve clubs
        if (this.selectionNames.some(cardName => paramsAtlas[cardName].suit === "C" && royalSuit !== "C")) {
            damage = selectionValue * 2
        }

        // check if damage is exactly equal to royal health
        const isBullsEye = this.royalHealth.getValue() === damage;

        // deal damage
        const newRoyalHealth = Math.max(0, this.royalHealth.getValue() - damage);
        await this.royalHealth.setValue(newRoyalHealth, false, true);

        // resolve state
        if (this.royalHealth.getValue() === 0) {
            // update royals defeated number
            this.royalsDefeated++;

            // turn off dead royal suit icon
            this.royalSuits.setSuit(royalSuit, false);

            // move field cards to discard pile
            await this.dealer.moveCards({
                nbCards: this.field.cards.length,
                source: this.field ,
                destination: this.discardPile,
                positionSource: 'top',
                positionDestination: 'top'
            });

            if (isBullsEye) {
                // move royal to drawPile
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.royalsPile ,
                    destination: this.drawPile,
                    positionSource: 'top',
                    positionDestination: 'top'
                });
            } else {
                // move royal to discardPile
                this.dealer.moveCards({
                    nbCards: 1,
                    source: this.royalsPile ,
                    destination: this.discardPile,
                    positionSource: 'top',
                    positionDestination: 'top'
                });
            }

            if (this.royalsPile.cards.length) {
                // flip top royal
                this.royalsPile.getTopCard().flip(true, false, true);

                // if new class of royals, turn on all suits icons
                if (this.royalsPile.cards.length === 8 || this.royalsPile.cards.length === 4) {
                    this.royalSuits.setAllSuits(true);
                }

                // reset royal stats
                const newRoyalStats = paramsAtlas[this.royalsPile.getTopCard().faceName];
                this.royalHealth.setValue(newRoyalStats.health, false, true);
                await this.royalAttack.setValue(newRoyalStats.value, false, true);

                // reset selection
                this.selectionNames = [];
                this.phase = 'attack';
                this.confirmButton.update(this.phase, this.getSelectionValue());
            } else {
                this.handleGameOver();
            }
        } else if (this.royalAttack.getValue() === 0) {
            // reset selection
            this.selectionNames = [];
            this.phase = 'attack';
            this.confirmButton.update(this.phase, this.getSelectionValue());
        } else {
            // set phase
            this.selectionNames = [];
            this.phase = 'discard';
            this.confirmButton.update(this.phase, this.getSelectionValue());
        }

        // enable interactions
        this.gameContainer.eventMode = 'static';

        // check game over
        this.checkGameOver();
    }

    async handleDiscard() {
        // disable interactions
        this.gameContainer.eventMode = 'none';

        // update phase
        this.phase = 'resolving';
        this.confirmButton.update(this.phase);

        // move selected cards to discardPile
        await this.dealer.moveSelection({
            selectionNames: this.selectionNames,
            source: this.hand ,
            destination: this.discardPile,
            positionDestination: 'top',
            inSequence: false
        });

        // update phase
        this.phase = 'attack';
        this.selectionNames = [];
        this.confirmButton.update(this.phase, this.getSelectionValue());

        // enable interactions
        this.gameContainer.eventMode = 'static';

        // check game over
        this.checkGameOver();
    }

    checkAttackSelection(){    
        // Count the number of cards with values 1 to 5 in the updated selection
        const valueCounts = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        };
    
        for (const selectedCard of this.selectionNames) {
            valueCounts[paramsAtlas[selectedCard].value]++;
        }
    
        // Check if the updated selection satisfies only one of the specified conditions
        const singleCard = this.selectionNames.length === 1;
        const cardAndOne = this.selectionNames.length === 2 && valueCounts[1] === 1;
        const maxFourOnes = this.selectionNames.length === valueCounts[1] && valueCounts[1] <= 4;
        const maxFourTwos = this.selectionNames.length === valueCounts[2] && valueCounts[2] <= 4;
        const maxThreeThrees = this.selectionNames.length === valueCounts[3] && valueCounts[3] <= 3;
        const maxTwoFours = this.selectionNames.length === valueCounts[4] && valueCounts[4] <= 2;
        const maxTwoFives = this.selectionNames.length === valueCounts[5] && valueCounts[5] <= 2;
    
        const conditionsMet = (
            singleCard ||
            cardAndOne ||
            maxFourOnes ||
            maxFourTwos ||
            maxThreeThrees ||
            maxTwoFours ||
            maxTwoFives
        );

        if (!this.selectionNames.length) {
            this.sfxErrorHowl.play();
            return 'Select cards to attack with'
        } else if (!conditionsMet) {
            this.sfxErrorHowl.play();
            return 'Invalid selection';
        } else {
            return 'valid'
        }
    }

    checkDiscardSelection(){
        const selectionValue = this.getSelectionValue();
        const royalAttack = this.royalAttack.getValue();
        if (!this.selectionNames.length) {
            this.sfxErrorHowl.play();
            return 'Select cards to discard'
        } else if (selectionValue < royalAttack) {
            this.sfxErrorHowl.play();
            return 'Selected cards value must be at least ' + this.royalAttack.getValue();
        } else {
            return 'valid'
        }
    }

    getSelectionValue() {
        return this.selectionNames.reduce((accumulator, cardName) => {
            return accumulator + paramsAtlas[cardName].value;
        }, 0);
    }

    checkGameOver() {
        const handValue = this.hand.cards.reduce((accumulator, card) => {
            return accumulator + paramsAtlas[card.faceName].value;
        }, 0);
        if (!this.hand.cards.length || (this.phase === 'discard' && handValue < this.royalAttack.value)) {
            if (!this.jokerLeftAlive && !this.jokerRightAlive) {
                this.handleGameOver();
            } else {
                // reset selection
                this.selectionNames = [];
                this.phase = 'attack';
                this.confirmButton.update(this.phase, this.getSelectionValue());
                // flip joker
                if (this.jokerLeftAlive) {
                    this.handleJoker(this.jokerLeft);
                } else {
                    this.handleJoker(this.jokerRight);
                }
            }
        }
    }

    handleGameOver() {
        // blur screen
        const blurFilter = new PIXI.BlurFilter();
        this.gameContainer.filters = [blurFilter];
        this.mattressContainer.filters = [blurFilter];

        // disable interactions
        this.gameContainer.eventMode = 'none';

        // show game over panel
        this.gameOverPanel.setVisible(true, this.royalsDefeated + " / 12");
    }
}
