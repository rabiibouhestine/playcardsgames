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

    setValue(value) {
        this.text.text = value;
    }

    clear() {
        this.text.text = "";
    }
}
