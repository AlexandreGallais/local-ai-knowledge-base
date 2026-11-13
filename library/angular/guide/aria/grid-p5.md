---
title: "Grid (part 5 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/grid.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Grid (part 5 of 7)

### Calendar grid

Calendars are a common use case for grids. This example shows a month view where users navigate dates using arrow keys.

  **Basic**

      File: `TS`

```ts
import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  untracked,
  viewChildren,
  WritableSignal,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {Grid, GridRow, GridCell, GridCellWidget} from '@angular/aria/grid';

const DAYS_PER_WEEK = 7;

interface CalendarCell<D = any> {
  displayName: string;
  ariaLabel: string;
  date: D;
  selected: WritableSignal<boolean>;
  day: number;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  providers: [provideNativeDateAdapter()],
  imports: [Grid, GridRow, GridCell, GridCellWidget],
})
export class App<D> {
  private readonly _dayButtons = viewChildren(GridCellWidget);
  private readonly _dateAdapter = inject<DateAdapter<D>>(DateAdapter, {optional: true})!;
  private readonly _dateFormats = inject<MatDateFormats>(MAT_DATE_FORMATS, {optional: true})!;
  private readonly _firstWeekOffset = computed(() => {
    const firstDayOfMonth = this._dateAdapter.createDate(
      this._dateAdapter.getYear(this.viewMonth()),
      this._dateAdapter.getMonth(this.viewMonth()),
      1,
    );

    return (
      (DAYS_PER_WEEK +
        this._dateAdapter.getDayOfWeek(firstDayOfMonth) -
        this._dateAdapter.getFirstDayOfWeek()) %
      DAYS_PER_WEEK
    );
  });

  protected readonly monthYearLabel = computed(() =>
    this._dateAdapter
      .format(this.viewMonth(), this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase(),
  );

  protected readonly daysFromPrevMonth: Signal<number[]> = computed(() => {
    const prevMonthNumDays = this._dateAdapter.getNumDaysInMonth(
      this._dateAdapter.addCalendarMonths(this.viewMonth(), -1),
    );

    const days: number[] = [];
    for (let i = this._firstWeekOffset() - 1; i >= 0; i--) {
      days.push(prevMonthNumDays - i);
    }
    return days;
  });

  readonly weekdays: Signal<{long: string; narrow: string}[]> = computed(() => {
    const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
    const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');

    const weekdays = longWeekdays.map((long, i) => {
      return {long, narrow: narrowWeekdays[i]};
    });
    return weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
  });

  /** The current selected date. */
  readonly selectedDate: WritableSignal<D> = signal(this._dateAdapter.today());

  /** The current display month. */
  readonly viewMonth: WritableSignal<D> = signal(this.selectedDate());

  /** Calendar day cells. */
  readonly calendar = computed(() => {
    const month = this.viewMonth();

    const daysInMonth = this._dateAdapter.getNumDaysInMonth(month);
    const dateNames = this._dateAdapter.getDateNames();

    const calendar: CalendarCell[][] = [[]];
    for (let i = 0, cell = this._firstWeekOffset(); i < daysInMonth; i++, cell++) {
      if (cell == DAYS_PER_WEEK) {
        calendar.push([]);
        cell = 0;
      }
      const date = this._dateAdapter.createDate(
        this._dateAdapter.getYear(month),
        this._dateAdapter.getMonth(month),
        i + 1,
      );
      const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);

      calendar[calendar.length - 1].push({
        displayName: dateNames[i],
        ariaLabel,
        date,
        selected: signal(
          this._dateAdapter.compareDate(
            date,
            untracked(() => this.selectedDate()),
          ) === 0,
        ),
        day: i + 1,
      });
    }

    return calendar;
  });

  nextMonth(): void {
    this.viewMonth.set(this._dateAdapter.addCalendarMonths(this.viewMonth(), 1));
  }

  prevMonth(): void {
    this.viewMonth.set(this._dateAdapter.addCalendarMonths(this.viewMonth(), -1));
  }

  scrollDown(): void {
    this.nextMonth();
    setTimeout(() => this._dayButtons()[0]?.element.focus());
  }

  scrollUp(): void {
    this.prevMonth();
    setTimeout(() => this._dayButtons()[this._dayButtons().length - 1]?.element.focus());
  }

  onKeyDown(event: KeyboardEvent): void {
    const day = Number((event.target as Element).getAttribute('data-day'));
    if (!day) return;

    const viewMonthNumDays = this._dateAdapter.getNumDaysInMonth(this.viewMonth());
    if (day > 7 && day <= viewMonthNumDays - 7) return;

    const arrowLeft = event.key === 'ArrowLeft';
    const arrowRight = event.key === 'ArrowRight';
    const arrowUp = event.key === 'ArrowUp';
    const arrowDown = event.key === 'ArrowDown';

    if ((day === 1 && arrowLeft) || (day <= 7 && arrowUp)) {
      this.scrollUp();
    }

    if ((day === viewMonthNumDays && arrowRight) || (day > viewMonthNumDays - 7 && arrowDown)) {
      this.scrollDown();
    }
  }
}
```
      File: `HTML`

