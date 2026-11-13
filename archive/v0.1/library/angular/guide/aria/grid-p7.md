---
title: "Grid (part 7 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/grid.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Grid (part 7 of 7)

### Layout grid

Use a layout grid to group interactive elements and reduce tab stops. This example shows a grid of pill buttons.

  **Basic**

      File: `TS`

```ts
import {Component, signal} from '@angular/core';
import {Grid, GridRow, GridCell, GridCellWidget} from '@angular/aria/grid';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Grid, GridRow, GridCell, GridCellWidget],
})
export class App {
  tags = signal(['Unleash', 'Your', 'Creativity', 'With', 'Angular', 'Aria']);

  removeTag(index: number) {
    this.tags.update((tags) => [...tags.slice(0, index), ...tags.slice(index + 1)]);
  }
}
```
      File: `HTML`

```html
<div ngGrid colWrap="continuous" class="basic-pill-list">
  @for (tag of tags(); track $index) {
    <div ngGridRow>
      <span ngGridCell>#{{ tag }}</span>
      <span ngGridCell>
        <button
          ngGridCellWidget
          aria-label="remove tag"
          class="material-symbols-outlined"
          (click)="removeTag($index)"
          translate="no"
        >
          close
        </button>
      </span>
    </div>
  }
</div>
```
      File: `CSS`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font);
}

[ngGrid] {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  max-width: 400px;
  background-image: var(--pink-to-purple-horizontal-gradient);
  background-clip: text;
  color: transparent;
}

[ngGridRow] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px dotted var(--senary-contrast);
  padding: 0 0.25rem 0 0.75rem;
}

[ngGridRow]:focus-within,
[ngGridRow]:hover {
  outline-offset: -1px;
  outline: 1px solid color-mix(in srgb, var(--vivid-pink) 80%, transparent);
}

[ngGridRow]:has(button[ngGridCellWidget]:focus),
[ngGridRow]:has(button[ngGridCellWidget]:hover) {
  outline: none;
}

[ngGridCell] {
  display: flex;
  outline: none;
}

button[ngGridCellWidget] {
  border: unset;
  padding: unset;
  color: unset;
  background: unset;
  font-size: 1.2rem;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.25rem;
  border-radius: 50%;
  cursor: pointer;
}

button[ngGridCellWidget]:focus,
button[ngGridCellWidget]:hover {
  outline: 1px solid color-mix(in srgb, var(--vivid-pink) 80%, transparent);
}
```

  **Material**

      File: `TS`

```ts
import {Component, signal} from '@angular/core';
import {Grid, GridRow, GridCell, GridCellWidget} from '@angular/aria/grid';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Grid, GridRow, GridCell, GridCellWidget],
})
export class App {
  tags = signal(['Unleash', 'Your', 'Creativity', 'With', 'Angular', 'Aria']);

  removeTag(index: number) {
    this.tags.update((tags) => [...tags.slice(0, index), ...tags.slice(index + 1)]);
  }
}
```
      File: `HTML`

```html
<div ngGrid colWrap="continuous" class="material-pill-list">
  @for (tag of tags(); track $index) {
    <div ngGridRow>
      <span ngGridCell>{{ tag }}</span>
      <span ngGridCell>
        <button
          ngGridCellWidget
          aria-label="remove tag"
          class="material-symbols-outlined"
          (click)="removeTag($index)"
          translate="no"
        >
          close
        </button>
      </span>
    </div>
  }
</div>
```
      File: `CSS`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font);
}

[ngGrid] {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  max-width: 400px;
}

[ngGridRow] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--senary-contrast);
  border-radius: 0.5rem;
  padding: 0 0.25rem 0 0.75rem;
}

[ngGridRow]:focus-within,
[ngGridRow]:hover {
  background-color: var(--senary-contrast);
}

[ngGridRow]:has(button[ngGridCellWidget]:focus),
[ngGridRow]:has(button[ngGridCellWidget]:hover) {
  background-color: initial;
}

[ngGridCell] {
  display: flex;
  outline: none;
}

button[ngGridCellWidget] {
  border: unset;
  padding: unset;
  color: unset;
  background: unset;
  font-size: 1.2rem;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.25rem;
  border-radius: 50%;
  cursor: pointer;
}

button[ngGridCellWidget]:focus,
button[ngGridCellWidget]:hover {
  outline: none;
  background-color: var(--septenary-contrast);
}
```

  **Retro**

      File: `TS`

```ts
import {Component, signal} from '@angular/core';
import {Grid, GridRow, GridCell, GridCellWidget} from '@angular/aria/grid';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Grid, GridRow, GridCell, GridCellWidget],
})
export class App {
  tags = signal(['Unleash', 'Your', 'Creativity', 'With', 'Angular', 'Aria']);

  removeTag(index: number) {
    this.tags.update((tags) => [...tags.slice(0, index), ...tags.slice(index + 1)]);
  }
}
```
      File: `HTML`

```html
<div ngGrid colWrap="continuous" class="retro-pill-list">
  @for (tag of tags(); track $index) {
    <div ngGridRow>
      <span ngGridCell>#{{ tag }}</span>
      <span ngGridCell>
        <button
          ngGridCellWidget
          aria-label="remove tag"
          class="material-symbols-outlined"
          (click)="removeTag($index)"
          translate="no"
        >
          close
        </button>
      </span>
    </div>
  }
</div>
```
      File: `CSS`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

