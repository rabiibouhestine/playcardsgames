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

    removeCards(n, position = 'top') {
        let removedCards;
        switch (position) {
            case 'top':
                removedCards = this.cards.splice(-n);
                break;
            case 'bottom':
                removedCards = this.cards.splice(0, n);
                break;
            case 'random':
                removedCards = this.cards.splice(0, n);
                break;
            default:
                removedCards = [];
                break;
        }
        this.adjustCards();
        return removedCards;
    }

    addCards(cards, position = 'top') {
        switch (position) {
            case 'top':
                this.cards.push(...cards);
                break;
            case 'bottom':
                this.cards.unshift(...cards);
                break;
            case 'random':
                this.cards.unshift(...cards);
                break;
            default:
                break;
        }
        this.adjustCards();
    }

    shuffleCards() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}