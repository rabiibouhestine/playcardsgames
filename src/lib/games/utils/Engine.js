export class Card {
    constructor(name, spritesheet, faceUp) {

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
    constructor(direction, minGap, maxGap, maxCards) {
        this.cards = [];
    }

    initCards(names, spritesheet, faceUp) {

    }

    adjustCards(immediate) {

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
