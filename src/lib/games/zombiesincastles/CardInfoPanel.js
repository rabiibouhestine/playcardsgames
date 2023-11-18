import * as PIXI from "pixi.js";

export class CardInfoPanel {
    constructor(app) {
        this.app = app;

        this.helperGraphic = new PIXI.Graphics();
        this.helperGraphic.beginFill(0x090a14);
        this.helperGraphic.drawRoundedRect(-20, -20, 40, 40, 4);
        this.helperGraphic.endFill();

        this.helperText = new PIXI.Text("", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 24,
            fill: 0xFFFFFF,
            align: 'center'
        });

        this.helperText.anchor.set(0.5);

        this.helperContainer = new PIXI.Container();
        this.helperContainer.eventMode = 'none';
        this.helperContainer.addChild(this.helperGraphic);
        this.helperContainer.addChild(this.helperText);
        this.helperContainer.x = 200;
        this.helperContainer.y = 200;
        this.helperContainer.visible = false;

        this.app.stage.addChild(this.helperContainer);
    }

    setValue(value) {
        this.helperText.text = value;
    }

    setPosition(position) {
        this.helperContainer.x = position.x;
        this.helperContainer.y = position.y;
    }

    setVisible(isVisible) {
        this.helperContainer.visible = isVisible;
    }
}
