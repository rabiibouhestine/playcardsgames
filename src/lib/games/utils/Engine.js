export class Card {

}

export class Pile {
    constructor() {

    }

    adjustCards() {

    }

    removeCards() {
        const removedCards = [];
        this.adjustCards();
        return removedCards;
    }

    addCards(cards) {
        this.adjustCards();
    }
}

export class Stack {
    constructor(cards, direction, minGap, maxGap, maxCards) {
        this.cards = [];
    }

    adjustCards() {

    }

    removeCards() {
        const removedCards = [];
        this.adjustCards();
        return removedCards;
    }

    addCards(cards) {
        this.adjustCards();
    }
}
