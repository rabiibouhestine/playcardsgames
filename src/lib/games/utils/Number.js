import * as PIXI from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js';

export class Number {
    constructor(app, position, value, {
        z = 999,
        visible = true,
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
        this.valueText.visible = visible;
        this.valueText.z = z;
        app.stage.addChild(this.valueText);
    }

    getValue() {
        return this.value;
    }

    setValue(value, immediate = false) {
        this.value = value;

        return new Promise((resolve) => {
            if (immediate) {
                this.valueText.text = value;
                resolve();
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
                    .onComplete(() => {
                        resolve();
                    })
                    .start()
        
                const updateValue = (delta) => {
                    if (!tween.isPlaying()) return;
                    tween.update(delta);
                    requestAnimationFrame(updateValue);
                };
            
                requestAnimationFrame(updateValue);
            }
        });
    }

}
