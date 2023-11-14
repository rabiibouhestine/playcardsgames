export class Card {

}

export class Pile {
    constructor() {

    }

    removeCards() {
        const removedCards = [];
        return removedCards;
    }

    addCards(cards) {

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
