export default class Board extends ex.Actor {

   private grid: number[][];
   private gridWidth = 7;
   private cellWidth: number;
   private gridHeight = 14;
   private cellHeight: number;

   private gridBufferIsDirty: boolean;
   private offsceen: CanvasRenderingContext2D;

   private colorArray = [
      ex.Color.fromRGB(255, 50, 50),
      ex.Color.fromRGB(50, 255, 50),
      ex.Color.fromRGB(50, 50, 255),
   ];

   constructor(widthInPx: number, heightInPx: number) {
      super(0, 0, widthInPx, heightInPx);
   }

   public onInitialize() {
      this.grid = new Array(this.gridHeight)
         .fill(new Array(this.gridWidth)
            .fill(Math.floor(Math.random() * this.colorArray.length)));
      this.cellWidth = this.width / this.gridWidth;
      this.cellHeight = this.height / this.gridHeight;
      this.gridBufferIsDirty = true;

      const offscreenCanvas: HTMLCanvasElement = document.createElement("canvas");
      offscreenCanvas.width = this.width;
      offscreenCanvas.height = this.height;
      this.offsceen = offscreenCanvas.getContext("2d");
   }

   public draw(ctx: CanvasRenderingContext2D, delta: number) {

      super.draw(ctx, delta);

      if (this.gridBufferIsDirty) {
         this.offsceen.clearRect(0, 0, this.offsceen.canvas.width, this.offsceen.canvas.height);
         for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
               const cN: number = this.grid[y][x];
               const c: ex.Color = this.colorArray[cN % this.colorArray.length];
               ex.Util.DrawUtil.roundRect(this.offsceen,
                  (x * this.cellWidth),
                  (y * this.cellHeight),
                  this.cellWidth, this.cellHeight, this.cellWidth / 10, c);
            }
         }
         this.gridBufferIsDirty = false;
      }
      ctx.drawImage(this.offsceen.canvas, 0, 0);
   }
}