:host {
  display: flex;
  justify-content: center;
  font-family: 'Press Start 2P';

  --retro-button-color: color-mix(in srgb, var(--always-pink) 90%, var(--page-background));
  --retro-button-text-color: color-mix(in srgb, var(--always-pink) 10%, white);
  --retro-shadow-light: color-mix(in srgb, var(--retro-button-color) 90%, #fff);
  --retro-shadow-dark: color-mix(in srgb, var(--retro-button-color) 90%, #000);
  --retro-elevated-shadow:
    inset 4px 4px 0px 0px var(--retro-shadow-light),
    inset -4px -4px 0px 0px var(--retro-shadow-dark), 4px 0px 0px 0px var(--tertiary-contrast),
    0px 4px 0px 0px var(--tertiary-contrast), -4px 0px 0px 0px var(--tertiary-contrast),
    0px -4px 0px 0px var(--tertiary-contrast);
  --retro-flat-shadow:
    4px 0px 0px 0px var(--tertiary-contrast), 0px 4px 0px 0px var(--tertiary-contrast),
    -4px 0px 0px 0px var(--tertiary-contrast), 0px -4px 0px 0px var(--tertiary-contrast);
  --retro-clickable-shadow:
    inset 4px 4px 0px 0px var(--retro-shadow-light),
    inset -4px -4px 0px 0px var(--retro-shadow-dark), 4px 0px 0px 0px var(--tertiary-contrast),
    0px 4px 0px 0px var(--tertiary-contrast), -4px 0px 0px 0px var(--tertiary-contrast),
    0px -4px 0px 0px var(--tertiary-contrast), 8px 8px 0px 0px var(--tertiary-contrast);
  --retro-pressed-shadow:
    inset 4px 4px 0px 0px var(--retro-shadow-dark),
    inset -4px -4px 0px 0px var(--retro-shadow-light), 4px 0px 0px 0px var(--tertiary-contrast),
    0px 4px 0px 0px var(--tertiary-contrast), -4px 0px 0px 0px var(--tertiary-contrast),
    0px -4px 0px 0px var(--tertiary-contrast), 0px 0px 0px 0px var(--tertiary-contrast);
}

[ngGrid] {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 400px;
}

[ngGridRow] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.25rem 0 0.75rem;
  color: var(--retro-button-text-color);
  background-color: var(--retro-button-color);
  box-shadow: var(--retro-clickable-shadow);
}

[ngGridRow]:focus-within,
[ngGridRow]:hover {
  outline-offset: 4px;
  outline: 4px dashed color-mix(in srgb, var(--hot-pink) 90%, transparent);
}

[ngGridRow]:has(button[ngGridCellWidget]:focus),
[ngGridRow]:has(button[ngGridCellWidget]:hover) {
  outline: none;
}

[ngGridCell] {
  display: flex;
  outline: none;
}

button[ngGridCellWidget] {
  border: unset;
  padding: unset;
  color: unset;
  background: unset;
  font-size: 1.5rem;
  margin: 0.25rem;
  cursor: pointer;
}

button[ngGridCellWidget]:focus,
button[ngGridCellWidget]:hover {
  outline-offset: 8px;
  outline: 4px dashed color-mix(in srgb, var(--hot-pink) 90%, transparent);
}
```

Instead of tabbing through each button, users navigate with arrow keys and only one button receives tab focus.

### Selection and focus modes

Enable selection with `[enableSelection]="true"` and configure how focus and selection interact.

```angular-html
<table
  ngGrid
  [enableSelection]="true"
  [selectionMode]="'explicit'"
  [multi]="true"
  [focusMode]="'roving'"
>
  <tr ngGridRow>
    <td ngGridCell>Cell 1</td>
    <td ngGridCell>Cell 2</td>
  </tr>
</table>
```

**Selection modes:**

- `follow`: Focused cell is automatically selected
- `explicit`: Users select cells with Space or click

**Focus modes:**

- `roving`: Focus moves to cells using `tabindex` (better for simple grids)
- `activedescendant`: Focus stays on grid container, `aria-activedescendant` indicates active cell (better for virtual scrolling)

## Testing

Angular Aria provides component harnesses for testing grid components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {GridHarness} from '@angular/aria/grid/testing';
import {MyGridComponent} from './my-grid'; // Your component

describe('MyGridComponent', () => {
  let fixture: ComponentFixture<MyGridComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyGridComponent],
    });

    fixture = TestBed.createComponent(MyGridComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should read cell values and focus cells', async () => {
    const grid = await loader.getHarness(GridHarness);

    // Get all cells text in a 2D array organized by rows
    const cellTexts = await grid.getCellTextByIndex();
    expect(cellTexts).toEqual([
      ['Cell 1.1', 'Cell 1.2'],
      ['Cell 2.1', 'Cell 2.2'],
    ]);

    // Get a specific cell by text
    const cells = await grid.getCells({text: 'Cell 1.1'});
    expect(cells.length).toBe(1);
    const cell = cells[0];

    // Verify cell state
    expect(await cell.isSelected()).toBe(true);
    expect(await cell.isActive()).toBe(true);

    // Focus the cell
    await cell.focus();
    expect(await cell.isFocused()).toBe(true);
  });
});
```

## API reference

For detailed API documentation, inspect the following API references:

- `Grid`
- `GridRow`
- `GridCell`
- `GridCellWidget`
