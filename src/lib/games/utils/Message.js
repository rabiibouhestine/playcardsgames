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
