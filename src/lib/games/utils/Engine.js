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
    constructor() {
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
