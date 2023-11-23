import * as PIXI from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js';

import clubIcon from '$lib/games/assets/images/club.png';
import diamondIcon from '$lib/games/assets/images/diamond.png';
import heartIcon from '$lib/games/assets/images/heart.png';
import spadeIcon from '$lib/games/assets/images/spade.png';

export class RoyalSuits {
    constructor(gameContainer) {
        this.gameContainer = gameContainer;

        this.heartSprite = new PIXI.Sprite(PIXI.Texture.from(heartIcon));
        this.heartSprite.width = 15;
        this.heartSprite.height = 15;
        this.heartSprite.anchor.set(0.5);
        this.heartSprite.x = 230;
        this.heartSprite.y = 46;

        this.clubSprite = new PIXI.Sprite(PIXI.Texture.from(clubIcon));
        this.clubSprite.width = 15;
        this.clubSprite.height = 15;
        this.clubSprite.anchor.set(0.5);
        this.clubSprite.x = 250;
        this.clubSprite.y = 46;

        this.diamondSprite = new PIXI.Sprite(PIXI.Texture.from(diamondIcon));
        this.diamondSprite.width = 15;
        this.diamondSprite.height = 15;
        this.diamondSprite.anchor.set(0.5);
        this.diamondSprite.x = 270;
        this.diamondSprite.y = 46;

        this.spadeSprite = new PIXI.Sprite(PIXI.Texture.from(spadeIcon));
        this.spadeSprite.width = 15;
        this.spadeSprite.height = 15;
        this.spadeSprite.anchor.set(0.5);
        this.spadeSprite.x = 290;
        this.spadeSprite.y = 46;

        this.gameContainer.addChild(this.heartSprite);
        this.gameContainer.addChild(this.clubSprite);
        this.gameContainer.addChild(this.diamondSprite);
        this.gameContainer.addChild(this.spadeSprite);
    }

    setSuit(suit, isOn) {

    }

    setAllSuits(isOn) {

    }

    tweenOpacity(opacity) {

    }
}
