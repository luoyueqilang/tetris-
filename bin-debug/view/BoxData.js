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
    //方块样式
    tetris.BOXLIST = (_a = {},
        _a[1] = [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        _a[2] = [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        _a[3] = [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        _a[4] = [
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        _a[5] = [
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        _a[6] = [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        _a[7] = [
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        _a);
    //方块颜色
    tetris.BOXCOLOR = (_b = {},
        _b[1] = 0x1E90FF,
        _b[2] = 0xFFF0F5,
        _b[3] = 0x008000,
        _b[4] = 0xFFD700,
        _b[5] = 0xFFFAFA,
        _b[6] = 0xFF8C00,
        _b[7] = 0x9400D3,
        _b);
    var BOXLENGHT = {
        0: 45,
        1: 35
    };
    var BoxData = (function (_super) {
        __extends(BoxData, _super);
        function BoxData(type, color, status) {
            var _this = _super.call(this) || this;
            _this._type = type;
            _this._color = color;
            _this._status = status;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawBox, _this);
            return _this;
        }
        BoxData.prototype.drawBox = function () {
            var _boxInfo = this._type;
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (_boxInfo[i][j]) {
                        var box = new tetris.BlockView(j * BOXLENGHT[this._status], i * BOXLENGHT[this._status], tetris.BOXCOLOR[this._color], this._status);
                        this.addChild(box);
                    }
                }
            }
        };
        return BoxData;
    }(egret.DisplayObjectContainer));
    tetris.BoxData = BoxData;
    __reflect(BoxData.prototype, "tetris.BoxData");
    //浅复制
    function getCopy(obJ) {
        var back = {};
        for (var key in obJ) {
            back[key] = obJ[key];
        }
        return back;
    }
    tetris.getCopy = getCopy;
    //深复制
    function deepCopy(obj) {
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
    tetris.deepCopy = deepCopy;
    var _a, _b;
})(tetris || (tetris = {}));
//# sourceMappingURL=BoxData.js.map