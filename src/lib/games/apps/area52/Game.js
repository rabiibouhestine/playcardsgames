import * as PIXI from 'pixi.js';

import cardsSpritesheetImage from '../../assets/images/spritesheetColor.png';
import cardsSpritesheetAtlas from '../../assets/json/cardsSpritesheet.json';

import { App } from '../../utils/App';
import { Cards } from '../../utils/Cards';
import { Dealer } from '../../utils/Dealer';
import { Message } from '../../utils/Message';
import { Button } from '../../utils/Button';
import { GameOverPanel } from '../../utils/GameOverPanel';

import paramsAtlas from './values.json';
import defendersAtlas from './defenders.json';
import { Mattress } from './Mattress';

export class Game extends App {
    constructor(canvasRef) {
        super(canvasRef);
        this.init();
    }

    async init() {
        // load spritesheet
        const cardsSpritesheetTexture = await PIXI.Assets.load(cardsSpritesheetImage);
        this.spritesheet = new PIXI.Spritesheet(
            cardsSpritesheetTexture,
            cardsSpritesheetAtlas
        );
        await this.spritesheet.parse();

        // disable interactions
        this.gameContainer.eventMode = 'none';

        // add dealer
        this.dealer = new Dealer();

        // add mattress
        this.mattress = new Mattress(this.mattressContainer);

        // add error message
        this.errorMessage = new Message(this.gameContainer, { x: 360, y: 265 }, 20);

        // add sacrifice button
        this.sacrificeButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Sacrifice",
            textSize: 16,
            x: 175,
            y: 666,
            // onPointerDown: this.handleRestart.bind(this)
        });

        // add giveup button
        this.singleAttackButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Single Attack",
            textSize: 16,
            x: 360,
            y: 666,
            // onPointerDown: this.handleGiveup.bind(this)
        });

        // add serve button
        this.dualAttackButton = new Button(this.gameContainer, {
            width: 150,
            height: 50,
            text: "Dual Attack",
            textSize: 16,
            x: 545,
            y: 666,
            // onPointerDown: this.handleServe.bind(this)
        });



        // enable interactions
        this.gameContainer.eventMode = 'static';
    }

}
