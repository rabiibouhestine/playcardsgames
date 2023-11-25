import * as PIXI from "pixi.js";

export class Message {
    constructor(gameContainer, position, fontSize = 18) {
        this.text = new PIXI.Text("", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: fontSize,
            fill: 0xFFFFFF,
            align: 'center'
        });

        this.text.anchor.set(0.5);
        this.text.x = position.x;
        this.text.y = position.y;

        gameContainer.addChild(this.text);
    }

    setValue(value) {
        this.text.text = value;
    }

    clear() {
        this.text.text = "";
    }
}
