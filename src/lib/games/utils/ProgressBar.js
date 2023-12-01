import * as PIXI from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js';

import { Number } from "./Number";

import rectPNG from '../assets/images/rect.png';

export class ProgressBar {
    constructor(gameContainer, {x, y, width, height, value, maxValue, color = 0xdb2777}) {
        this.gameContainer = gameContainer;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = value;
        this.maxValue = maxValue;
        this.color = color;

        this.widthValueRatio = width/maxValue;

        this.container = new PIXI.Container();
        this.container.x = this.x;
        this.container.y = this.y;

        this.mask = new PIXI.Graphics();
        this.mask.beginFill(0x000000);
        this.mask.drawRoundedRect(0, 0, this.width, this.height, 8);
        this.mask.endFill();

        this.background = new PIXI.Graphics();
        this.background.beginFill(0x000000, 0.25);
        this.background.drawRoundedRect(0, 0, this.width, this.height, 8);
        this.background.endFill();

        this.whiteTexture = PIXI.Texture.from(rectPNG);
        this.whiteSprite = new PIXI.Sprite(this.whiteTexture);
        this.whiteSprite.width = this.width;
        this.whiteSprite.height = this.height;
        this.whiteSprite.mask = this.mask;

        this.coloredTexture = PIXI.Texture.from(rectPNG);
        this.coloredSprite = new PIXI.Sprite(this.coloredTexture);
        this.coloredSprite.width = this.width;
        this.coloredSprite.height = this.height;
        this.coloredSprite.mask = this.mask;
        this.coloredSprite.tint = this.color;
 
        this.container.addChild(this.mask);
        this.container.addChild(this.background);
        this.container.addChild(this.whiteSprite);
        this.container.addChild(this.coloredSprite);

        this.label = new Number(this.container, { x: this.width / 2, y: this.height / 2 }, this.value, { fontSize: 20 });

        this.gameContainer.addChild(this.container);
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        if (this.value === value) {
            return;
        }

        this.value = value;
        this.label.setValue(value);
        this.coloredSprite.width = value * this.widthValueRatio;

        const propreties = {
            width: this.whiteSprite.width
        };

        const whiteSpriteTween = new TWEEN.Tween(propreties, false)
        .to({
            width: value * this.widthValueRatio
        }, 300)
        .easing(TWEEN.Easing.Exponential.In)
        .onUpdate(() => {
            this.whiteSprite.width = propreties.width;
        })
        .start()

        const updateValue = (delta) => {
            if (!whiteSpriteTween.isPlaying()) return;
            whiteSpriteTween.update(delta);
            requestAnimationFrame(updateValue);
        };

        requestAnimationFrame(updateValue);
    }

}
