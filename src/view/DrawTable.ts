namespace tetris {
    
    export class DrawTable extends egret.DisplayObjectContainer {
        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.draw, this);
        }

        private draw(): void {
            let rowShape: egret.Shape = new egret.Shape();
            rowShape.graphics.lineStyle(2, 0x000000);
            for (let i = 0; i < 21; i++) {
                rowShape.graphics.moveTo(100, 10 + 45 * i);
                rowShape.graphics.lineTo(550, 10 + 45 * i);
            }
            rowShape.graphics.endFill();
            let lineShape: egret.Shape = new egret.Shape();
            lineShape.graphics.lineStyle(2, 0x000000);
            for (let j = 0; j < 11; j++) {
                lineShape.graphics.moveTo(100 + 45 * j, 10);
                lineShape.graphics.lineTo(100 + 45 * j, 910);
            }
            lineShape.graphics.endFill();
            this.addChild(rowShape);
            this.addChild(lineShape);
        }
    }
}
