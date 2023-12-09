import * as PIXI from 'pixi.js';

import cardsSpritesheetImage from '../../assets/images/spritesheetColor.png';
import cardsSpritesheetAtlas from '../../assets/json/cardsSpritesheet.json';

import { App } from '../../utils/App';
import { Cards } from '../../utils/Cards';
import { Dealer } from '../../utils/Dealer';
import { Message } from '../../utils/Message';
import { Number } from '../../utils/Number';
import { Button } from '../../utils/Button';
import { GameOverPanel } from '../../utils/GameOverPanel';

import paramsAtlas from './values.json';
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

        // add dealer
        this.dealer = new Dealer();

        // add mattress
        this.mattress = new Mattress(this.mattressContainer);

        // make enemy deck
        const enemyDeck = this.dealer.shuffleCards([
            'AS', '5S', '6S', '7S', '8S', '9S', 'TS',
            'AC', '5C', '6C', '7C', '8C', '9C', 'TC',
            'AH', '5H', '6H', '7H', '8H', '9H', 'TH',
            'AD', '5D', '6D', '7D', '8D', '9D', 'TD',
            'KD', 'KS', 'KH', 'KC',
            'QD', 'QS', 'QH', 'QC',
            'JD', 'JS', 'JH', 'JC'
        ]);

        // make player deck
        const playerDeck = this.dealer.shuffleCards([
            '2S', '3S', '4S',
            '2C', '3C', '4C',
            '2H', '3H', '4H',
            '2D', '3D', '4D',
            'J1', 'J2'
        ]);
    }

}
