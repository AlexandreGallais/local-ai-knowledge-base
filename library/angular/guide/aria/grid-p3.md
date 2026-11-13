---
title: "Grid (part 3 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/grid.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Grid (part 3 of 7)

### Data table grid

Use a grid for interactive tables where users need to navigate between cells using arrow keys. This example shows a basic data table with keyboard navigation.

  **Basic**

      File: `TS`

```ts
import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Grid, GridRow, GridCell, GridCellWidget} from '@angular/aria/grid';

type Priority = 'High' | 'Medium' | 'Low';

interface Task {
  taskId: number;
  summary: string;
  priority: Priority;
  assignee: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Grid, GridRow, GridCell, GridCellWidget, FormsModule],
})
export class App {
  private readonly _headerCheckbox = viewChild<ElementRef<HTMLInputElement>>('headerCheckbox');

  readonly allSelected = computed(() => this.data().every((t) => t.selected()));
  readonly partiallySelected = computed(
    () => !this.allSelected() && this.data().some((t) => t.selected()),
  );
  readonly data = signal<(Task & {selected: WritableSignal<boolean>})[]>([
    {
      selected: signal(false),
      taskId: 101,
      summary: 'Create Grid Aria Pattern',
      priority: 'High',
      assignee: 'Cyber Cat',
    },
    {
      selected: signal(false),
      taskId: 102,
      summary: 'Build a Pill List example',
      priority: 'Medium',
      assignee: 'Caffeinated Owl',
    },
    {
      selected: signal(false),
      taskId: 103,
      summary: 'Build a Calendar example',
      priority: 'Medium',
      assignee: 'Copybara',
    },
    {
      selected: signal(false),
      taskId: 104,
      summary: 'Build a Data Table example',
      priority: 'Low',
      assignee: 'Rubber Duck',
    },
    {
      selected: signal(false),
      taskId: 105,
      summary: 'Explore Grid possibilities',
      priority: 'High',
      assignee: '[Your Name Here]',
    },
  ]);

  sortAscending: boolean = true;
  tempInput: string = '';

  constructor() {
    afterRenderEffect(() => {
      this._headerCheckbox()!.nativeElement.indeterminate = this.partiallySelected();
    });
  }

  startEdit(
    event: KeyboardEvent | FocusEvent | undefined,
    task: Task,
    inputEl: HTMLInputElement,
  ): void {
    this.tempInput = task.assignee;
    inputEl.focus();

    if (!(event instanceof KeyboardEvent)) return;

    // Start editing with an alphanumeric character.
    if (event.key.length === 1) {
      this.tempInput = event.key;
    }
  }

  onClickEdit(widget: GridCellWidget, task: Task, inputEl: HTMLInputElement) {
    if (widget.isActivated()) return;

    widget.activate();
    setTimeout(() => this.startEdit(undefined, task, inputEl));
  }

  completeEdit(event: KeyboardEvent | FocusEvent | undefined, task: Task): void {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }
    if (event.key === 'Enter') {
      task.assignee = this.tempInput;
    }
  }

  updateSelection(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.data().forEach((t) => t.selected.set(checked));
  }

  sortTaskById(): void {
    this.sortAscending = !this.sortAscending;
    if (this.sortAscending) {
      this.data.update((tasks) => tasks.sort((a, b) => a.taskId - b.taskId));
    } else {
      this.data.update((tasks) => tasks.sort((a, b) => b.taskId - a.taskId));
    }
  }
}
```
      File: `HTML`

