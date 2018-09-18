import Board from "./tetris/Board.js";

// Create a new engine instance, creating a new canvas in the process
const eng = new ex.Engine({
  width: 400,
  height: 600,
  backgroundColor: ex.Color.fromRGB(51, 51, 51)
});

// Assign the new canvas an element id, for CSS styling purposes
eng.canvas.id = "excalibur-canvas";

const loader = new ex.Loader([]);

// Start the engine, and make it wait for the loader to finish loading before starting the engine code
eng.start(loader).then(() => {
  const board = new Board();
  eng.add(board);
});
