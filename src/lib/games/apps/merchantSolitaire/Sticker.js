import * as PIXI from "pixi.js";
import '@pixi/graphics-extras';

export class Sticker {
    constructor(gameContainer) {
        // sticker graphic
        this.stickerGraphic = new PIXI.Graphics();
        this.stickerGraphic.beginFill(0xc026d3);
        this.stickerGraphic.drawStar(0, 0, 12, 26, 20);
        this.stickerGraphic.endFill();

        // sticker text
        this.stickerText = new PIXI.Text("ON SALE", {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 12,
            fill: 0xFFFFFF,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 4
        });
        this.stickerText.anchor.set(0.5);
        this.stickerText.y = -2;

        // sticker container
        this.stickerContainer = new PIXI.Container();
        this.stickerContainer.zIndex = 999;
        this.stickerContainer.angle = -20;
        this.stickerContainer.visible = false;
        this.stickerContainer.addChild(this.stickerGraphic);
        this.stickerContainer.addChild(this.stickerText);
        gameContainer.addChild(this.stickerContainer);
    }

    setVisible(card) {
        this.stickerContainer.x = card.position.x + 30;
        this.stickerContainer.y = card.position.y - 45;
        this.stickerContainer.visible = true;
    }

    hide() {
        this.stickerContainer.visible = false;
    }
}
