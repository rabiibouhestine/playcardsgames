import * as PIXI from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js';

import clubsIcon from '$lib/games/assets/images/club.png';
import diamondsIcon from '$lib/games/assets/images/diamond.png';
import heartsIcon from '$lib/games/assets/images/heart.png';
import spadesIcon from '$lib/games/assets/images/spade.png';

export class RoyalSuits {
    constructor(gameContainer) {
        this.gameContainer = gameContainer;

        this.heartsSprite = new PIXI.Sprite(PIXI.Texture.from(heartsIcon));
        this.heartsSprite.width = 15;
        this.heartsSprite.height = 15;
        this.heartsSprite.alpha = 0.25;
        this.heartsSprite.anchor.set(0.5);
        this.heartsSprite.x = 272;
        this.heartsSprite.y = 116;

        this.clubsSprite = new PIXI.Sprite(PIXI.Texture.from(clubsIcon));
        this.clubsSprite.width = 15;
        this.clubsSprite.height = 15;
        this.clubsSprite.alpha = 0.25;
        this.clubsSprite.anchor.set(0.5);
        this.clubsSprite.x = 252;
        this.clubsSprite.y = 116;

        this.diamondsSprite = new PIXI.Sprite(PIXI.Texture.from(diamondsIcon));
        this.diamondsSprite.width = 15;
        this.diamondsSprite.height = 15;
        this.diamondsSprite.alpha = 0.25;
        this.diamondsSprite.anchor.set(0.5);
        this.diamondsSprite.x = 232;
        this.diamondsSprite.y = 116;

        this.spadesSprite = new PIXI.Sprite(PIXI.Texture.from(spadesIcon));
        this.spadesSprite.width = 15;
        this.spadesSprite.height = 15;
        this.spadesSprite.alpha = 0.25;
        this.spadesSprite.anchor.set(0.5);
        this.spadesSprite.x = 212;
        this.spadesSprite.y = 116;

        this.gameContainer.addChild(this.heartsSprite);
        this.gameContainer.addChild(this.clubsSprite);
        this.gameContainer.addChild(this.diamondsSprite);
        this.gameContainer.addChild(this.spadesSprite);

        this.setAllSuits(true);
    }

    setSuit(suit, isOn) {
        const alpha = isOn ? 1 : 0.25;
        switch (suit) {
            case 'H':
                this.tweenOpacity(this.heartsSprite, alpha);
                break;
            case 'C':
                this.tweenOpacity(this.clubsSprite, alpha);
                break;
            case 'D':
                this.tweenOpacity(this.diamondsSprite, alpha);
                break;
            case 'S':
                this.tweenOpacity(this.spadesSprite, alpha);
                break;
            default:
                break;
        }
    }

    setAllSuits(isOn) {
        const alpha = isOn ? 1 : 0.25;
        this.tweenOpacity(this.heartsSprite, alpha);
        this.tweenOpacity(this.clubsSprite, alpha);
        this.tweenOpacity(this.diamondsSprite, alpha);
        this.tweenOpacity(this.spadesSprite, alpha);
    }

    tweenOpacity(sprite, alpha) {
        const propreties = {
            alpha: sprite.alpha
        };

        const tween = new TWEEN.Tween(propreties, false)
            .to({ alpha: alpha }, 300)
            .easing(TWEEN.Easing.Exponential.Out)
            .onUpdate(() => {
                sprite.alpha = propreties.alpha;
            })
            .start()

        const updateAlpha = (delta) => {
            if (!tween.isPlaying()) return;
            tween.update(delta);
            requestAnimationFrame(updateAlpha);
        };
    
        requestAnimationFrame(updateAlpha);
    }
}
