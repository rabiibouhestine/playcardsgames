import { Card } from '$lib/games/utils/Card';

export class Cards {
    constructor(app, spritesheet, faceNames, backName, position, faceUp = false, isInteractive = false, isDraggable = false, direction, minGap, maxGap, maxCards) {
        this.cards = [];
        for (const faceName of faceNames) {
            const card = new Card(app, spritesheet, faceName, backName, position, faceUp, isInteractive, isDraggable);
            this.cards.push(card);
        }
    }

    adjustCards(immediate = false) {

    }

    removeCards() {
        const removedCards = [];
        this.adjustCards();
        return removedCards;
    }

    addCards(cards) {
        this.cards.push(...cards);
        this.adjustCards();
    }

    shuffleCards() {

    }
}