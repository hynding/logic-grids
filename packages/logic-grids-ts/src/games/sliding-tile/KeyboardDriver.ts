import { ControlDriver } from './ControlDriver';
import { ARROW_KEYCODES, fetchValues, replaceValues, combineList, reduceList, stretch } from './utilities';

export class KeyboardDriver extends ControlDriver {
  register({ move }: { move: (direction: string) => void }) {
    window.addEventListener('keydown', e => {
      if (ARROW_KEYCODES.includes(e.key)) {
        move(e.key);
      }
    });
  }
  
  move(grid: number[][], direction: string, onSuccess: () => void) {
    switch(direction) {
      case 'ArrowUp':
        for(let i=0; i<4; i++) {
          const col = fetchValues(grid, i, true, false);
          const result = stretch(combineList(reduceList(col)), 4);
          replaceValues(result, grid, i, true, false);
        }
        onSuccess();
        break;
      case 'ArrowDown':
        for(let i=0; i<4; i++) {
          const col = fetchValues(grid, i, true, true);
          const result = stretch(combineList(reduceList(col)), 4);
          console.log('result', result);
          replaceValues(result, grid, i, true, true);
        }
        onSuccess();
        break;
      case 'ArrowLeft':
        for(let i=0; i<4; i++) {
          const row = fetchValues(grid, i, false, false);
          const result = stretch(combineList(reduceList(row)), 4);
          console.log('result', result);
          replaceValues(result, grid, i, false, false);
        }
        onSuccess()
        break;
      case 'ArrowRight':
      default:
        for(let i=0; i<4; i++) {
          const row = fetchValues(grid, i, false, true);
          const result = stretch(combineList(reduceList(row)), 4);
          console.log('result', result);
          replaceValues(result, grid, i, false, true);
        }
        onSuccess();
    }
  }
}