```html
<div class="calendar basic-calendar">
  <div class="calendar-header">
    <button class="month-control" aria-label="previous month" (click)="prevMonth()">
      <span aria-hidden="true" class="material-symbols-outlined" translate="no">chevron_left</span>
    </button>
    <h3>{{ monthYearLabel() }}</h3>
    <button class="month-control" aria-label="next month" (click)="nextMonth()">
      <span aria-hidden="true" class="material-symbols-outlined" translate="no">chevron_right</span>
    </button>
  </div>

  <table
    ngGrid
    colWrap="continuous"
    rowWrap="nowrap"
    [enableSelection]="true"
    [softDisabled]="false"
    selectionMode="explicit"
    (keydown)="onKeyDown($event)"
  >
    <thead>
      <tr>
        @for (day of weekdays(); track day.long) {
          <th scope="col">
            <span class="visually-hidden">{{ day.long }}</span>
            <span aria-hidden="true">{{ day.narrow }}</span>
          </th>
        }
      </tr>
    </thead>

    @for (week of calendar(); track week) {
      <tr ngGridRow>
        @if ($first) {
          @for (day of daysFromPrevMonth(); track day) {
            <td ngGridCell disabled>{{ day }}</td>
          }
        }

        @for (day of week; track day) {
          <td ngGridCell [(selected)]="day.selected">
            <button ngGridCellWidget [attr.aria-label]="day.ariaLabel" [attr.data-day]="day.day">
              {{ day.displayName }}
            </button>
          </td>
        }

        @if ($last && week.length < 7) {
          @for (day of [].constructor(7 - week.length); track $index) {
            <td ngGridCell disabled>{{ $index + 1 }}</td>
          }
        }
      </tr>
    }
  </table>
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

.calendar {
  display: flex;
  flex-direction: column;
  background-color: var(--septenary-contrast);
  padding: 0.5rem;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block-end: 0.5rem;
}

.calendar-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

button {
  border: unset;
  padding: unset;
  color: unset;
  background: unset;
  outline: none;
}

button:hover,
button:focus {
  background-color: var(--senary-contrast);
}

button:focus {
  outline-offset: -1px;
  outline: 1px solid color-mix(in srgb, var(--hot-pink) 60%, transparent);
}

.visually-hidden {
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  width: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}

.month-control {
  width: 45px;
  height: 45px;
  cursor: pointer;
}

[ngGrid] {
  display: table;
  border-spacing: 0;
}

[ngGridCell] {
  width: 50px;
  height: 50px;
  text-align: center;
  vertical-align: middle;
}

[ngGridCell][aria-selected='true'] > button[ngGridCellWidget] {
  background-color: var(--electric-violet);
  color: var(--octonary-contrast);
}

[ngGridCell][aria-disabled='true'] {
  color: var(--senary-contrast);
}

thead {
  background-image: var(--pink-to-purple-horizontal-gradient);
  background-clip: text;
  color: transparent;
}

button[ngGridCellWidget] {
  width: 45px;
  height: 45px;
  cursor: pointer;
}
```

  **Material**

      File: `TS`

