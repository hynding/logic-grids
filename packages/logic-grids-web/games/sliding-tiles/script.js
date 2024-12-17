import { SlidingTileGame, SlidingTileGameDrivers } from '../../../logic-grids-ts/dist/web/bundle.js';

const createNewGame = () => {
  new SlidingTileGame({
    rows: 4,
    cols: 4,
    controlDriver: new SlidingTileGameDrivers.Keyboard(),
    displayDriver: new SlidingTileGameDrivers.BasicDisplay()
  });
}

const newGameButton = document.querySelector('button.new-game');
newGameButton.addEventListener('click', createNewGame);

createNewGame();