export default class Board extends ex.Actor {

   private grid: number[][];
   private gridWidth = 7;
   private gridHeight = 14;

   constructor() {
      super();
   }

   public onInitialize() {
      this.grid = new Array(this.gridHeight)
         .fill(new Array(this.gridWidth).fill(0));
   }
}