```ts
import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  untracked,
  viewChildren,
  WritableSignal,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {Grid, GridRow, GridCell, GridCellWidget} from '@angular/aria/grid';

const DAYS_PER_WEEK = 7;

interface CalendarCell<D = any> {
  displayName: string;
  ariaLabel: string;
  date: D;
  selected: WritableSignal<boolean>;
  day: number;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  providers: [provideNativeDateAdapter()],
  imports: [Grid, GridRow, GridCell, GridCellWidget],
})
export class App<D> {
  private readonly _dayButtons = viewChildren(GridCellWidget);
  private readonly _dateAdapter = inject<DateAdapter<D>>(DateAdapter, {optional: true})!;
  private readonly _dateFormats = inject<MatDateFormats>(MAT_DATE_FORMATS, {optional: true})!;
  private readonly _firstWeekOffset = computed(() => {
    const firstDayOfMonth = this._dateAdapter.createDate(
      this._dateAdapter.getYear(this.viewMonth()),
      this._dateAdapter.getMonth(this.viewMonth()),
      1,
    );

    return (
      (DAYS_PER_WEEK +
        this._dateAdapter.getDayOfWeek(firstDayOfMonth) -
        this._dateAdapter.getFirstDayOfWeek()) %
      DAYS_PER_WEEK
    );
  });

  protected readonly monthYearLabel = computed(() =>
    this._dateAdapter
      .format(this.viewMonth(), this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase(),
  );

  protected readonly daysFromPrevMonth: Signal<number[]> = computed(() => {
    const prevMonthNumDays = this._dateAdapter.getNumDaysInMonth(
      this._dateAdapter.addCalendarMonths(this.viewMonth(), -1),
    );

    const days: number[] = [];
    for (let i = this._firstWeekOffset() - 1; i >= 0; i--) {
      days.push(prevMonthNumDays - i);
    }
    return days;
  });

  readonly weekdays: Signal<{long: string; narrow: string}[]> = computed(() => {
    const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
    const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');

    const weekdays = longWeekdays.map((long, i) => {
      return {long, narrow: narrowWeekdays[i]};
    });
    return weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
  });

  /** The current selected date. */
  readonly selectedDate: WritableSignal<D> = signal(this._dateAdapter.today());

  /** The current display month. */
  readonly viewMonth: WritableSignal<D> = signal(this.selectedDate());

  /** Calendar day cells. */
  readonly calendar = computed(() => {
    const month = this.viewMonth();

    const daysInMonth = this._dateAdapter.getNumDaysInMonth(month);
    const dateNames = this._dateAdapter.getDateNames();

    const calendar: CalendarCell[][] = [[]];
    for (let i = 0, cell = this._firstWeekOffset(); i < daysInMonth; i++, cell++) {
      if (cell == DAYS_PER_WEEK) {
        calendar.push([]);
        cell = 0;
      }
      const date = this._dateAdapter.createDate(
        this._dateAdapter.getYear(month),
        this._dateAdapter.getMonth(month),
        i + 1,
      );
      const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);

      calendar[calendar.length - 1].push({
        displayName: dateNames[i],
        ariaLabel,
        date,
        selected: signal(
          this._dateAdapter.compareDate(
            date,
            untracked(() => this.selectedDate()),
          ) === 0,
        ),
        day: i + 1,
      });
    }

    return calendar;
  });

  nextMonth(): void {
    this.viewMonth.set(this._dateAdapter.addCalendarMonths(this.viewMonth(), 1));
  }

  prevMonth(): void {
    this.viewMonth.set(this._dateAdapter.addCalendarMonths(this.viewMonth(), -1));
  }

  scrollDown(): void {
    this.nextMonth();
    setTimeout(() => this._dayButtons()[0]?.element.focus());
  }

  scrollUp(): void {
    this.prevMonth();
    setTimeout(() => this._dayButtons()[this._dayButtons().length - 1]?.element.focus());
  }

  onKeyDown(event: KeyboardEvent): void {
    const day = Number((event.target as Element).getAttribute('data-day'));
    if (!day) return;

    const viewMonthNumDays = this._dateAdapter.getNumDaysInMonth(this.viewMonth());
    if (day > 7 && day <= viewMonthNumDays - 7) return;

    const arrowLeft = event.key === 'ArrowLeft';
    const arrowRight = event.key === 'ArrowRight';
    const arrowUp = event.key === 'ArrowUp';
    const arrowDown = event.key === 'ArrowDown';

    if ((day === 1 && arrowLeft) || (day <= 7 && arrowUp)) {
      this.scrollUp();
    }

    if ((day === viewMonthNumDays && arrowRight) || (day > viewMonthNumDays - 7 && arrowDown)) {
      this.scrollDown();
    }
  }
}
```
      File: `HTML`
