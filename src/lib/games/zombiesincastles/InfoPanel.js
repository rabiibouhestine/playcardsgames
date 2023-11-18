import * as PIXI from "pixi.js";

export class InfoPanel {
    constructor(app, position) {
        this.text = new PIXI.Text("", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 24,
            fill: 0xFFFFFF,
            align: 'center'
        });

        this.text.anchor.set(0.5);
        this.text.x = position.x;
        this.text.y = position.y;

        app.stage.addChild(this.text);
    }

    setValue(value, type) {
        if (type === 'error') {
            this.text.style.fill = 0xffab91;
        } else {
            this.text.style.fill = 0xFFFFFF;
        }
        this.text.text = value;
    }

    clear() {
        this.text.text = "";
    }
}
