import * as PIXI from "pixi.js";

export class Card {
    constructor(app, spritesheet, name, position, faceUp = false) {
        this.name = name;

        this.sprite = new PIXI.Sprite(spritesheet.textures[name]);
        this.sprite.anchor.set(0.5);
        this.sprite.x = position.x;
        this.sprite.y = position.y;
        this.sprite.width = 70;
        this.sprite.height = 98;
        app.stage.addChild(this.sprite);
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
    constructor(app, spritesheet, names, position, faceUp, direction, minGap, maxGap, maxCards) {
        this.cards = [];
        for (const name in names) {
            const card = new Card(app, spritesheet, name, position, faceUp);
            this.cards.push(card);
        }
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
