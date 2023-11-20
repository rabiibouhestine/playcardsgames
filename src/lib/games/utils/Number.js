import * as PIXI from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js';

export class Number {
    constructor(app, position, value, {
        fontFamily = 'Arial',
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
        app.stage.addChild(this.valueText);
    }

    getValue() {
        return this.value;
    }

    setValue(value, immediate = false) {
        this.value = value;

        if (immediate) {
            this.valueText.text = value;
        } else {
            const propreties = {
                value: parseInt(this.valueText.text)
            };
    
            const tween = new TWEEN.Tween(propreties, false)
                .to({
                    value: value
                }, 600)
                .onUpdate(() => {
                    this.valueText.text = Math.floor(propreties.value);
                })
                .start()
    
            const updateValue = (delta) => {
                if (!tween.isPlaying()) return;
                tween.update(delta);
                requestAnimationFrame(updateValue);
            };
        
            requestAnimationFrame(updateValue);
        }

    }
}
