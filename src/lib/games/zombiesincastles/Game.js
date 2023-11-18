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
        this.royalHealth = new StatPanel(this.app, {x:100, y: 100});
        this.royalAttack = new StatPanel(this.app, {x:350, y: 100});

        // Info Panel
        this.infoPanel = new InfoPanel(this.app, {x: 350, y: 370});

        // Confirm Button
        this.confirmButton = new ConfirmButton(this.app, {
            onPointerDown: this.handleConfirmButtonClick.bind(this)
        });

        // Game Variables
        this.selectionNames = [];
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
        }
    }

    handleCardOver(card) {
        if (card.location === 'hand') {
            this.infoPanel.setValue(card.params.value);
        }
    }

    handleCardOut(card) {
        if (card.location === 'hand') {
            this.infoPanel.clear();
        }
    }

    handleConfirmButtonClick() {
        // selection value
        const selectionValue = this.selectionNames.reduce((accumulator, cardName) => {
            return accumulator + paramsAtlas[cardName].value;
        }, 0);

        // move cards to field
        const selectedCards = this.hand.removeSelection(this.selectionNames);
        this.hand.adjustCards(false, true);
        this.field.addCards(selectedCards);
        this.field.adjustCards(false, true);

        // resolve hearts
        if (this.selectionNames.some(cardName => paramsAtlas[cardName].suit === "H")) {
            const cards = this.discardPile.removeCards(selectionValue);
            this.drawPile.addCards(cards);
            this.drawPile.adjustCards(false, false);
        }
    }
}