import * as PIXI from "pixi.js";

import cardsSpritesheetImage from '$lib/games/assets/images/cardsSpritesheet.png';
import cardsSpritesheetAtlas from '$lib/games/assets/json/cardsSpritesheet.json';
import paramsAtlas from '$lib/games/assets/json/zombiesInCastles.json';

import { App } from '$lib/games/utils/App';
import { Card } from '$lib/games/utils/Card';
import { Cards } from '$lib/games/utils/Cards';
import { Dealer } from '$lib/games/utils/Dealer';

import { Layout } from "./Layout";
import { ConfirmButton } from "./ConfirmButton";
import { InfoPanel } from "./InfoPanel";
import { StatPanel } from "./StatPanel";

export class Game extends App {
    constructor(canvasRef) {
        super(canvasRef);
        this.init();
    }

    async init() {
        this.spritesheet = new PIXI.Spritesheet(
            PIXI.BaseTexture.from(cardsSpritesheetImage),
            cardsSpritesheetAtlas
        );
        await this.spritesheet.parse();

        this.layout = new Layout(this.app);

        const dealer = new Dealer();


        // GAME SETUP

        const pileDeck = dealer.shuffleCards([
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS',
            'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC',
            'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH',
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD'
        ]);

        const royalsDeck = [
            ...dealer.shuffleCards(['KD', 'KS', 'KH', 'KC']),
            ...dealer.shuffleCards(['QD', 'QS', 'QH', 'QC']),
            ...dealer.shuffleCards(['JD', 'JS', 'JH', 'JC'])
        ];

        this.jokerLeft = new Card(this.app, this.spritesheet, paramsAtlas, {
            faceName: 'J1',
            position: {x: 576, y: 117},
            faceUp: true,
            isInteractive: true,
            location: "joker",
            onPointerUp: this.handleJokerClick
        });

        this.jokerRight = new Card(this.app, this.spritesheet, paramsAtlas, {
            faceName: 'J2',
            position: {x: 666, y: 117},
            faceUp: true,
            isInteractive: true,
            location: "joker",
            onPointerUp: this.handleJokerClick
        });

        this.royalsPile = new Cards(this.app, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: royalsDeck,
            backName: "B1",
            position: {x: 260, y: 117},
            faceUp: true,
            onPointerUp: this.handleCardClick.bind(this),
            onPointerOver: this.handleCardOver.bind(this),
            onPointerOut: this.handleCardOut.bind(this)
        });

