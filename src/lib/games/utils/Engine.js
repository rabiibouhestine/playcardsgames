import * as PIXI from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js';

export class Card {
    constructor(app, spritesheet, name, position, faceUp = false) {
        this.name = name;

        this.sprite = new PIXI.Sprite(spritesheet.textures[name]);
        this.sprite.anchor.set(0.5);
        this.sprite.x = position.x;
        this.sprite.y = position.y;
        this.sprite.width = 80;
        this.sprite.height = 112;
        app.stage.addChild(this.sprite);
    }

    moveTo(x, y, immediate) {
        if (immediate) {
            this.sprite.x = x;
            this.sprite.y = y;
        } else {
            const propreties = {
                x: this.sprite.x,
                y: this.sprite.y
            };
    
            const tween = new TWEEN.Tween(propreties, false)
                .to({
                    x: x,
                    y: y
                }, 600)
                .easing(TWEEN.Easing.Exponential.Out)
                .onUpdate(() => {
                    this.sprite.x = propreties.x;
                    this.sprite.y = propreties.y;
                })
                .start()
    
            const updatePosition = (delta) => {
                if (!tween.isPlaying()) return;
                tween.update(delta);
                requestAnimationFrame(updatePosition);
            };
        
            requestAnimationFrame(updatePosition);
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
