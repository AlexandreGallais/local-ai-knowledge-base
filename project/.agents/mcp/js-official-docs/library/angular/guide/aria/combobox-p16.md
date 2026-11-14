---
title: "Combobox (part 16 of 19)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/combobox.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Combobox (part 16 of 19)

```html
<!--
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 -->

<div>
  <div class="example-combobox-container no-active-outline">
    <div #origin class="example-combobox-input-container">
      <span class="material-symbols-outlined example-icon example-search-icon">calendar_month</span>
      <!-- Synchronize typing changes reactively with onInputInput -->
      <input
        #comboboxInput
        ngCombobox
        #combobox="ngCombobox"
        class="example-combobox-input"
        placeholder="Pick a date..."
        [(value)]="selection"
        (input)="onInputInput(comboboxInput.value)"
        [(expanded)]="popupExpanded"
        aria-describedby="date-format-hint"
        (keydown)="onInputKeydown($event)"
        (click)="popupExpanded.set(true)"
      />
    </div>

    <ng-template
      [cdkConnectedOverlay]="{origin, usePopover: 'inline', matchWidth: false}"
      [cdkConnectedOverlayOpen]="popupExpanded()"
      (overlayOutsideClick)="popupExpanded.set(false)"
    >
      <ng-template ngComboboxPopup [combobox]="combobox" popupType="dialog">
        <div class="example-popover">
          <!-- Silence CDK focus yanking to protect keyboard typing with [cdkTrapFocusAutoCapture]="false" -->
          <div
            ngComboboxWidget
            class="example-datepicker-popup"
            cdkTrapFocus
            [cdkTrapFocusAutoCapture]="false"
            (keydown)="handleWidgetKeydown($event)"
          >
            <!-- Visually hidden live region for screen reader announcements -->
            <div aria-live="polite" class="cdk-visually-hidden">
              {{ activeMonthAnnouncement() }}
            </div>

            <div class="example-datepicker-header">
              <button
                type="button"
                class="example-datepicker-nav-button"
                (click)="prevMonth()"
                aria-label="Previous Month"
              >
                <span class="material-symbols-outlined">chevron_left</span>
              </button>
              <div class="example-datepicker-title">{{ monthYearLabel() }}</div>
              <button
                type="button"
                class="example-datepicker-nav-button"
                (click)="nextMonth()"
                aria-label="Next Month"
              >
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            <!-- Bind Arrow boundary checks to grid table -->
            <table
              #gridTable
              tabindex="-1"
              ngGrid
              #grid="ngGrid"
              class="example-datepicker-grid"
              colWrap="continuous"
              rowWrap="nowrap"
              [enableSelection]="true"
              selectionMode="explicit"
              (keydown)="onGridKeydown($event)"
            >
              <thead>
                <tr>
                  <!-- Dynamic weekday loop to prevent localization first-day-of-week shifting bug -->
                  @for (day of weekdays(); track day.long) {
                    <th
                      role="columnheader"
                      scope="col"
                      class="example-datepicker-cell example-datepicker-weekday"
                      [attr.abbr]="day.long"
                    >
                      {{ day.narrow }}
                    </th>
                  }
                </tr>
              </thead>

              <tbody>
                @for (week of weeks(); track $index) {
                  <tr ngGridRow>
                    @if ($first) {
                      @for (day of daysFromPrevMonth(); track $index) {
                        <td
                          class="example-datepicker-cell example-datepicker-empty"
                          ngGridCell
                          [disabled]="true"
                          aria-hidden="true"
                          [tabindex]="-1"
                        >
                          {{ day }}
                        </td>
                      }
                    }

                    @for (day of week; track $index) {
                      <td class="example-datepicker-cell" ngGridCell [selected]="day.selected">
                        <!-- Duplicate selected state inside day button to allow clear NVDA/VoiceOver announcements -->
                        <button
                          ngGridCellWidget
                          type="button"
                          class="example-datepicker-day-button"
                          [attr.data-day]="day.displayName"
                          [attr.data-focus-target]="isFocusTarget(day.date)"
                          [attr.aria-label]="day.ariaLabel + (day.selected ? ', Selected' : '')"
                          (click)="selectDate(day, $event)"
                          (keydown.enter)="selectDate(day, $event)"
                          (keydown.space)="selectDate(day, $event)"
                        >
                          {{ day.displayName }}
                        </button>
                      </td>
                    }

                    @if ($last && week.length < 7) {
                      @for (day of daysInNextMonth(); track $index) {
                        <td
                          class="example-datepicker-cell example-datepicker-empty"
                          ngGridCell
                          [disabled]="true"
                          aria-hidden="true"
                          [tabindex]="-1"
                        >
                          {{ day }}
                        </td>
                      }
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </ng-template>
    </ng-template>
  </div>
  <div id="date-format-hint" class="example-combobox-hint">Format: MM/DD/YYYY</div>
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

:host {
  display: flex;
  justify-content: center;
  font-family: 'Press Start 2P', Courier, monospace;
  font-size: 0.6rem;
  --border-color: var(--tertiary-contrast, #000000);

  --retro-button-color: var(--septenary-contrast, #ffffff);
  --retro-shadow-light: color-mix(in srgb, var(--retro-button-color) 90%, #ffffff);
  --retro-shadow-dark: color-mix(in srgb, var(--retro-button-color) 90%, #000000);
  --retro-elevated-shadow:
    inset 4px 4px 0px 0px var(--retro-shadow-light),
    inset -4px -4px 0px 0px var(--retro-shadow-dark), 4px 0px 0px 0px var(--border-color),
    0px 4px 0px 0px var(--border-color), -4px 0px 0px 0px var(--border-color),
    0px -4px 0px 0px var(--border-color);
  --retro-flat-shadow:
    4px 0px 0px 0px var(--border-color), 0px 4px 0px 0px var(--border-color),
    -4px 0px 0px 0px var(--border-color), 0px -4px 0px 0px var(--border-color);
}

/* Input Trigger Styles */
.example-combobox-container {
  position: relative;
  width: 16rem;
  display: flex;
  flex-direction: column;
  border: 4px solid var(--border-color);
  border-radius: 0;
  background-color: var(--retro-button-color);
  box-shadow: var(--retro-flat-shadow);
}

.example-combobox-input-container {
  display: flex;
  position: relative;
  align-items: center;
}

.example-icon {
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: var(--border-color);
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.example-search-icon {
  padding: 0 0.5rem;
  position: absolute;
  opacity: 0.8;
}

.example-combobox-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 0.6rem;
  font-family: 'Press Start 2P', Courier, monospace;
  word-spacing: -4px;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background-color: transparent;
  color: var(--primary-contrast, #000000);
}

.example-combobox-container:focus-within {
  outline: 3px solid var(--vivid-pink, #ff007f);
}

/* Overlay Bounding Popover & Dividers */
.example-popover {
  margin: 0;
  padding: 0;
  border: 4px solid var(--border-color);
  background-color: var(--septenary-contrast, #ffffff);
  box-shadow: 8px 8px 0px var(--border-color); /* 3D offset shadow */
}

.example-datepicker-popup {
  padding: 12px;
  width: 320px;
  max-height: none;
  overflow: visible;
  background-color: transparent;
  border: none;
  box-shadow: none; /* Border & shadow handled by popover */
  font-family: 'Press Start 2P', Courier, monospace;
}

.example-datepicker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 3px double var(--border-color);
  margin-bottom: 12px;
}

.example-datepicker-title {
  font-weight: bold;
  font-size: 0.6rem;
  color: var(--border-color);
}

.example-datepicker-nav-button {
  background-color: var(--retro-button-color);
  border: 2px solid var(--border-color);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--border-color);
  font-weight: bold;
  box-shadow: 2px 2px 0px var(--border-color);
}

.example-datepicker-nav-button:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.example-datepicker-nav-button:focus {
  outline: 2px dashed var(--vivid-pink, #ff007f);
  outline-offset: 2px;
}

.example-datepicker-grid {
  width: 100%;
  border-collapse: collapse;
}

.example-datepicker-cell {
  width: 40px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  padding: 0;
}

.example-datepicker-weekday {
  font-size: 0.5rem;
  font-weight: bold;
  color: var(--border-color);
  padding-bottom: 8px;
}

.example-datepicker-empty {
  color: var(--senary-contrast, #aaaaaa);
  font-size: 0.5rem;
}

.example-datepicker-day-button {
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 0;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.6rem;
  font-weight: bold;
  color: var(--border-color);
}

.example-datepicker-cell:hover .example-datepicker-day-button {
  background-color: var(--senary-contrast, #dddddd);
  border-color: var(--border-color);
}

/* Suppress native focus rings and force solid high contrast outlines */
.example-datepicker-cell:focus-within {
  outline: 3px solid var(--border-color);
  outline-offset: -3px;
}

@media (forced-colors: active) {
  .example-datepicker-cell:focus-within {
    outline: 3px solid CanvasText;
  }
}

.example-datepicker-day-button:focus {
  outline: none;
}

thead {
  background-image: var(
    --orange-to-pink-vertical-gradient,
    linear-gradient(to bottom, #ffaa00, #ff007f)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.example-datepicker-cell[aria-selected='true'] .example-datepicker-day-button {
  background-color: var(--vivid-pink, #ff007f);
  color: var(--page-background, #ffffff);
}

.example-combobox-hint {
  font-size: 0.5rem;
  font-weight: bold;
  font-family: 'Press Start 2P', Courier, monospace;
  color: var(--border-color);
  margin-top: 6px;
}
```
