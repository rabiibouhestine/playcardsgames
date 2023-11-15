import { Card } from '$lib/games/utils/Card';

export class Cards {
    constructor(app, spritesheet, {faceNames, backName, position, faceUp = false, isInteractive = false, isDraggable = false, type = "pile", gap = 0, direction = "h"}) {
        this.position = position;
        this.type = type;
        this.gap = gap;
        
        this.cards = [];

        for (const faceName of faceNames) {
            const card = new Card(app, spritesheet, faceName, backName, position, faceUp, isInteractive, isDraggable);
            this.cards.push(card);
        }
        this.adjustCards(true);
    }

    adjustCards(immediate = false) {

        if (this.type === "pile") {
            for (let index = 0; index < this.cards.length; index++) {
                this.cards[index].moveTo(this.position.x, this.position.y, immediate);
            }
        } else {
            const startX = this.position.x - ((80 + this.gap)/2) * (this.cards.length - 1);
            const startY = this.position.y;
    
            for (let index = 0; index < this.cards.length; index++) {
                const newPosition = {
                    x: startX + (index * (80 + this.gap)),
                    y: startY
                };
                this.cards[index].moveTo(newPosition.x, newPosition.y, immediate);
            }
        }
    }

    removeCards(n) {
        const removedCards = this.cards.splice(-n);
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