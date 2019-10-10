namespace tetris {

    //方块样式
    export const BOXLIST = {
        [1]: [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [2]: [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [3]: [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [4]: [
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [5]: [
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [6]: [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [7]: [
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]

    };
    //方块颜色
    export const BOXCOLOR = {
        [1]: 0x1E90FF,
        [2]: 0xFFF0F5,
        [3]: 0x008000,
        [4]: 0xFFD700,
        [5]: 0xFFFAFA,
        [6]: 0xFF8C00,
        [7]: 0x9400D3
    };

    const BOXLENGHT = {
        0: 45,
        1: 35
    };
    export class BoxData extends egret.DisplayObjectContainer {

        private _color: number;
        private _type: number[][];
        private _status: number;
        constructor(type, color, status) {
            super();
            this._type = type;
            this._color = color;
            this._status = status;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.drawBox, this);
        }

        private drawBox(): void {
            let _boxInfo = this._type;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (_boxInfo[i][j]) {
                        let box = new BlockView(j * BOXLENGHT[this._status], i * BOXLENGHT[this._status], BOXCOLOR[this._color], this._status);
                        this.addChild(box);
                    }
                }
            }
        }
    }
   //浅复制
    export function getCopy(obJ: any): any {
        let back = {};
        for (let key in obJ) {
            back[key] = obJ[key];
        }
        return back;
    }
  //深复制
   export function deepCopy(obj) {
       //递归到属性值不是对象（number 或者string）
        if (typeof obj != 'object') {
            return obj;
        }
        var newobj = {};
        for (var attr in obj) {
            newobj[attr] = deepCopy(obj[attr]);
        }
        return newobj;
    }
}
