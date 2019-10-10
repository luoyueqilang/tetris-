namespace tetris {

    const TABLE = {
        width: 600,
        height: 1000,
        offX: 50,
        offY: 0
    };

    const GAME = {
        width: 450,
    };

    const SOCRE = {
        1: 1,
        2: 4,
        3: 8,
        4: 13
    };

    const ROUND = {
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
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
        ]
    };

    const DOWMSPEED = {
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

    export const ROUNDDISPLAY = {
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
    export class GameView extends egret.DisplayObjectContainer {

        public visibleHeight: number[];
        //计算完成的方块堆最高的一列 神隐模式用
        public pos: number[];
        public speed: number;
        public boxList: BoxData;
        public timer: any;
        //数据源
        public boxData: number[][];
        public removeStatus: boolean = false;
        public boxMap: number[][] = [];
        public successBoxList: number[][];
        //结束状态
        public endStatus: number = 0;
        //停止状态  是否可点击开始
        public startStatus: number = 0;
        //难度
        public difficultRound: number;
        public boxMapView: BoxMapView;
        private _UI: UIView;
        private _boxType: number;
        private _boxColor: number;
        private _gameStatus: boolean;
        private _gameSocre: number;
        private _downSpeed: number;
        private _boxList1: BoxData;
        private tempType: number;
        private tempColor: number;
        private typeNum: number;
        private colorNum: number;
        //神影模式的提示
        private tipView: any;

        constructor() {
            super();
            this._gameStatus = true;
            this._gameSocre = 0;
            this.difficultRound = 0;
            this._downSpeed = 1000;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        }

        private addToStage(): void {
            this._UI = new UIView(this);
            this.addChild(this._UI);
            let table = new DrawTable();
            this.addChild(table);
            if (this._gameStatus) {
                this.onStart();
            }
        }
        //开始游戏
        private onStart(): void {
            this.boxMap = [];
            this.tempType = Math.ceil(Math.random() * 7);
            this.tempColor = Math.ceil(Math.random() * 7);
            this._UI.roundDisplay.text = "" + this.difficultRound + ROUNDDISPLAY[this.difficultRound];
            this._UI.finalSocre.text = '' + this._gameSocre;
            //创建整个大数组
            if (this.difficultRound == 0 || this.difficultRound == 3 || this.difficultRound == 4) {
                for (let i = 0; i < 21; i++) {
                    this.boxMap[i] = [];
                    for (let j = 0; j < 10; j++) {
                        this.boxMap[i].push(0);
                    }
                }

            } else {
                for (let i = 0; i < 21 - ROUND[this.difficultRound].length - 1; i++) {
                    this.boxMap[i] = [];
                    for (let j = 0; j < 10; j++) {
                        this.boxMap[i].push(0);
                    }
                }
                for (let k = 0; k < ROUND[this.difficultRound].length; k++) {
                    //打乱 特定关卡不打乱
                    let arr_1 = ROUND[this.difficultRound][k].concat();
                    if (this.difficultRound < 5) {
                        console.log(ROUND[this.difficultRound][k]);
                        arr_1.sort(() => {
                            return Math.random() - 0.5;
                        });
                    }
                    this.boxMap.push(arr_1);
                }
                let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.boxMap.push(arr);
            }

            this._downSpeed = DOWMSPEED[this.difficultRound];
            this.NewBox();
            if (this.difficultRound == 3) {
                this.getVisibleHeight();
            }
            this.boxMapView = new BoxMapView(this);

            this.addChild(this.boxMapView);
            this.timeFunc();
        }

        public timeFunc(): void {
            this.timer = setInterval(() => {
                if (this.endStatus == 0) {
                    this.pos[1]++;
                    this.checkMove(0);
                    if (this.endStatus == 0) {
                        this.boxList.y = 45 * this.pos[1] + 10;
                    } else if (this.endStatus == 1) {
                        this.NewBox();
                    }
                } else if (this.endStatus == 1) {
                    this.NewBox();
                }
            }, this._downSpeed);
        }

        public NewBox(): void {
            this.endStatus = 0;
            this.pos = [4, 0];
            this.typeNum = Math.ceil(Math.random() * 7);
            this.colorNum = Math.ceil(Math.random() * 7);
            //深度复制 BOXLIDST
            let copyBoxList = tetris.deepCopy(BOXLIST)
            // let copyBoxList = [].concat(JSON.parse(JSON.stringify(BOXLIST)));
            this.boxData = copyBoxList[this.tempType];
            let boxData_1 = BOXLIST[this.typeNum].concat();
            this._boxList1 = new BoxData(boxData_1, this.colorNum, 1);
            this.boxList = new BoxData(this.boxData, this.tempColor, 0);
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

        }

        public createBoxList(): void {
            this.boxList = new BoxData(this.boxData, this.tempColor, 0);
            this.boxList.x = 45 * this.pos[0] + 100;
            this.boxList.y = 45 * this.pos[1] + 10;
            this.addChild(this.boxList);
        }
        //判断是否有方块
        public checkMove(clickNum: number): void {
            //当前方块右边边界
            let right_1: number;
            //当前方块下面边界
            let down_1: number;
            //下面最突出对应的行
            let downCol_2: number;
            //左边最突出的行
            let leftLine: number;
            // //左边最突出的列
            //右边界  从最右边的一列开始遍历，有值就退出循环
            loop1:
            for (let j = 3; j >= 0; j--) {
                for (let i = 0; i < 4; i++) {
                    if (this.boxData[i][j]) {
                        right_1 = j;
                        break loop1;
                    }
                }
            }

            loop2:
            for (let i = 3; i >= 0; i--) {
                for (let j = 0; j < 4; j++) {
                    if (this.boxData[i][j]) {
                        down_1 = i;
                        downCol_2 = j;
                        break loop2;
                    }
                }
            }
            //左边
            for (let k = 0; k < 4; k++) {
                if (this.boxData[k][0]) {
                    leftLine = k;
                    break;
                }
            }
            //左边是否有方块
            if (this.pos[0] < 0) {
                this.pos[0] = 0;
            } else if (clickNum == 1) {
                loop4:
                for (let i = 0; i <= down_1; i++) {
                    for (let j = right_1; j >= 0; j--) {
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
            } else if (clickNum == 2) {
                loop5:
                for (let i = 0; i <= down_1; i++) {
                    for (let j = right_1; j >= 0; j--) {
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
            } else if (clickNum != 3) {
                loop6:
                for (let i = down_1; i >= 0; i--) {
                    for (let j = 0; j <= right_1; j++) {
                        if (this.boxMap[this.pos[1] + i][this.pos[0] + j] && this.boxData[i][j]) {
                            this.endStatus = 1;
                            //     //加入方块
                            this.pos[1]--;
                            if (this.pos[1] == 0) {
                                //游戏结束
                                this.gameOver();
                            } else {
                                this.printBox();
                            }
                            break loop6;
                        }
                    }
                }
            } else {
                //快速下落
                //从最底行循环  记录最短距离
                //最短距离
                let num_2: number = 0;
                //列
                for (let i = 0; i <= right_1; i++) {
                    let num_1: number = 0;
                    loop8: for (let j = down_1; j >= 0; j--) {
                        let num_3: number = 0;
                        if (this.boxData[j][i]) {
                            for (let k = this.pos[1]; (k + down_1) < 19; k++) {
                                if (this.boxMap[k + j + 1][this.pos[0] + i] == 0) {
                                    num_3++;
                                    num_1 = num_3;
                                } else {
                                    break loop8;
                                }
                            }
                        }
                    }
                    if (num_2 == 0) {
                        num_2 = num_1;
                    } else if (num_1 <= num_2) {
                        num_2 = num_1;
                    }
                };
                this.pos[1] += num_2;
                this.endStatus = 1;
                if (this.pos[1] == 0) {
                    //游戏结束
                    this.gameOver();
                } else {
                    this.endStatus = 1;
                    this.printBox();
                }
            }
        };
        //快速下落
        //将方块加入打印出来
        public printBox(): void {
            this._UI.DownLabel.touchEnabled = false;
            this.tempType = this.typeNum;
            this.tempColor = this.colorNum;
            if (this.endStatus == 1) {
                for (let i = 0; i < 4; i++) {
                    loop9: for (let j = 0; j < 4; j++) {
                        if ((this.pos[0] + j) < 10) {
                            if (this.boxData[i][j]) {
                                this.boxMap[this.pos[1] + i][this.pos[0] + j] = 1;
                            }
                        } else {
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
            this.boxMapView = new BoxMapView(this);
            this.addChild(this.boxMapView);

        };
        //计算分数
        private caculateSocre(): void {
            let success_length: number = 0;
            let flag: number[] = [0, 0, 0, 0];
            let flag_index: number = -1;
            loop7:
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 10; j++) {
                    if (this.boxMap[i][j] == 0) {
                        continue loop7;
                    }
                }
                flag_index++;
                //记录是哪一列全为1
                flag[flag_index] = i;
                success_length++;
            };

            if (this.difficultRound >= 5) {
                for (let k in flag) {
                    if (flag[k] == 19) {
                        alert("恭喜通关，点击确定进入下一关");
                        this.difficultRound++;
                        this._UI.roundNum++;
                        this._UI.heartLabel.text = ROUNDDISPLAY[this._UI.roundNum];
                        this.gameOver();
                    }
                }
            }
            for (let index = 0; index < 4; index++) {
                if (flag[index]) {
                    this.boxMap.splice(flag[index], 1);
                    let arr = [];
                    for (let i = 0; i < 10; i++) {
                        arr.push(0);
                    }
                    this.boxMap.unshift(arr);
                }
            };
            if (success_length != 0) {
                if (this.difficultRound == 3) {
                    this._gameSocre += SOCRE[success_length] * 2;
                } else {
                    this._gameSocre += SOCRE[success_length];
                }

                if (this._gameSocre > 20 && this._gameSocre < 40) {
                    this._downSpeed = 500;
                } else if (this._gameSocre >= 40 && this._gameSocre < 60) {
                    this._downSpeed -= 10;
                } else if (this._gameSocre >= 60) {
                    this._downSpeed = 200;
                }
            };
            this._UI.finalSocre.text = '' + this._gameSocre;
        };
        //游戏结束
        public gameOver(): void {
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

        private getVisibleHeight(): void {
            this.visibleHeight = [];
            loop10: for (let i = 0; i < 10; i++) {
                if (this.difficultRound == 3) {
                    for (let j = 0; j < 20; j++) {
                        if (this.boxMap[j][i]) {
                            this.visibleHeight.push(j);
                            continue loop10;
                        }
                    }
                }
                if (this.difficultRound == 4) {
                    for (let j = 0; j < 20; j++) {
                        if (this.boxMap[j][i]) {
                            this.visibleHeight[0] = j;
                            break loop10;
                        }
                    }
                }
                this.visibleHeight.push(0);
            }
        }
    }
}
