import { Card } from '$lib/games/utils/Card';
import { Dealer } from '$lib/games/utils/Dealer';
import { Number } from '$lib/games/utils/Number';

export class Cards {
    constructor(gameContainer, spritesheet, parameters, {
        name = '',
        faceNames = [],
        backName = 'B1',
        position,
        faceUp = false,
        isInteractive = false,
        isDraggable = false,
        type = "pile",
        gap = 0,
        counter = false,
        onPointerUp = () => {},
        onPointerOver = () => {},
        onPointerOut = () => {}
    }) {
        this.gameContainer = gameContainer;
        this.name = name;
        this.position = position;
        this.faceUp = faceUp;
        this.type = type;
        this.gap = gap;
        this.isInteractive = isInteractive;
        
        this.cards = [];

        for (const faceName of faceNames) {
            const card = new Card(gameContainer, spritesheet, parameters, {
                faceName: faceName,
                backName: backName,
                position: position,
                faceUp: faceUp,
                isInteractive: isInteractive,
                isDraggable: isDraggable,
                onPointerUp: onPointerUp,
                onPointerOver: onPointerOver,
                onPointerOut: onPointerOut
            });
            this.cards.push(card);
        }
        this.adjustCards({immediate: true, faceUp: faceUp});

        this.counter = new Number(gameContainer, position, this.cards.length, { visible: counter, fontSize: 24 });
        this.counter.valueText.zIndex = 60;
    }

    adjustCards({immediate = false}) {
        switch (this.type) {
            case 'pile':
                for (let index = 0; index < this.cards.length; index++) {
                    this.cards[index].location = this.name;
                    this.cards[index].setInteractive(this.isInteractive);
                    this.cards[index].flip(this.faceUp, immediate);
                    this.cards[index].moveTo(this.position.x, this.position.y, immediate);
                    this.cards[index].sprite.zIndex = this.gameContainer.zIndex + index;
                }
                break;
            case 'tableau':
                const startX = this.position.x - ((80 + this.gap)/2) * (this.cards.length - 1);
                const startY = this.position.y;
        
                for (let index = 0; index < this.cards.length; index++) {
                    const newPosition = {
                        x: startX + (index * (80 + this.gap)),
                        y: startY
                    };
                    this.cards[index].location = this.name;
                    this.cards[index].setInteractive(this.isInteractive);
                    this.cards[index].flip(this.faceUp, immediate);
                    this.cards[index].moveTo(newPosition.x, newPosition.y, immediate);
                    this.cards[index].sprite.zIndex = this.gameContainer.zIndex + index;
                }
                break;
            case 'stackH':
                const stackHStartX = this.position.x - (this.gap/2) * (this.cards.length - 1);
                const stackHStartY = this.position.y;
        
                for (let index = 0; index < this.cards.length; index++) {
                    const newPosition = {
                        x: stackHStartX + (index * this.gap),
                        y: stackHStartY
                    };
                    this.cards[index].location = this.name;
                    this.cards[index].setInteractive(this.isInteractive);
                    this.cards[index].flip(this.faceUp, immediate);
                    this.cards[index].moveTo(newPosition.x, newPosition.y, immediate);
                    this.cards[index].sprite.zIndex = this.gameContainer.zIndex + index;
                }
                break;
            default:
                break;
        }
    }

    removeSelection(selectionNames) {
        const selection = this.cards.filter(card => selectionNames.includes(card.faceName));
        this.cards = this.cards.filter(card => !selectionNames.includes(card.faceName));
        this.counter.setValue(this.cards.length, true);
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
        this.counter.setValue(this.cards.length, true);
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
        this.counter.setValue(this.cards.length, true);
    }

    shuffleCards() {
        const dealer = new Dealer();
        this.cards = dealer.shuffleCards(this.cards);
    }

    getTopCard() {
        return this.cards[this.cards.length - 1];
    }
}
