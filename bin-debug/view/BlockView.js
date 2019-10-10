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
    var BlockView = (function (_super) {
        __extends(BlockView, _super);
        function BlockView(x1, y1, color, status) {
            var _this = _super.call(this) || this;
            _this._color = color;
            _this.position = {
                x: x1,
                y: y1
            };
            _this.x = x1;
            _this.y = y1;
            _this._status = status;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawBlock, _this);
            return _this;
        }
        BlockView.prototype.drawBlock = function () {
            if (this._status == 0) {
                this.box_width = 45;
            }
            else {
                this.box_width = 35;
            }
            var block = new egret.Shape();
            block.graphics.beginFill(this._color);
            block.graphics.drawRect(0, 0, this.box_width, this.box_width);
            block.graphics.endFill();
            this.addChild(block);
            var shp = new egret.Shape();
            shp.graphics.lineStyle(1, 0x000000);
            shp.graphics.moveTo(0, 0);
            shp.graphics.lineTo(this.box_width, 0);
            shp.graphics.lineTo(this.box_width, this.box_width);
            shp.graphics.lineTo(0, this.box_width);
            shp.graphics.lineTo(0, 0);
            shp.graphics.endFill();
            this.addChild(shp);
        };
        return BlockView;
    }(egret.DisplayObjectContainer));
    tetris.BlockView = BlockView;
    __reflect(BlockView.prototype, "tetris.BlockView");
})(tetris || (tetris = {}));
//# sourceMappingURL=BlockView.js.map