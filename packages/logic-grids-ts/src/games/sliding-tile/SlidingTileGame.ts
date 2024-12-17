import { ControlDriver } from "./ControlDriver";
import { DisplayDriver } from "./DisplayDriver";
import { fetchValues, replaceValues, combineList, reduceList, stretch } from "./utilities";
export class SlidingTileGame {
    private rows: number;
    private cols: number;
    private displayDriver: DisplayDriver;
    private controlDriver: ControlDriver;
    private grid: number[][];

    constructor({rows = 4, cols = 4, displayDriver, controlDriver}: {rows?: number, cols?: number, displayDriver: DisplayDriver, controlDriver: ControlDriver}) {
        this.rows = rows;
        this.cols = cols;
        this.displayDriver = displayDriver;
        this.controlDriver = controlDriver;
        
        this.grid = new Array(rows).fill([]);
        this.grid = this.grid.map(() => new Array(cols).fill(0));
        
        this.generateRandomCell();
        this.generateRandomCell();
        
        this.draw();
        this.start();
    }

    init() {
    }
    
    start() {
      this.controlDriver.register({
        move: (direction) => this.moveCells(direction)
      });
    }
    
    gameOver() {
      console.log('Game Over');
      // disable controls
      // update display
    }
    
    generateRandomCell() {
      const cell = this.getRandomCell();
      if (!cell) {
        this.gameOver();
      } else if (typeof cell === 'object') {
        this.grid[cell.row][cell.col] = 2;
      }
    }
    
    moveCells(direction: string) {
      this.controlDriver.move(this.grid, direction, () => {
        this.generateRandomCell();
        this.draw();
      })
    }
    
    canMove(direction: string) {
      
    }
    
    move(isVertical: boolean, isReverse: boolean) {
      for(let i=0; i<4; i++) {
        const row = fetchValues(this.grid, i, isVertical, isReverse);
        const result = stretch(combineList(reduceList(row)), 4);
        replaceValues(result, this.grid, i, isVertical, isReverse);
      }
    }
    
    moveComplete() {
      this.generateRandomCell();
      this.draw();
    }
    
    consolidateList(list: number[]) {
      const newList = [];
      for(let i=0; i<list.length; i++) {
        if (list[i] && list[i+1] && list[i+1] === list[i]) {
          newList.push(list[i] * 2);
          list[i+1] = 0;
        }
      }
    }
    
    draw() {
      this.displayDriver.draw(this.grid);
    }
    
    getRandomCell() {
      const cells = this.grid.reduce((emptyCoords, row, y) => {
        return emptyCoords.concat(row.reduce((emptyCells, cell, x) => {
          if (!cell) {
            emptyCells.push({
              row: y,
              col: x
            });
          }
          return emptyCells;
        }, [] as {row: number, col: number}[]));
      }, [] as {row: number, col: number}[]);
      if (!cells.length) {
        return false;
      }
      const randomCellIndex = Math.floor(Math.random() * cells.length);
      return cells[randomCellIndex];
    }
  }