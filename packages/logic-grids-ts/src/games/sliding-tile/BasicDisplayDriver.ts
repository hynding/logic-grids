import { DisplayDriver } from './DisplayDriver';

export class BasicDisplayDriver extends DisplayDriver {
    private table: HTMLTableElement;
  constructor() {
    super();
    this.table = document.createElement('table');
    const main = document.querySelector('main');
    main?.appendChild(this.table);
  }
  
  clear() {
    while(this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }
  }
  
  draw(grid: number[][]) {
    this.clear();
    grid.forEach(row => {
      const rowEl = document.createElement('tr');
      row.forEach(cell => {
        const dataEl = document.createElement('td');
        const textEl = document.createTextNode(cell ? `${cell}`: '\u00A0');
        dataEl.setAttribute('class', cell ? `n${cell}`: '')
        dataEl.appendChild(textEl);
        rowEl.appendChild(dataEl);
      });
      this.table.appendChild(rowEl);
    });
  }
}