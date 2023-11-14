export class Card {
    constructor(name) {

    }

    moveTo(x, y, immediate) {
        if (immediate) {
            this.x = x;
            this.y = y;
        } else {
            // tween.to(x, y)
        }
    }
}

export class Cards {
    constructor(cards, faceUp, direction, minGap, maxGap, maxCards) {
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
