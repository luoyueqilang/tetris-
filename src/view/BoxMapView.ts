namespace tetris {

    export class BoxMapView extends egret.DisplayObjectContainer {
        private _color: number;
        private _type: number[][];
        private _gameView: GameView;
        constructor(game) {
            super();
            this._gameView = game;
            this.width = 500;
            this.height = 910;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.drawBox, this);
        }

        private drawBox(): void {
            for (let i = 0; i < 21; i++) {
                for (let j = 0; j < 10; j++) {
                    if (this._gameView.boxMap[i][j]) {
                        let Onebox = new BlockView(j * 45 + 100, i * 45 + 10, BOXCOLOR[1], 0);
                        this.addChild(Onebox);
                        if (this._gameView.difficultRound == 3) {
                            if (i == this._gameView.visibleHeight[j]) {
                                Onebox.visible = true;
                            } else {
                                Onebox.visible = false;
                            }
                        }
                        if (this._gameView.difficultRound == 4) {
                            if (i == this._gameView.visibleHeight[0]) {
                                Onebox.visible = true;
                            } else {
                                Onebox.visible = false;
                            }
                        }
                    }
                }
            }
        }
    }
}
