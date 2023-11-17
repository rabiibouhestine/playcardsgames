import * as PIXI from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js';

export class Card {
    constructor(app, spritesheet, {faceName, backName = 'B1', position, location = null, faceUp = false, isInteractive = false, isDraggable = false, onPointerdown = () => {}}) {
        this.app = app;
        this.spritesheet = spritesheet;
        this.faceName = faceName;
        this.backName = backName;
        this.position = position;
        this.location = location;
        this.faceUp = faceUp;
        this.width = 80;
        this.height = 110;
        this.isDragged = false;
        this.isInteractive = isInteractive;

        this.sprite = new PIXI.Sprite(spritesheet.textures[faceUp? this.faceName : this.backName]);
        this.sprite.anchor.set(0.5);
        this.sprite.x = position.x;
        this.sprite.y = position.y;
        this.sprite.width = this.width;
        this.sprite.height = this.height;
        this.sprite.eventMode = isInteractive? 'static' : 'none';
        this.sprite.cursor = isInteractive? 'pointer' : 'default';

        this.sprite
            .on('pointerover', this.onPointerOver, this)
            .on('pointerout', this.onPointerOut, this)
            .on('pointerdown', () => {onPointerdown(this)}, this);

        if (isDraggable) {
            this.sprite.on('pointerdown', this.onDragStart, this);
            this.sprite.on('pointerup', this.onDragEnd, this);
            this.sprite.on('pointerupoutside', this.onDragEnd, this);
            app.stage.eventMode = 'static';
            app.stage.on('pointermove', this.onDragMove, this);
        }

        app.stage.addChild(this.sprite);
    }

    onPointerOver() {
        this.sprite.width = 1.1 * this.width;
        this.sprite.height = 1.1 * this.height;
    }

    onPointerOut() {
        this.sprite.width = this.width;
        this.sprite.height = this.height;
    }

    setDraggable(isDraggable) {
        if (isDraggable) {
            this.sprite.on('pointerdown', this.onDragStart, this);
            this.sprite.on('pointerup', this.onDragEnd, this);
            this.sprite.on('pointerupoutside', this.onDragEnd, this);
            app.stage.eventMode = 'static';
            app.stage.on('pointermove', this.onDragMove, this);
        } else {
            this.sprite.off('pointerdown', this.onDragStart, this);
            this.sprite.off('pointerup', this.onDragEnd, this);
            this.sprite.off('pointerupoutside', this.onDragEnd, this);
            app.stage.eventMode = 'none';
            app.stage.off('pointermove', this.onDragMove, this);
        }
    }

    setInteractive(isInteractive) {
        this.isInteractive = isInteractive;
        this.sprite.eventMode = isInteractive? 'static' : 'none';
        this.sprite.cursor = isInteractive? 'pointer' : 'default';
    }

    flip(faceUp, immediate = false) {
        if (faceUp === this.faceUp) {
            return;
        }
        this.faceUp = !this.faceUp;
        if (immediate) {
            this.sprite.texture = this.spritesheet.textures[faceUp? this.faceName : this.backName];
        } else {
            const isInteractive = this.isInteractive;
            this.setInteractive(false);
            const propreties = {
                width: this.sprite.width,
                height: this.sprite.height
            };
    
            const tweenUp = new TWEEN.Tween(propreties, false)
                .to({
                    width: 0,
                    height: this.height * 1.1
                }, 150)
                .onUpdate(() => {
                    this.sprite.width = propreties.width;
                    this.sprite.height = propreties.height;
                })
                .onComplete(() => {
                    this.sprite.texture = this.spritesheet.textures[faceUp? this.faceName : this.backName];
                });
    
            const tweenDown = new TWEEN.Tween(propreties, false)
                .to({
                    width: this.width,
                    height: this.height
                }, 150)
                .onUpdate(() => {
                    this.sprite.width = propreties.width;
                    this.sprite.height = propreties.height;
                })
                .onComplete(() => {
                    this.setInteractive(isInteractive);
                });
    
            const updateFlip = (delta) => {
                if (!tweenUp.isPlaying() && !tweenDown.isPlaying()) return;
                tweenUp.update(delta);
                tweenDown.update(delta);
                requestAnimationFrame(updateFlip);
            };
        
            tweenUp.chain(tweenDown).start();
            requestAnimationFrame(updateFlip);
        }
    }

    moveTo(x, y, immediate = false) {
        this.position = {x:x, y:y};
        if (immediate) {
            this.sprite.x = x;
            this.sprite.y = y;
        } else {
            const propreties = {
                x: this.sprite.x,
                y: this.sprite.y
            };
    
            const tween = new TWEEN.Tween(propreties, false)
                .to({
                    x: x,
                    y: y
                }, 600)
                .easing(TWEEN.Easing.Exponential.Out)
                .onUpdate(() => {
                    this.sprite.x = propreties.x;
                    this.sprite.y = propreties.y;
                })
                .start()
    
            const updatePosition = (delta) => {
                if (!tween.isPlaying()) return;
                tween.update(delta);
                requestAnimationFrame(updatePosition);
            };
        
            requestAnimationFrame(updatePosition);
        }
    }

    onDragStart() {
        this.isDragged = true;
    }

    onDragMove(event) {
        if (this.isDragged) {
            this.sprite.parent.toLocal(event.global, null, this.sprite.position);
        }
    }

    onDragEnd()
    {
        this.isDragged = false;
    }
}