        this.drawPile = new Cards(this.app, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: pileDeck,
            position: {x: 666, y: 277},
            onPointerUp: this.handleCardClick.bind(this),
            onPointerOver: this.handleCardOver.bind(this),
            onPointerOut: this.handleCardOut.bind(this)
        });

        this.discardPile = new Cards(this.app, this.spritesheet, paramsAtlas, {
            type: 'pile',
            faceNames: [],
            position: {x: 576, y: 277},
            onPointerUp: this.handleCardClick.bind(this),
            onPointerOver: this.handleCardOver.bind(this),
            onPointerOut: this.handleCardOut.bind(this)
        });

        this.field = new Cards(this.app, this.spritesheet, paramsAtlas, {
            name: 'field',
            type: 'tableau',
            gap: 10,
            position: {x: 260, y: 267},
            onPointerUp: this.handleCardClick.bind(this),
            onPointerOver: this.handleCardOver.bind(this),
            onPointerOut: this.handleCardOut.bind(this)
        });

        this.hand = new Cards(this.app, this.spritesheet, paramsAtlas, {
            name: 'hand',
            type: 'tableau',
            gap: 8,
            position: {x: 360, y: 467},
            isInteractive: true,
            onPointerUp: this.handleCardClick.bind(this),
            onPointerOver: this.handleCardOver.bind(this),
            onPointerOut: this.handleCardOut.bind(this)
        });

        const startingHandCards = this.drawPile.removeCards(8);
        this.hand.addCards(startingHandCards);
        this.hand.adjustCards(false, true);


        // Royal Stats
        this.royalHealth = new StatPanel(this.app, {x:100, y: 100}, 20);
        this.royalAttack = new StatPanel(this.app, {x:350, y: 100}, 10);

        // Info Panel
        this.infoPanel = new InfoPanel(this.app, {x: 350, y: 370});

        // Confirm Button
        this.confirmButton = new ConfirmButton(this.app, {
            onPointerDown: this.handleConfirmButtonClick.bind(this)
        });
        
        // Game Variables
        this.phase = 'attack';
        this.selectionNames = [];
        this.confirmButton.update(this.phase, this.getSelectionValue());
    }

    handleJokerClick(card) {
        if (card.location === 'joker') {
            card.flip(false, false);
        }
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
            this.confirmButton.update(this.phase, this.getSelectionValue());
        }
    }

    handleCardOver(card) {
        if (card.location === 'hand') {
            let effect;
            switch (card.params.suit) {
                case 'H':
                    effect = "♥ Revives cards";
                    break;
                case 'D':
                    effect = "♦ Draws cards";
                    break;
                case 'S':
                    effect = "♠ Reduces target's attack";
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
            this.infoPanel.setValue(infoText);
        }
    }

    handleCardOut(card) {
        if (card.location === 'hand') {
            this.infoPanel.clear();
        }
    }

    handleConfirmButtonClick() {
        if (this.phase === 'attack') {
            const selectionCheck = this.checkAttackSelection();
            if (selectionCheck === 'valid') {
                this.handleAttack();
            } else {
                this.infoPanel.setValue(selectionCheck, 'error');
            }
        } else {
            const selectionCheck = this.checkDiscardSelection();
            if (selectionCheck === 'valid') {
                this.handleDiscard();
            } else {
                this.infoPanel.setValue(selectionCheck, 'error');
            }
        }
    }

    handleAttack() {
        // royal suit
        const royalSuit = paramsAtlas[this.royalsPile.getTopCard().faceName].suit;

        // selection value
        const selectionValue = this.selectionNames.reduce((accumulator, cardName) => {
            return accumulator + paramsAtlas[cardName].value;
        }, 0);

        // selection damage
        let damage = selectionValue;

        // move selected cards to field
        const selectedCards = this.hand.removeSelection(this.selectionNames);
        this.hand.adjustCards(false, true);
        this.field.addCards(selectedCards);
        this.field.adjustCards(false, true);

        // resolve hearts
        if (this.selectionNames.some(cardName => paramsAtlas[cardName].suit === "H" && royalSuit !== "H")) {
            this.discardPile.shuffleCards();
            const cards = this.discardPile.removeCards(selectionValue);
            this.drawPile.addCards(cards, 'bottom');
            this.drawPile.adjustCards(false, false);
        }

        // resolve diamonds
        if (this.selectionNames.some(cardName => paramsAtlas[cardName].suit === "D" && royalSuit !== "D")) {
            const nbMissing = 8 -  this.hand.cards.length;
            const nbDraw = Math.min(nbMissing, selectionValue);

            const cards = this.drawPile.removeCards(nbDraw);
            this.hand.addCards(cards);
            this.hand.adjustCards(false, true);
        }

        // resolve spades
        if (this.selectionNames.some(cardName => paramsAtlas[cardName].suit === "S" && royalSuit !== "S")) {
            const newRoyalAttack = Math.max(0, this.royalAttack.getValue() - selectionValue);
            this.royalAttack.setValue(newRoyalAttack);
        }

        // resolve clubs
        if (this.selectionNames.some(cardName => paramsAtlas[cardName].suit === "C" && royalSuit !== "C")) {
            damage = selectionValue * 2
        }

        // deal damage
        const newRoyalHealth = Math.max(0, this.royalHealth.getValue() - damage);
        this.royalHealth.setValue(newRoyalHealth);

        // resolve state
        if (this.royalHealth.getValue() === 0) {
            // move field cards to discard pile
            const fieldCards = this.field.removeCards(this.field.length);
            this.discardPile.addCards(fieldCards);
            this.discardPile.adjustCards(false, false);

            // move royal to discardPile
            const deadRoyal = this.royalsPile.removeCards(1);
            this.discardPile.addCards(deadRoyal);
            this.discardPile.adjustCards(false, false);

            // reset royal stats
            const newRoyalStats = paramsAtlas[this.royalsPile.getTopCard().faceName];
            this.royalHealth.setValue(newRoyalStats.health);
            this.royalAttack.setValue(newRoyalStats.value);

            // reset selection
            this.selectionNames = [];
            this.confirmButton.update(this.phase, this.getSelectionValue());
        } else if (this.royalAttack.getValue() === 0) {
            // reset selection
            this.selectionNames = [];
            this.confirmButton.update(this.phase, this.getSelectionValue());
        } else {
            // set phase
            this.selectionNames = [];
            this.phase = 'discard';
            this.confirmButton.update(this.phase, this.getSelectionValue());
        }
    }

    handleDiscard() {
        // move selected cards to discardPile
        const selectedCards = this.hand.removeSelection(this.selectionNames);
        this.hand.adjustCards(false, true);
        this.discardPile.addCards(selectedCards);
        this.discardPile.adjustCards(false, false);

        // update phase
        this.phase = 'attack';
        this.selectionNames = [];
        this.confirmButton.update(this.phase, this.getSelectionValue());
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
            return 'Select cards to attack with'
        } else if (!conditionsMet) {
            return 'Invalid selection';
        } else {
            return 'valid'
        }
    }

    checkDiscardSelection(){
        const selectionValue = this.getSelectionValue();
        const royalAttack = this.royalAttack.getValue();
        if (!this.selectionNames.length) {
            return 'Select cards to discard'
        } else if (selectionValue < royalAttack) {
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
}