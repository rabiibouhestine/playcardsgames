import * as PIXI from "pixi.js";
import {Howl} from 'howler';

import sfxChange from '../assets/audio/click_002.ogg';

export class Number {
    constructor(gameContainer, position, value, {
        z = 999,
        visible = true,
        fontFamily = 'Impact',
        fontWeight = 'bold',
        fontSize = 64,
        fill = 0xFFFFFF,
        align = 'center'
    }) {
        this.value = value;

        this.valueText = new PIXI.Text(value, {
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            fontSize: fontSize,
            fill: fill,
            align: align
        });

        this.valueText.x = position.x;
        this.valueText.y = position.y;
        this.valueText.anchor.set(0.5);
        this.valueText.visible = visible;
        this.valueText.z = z;

        gameContainer.addChild(this.valueText);

        this.sfxChangeHowl = new Howl({
            src: [sfxChange]
        });
    }

    getValue() {
        return this.value;
    }

    delay(ms) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(); // Resolve the Promise after the specified time (ms)
          }, ms);
        });
    }

    async setValue(value, immediate = false, sfx = false) {
        this.value = value;
        if (immediate) {
            this.valueText.text = value;
            if (sfx) {
                this.sfxChangeHowl.play();
            }
            return new Promise((resolve) => {
                resolve();
            });
        } else {
            const nbIncrements = Math.abs(this.valueText.text - value);
            const direction = this.valueText.text < value ? 1 : -1;
            for (let i=1; i <= nbIncrements; i++) {
                this.valueText.text = parseInt(this.valueText.text) + direction;
                if (sfx) {
                    this.sfxChangeHowl.play();
                }
                await this.delay(50);
            }
            return new Promise((resolve) => {
                resolve();
            });
        }
    }

}
