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
    var DrawTable = (function (_super) {
        __extends(DrawTable, _super);
        function DrawTable() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.draw, _this);
            return _this;
        }
        DrawTable.prototype.draw = function () {
            var rowShape = new egret.Shape();
            rowShape.graphics.lineStyle(2, 0x000000);
            for (var i = 0; i < 21; i++) {
                rowShape.graphics.moveTo(100, 10 + 45 * i);
                rowShape.graphics.lineTo(550, 10 + 45 * i);
            }
            rowShape.graphics.endFill();
            var lineShape = new egret.Shape();
            lineShape.graphics.lineStyle(2, 0x000000);
            for (var j = 0; j < 11; j++) {
                lineShape.graphics.moveTo(100 + 45 * j, 10);
                lineShape.graphics.lineTo(100 + 45 * j, 910);
            }
            lineShape.graphics.endFill();
            this.addChild(rowShape);
            this.addChild(lineShape);
        };
        return DrawTable;
    }(egret.DisplayObjectContainer));
    tetris.DrawTable = DrawTable;
    __reflect(DrawTable.prototype, "tetris.DrawTable");
})(tetris || (tetris = {}));
//# sourceMappingURL=DrawTable.js.map