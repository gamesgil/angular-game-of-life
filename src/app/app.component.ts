import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly WIDTH = 10;
  readonly HEIGHT = 10;

  getArray(size) {
    return new Array(size).fill(0).map((item, idx) => idx);
  }

  mark(event, x, y) {
    const cell = event.currentTarget;

    if (!cell.classList.contains('marked')) {
      cell.classList.add('marked');
    } else {
      cell.classList.remove('marked');
    }
  }

  next() {
    const toDelete = [];
    const toSpawn = [];

    const cells = document.body.querySelectorAll('td');

    for (let i = 0; i < cells.length; i++) {
      const x = i % this.WIDTH;
      const y = Math.floor(i / this.WIDTH);
      const neighbors = this.countNeighbors(x, y);
      const isLive = this.getCell(x, y).classList.contains('marked');

      console.log(isLive, neighbors);

      if (isLive && (neighbors < 2 || neighbors > 3)) {
        toDelete.push([x, y]);
      } else if (!isLive && (neighbors === 3)) {
        console.log('spawn: ', x, y);
      }

    }

    console.log("toDelete: ", toDelete);

    // this.refresh();
  }

  getCell(x, y) {
    return document.body.querySelectorAll('td').item(y * this.WIDTH + x);
  }

  countNeighbors(x, y) {
    const counter = this.marked
      .filter(cell => ((cell[0] !== x || cell[1] !== y) && Math.abs(cell[0] - x) < 2 && Math.abs(cell[1] - y) < 2))
      .length;

    // console.log(`(${x},${y}): ${counter}`);


    return counter;
  }

  refresh() {
    const cells = document.body.querySelectorAll('td');

    for (let i = 0; i < cells.length; i++) {
      cells.item(i).classList.remove('marked');
    }

    this.marked.map(cell => {
      console.log(cell);

      cells.item(cell[1] * 10 + cell[0]).classList.add('marked');
    });

    }
  }
