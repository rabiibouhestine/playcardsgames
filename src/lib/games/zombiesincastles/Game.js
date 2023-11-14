import * as PIXI from "pixi.js";
import { App } from "../utils/App";
import { Layout } from "./Layout";

export class Game extends App {
    constructor(canvasRef) {
        super(canvasRef, 0x7d80ca);

        this.layout = new Layout(this.app);
    }
}