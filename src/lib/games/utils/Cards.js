import { Card } from '$lib/games/utils/Card';

export class Cards {
    constructor(app, spritesheet, faceNames, position, faceUp, direction, minGap, maxGap, maxCards) {
        this.cards = [];
        for (const faceName in faceNames) {
            const card = new Card(app, spritesheet, faceName, position, faceUp);
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