```html
<table ngGrid class="basic-data-table">
  <thead>
    <tr ngGridRow>
      <th ngGridCell>
        <input
          ngGridCellWidget
          aria-label="Select all rows"
          type="checkbox"
          [checked]="allSelected()"
          (change)="updateSelection($event)"
          #headerCheckbox
        />
      </th>
      <th ngGridCell>
        <button
          ngGridCellWidget
          class="sort-button"
          aria-label="Sort by ID"
          (click)="sortTaskById()"
        >
          ID
          <span aria-hidden="true" class="material-symbols-outlined" translate="no">
            {{ sortAscending ? 'arrow_upward' : 'arrow_downward' }}
          </span>
        </button>
      </th>
      <th ngGridCell>Task</th>
      <th ngGridCell>Priority</th>
      <th ngGridCell>Assignee</th>
    </tr>
  </thead>
  <tbody>
    @for (task of data(); track task.taskId) {
      <tr ngGridRow>
        <td ngGridCell>
          <input
            ngGridCellWidget
            aria-label="Select row {{ $index + 1 }}"
            type="checkbox"
            [(ngModel)]="task.selected"
          />
        </td>
        <td ngGridCell>{{ task.taskId }}</td>
        <td ngGridCell>{{ task.summary }}</td>
        <td ngGridCell>{{ task.priority }}</td>
        <td ngGridCell class="assignee-cell">
          <div
            type="button"
            ngGridCellWidget
            aria-label="edit assignee"
            widgetType="editable"
            (activated)="startEdit($event, task, assigneeInput)"
            (deactivated)="completeEdit($event, task)"
            #widget="ngGridCellWidget"
          >
            <span [class.hidden]="widget.isActivated()">{{ task.assignee }}</span>
            <input
              [class.hidden]="!widget.isActivated()"
              class="assignee-edit-input"
              [(ngModel)]="tempInput"
              #assigneeInput
            />
            <button
              tabindex="-1"
              aria-label="edit assignee"
              class="material-symbols-outlined assignee-edit-button"
              (click)="onClickEdit(widget, task, assigneeInput)"
              [class.hidden]="widget.isActivated()"
              translate="no"
            >
              edit
            </button>
          </div>
        </td>
      </tr>
    }
  </tbody>
</table>
```
      File: `CSS`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font);
}

.hidden {
  display: none;
}

button {
  border: unset;
  padding: unset;
  color: unset;
  background: unset;
  outline: none;
}

input[type='checkbox'] {
  accent-color: var(--electric-violet);
  transform: scale(1.3);
  outline: none;
  cursor: pointer;
}

[ngGrid] {
  display: table;
  background-color: var(--septenary-contrast);
  border-spacing: 0;
}

[ngGrid] th,
[ngGrid] td {
  padding: 0.75rem 1rem;
}

thead {
  background-image: var(--pink-to-purple-horizontal-gradient);
  background-clip: text;
  color: transparent;
}

tbody {
  background-color: var(--octonary-contrast);
}

tbody [ngGridRow]:focus-within,
tbody [ngGridRow]:hover {
  background-color: var(--septenary-contrast);
}

[ngGridCell]:focus-within,
[ngGridCell]:hover {
  outline-offset: -1px;
  outline: 1px solid color-mix(in srgb, var(--hot-pink) 60%, transparent);
}

.sort-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
}

.assignee-cell [ngGridCellWidget] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
}

.assignee-edit-button {
  visibility: hidden;
  cursor: pointer;
}

.assignee-cell:focus-within .assignee-edit-button,
.assignee-cell:hover .assignee-edit-button {
  visibility: initial;
}

.assignee-edit-input {
  outline: none;
  border: none;
  color: var(--full-contrast);
  background-color: var(--page-background);
  font-size: 1rem;
  padding: 0.5rem;
}
```

  **Retro**

      File: `TS`

```ts
import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Grid, GridRow, GridCell, GridCellWidget} from '@angular/aria/grid';

type Rank = 'S' | 'A' | 'B' | 'C';

interface Task {
  reward: number;
  target: string;
  rank: Rank;
  hunter: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Grid, GridRow, GridCell, GridCellWidget, FormsModule],
})
export class App {
  private readonly _headerCheckbox = viewChild<ElementRef<HTMLInputElement>>('headerCheckbox');

  readonly allSelected = computed(() => this.data().every((t) => t.selected()));
  readonly partiallySelected = computed(
    () => !this.allSelected() && this.data().some((t) => t.selected()),
  );
  readonly data = signal<(Task & {selected: WritableSignal<boolean>})[]>([
    {
      selected: signal(false),
      reward: 50,
      target: '10 Goblins',
      rank: 'C',
      hunter: 'KB Smasher',
    },
    {
      selected: signal(false),
      reward: 999,
      target: '1 Dragon',
      rank: 'S',
      hunter: 'Donkey',
    },
    {
      selected: signal(false),
      reward: 150,
      target: '2 Trolls',
      rank: 'B',
      hunter: 'Meme Spammer',
    },
    {
      selected: signal(false),
      reward: 500,
      target: '1 Demon',
      rank: 'A',
      hunter: 'Dante',
    },
    {
      selected: signal(false),
      reward: 10,
      target: '5 Slimes',
      rank: 'C',
      hunter: '[Help Wanted]',
    },
  ]);

