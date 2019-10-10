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
    var TABLE = {
        width: 600,
        height: 1000,
        offX: 50,
        offY: 0
    };
    var GAME = {
        width: 450,
    };
    var SOCRE = {
        1: 1,
        2: 4,
        3: 8,
        4: 13
    };
    var ROUND = {
        0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        1: [
            [1, 1, 0, 1, 1, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 1, 0, 0, 0, 1, 1]
        ],
        2: [
            [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 1, 0, 1, 1, 1, 0, 0, 1, 0],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 0],
            [1, 1, 0, 1, 1, 0, 0, 0, 0, 1]
        ],
        //桃心关
        5: [
            [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
        ],
        //华容道
        6: [
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
            [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
        ],
        //火烧赤壁
        7: [
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        ],
        //天梯
        8: [
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
        ]
    };
    var DOWMSPEED = {
        0: 1000,
        1: 800,
        2: 650,
        3: 1000,
        4: 800,
        5: 1000,
        6: 800,
        7: 800,
        8: 800
    };
    tetris.ROUNDDISPLAY = {
        0: "简单",
        1: "中等",
        2: "困难 ",
        3: "隐身模式",
        4: "全隐",
        5: "桃心关",
        6: "华容道",
        7: "火焰山",
        8: "天梯"
    };
    var GameView = (function (_super) {
        __extends(GameView, _super);
        function GameView() {
            var _this = _super.call(this) || this;
            _this.removeStatus = false;
            _this.boxMap = [];
            //结束状态
            _this.endStatus = 0;
            //停止状态  是否可点击开始
            _this.startStatus = 0;
            _this._gameStatus = true;
            _this._gameSocre = 0;
            _this.difficultRound = 0;
            _this._downSpeed = 1000;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
            return _this;
        }
        GameView.prototype.addToStage = function () {
            this._UI = new tetris.UIView(this);
            this.addChild(this._UI);
            var table = new tetris.DrawTable();
            this.addChild(table);
            if (this._gameStatus) {
                this.onStart();
            }
        };
        //开始游戏
        GameView.prototype.onStart = function () {
            this.boxMap = [];
            this.tempType = Math.ceil(Math.random() * 7);
            this.tempColor = Math.ceil(Math.random() * 7);
            this._UI.roundDisplay.text = "" + this.difficultRound + tetris.ROUNDDISPLAY[this.difficultRound];
            this._UI.finalSocre.text = '' + this._gameSocre;
            //创建整个大数组
            if (this.difficultRound == 0 || this.difficultRound == 3 || this.difficultRound == 4) {
                for (var i = 0; i < 21; i++) {
                    this.boxMap[i] = [];
                    for (var j = 0; j < 10; j++) {
                        this.boxMap[i].push(0);
                    }
                }
            }
            else {
                for (var i = 0; i < 21 - ROUND[this.difficultRound].length - 1; i++) {
                    this.boxMap[i] = [];
                    for (var j = 0; j < 10; j++) {
                        this.boxMap[i].push(0);
                    }
                }
                for (var k = 0; k < ROUND[this.difficultRound].length; k++) {
                    //打乱 特定关卡不打乱
                    var arr_1 = ROUND[this.difficultRound][k].concat();
                    if (this.difficultRound < 5) {
                        console.log(ROUND[this.difficultRound][k]);
                        arr_1.sort(function () {
                            return Math.random() - 0.5;
                        });
                    }
                    this.boxMap.push(arr_1);
                }
                var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.boxMap.push(arr);
            }
            this._downSpeed = DOWMSPEED[this.difficultRound];
            this.NewBox();
            if (this.difficultRound == 3) {
                this.getVisibleHeight();
            }
            this.boxMapView = new tetris.BoxMapView(this);
            this.addChild(this.boxMapView);
            this.timeFunc();
        };
        GameView.prototype.timeFunc = function () {
            var _this = this;
            this.timer = setInterval(function () {
                if (_this.endStatus == 0) {
                    _this.pos[1]++;
                    _this.checkMove(0);
                    if (_this.endStatus == 0) {
                        _this.boxList.y = 45 * _this.pos[1] + 10;
                    }
                    else if (_this.endStatus == 1) {
                        _this.NewBox();
                    }
                }
                else if (_this.endStatus == 1) {
                    _this.NewBox();
                }
            }, this._downSpeed);
        };
        GameView.prototype.NewBox = function () {
            this.endStatus = 0;
            this.pos = [4, 0];
            this.typeNum = Math.ceil(Math.random() * 7);
            this.colorNum = Math.ceil(Math.random() * 7);
            //深度复制 BOXLIDST
            var copyBoxList = tetris.deepCopy(tetris.BOXLIST);
            // let copyBoxList = [].concat(JSON.parse(JSON.stringify(BOXLIST)));
            this.boxData = copyBoxList[this.tempType];
            var boxData_1 = tetris.BOXLIST[this.typeNum].concat();
            this._boxList1 = new tetris.BoxData(boxData_1, this.colorNum, 1);
            this.boxList = new tetris.BoxData(this.boxData, this.tempColor, 0);
            this.addChild(this._boxList1);
            // this._boxColor = color;
            this.boxList.x = 45 * this.pos[0] + 100;
            this.boxList.y = 45 * this.pos[1] + 10;
            this._boxList1.x = 30;
            this._boxList1.y = 1000;
            this.addChild(this.boxList);
            //新的方块出来后才可以点击下
            this._UI.DownLabel.touchEnabled = true;
            this.removeStatus = false;
        };
        GameView.prototype.createBoxList = function () {
            this.boxList = new tetris.BoxData(this.boxData, this.tempColor, 0);
            this.boxList.x = 45 * this.pos[0] + 100;
            this.boxList.y = 45 * this.pos[1] + 10;
            this.addChild(this.boxList);
        };
        //判断是否有方块
        GameView.prototype.checkMove = function (clickNum) {
            //当前方块右边边界
            var right_1;
            //当前方块下面边界
            var down_1;
            //下面最突出对应的行
            var downCol_2;
            //左边最突出的行
            var leftLine;
            // //左边最突出的列
            //右边界  从最右边的一列开始遍历，有值就退出循环
            loop1: for (var j = 3; j >= 0; j--) {
                for (var i = 0; i < 4; i++) {
                    if (this.boxData[i][j]) {
                        right_1 = j;
                        break loop1;
                    }
                }
            }
            loop2: for (var i = 3; i >= 0; i--) {
                for (var j = 0; j < 4; j++) {
                    if (this.boxData[i][j]) {
                        down_1 = i;
                        downCol_2 = j;
                        break loop2;
                    }
                }
            }
            //左边
            for (var k = 0; k < 4; k++) {
                if (this.boxData[k][0]) {
                    leftLine = k;
                    break;
                }
            }
            //左边是否有方块
            if (this.pos[0] < 0) {
                this.pos[0] = 0;
            }
            else if (clickNum == 1) {
                loop4: for (var i = 0; i <= down_1; i++) {
                    for (var j = right_1; j >= 0; j--) {
                        if (this.boxMap[this.pos[1] + i][this.pos[0] + j] && this.boxData[i][j]) {
                            this.pos[0]++;
                            break loop4;
                        }
                    }
                }
            }
            //右边
            if ((this.pos[0] + right_1) >= 10) {
                this.pos[0]--;
            }
            else if (clickNum == 2) {
                loop5: for (var i = 0; i <= down_1; i++) {
                    for (var j = right_1; j >= 0; j--) {
                        if (this.boxMap[this.pos[1] + i][this.pos[0] + j] && this.boxData[i][j]) {
                            this.pos[0]--;
                            break loop5;
                        }
                    }
                }
            }
            //接触底部
            if (this.pos[1] + down_1 >= 20) {
                this.endStatus = 1;
                //加入方块
                this.pos[1]--;
                this.printBox();
            }
            else if (clickNum != 3) {
                loop6: for (var i = down_1; i >= 0; i--) {
                    for (var j = 0; j <= right_1; j++) {
                        if (this.boxMap[this.pos[1] + i][this.pos[0] + j] && this.boxData[i][j]) {
                            this.endStatus = 1;
                            //     //加入方块
                            this.pos[1]--;
                            if (this.pos[1] == 0) {
                                //游戏结束
                                this.gameOver();
                            }
                            else {
                                this.printBox();
                            }
                            break loop6;
                        }
                    }
                }
            }
            else {
                //快速下落
                //从最底行循环  记录最短距离
                //最短距离
                var num_2 = 0;
                //列
                for (var i = 0; i <= right_1; i++) {
                    var num_1 = 0;
                    loop8: for (var j = down_1; j >= 0; j--) {
                        var num_3 = 0;
                        if (this.boxData[j][i]) {
                            for (var k = this.pos[1]; (k + down_1) < 19; k++) {
                                if (this.boxMap[k + j + 1][this.pos[0] + i] == 0) {
                                    num_3++;
                                    num_1 = num_3;
                                }
                                else {
                                    break loop8;
                                }
                            }
                        }
                    }
                    if (num_2 == 0) {
                        num_2 = num_1;
                    }
                    else if (num_1 <= num_2) {
                        num_2 = num_1;
                    }
                }
                ;
                this.pos[1] += num_2;
                this.endStatus = 1;
                if (this.pos[1] == 0) {
                    //游戏结束
                    this.gameOver();
                }
                else {
                    this.endStatus = 1;
                    this.printBox();
                }
            }
        };
        ;
        //快速下落
        //将方块加入打印出来
        GameView.prototype.printBox = function () {
            this._UI.DownLabel.touchEnabled = false;
            this.tempType = this.typeNum;
            this.tempColor = this.colorNum;
            if (this.endStatus == 1) {
                for (var i = 0; i < 4; i++) {
                    loop9: for (var j = 0; j < 4; j++) {
                        if ((this.pos[0] + j) < 10) {
                            if (this.boxData[i][j]) {
                                this.boxMap[this.pos[1] + i][this.pos[0] + j] = 1;
                            }
                        }
                        else {
                            break loop9;
                        }
                    }
                }
            }
            this.removeChild(this.boxMapView);
            this.removeChild(this.boxList);
            this.removeChild(this._boxList1);
            this.removeStatus = true;
            this.caculateSocre();
            if (this.difficultRound == 3 || this.difficultRound == 4) {
                // this.boxMapView.visible = false
                this.getVisibleHeight();
            }
            this.boxMapView = new tetris.BoxMapView(this);
            this.addChild(this.boxMapView);
        };
        ;
        //计算分数
        GameView.prototype.caculateSocre = function () {
            var success_length = 0;
            var flag = [0, 0, 0, 0];
            var flag_index = -1;
            loop7: for (var i = 0; i < 20; i++) {
                for (var j = 0; j < 10; j++) {
                    if (this.boxMap[i][j] == 0) {
                        continue loop7;
                    }
                }
                flag_index++;
                //记录是哪一列全为1
                flag[flag_index] = i;
                success_length++;
            }
            ;
            if (this.difficultRound >= 5) {
                for (var k in flag) {
                    if (flag[k] == 19) {
                        alert("恭喜通关，点击确定进入下一关");
                        this.difficultRound++;
                        this._UI.roundNum++;
                        this._UI.heartLabel.text = tetris.ROUNDDISPLAY[this._UI.roundNum];
                        this.gameOver();
                    }
                }
            }
            for (var index = 0; index < 4; index++) {
                if (flag[index]) {
                    this.boxMap.splice(flag[index], 1);
                    var arr = [];
                    for (var i = 0; i < 10; i++) {
                        arr.push(0);
                    }
                    this.boxMap.unshift(arr);
                }
            }
            ;
            if (success_length != 0) {
                if (this.difficultRound == 3) {
                    this._gameSocre += SOCRE[success_length] * 2;
                }
                else {
                    this._gameSocre += SOCRE[success_length];
                }
                if (this._gameSocre > 20 && this._gameSocre < 40) {
                    this._downSpeed = 500;
                }
                else if (this._gameSocre >= 40 && this._gameSocre < 60) {
                    this._downSpeed -= 10;
                }
                else if (this._gameSocre >= 60) {
                    this._downSpeed = 200;
                }
            }
            ;
            this._UI.finalSocre.text = '' + this._gameSocre;
        };
        ;
        //游戏结束
        GameView.prototype.gameOver = function () {
            this.endStatus = 1;
            if (!this.removeStatus) {
                this.removeChild(this.boxMapView);
                this.removeChild(this._boxList1);
                this.removeChild(this.boxList);
                this.boxData = [];
                this.boxMap = [];
                this.visibleHeight = [];
                this._gameSocre = 0;
                clearInterval(this.timer);
                this.onStart();
            }
        };
        ;
        GameView.prototype.getVisibleHeight = function () {
            this.visibleHeight = [];
            loop10: for (var i = 0; i < 10; i++) {
                if (this.difficultRound == 3) {
                    for (var j = 0; j < 20; j++) {
                        if (this.boxMap[j][i]) {
                            this.visibleHeight.push(j);
                            continue loop10;
                        }
                    }
                }
                if (this.difficultRound == 4) {
                    for (var j = 0; j < 20; j++) {
                        if (this.boxMap[j][i]) {
                            this.visibleHeight[0] = j;
                            break loop10;
                        }
                    }
                }
                this.visibleHeight.push(0);
            }
        };
        return GameView;
    }(egret.DisplayObjectContainer));
    tetris.GameView = GameView;
    __reflect(GameView.prototype, "tetris.GameView");
})(tetris || (tetris = {}));
//# sourceMappingURL=GameTab.js.map