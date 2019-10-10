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
    var BoxMapView = (function (_super) {
        __extends(BoxMapView, _super);
        function BoxMapView(game) {
            var _this = _super.call(this) || this;
            _this._gameView = game;
            _this.width = 500;
            _this.height = 910;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawBox, _this);
            return _this;
        }
        BoxMapView.prototype.drawBox = function () {
            for (var i = 0; i < 21; i++) {
                for (var j = 0; j < 10; j++) {
                    if (this._gameView.boxMap[i][j]) {
                        var Onebox = new tetris.BlockView(j * 45 + 100, i * 45 + 10, tetris.BOXCOLOR[1], 0);
                        this.addChild(Onebox);
                        if (this._gameView.difficultRound == 3) {
                            if (i == this._gameView.visibleHeight[j]) {
                                Onebox.visible = true;
                            }
                            else {
                                Onebox.visible = false;
                            }
                        }
                        if (this._gameView.difficultRound == 4) {
                            if (i == this._gameView.visibleHeight[0]) {
                                Onebox.visible = true;
                            }
                            else {
                                Onebox.visible = false;
                            }
                        }
                    }
                }
            }
        };
        return BoxMapView;
    }(egret.DisplayObjectContainer));
    tetris.BoxMapView = BoxMapView;
    __reflect(BoxMapView.prototype, "tetris.BoxMapView");
})(tetris || (tetris = {}));
//# sourceMappingURL=BoxMapView.js.map