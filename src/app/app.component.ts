import { Component, AfterViewInit } from '@angular/core';
import { viewClassName } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  timeout: number;
  _boardSize = 10;

  cells: any;

  speed = 500;
  state = 'Pause';

  ngAfterViewInit() {
    this.cells = document.body.querySelectorAll('td');
  }

  getArray(size: number) {
    const result = new Array(size).fill(0).map((item, idx) => idx);

    return result;
  }

  mark(event, x, y) {
    const cell = event.currentTarget;

    if (!cell.classList.contains('marked')) {
      cell.classList.add('marked');
    } else {
      cell.classList.remove('marked');
    }

    if (this.state === 'Play') {
      this.playPause();
    }
  }

  next() {
    const dying = [];
    const spawning = [];

    for (let i = 0; i < this.cells.length; i++) {
      const x = i % this.boardSize;
      const y = Math.floor(i / this.boardSize);
      const neighbors = this.countNeighbors(x, y);
      const isLive = this.getCell(x, y).classList.contains('marked');

      // console.log(`(${x},${y})`, isLive, neighbors);

      if (isLive && (neighbors < 2 || neighbors > 3)) {
        dying.push(y * this.boardSize + x);
      } else if (!isLive && (neighbors === 3)) {
        spawning.push(y * this.boardSize + x);
      }
    }

    spawning.map(cellIdx => this.cells.item(cellIdx).classList.add('marked'));
    dying.map(cellIdx => this.cells.item(cellIdx).classList.remove('marked'));
  }

  getCell(x, y) {
    const result = this.cells.item(y * this.boardSize + x);

    return result;
  }

  countNeighbors(x, y) {
    let counter = 0;
    const neighbors = [];

    if (x > 0) {
      neighbors.push([x - 1, y]);

      if (y > 0) {
        neighbors.push([x - 1, y - 1]);
      }

      if (y < this.boardSize - 1) {
        neighbors.push([x - 1, y + 1]);
      }
    }

    if (x < this.boardSize - 1) {
      neighbors.push([x + 1, y]);

      if (y > 0) {
        neighbors.push([x + 1, y - 1]);
      }

      if (y < this.boardSize - 1) {
        neighbors.push([x + 1, y + 1]);
      }
    }

    if (y > 0) {
      neighbors.push([x, y - 1]);
    }

    if (y < this.boardSize - 1) {
      neighbors.push([x, y + 1]);
    }

    neighbors.map(cell => {
      if (this.getCell(cell[0], cell[1]).classList.contains('marked')) {
        counter++;
      }
    });

    return counter;
  }

  autoplay() {
    this.next();

    if (this.state === 'Play') {
      this.timeout = setTimeout(this.autoplay.bind(this), this.speed);
    }
  }


  playPause() {
    this.state = this.state === 'Play' ? 'Pause' : 'Play';

    if (this.state === 'Play') {
      this.autoplay();
    } else {
      clearTimeout(this.timeout);
    }
  }

  analyze() {
    const cells = document.body.querySelectorAll('td');

    for (let y = 0; y < this.boardSize; y++) {
      for (let x = 0; x < this.boardSize; x++) {
        cells.item(y * this.boardSize + x).innerHTML = this.countNeighbors(x, y).toString();
      }
    }
  }

  clear() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells.item(i).classList.remove('marked');
    }

    if (this.state === 'Play') {
      this.playPause();
    }
  }

  onChangeSpeed(e) {
    this.speed = 1000 / e.currentTarget.value;

    clearTimeout(this.timeout);

    this.autoplay();
  }

   set boardSize(e) {
    this._boardSize = e;

    this.cells = document.body.querySelectorAll('td');
  }

  get boardSize() {
    return this._boardSize;
  }

  setBoardSize(e) {
    console.log(e);

  }

  get otherState() {
    return this.state === 'Play' ? 'Pause' : 'Play';
  }
}
