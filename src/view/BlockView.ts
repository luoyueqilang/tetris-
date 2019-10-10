namespace tetris {

    export class BlockView extends egret.DisplayObjectContainer {

        public position: Object;
        private box_width: number;
        private _status: number;
        private _color: number;

        constructor(x1, y1, color, status: number) {
            super();
            this._color = color;
            this.position = {
                x: x1,
                y: y1
            };
            this.x = x1;
            this.y = y1;
            this._status = status;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.drawBlock, this);
        }

        private drawBlock(): void {
            if (this._status == 0) {
                this.box_width = 45;
            } else {
                this.box_width = 35;
            }
            let block: egret.Shape = new egret.Shape();

            block.graphics.beginFill(this._color);
            block.graphics.drawRect(0, 0, this.box_width, this.box_width);
            block.graphics.endFill();
            this.addChild(block);
            let shp: egret.Shape = new egret.Shape();
            shp.graphics.lineStyle(1, 0x000000);
            shp.graphics.moveTo(0, 0);
            shp.graphics.lineTo(this.box_width, 0);
            shp.graphics.lineTo(this.box_width, this.box_width);
            shp.graphics.lineTo(0, this.box_width);
            shp.graphics.lineTo(0, 0);
            shp.graphics.endFill();
            this.addChild(shp);
        }
    }
}
