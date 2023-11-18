import * as PIXI from "pixi.js";

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

    setValue(value) {
        this.value = value;
        this.valueText.text = value;
    }
}
