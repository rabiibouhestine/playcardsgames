import { Card } from '$lib/games/utils/Card';
import { Dealer } from '$lib/games/utils/Dealer';

export class Cards {
    constructor(app, spritesheet, {
        name = null, faceNames = [], backName = 'B1', position, faceUp = false, isInteractive = false, isDraggable = false, type = "pile", gap = 0, direction = "h", onPointerdown = () => {}
    }) {
        this.name = name;
        this.position = position;
        this.type = type;
        this.gap = gap;
        this.isInteractive = isInteractive;
        
        this.cards = [];

        for (const faceName of faceNames) {
            const card = new Card(app, spritesheet, {
                faceName: faceName,
                backName: backName,
                position: position,
                faceUp: faceUp,
                isInteractive: isInteractive,
                isDraggable: isDraggable,
                onPointerdown: onPointerdown
            });
            this.cards.push(card);
        }
        this.adjustCards(true, faceUp);
    }

    adjustCards(immediate = false, faceUp = false) {

        if (this.type === "pile") {
            for (let index = 0; index < this.cards.length; index++) {
                this.cards[index].location = this.name;
                this.cards[index].setInteractive(this.isInteractive);
                this.cards[index].flip(faceUp, immediate);
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
                this.cards[index].location = this.name;
                this.cards[index].setInteractive(this.isInteractive);
                this.cards[index].flip(faceUp, immediate);
                this.cards[index].moveTo(newPosition.x, newPosition.y, immediate);
            }
        }
    }

    removeSelection(selectionNames) {
        const selection = this.cards.filter(card => selectionNames.includes(card.name));
        this.cards = this.cards.filter(card => !selectionNames.includes(card.name));
        return selection;
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
    }

    shuffleCards() {
        const dealer = new Dealer();
        this.cards = dealer.shuffleCards(this.cards);
    }
}
