---
title: "Combobox (part 12 of 19)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/combobox.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Combobox (part 12 of 19)

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

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font, sans-serif);
  --border-color: var(--quaternary-contrast, #e0e0e0);
}

/* Universal/Basic <example-value> Layout Styles */
.example-combobox-container {
  position: relative;
  width: 15rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--quinary-contrast, #e0e0e0);
  border-radius: 0.25rem;
  background-color: var(--page-background, #ffffff);
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.example-combobox-input-container {
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 0.25rem;
}

.example-icon {
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: var(--primary-contrast, #1a1a1a);
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
  border-radius: 0.25rem;
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.7rem 1rem 0.7rem 2.5rem;
  background-color: transparent;
  color: var(--primary-contrast, #1a1a1a);
}

.example-combobox-container:focus-within {
  border-color: var(--hot-pink, #ff007f);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--hot-pink, #ff007f) 20%, transparent);
}

/* Overlay Bounding Popover */
.example-popover {
  margin: 0;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--septenary-contrast, #ffffff);
  overflow: hidden;
}

.example-datepicker-popup {
  padding: 16px;
  width: 320px;
  max-height: none;
  overflow: visible;
  background-color: transparent;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.example-datepicker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 12px;
}

.example-datepicker-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--primary-contrast, #1a1a1a);
}

.example-datepicker-nav-button {
  background-color: transparent;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary-contrast, #1a1a1a);
  transition: background-color 0.2s ease;
}

.example-datepicker-nav-button:hover {
  background-color: var(--senary-contrast, #f0f0f0);
}

.example-datepicker-nav-button:focus {
  outline-offset: -1px;
  outline: 1px solid color-mix(in srgb, var(--hot-pink, #ff007f) 60%, transparent);
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
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--secondary-contrast, #707070);
  padding-bottom: 8px;
}

.example-datepicker-empty {
  color: var(--senary-contrast, #c0c0c0);
  font-size: 0.8rem;
}

.example-datepicker-day-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--primary-contrast, #1a1a1a);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.example-datepicker-cell:hover .example-datepicker-day-button {
  background-color: var(--senary-contrast, #f0f0f0);
}

.example-datepicker-cell:focus-within {
  outline: 2px solid var(--hot-pink, #ff007f);
  outline-offset: -2px;
}

@media (forced-colors: active) {
  .example-datepicker-cell:focus-within {
    outline: 2px solid CanvasText;
  }
}

.example-datepicker-day-button:focus {
  outline: none;
}

thead {
  background-image: var(
    --pink-to-purple-horizontal-gradient,
    linear-gradient(to right, #ff007f, #6200ee)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.example-datepicker-cell[aria-selected='true'] .example-datepicker-day-button {
  background-color: var(--electric-violet, #6200ee);
  color: var(--octonary-contrast, #ffffff);
}

.example-datepicker-nav-button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.example-combobox-hint {
  font-size: 0.75rem;
  color: var(--secondary-contrast, #707070);
  margin-top: 4px;
}
```

  **Material**

      File: `app.ts`
