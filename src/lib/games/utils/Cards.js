import { Card } from '$lib/games/utils/Card';

export class Cards {
    constructor(app, spritesheet, faceNames, backName, position, faceUp = false, isInteractive = false, isDraggable = false, direction, minGap, maxGap, maxCards) {
        this.cards = [];
        this.position = position;
        for (const faceName of faceNames) {
            const card = new Card(app, spritesheet, faceName, backName, position, faceUp, isInteractive, isDraggable);
            this.cards.push(card);
        }
        this.adjustCards(true);
    }

    adjustCards(immediate = false) {
        // Calculate the total width of the cards in the array
        const cardWidth = 80;
        const cardGap = 10;

        // Calculate the starting position to center the cards
        const startX = this.position.x - ((cardWidth + cardGap)/2) * (this.cards.length - 1);
     
        // Set the y-coordinate of the centerPosition
        const startY = this.position.y;
    
        // Reposition the cards
        for (let index = 0; index < this.cards.length; index++) {
            const newPosition = {
                x: startX + (index * (cardWidth + cardGap)),
                y: startY
            };
            this.cards[index].moveTo(newPosition.x, newPosition.y, immediate);
        }
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