  sortAscending: boolean = true;
  tempInput: string = '';

  constructor() {
    afterRenderEffect(() => {
      this._headerCheckbox()!.nativeElement.indeterminate = this.partiallySelected();
    });
  }

  startEdit(
    event: KeyboardEvent | FocusEvent | undefined,
    task: Task,
    inputEl: HTMLInputElement,
  ): void {
    this.tempInput = task.hunter;
    inputEl.focus();

    if (!(event instanceof KeyboardEvent)) return;

    // Start editing with an alphanumeric character.
    if (event.key.length === 1) {
      this.tempInput = event.key;
    }
  }

  onClickEdit(widget: GridCellWidget, task: Task, inputEl: HTMLInputElement) {
    if (widget.isActivated()) return;

    widget.activate();
    setTimeout(() => this.startEdit(undefined, task, inputEl));
  }

  completeEdit(event: KeyboardEvent | FocusEvent | undefined, task: Task): void {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }
    if (event.key === 'Enter') {
      task.hunter = this.tempInput;
    }
  }

  updateSelection(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.data().forEach((t) => t.selected.set(checked));
  }

  sortTaskById(): void {
    this.sortAscending = !this.sortAscending;
    if (this.sortAscending) {
      this.data.update((tasks) => tasks.sort((a, b) => a.reward - b.reward));
    } else {
      this.data.update((tasks) => tasks.sort((a, b) => b.reward - a.reward));
    }
  }
}
```
      File: `HTML`

```html
<table ngGrid class="retro-data-table">
  <thead>
    <tr ngGridRow>
      <th ngGridCell>
        <input
          ngGridCellWidget
          aria-label="Select all rows"
          type="checkbox"
          [checked]="allSelected()"
          (change)="updateSelection($event)"
          #headerCheckbox
        />
      </th>
      <th ngGridCell>
        <button
          ngGridCellWidget
          class="sort-button"
          aria-label="Sort by ID"
          (click)="sortTaskById()"
        >
          Reward
          <span aria-hidden="true" class="material-symbols-outlined" translate="no">
            {{ sortAscending ? 'arrow_upward' : 'arrow_downward' }}
          </span>
        </button>
      </th>
      <th ngGridCell>Target</th>
      <th ngGridCell>Rank</th>
      <th ngGridCell>Hunter</th>
    </tr>
  </thead>
  <tbody>
    @for (task of data(); track task) {
      <tr ngGridRow>
        <td ngGridCell>
          <input
            ngGridCellWidget
            aria-label="Select row {{ $index + 1 }}"
            type="checkbox"
            [(ngModel)]="task.selected"
          />
        </td>
        <td ngGridCell>${{ task.reward }}</td>
        <td ngGridCell>{{ task.target }}</td>
        <td ngGridCell>{{ task.rank }}</td>
        <td ngGridCell class="assignee-cell">
          <div
            type="button"
            ngGridCellWidget
            aria-label="edit hunter"
            widgetType="editable"
            (activated)="startEdit($event, task, assigneeInput)"
            (deactivated)="completeEdit($event, task)"
            #widget="ngGridCellWidget"
          >
            <span [class.hidden]="widget.isActivated()">{{ task.hunter }}</span>
            <input
              [class.hidden]="!widget.isActivated()"
              class="assignee-edit-input"
              [(ngModel)]="tempInput"
              #assigneeInput
            />
            <button
              tabindex="-1"
              aria-label="edit hunter"
              class="material-symbols-outlined assignee-edit-button"
              (click)="onClickEdit(widget, task, assigneeInput)"
              [class.hidden]="widget.isActivated()"
              translate="no"
            >
              edit
            </button>
          </div>
        </td>
      </tr>
    }
  </tbody>
</table>
```
      File: `CSS`
