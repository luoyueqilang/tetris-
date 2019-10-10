namespace tetris {

    export class UIView extends eui.Component implements eui.UIComponent {

        public change: eui.Label;
        public heartLabel: eui.Label;
        public DownLabel: eui.Label;
        public finalSocre: eui.Label;
        public canFastDown: boolean;
        public roundDisplay: eui.Label;
        private _turnRight: eui.Label;
        private _turnLeft: eui.Label;
        private _game: GameView;
        private _fastDown: eui.Label;
        private pauseLabel: eui.Label;
        private startLabel: eui.Label;
        private _startStatus: boolean;
        private easyRound: eui.Label;
        private midRound: eui.Label;
        private hardRound: eui.Label;
        private disappear: eui.Label;
        private cheatLabel: eui.Label;
        private clickStatus: boolean = true;
        private disapearChange: boolean = true;
        constructor(game) {
            super();
            this._game = game;
            // this.addEventListener(eui.UIEvent.COMPLETE, this.addWatch, this);
            this.skinName = 'TE_ViewSkin';
            this._startStatus = false;
            this.canFastDown = true;
            this.change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnChange, this);
            this._turnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnRight, this);
            this._turnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnLeft, this);
            this.DownLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnDown, this);
            this.pauseLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPause, this);
            this.startLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
            this._fastDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickFastDown, this);
            this.easyRound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnEasy, this);
            this.midRound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnMiddle, this);
            this.hardRound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnHard, this);
            this.cheatLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheat, this);
            this.disappear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnDisappear, this);
            this.heartLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnHeart, this);
        }

        private turnChange(): void {
            if (!this._game.removeStatus && this.clickStatus) {
                let tempBox = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
                let tempBox_1 = this._game.boxData;
                for (let i = 0, dst = 3; i < 4; i++ , dst--) {
                    for (let j = 0; j < 4; j++) {
                        tempBox[j][dst] = tempBox_1[i][j];
                    }
                }
                //移动到左上角
                for (let i = 0; i < 4; i++) {
                    let flag = 1;
                    for (let j = 0; j < 4; j++) {
                        //第0列是否有值
                        if (tempBox[j][0]) {
                            flag = 0;
                        }
                    }
                    if (flag) {
                        for (let k = 0; k < 4; k++) {
                            tempBox[k].shift();
                            tempBox[k].push(0)
                        }
                    }
                }

                let down_1: number;
                loop:
                for (let i = 3; i >= 0; i--) {
                    for (let j = 0; j < 4; j++) {
                        if (tempBox[i][j]) {
                            down_1 = i;
                            break loop;
                        }
                    }
                }
                let right_1: number;
                loop1:
                for (let j = 3; j >= 0; j--) {
                    for (let i = 0; i < 4; i++) {
                        if (tempBox[i][j]) {
                            right_1 = j;
                            break loop1;
                        }
                    }
                }
                //碰到底部就不旋转
                let changeStatus: number = 1;
                if (this._game.pos[1] + down_1 <= 19 && this._game.pos[0] + right_1 < 10) {
                    loop_1: for (let i = down_1; i >= 0; i--) {
                        for (let j = 0; j <= right_1; j++) {
                            if (this._game.boxMap[this._game.pos[1] + i][this._game.pos[0] + j] && tempBox[i][j]) {
                                changeStatus = 0;
                                break loop_1;
                            }
                        }
                    }
                    if (changeStatus) {
                        for (let i = 0; i < 4; i++) {
                            for (let j = 0; j < 4; j++) {
                                this._game.boxData[i][j] = tempBox[i][j];
                            }
                        }
                        this._game.removeChild(this._game.boxList);
                        this._game.createBoxList();
                    }
                }
            }
        }

        private turnLeft(): void {
            if (!this._game.removeStatus && this.clickStatus) {
                this._game.pos[0]--;
                this._game.checkMove(1);
                if (this._game.endStatus != 1) {
                    this._game.boxList.x = 45 * this._game.pos[0] + 100;
                } else {
                    this._game.endStatus = 0;
                    this._game.NewBox();
                }
            }
        }

        // 0 下  1 左 2右
        private turnDown(): void {
            if (!this._game.removeStatus && this.clickStatus) {
                this._game.pos[1]++;
                this._game.checkMove(0);
                if (this._game.endStatus != 1) {
                    this._game.boxList.y = 45 * this._game.pos[1] + 10;
                } else if (this._game.endStatus == 1) {
                    this._game.endStatus = 0;
                    this._game.NewBox();
                }
            }
        }

        private turnRight(): void {
            if (!this._game.removeStatus && this.clickStatus) {
                this._game.pos[0]++;
                this._game.checkMove(2);
                if (this._game.endStatus != 1) {
                    this._game.boxList.x = 45 * this._game.pos[0] + 100;
                } else {
                    this._game.NewBox();
                }
            }
        }

        private clickPause(): void {
            clearInterval(this._game.timer);
            this._startStatus = true;
            this.clickStatus = false;
        }

        private clickStart(): void {
            if (this._startStatus) {
                this._game.timeFunc();
                this._startStatus = false;
                this.clickStatus = true;
            } else {
                alert("已经开始中");
            }
        }

        //快速下落
        private clickFastDown(): void {
            if (this.clickStatus) {
                if (this._game.endStatus == 0) {
                    this._game.checkMove(3);
                    // this.canFastDown = false;
                } else {
                    alert("已下落");
                }
            }
        }

        private turnEasy(): void {
            this.clickStatus = true;
            this._game.difficultRound = 0;
            this._game.gameOver();
        }

        private turnMiddle(): void {
            this.clickStatus = true;
            this._game.difficultRound = 1;
            this._game.gameOver();
        }

        private turnHard(): void {
            this.clickStatus = true;
            this._game.difficultRound = 2;
            this._game.gameOver();
        }

        private onCheat(): void {
            let chanceNum: number;
            chanceNum = Math.floor(Math.random() * 2);
            switch (chanceNum) {
                case 0:
                    alert("运气不错哦，给你看一下下，抓紧时间^~^");
                    this._game.boxMapView.visible = true;
                    var groupChild = this._game.boxMapView.numChildren;
                    for (let k = 0; k < groupChild; k++) {
                        if (!this._game.boxMapView.getChildAt(k)) continue;
                        let child = this._game.boxMapView.getChildAt(k);
                        child.visible = true;
                    }
                    this._game.boxMapView.alpha = 0.2;
                    break;
                case 1:
                    alert("好啦好啦给你看一下");
                    alert("骗你的，就不给你看");
                    break;
            }
        }

        private turnDisappear(): void {
            if (this.disapearChange) {
                this._game.difficultRound = 3;
                this._game.gameOver();
                this.disappear.text = "神隐模式";
                this.disapearChange = false;
            } else {
                this._game.difficultRound = 4;
                this._game.gameOver();
                this.disappear.text = "全隐模式";
                this.disapearChange = true;
            }

        }
        //定制关卡切换
        public roundNum = 4;
        private turnHeart(): void {
            this.clickStatus = true;
            this.roundNum++
            this._game.difficultRound = this.roundNum;
            this.heartLabel.text = ROUNDDISPLAY[this.roundNum];
            this._game.gameOver();
            if (this.roundNum >= 8) {
                this.roundNum = 4;
            }
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}
