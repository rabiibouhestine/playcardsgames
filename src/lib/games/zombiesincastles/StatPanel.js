import * as PIXI from "pixi.js";

export class StatPanel {
    constructor(app, position) {
        this.valueText = new PIXI.Text("20", {
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
}
