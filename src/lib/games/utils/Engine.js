import * as PIXI from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js';

export class Card {
    constructor(app, spritesheet, faceName, backName, position, faceUp = false) {
        this.spritesheet = spritesheet;
        this.faceName = faceName;
        this.backName = backName;
        this.faceUp = faceUp;

        this.sprite = new PIXI.Sprite(spritesheet.textures[faceUp? this.faceName : this.backName]);
        this.sprite.anchor.set(0.5);
        this.sprite.x = position.x;
        this.sprite.y = position.y;
        this.sprite.width = 80;
        this.sprite.height = 112;
        app.stage.addChild(this.sprite);
    }

    flip(faceUp, immediate = false) {
        if (faceUp === this.faceUp) {
            return;
        }
        if (immediate) {
            this.faceUp = !this.faceUp;
            this.sprite.texture = this.spritesheet.textures[faceUp? this.faceName : this.backName];
        } else {
            // tween flip
        }
    }

    moveTo(x, y, immediate = false) {
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
    constructor(app, spritesheet, faceNames, position, faceUp, direction, minGap, maxGap, maxCards) {
        this.cards = [];
        for (const faceName in faceNames) {
            const card = new Card(app, spritesheet, faceName, position, faceUp);
            this.cards.push(card);
        }
    }

    adjustCards(immediate = false) {

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
