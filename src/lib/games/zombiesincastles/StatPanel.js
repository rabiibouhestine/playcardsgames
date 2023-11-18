import * as PIXI from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js';

export class StatPanel {
    constructor(app, position, value) {
        this.value = value;

        this.valueText = new PIXI.Text(value, {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 48,
            fill: 0xFFFFFF,
            align: 'center'
        });

        this.valueText.x = position.x;
        this.valueText.y = position.y;

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
