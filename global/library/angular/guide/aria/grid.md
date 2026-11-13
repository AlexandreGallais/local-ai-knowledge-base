---
title: "Grid (part 1 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/grid.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Grid

  - Grid ARIA pattern
  - Grid API Reference

## Overview

A grid enables users to navigate two-dimensional data or interactive elements using directional arrow keys, Home, End, and Page Up/Down. Grids work for data tables, calendars, spreadsheets, and layout patterns that group related interactive elements.

  File: `TS`

```ts
import {Component} from '@angular/core';
import {Grid, GridRow, GridCell, GridCellWidget} from '@angular/aria/grid';

interface Cell {
  rowSpan: number;
  colSpan: number;
  emoji: string;
  explode: boolean;
}

const bomb = '💣';
const emojis = ['🥳', '🤩', '🎉', '🚀', '🔥', '💯', '🦄', '🤯', '💖', '✨', bomb];

function randomSpan(): number {
  const spanChanceTable = [...Array(10).fill(1), ...Array(4).fill(2), ...Array(1).fill(3)];
  const randomIndex = Math.floor(Math.random() * spanChanceTable.length);
  return spanChanceTable[randomIndex];
}

function generateValidGrid(rowCount: number, colCount: number): Cell[][] {
  const grid: Cell[][] = [];
  const visitedCoords = new Set<string>();
  for (let r = 0; r < rowCount; r++) {
    const row = [];
    for (let c = 0; c < colCount; c++) {
      if (visitedCoords.has(`${r},${c}`)) {
        continue;
      }

      const rowSpan = Math.min(randomSpan(), rowCount - r);
      const maxColSpan = Math.min(randomSpan(), colCount - c);
      let colSpan = 1;
      while (colSpan < maxColSpan) {
        if (visitedCoords.has(`${r},${c + colSpan}`)) break;
        colSpan += 1;
      }

      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      row.push({
        rowSpan,
        colSpan,
        emoji,
        explode: emoji === bomb,
      });

      for (let rs = 0; rs < rowSpan; rs++) {
        for (let cs = 0; cs < colSpan; cs++) {
          visitedCoords.add(`${r + rs},${c + cs}`);
        }
      }
    }
    grid.push(row);
  }
  return grid;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Grid, GridRow, GridCell, GridCellWidget],
})
export class App {
  readonly gridData: Cell[][] = generateValidGrid(6, 6);
}
```
  File: `HTML`

```html
<table ngGrid #grid="ngGrid">
  @for (row of gridData; track row) {
    <tr ngGridRow>
      @for (cell of row; track cell) {
        @let flipped = {value: false};
        <td ngGridCell [rowSpan]="cell.rowSpan" [colSpan]="cell.colSpan">
          <button
            ngGridCellWidget
            class="card"
            [class.flipped]="flipped.value"
            (click)="flipped.value = true"
          >
            <div class="card-face card-front">
              <svg viewBox="0 0 222 245" xmlns="http://www.w3.org/2000/svg" class="angular-logo">
                <path class="shield-shape" />
              </svg>
            </div>

            <div class="card-face card-back">
              <div [class.explode]="flipped.value && cell.explode">{{ cell.emoji }}</div>
            </div>
          </button>
        </td>
      }
    </tr>
  }
</table>
```
  File: `CSS`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font);

  --card-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
}

button {
  border: unset;
  padding: unset;
  color: unset;
  background: unset;
  outline: none;
}

[ngGrid] {
  display: table;
  border-spacing: 0.75rem;
}

[ngGridCell] {
  height: 4rem;
  width: 4rem;
  perspective: 1000px;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 0.5rem;
  border: 0.25rem solid #f0f0f0;
  box-shadow: var(--card-shadow);
}

.card.flipped {
  transform: rotateY(180deg);
  cursor: default;
}

.card:not(.flipped):hover,
.card:not(.flipped):focus {
  transform: scale(1.05) translate(-2px, -2px);
}

.card:hover,
.card:focus {
  outline-offset: 2px;
  outline: 4px dashed color-mix(in srgb, var(--hot-pink) 90%, transparent);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 0.25rem;
}

.card-front {
  background-image: var(--hot-pink-to-electric-violet-radial-gradient);
  color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.card-back {
  background: #f0f0f0;
  transform: rotateY(180deg);
}

.explode {
  animation: shake 0.25s 20 linear;
}

@keyframes shake {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  20% {
    transform: translate(-3px, -1px) rotate(-1deg);
  }
  40% {
    transform: translate(3px, 1px) rotate(1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(3px, -1px) rotate(1deg);
  }
}

.angular-logo {
  transform: rotate(-25deg) scale(1.1) translateY(5%);
}

.shield-shape {
  d: path(
    'm 222.077 39.192 l -8.019 125.923 L 137.387 0 l 84.69 39.192 Z m -53.105 162.825 l -57.933 33.056 l -57.934 -33.056 l 11.783 -28.556 h 92.301 l 11.783 28.556 Z M 111.039 62.675 l 30.357 73.803 H 80.681 l 30.358 -73.803 Z M 7.937 165.115 L 0 39.192 L 84.69 0 L 7.937 165.115 Z'
  );
  fill: currentColor;
}
```

## Usage

Grids work well for data or interactive elements organized in rows and columns where users need keyboard navigation in multiple directions.

**Use grids when:**

- Building interactive data tables with editable or selectable cells
- Creating calendars or date pickers
- Implementing spreadsheet-like interfaces
- Grouping interactive elements (buttons, checkboxes) to reduce tab stops on a page
- Building interfaces requiring two-dimensional keyboard navigation

**Avoid grids when:**

- Displaying simple read-only tables (use semantic HTML `` instead)
- Showing single-column lists (use Listbox instead)
- Displaying hierarchical data (use Tree instead)
- Building forms without tabular layout (use standard form controls)

## Features

- **Two-dimensional navigation** - Arrow keys move between cells in all directions
- **Focus modes** - Choose between roving tabindex or activedescendant focus strategies
- **Selection support** - Optional cell selection with single or multi-select modes
- **Wrapping behavior** - Configure how navigation wraps at grid edges (continuous, loop, or nowrap)
- **Range selection** - Select multiple cells with modifier keys or dragging
- **Disabled states** - Disable the entire grid or individual cells
- **RTL support** - Automatic right-to-left language navigation
