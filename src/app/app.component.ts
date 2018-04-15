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
    const cells = document.body.querySelectorAll('td');

    for (let i = 0; i < cells.length; i++) {
      const x = i % this.WIDTH;
      const y = Math.floor(i / this.WIDTH);
      const neighbors = this.countNeighbors(x, y);
      const isLive = this.getCell(x, y).classList.contains('marked');

      console.log(`(${x},${y})`, isLive, neighbors);

      if (isLive && (neighbors < 2 || neighbors > 3)) {
        cells.item(y * this.WIDTH + x).classList.remove('marked');
      } else if (!isLive && (neighbors === 3)) {
        cells.item(y * this.WIDTH + x).classList.add('marked');
      }

    }
  }

  getCell(x, y) {
    return document.body.querySelectorAll('td').item(y * this.WIDTH + x);
  }

  countNeighbors(x, y) {
    let counter = 0;
    const cells = document.body.querySelectorAll('td');
    const neighbors = [];

    if (x > 0) {
      neighbors.push([x - 1, y]);

      if (y > 0) {
        neighbors.push([x - 1, y - 1]);
      }

      if (y < this.HEIGHT - 1) {
        neighbors.push([x - 1, y + 1]);
      }
    }

    if (x < this.WIDTH - 1) {
      neighbors.push([x + 1, y]);

      if (y > 0) {
        neighbors.push([x + 1, y - 1]);
      }

      if (y < this.HEIGHT - 1) {
        neighbors.push([x + 1, y + 1]);
      }
    }

    if (y > 0) {
      neighbors.push([x, y - 1]);
    }

    if (y < this.HEIGHT - 1) {
      neighbors.push([x, y + 1]);
    }

    neighbors.map(cell => {
      const cellIdx = cell[1] * this.WIDTH + cell[0];

      if (cells.item(cellIdx).classList.contains('marked')) {
        counter++;
      }
    });

    return counter;
  }

  refresh() {
    const cells = document.body.querySelectorAll('td');

    for (let i = 0; i < cells.length; i++) {
      cells.item(i).classList.remove('marked');
    }
  }
}
