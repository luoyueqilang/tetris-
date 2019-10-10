var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var tetris;
(function (tetris) {
    var UIView = (function (_super) {
        __extends(UIView, _super);
        function UIView(game) {
            var _this = _super.call(this) || this;
            _this.clickStatus = true;
            _this.disapearChange = true;
            //定制关卡切换
            _this.roundNum = 4;
            _this._game = game;
            // this.addEventListener(eui.UIEvent.COMPLETE, this.addWatch, this);
            _this.skinName = 'TE_ViewSkin';
            _this._startStatus = false;
            _this.canFastDown = true;
            _this.change.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnChange, _this);
            _this._turnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnRight, _this);
            _this._turnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnLeft, _this);
            _this.DownLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnDown, _this);
            _this.pauseLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickPause, _this);
            _this.startLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickStart, _this);
            _this._fastDown.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickFastDown, _this);
            _this.easyRound.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnEasy, _this);
            _this.midRound.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnMiddle, _this);
            _this.hardRound.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnHard, _this);
            _this.cheatLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCheat, _this);
            _this.disappear.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnDisappear, _this);
            _this.heartLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnHeart, _this);
            return _this;
        }
        UIView.prototype.turnChange = function () {
            if (!this._game.removeStatus && this.clickStatus) {
                var tempBox = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
                var tempBox_1 = this._game.boxData;
                for (var i = 0, dst = 3; i < 4; i++, dst--) {
                    for (var j = 0; j < 4; j++) {
                        tempBox[j][dst] = tempBox_1[i][j];
                    }
                }
                //移动到左上角
                for (var i = 0; i < 4; i++) {
                    var flag = 1;
                    for (var j = 0; j < 4; j++) {
                        //第0列是否有值
                        if (tempBox[j][0]) {
                            flag = 0;
                        }
                    }
                    if (flag) {
                        for (var k = 0; k < 4; k++) {
                            tempBox[k].shift();
                            tempBox[k].push(0);
                        }
                    }
                }
                var down_1 = void 0;
                loop: for (var i = 3; i >= 0; i--) {
                    for (var j = 0; j < 4; j++) {
                        if (tempBox[i][j]) {
                            down_1 = i;
                            break loop;
                        }
                    }
                }
                var right_1 = void 0;
                loop1: for (var j = 3; j >= 0; j--) {
                    for (var i = 0; i < 4; i++) {
                        if (tempBox[i][j]) {
                            right_1 = j;
                            break loop1;
                        }
                    }
                }
                //碰到底部就不旋转
                var changeStatus = 1;
                if (this._game.pos[1] + down_1 <= 19 && this._game.pos[0] + right_1 < 10) {
                    loop_1: for (var i = down_1; i >= 0; i--) {
                        for (var j = 0; j <= right_1; j++) {
                            if (this._game.boxMap[this._game.pos[1] + i][this._game.pos[0] + j] && tempBox[i][j]) {
                                changeStatus = 0;
                                break loop_1;
                            }
                        }
                    }
                    if (changeStatus) {
                        for (var i = 0; i < 4; i++) {
                            for (var j = 0; j < 4; j++) {
                                this._game.boxData[i][j] = tempBox[i][j];
                            }
                        }
                        this._game.removeChild(this._game.boxList);
                        this._game.createBoxList();
                    }
                }
            }
        };
        UIView.prototype.turnLeft = function () {
            if (!this._game.removeStatus && this.clickStatus) {
                this._game.pos[0]--;
                this._game.checkMove(1);
                if (this._game.endStatus != 1) {
                    this._game.boxList.x = 45 * this._game.pos[0] + 100;
                }
                else {
                    this._game.endStatus = 0;
                    this._game.NewBox();
                }
            }
        };
        // 0 下  1 左 2右
        UIView.prototype.turnDown = function () {
            if (!this._game.removeStatus && this.clickStatus) {
                this._game.pos[1]++;
                this._game.checkMove(0);
                if (this._game.endStatus != 1) {
                    this._game.boxList.y = 45 * this._game.pos[1] + 10;
                }
                else if (this._game.endStatus == 1) {
                    this._game.endStatus = 0;
                    this._game.NewBox();
                }
            }
        };
        UIView.prototype.turnRight = function () {
            if (!this._game.removeStatus && this.clickStatus) {
                this._game.pos[0]++;
                this._game.checkMove(2);
                if (this._game.endStatus != 1) {
                    this._game.boxList.x = 45 * this._game.pos[0] + 100;
                }
                else {
                    this._game.NewBox();
                }
            }
        };
        UIView.prototype.clickPause = function () {
            clearInterval(this._game.timer);
            this._startStatus = true;
            this.clickStatus = false;
        };
        UIView.prototype.clickStart = function () {
            if (this._startStatus) {
                this._game.timeFunc();
                this._startStatus = false;
                this.clickStatus = true;
            }
            else {
                alert("已经开始中");
            }
        };
        //快速下落
        UIView.prototype.clickFastDown = function () {
            if (this.clickStatus) {
                if (this._game.endStatus == 0) {
                    this._game.checkMove(3);
                    // this.canFastDown = false;
                }
                else {
                    alert("已下落");
                }
            }
        };
        UIView.prototype.turnEasy = function () {
            this.clickStatus = true;
            this._game.difficultRound = 0;
            this._game.gameOver();
        };
        UIView.prototype.turnMiddle = function () {
            this.clickStatus = true;
            this._game.difficultRound = 1;
            this._game.gameOver();
        };
        UIView.prototype.turnHard = function () {
            this.clickStatus = true;
            this._game.difficultRound = 2;
            this._game.gameOver();
        };
        UIView.prototype.onCheat = function () {
            var chanceNum;
            chanceNum = Math.floor(Math.random() * 2);
            switch (chanceNum) {
                case 0:
                    alert("运气不错哦，给你看一下下，抓紧时间^~^");
                    this._game.boxMapView.visible = true;
                    var groupChild = this._game.boxMapView.numChildren;
                    for (var k = 0; k < groupChild; k++) {
                        if (!this._game.boxMapView.getChildAt(k))
                            continue;
                        var child = this._game.boxMapView.getChildAt(k);
                        child.visible = true;
                    }
                    this._game.boxMapView.alpha = 0.2;
                    break;
                case 1:
                    alert("好啦好啦给你看一下");
                    alert("骗你的，就不给你看");
                    break;
            }
        };
        UIView.prototype.turnDisappear = function () {
            if (this.disapearChange) {
                this._game.difficultRound = 3;
                this._game.gameOver();
                this.disappear.text = "神隐模式";
                this.disapearChange = false;
            }
            else {
                this._game.difficultRound = 4;
                this._game.gameOver();
                this.disappear.text = "全隐模式";
                this.disapearChange = true;
            }
        };
        UIView.prototype.turnHeart = function () {
            this.clickStatus = true;
            this.roundNum++;
            this._game.difficultRound = this.roundNum;
            this.heartLabel.text = tetris.ROUNDDISPLAY[this.roundNum];
            this._game.gameOver();
            if (this.roundNum >= 8) {
                this.roundNum = 4;
            }
        };
        UIView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        UIView.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return UIView;
    }(eui.Component));
    tetris.UIView = UIView;
    __reflect(UIView.prototype, "tetris.UIView", ["eui.UIComponent", "egret.DisplayObject"]);
})(tetris || (tetris = {}));
//# sourceMappingURL=UIView.js.map