---
title: "Combobox (part 18 of 19)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/combobox.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Combobox (part 18 of 19)

```html
<!--
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 -->

<div
  class="example-combobox-container"
  ngCombobox
  #combobox="ngCombobox"
  [(expanded)]="popupExpanded"
>
  <div #origin class="example-combobox-input-container">
    <input
      class="example-combobox-input example-dialog-input"
      placeholder="Select a country..."
      [value]="value()"
      [readonly]="true"
      [tabindex]="-1"
    />
    <span class="material-symbols-outlined example-icon example-arrow-icon" aria-hidden="true"
      >arrow_drop_down</span
    >
  </div>

  <ng-template
    [cdkConnectedOverlay]="{origin: combobox.element, usePopover: 'inline', matchWidth: true}"
    [cdkConnectedOverlayOpen]="popupExpanded()"
    [cdkConnectedOverlayDisableClose]="true"
  >
    <ng-template ngComboboxPopup [combobox]="combobox">
      <div class="example-popover">
        <div class="example-dialog" ngComboboxWidget>
          <div class="example-combobox-container">
            <!-- Inner Combobox (Editable Search Trigger) -->
            <div class="example-combobox-input-container">
              <span
                class="material-symbols-outlined example-icon example-search-icon"
                aria-hidden="true"
                >search</span
              >
              <input
                ngCombobox
                #innerCombobox="ngCombobox"
                #searchInput
                class="example-combobox-input"
                placeholder="Search..."
                [(ngModel)]="searchString"
                [alwaysExpanded]="true"
                (keydown.escape)="onSearchEscape($event)"
              />
            </div>

            <div aria-live="polite" class="cdk-visually-hidden">
              {{ options().length === 0 ? 'No results found for ' + searchString() : '' }}
            </div>

            <!-- Connected Popup wrapping the options listbox -->
            <ng-template ngComboboxPopup [combobox]="innerCombobox">
              <div class="example-popup example-popup-no-margin">
                @if (options().length === 0) {
                  <div class="example-no-results">No results found</div>
                }
                <div
                  #listbox="ngListbox"
                  ngListbox
                  ngComboboxWidget
                  class="example-listbox"
                  focusMode="activedescendant"
                  tabindex="-1"
                  selectionMode="explicit"
                  [(value)]="selectedCountries"
                  (click)="onCommit()"
                  (keydown.enter)="onCommit()"
                  [activeDescendant]="listbox.activeDescendant()"
                  [class.example-empty]="options().length === 0"
                >
                  @for (option of options(); track option) {
                    <div
                      class="example-option example-selectable example-stateful"
                      ngOption
                      [value]="option"
                      [label]="option"
                    >
                      <span>{{ option }}</span>
                      <span
                        aria-hidden="true"
                        class="material-symbols-outlined example-icon example-selected-icon"
                        >check</span
                      >
                    </div>
                  }
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </ng-template>
  </ng-template>
</div>
```
      File: `app.css`

```css
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font, system-ui, sans-serif);
  --border-color: color-mix(in srgb, var(--full-contrast, #000) 20%, var(--page-background, #fff));
}

.example-combobox-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.example-combobox-container:has(.example-dialog-input) {
  width: 15rem;
  border-radius: 3rem;
  background-color: var(--page-background, #ffffff);
  border: 1px solid var(--quinary-contrast, #e0e0e0);
  color: var(--primary-contrast, #1a1a1a);
}

.example-combobox-input-container {
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 0.25rem;
}

.example-combobox-input {
  border-radius: 0.25rem;
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.7rem 1rem 0.7rem 2.5rem;
  background-color: var(--septenary-contrast, #f5f5f5);
  color: var(--primary-contrast, #1a1a1a);
}

.example-combobox-input::-webkit-search-cancel-button,
.example-combobox-input::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

.example-combobox-input.example-dialog-input {
  cursor: pointer;
  text-align: left;
  padding: 0 3.5rem 0 1.5rem;
  height: 3rem;
  background-color: transparent;
  color: inherit;
  font-weight: 500;
  border: none;
  outline: none;
}

.example-combobox-container:focus-within {
  border-color: var(--hot-pink);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--hot-pink) 25%, transparent);
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

.example-arrow-icon {
  padding: 0 0.5rem;
  position: absolute;
  right: 1rem;
  opacity: 0.9;
  color: var(--primary-contrast, #1a1a1a);
  transition: transform 0.2s ease;
}

.example-combobox-input[aria-expanded='true'] + .example-arrow-icon {
  transform: rotate(180deg);
}

.example-popover {
  margin: 0;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  background-color: var(--septenary-contrast, #f5f5f5);
  overflow: hidden;
}

.example-popup {
  width: 100%;
  margin-block-start: 0;
  border: none;
  border-radius: 0;
  background-color: transparent;
  max-height: 15rem;
  height: auto;
}

.example-popup.example-popup-no-margin {
  margin-block-start: 0;
}

.example-listbox {
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 13rem;
  height: auto;
  box-sizing: border-box;
  padding: 0.5rem;
  gap: 4px;
  outline: none;
}

.example-option {
  cursor: pointer;
  padding: 0 1.25rem;
  border-radius: 3rem;
  min-height: 3rem;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--primary-contrast, #1a1a1a);
}

.example-selected-icon {
  visibility: hidden;
  font-size: 0.9rem;
}

.example-option[aria-selected='true'] .example-selected-icon {
  visibility: visible;
}

.example-option[aria-selected='true'] {
  color: var(--hot-pink);
  background-color: color-mix(in srgb, var(--hot-pink) 10%, transparent);
}

.example-option:hover {
  background-color: color-mix(in srgb, var(--primary-contrast, #1a1a1a) 5%, transparent);
}

.example-combobox-container:not(.no-active-outline):focus-within
  [data-active='true']:not(.no-active-outline),
.example-option[data-active='true'] {
  outline-offset: -2px;
  outline: 2px solid var(--hot-pink);
}

@media (forced-colors: active) {
  .example-combobox-container:not(.no-active-outline):focus-within
    [data-active='true']:not(.no-active-outline),
  .example-option[data-active='true'] {
    outline: 2px solid CanvasText;
  }
}

.example-dialog {
  position: relative;
  padding: 0;
  background-color: transparent;
  width: 15rem;
  box-sizing: border-box;
}

.example-dialog .example-combobox-container {
  border: none;
  border-radius: inherit;
  box-shadow: none;
  background-color: transparent;
  padding: 10px;
}

.example-dialog .example-combobox-input-container {
  border-bottom: 1px solid var(--border-color);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.example-no-results {
  padding: 1rem;
}

.example-empty {
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  height: 0;
  width: 0;
  overflow: hidden;
}

.example-dialog-input[disabled],
.example-dialog-input[aria-disabled='true'] {
  opacity: 0.6;
  cursor: not-allowed;
}
```

  **Retro**

      File: `app.ts`

```ts
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {
  afterRenderEffect,
  Component,
  computed,
  signal,
  viewChild,
  untracked,
  ElementRef,
} from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root:not([theme="basic-retro"])',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule, FormsModule],
})
export class App {
  readonly listbox = viewChild<Listbox<string>>(Listbox);
  readonly combobox = viewChild(Combobox);
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly value = signal('');
  readonly searchString = signal('');
  readonly selectedCountries = signal<string[]>([]);
  readonly popupExpanded = signal(false);

  readonly options = computed(() =>
    ALL_COUNTRIES.filter((country) =>
      country.toLowerCase().startsWith(this.searchString().toLowerCase()),
    ),
  );

  constructor() {
    afterRenderEffect(() => {
      if (this.popupExpanded()) {
        untracked(() => {
          setTimeout(() => {
            this.searchInput()?.nativeElement.focus();
          });
        });
      }
    });

    afterRenderEffect(() => {
      if (this.popupExpanded()) {
        this.listbox()?.scrollActiveItemIntoView();
      }
    });
  }

  onCommit() {
    const selected = this.selectedCountries();
    if (selected.length > 0) {
      this.value.set(selected[0]);
      this.searchString.set('');
      this.popupExpanded.set(false);
      this.combobox()?.element.focus();
    }
  }

  onSearchEscape(event: Event) {
    this.popupExpanded.set(false);
    this.combobox()?.element.focus();
  }
}

const ALL_COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Brazil',
  'Canada',
  'Egypt',
  'France',
  'Germany',
  'India',
  'Japan',
  'Mexico',
  'United Kingdom',
  'United States of America',
];
```
      File: `app.html`

```html
<!--
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 -->

<div
  class="example-combobox-container"
  ngCombobox
  #combobox="ngCombobox"
  [(expanded)]="popupExpanded"
>
  <div #origin class="example-combobox-input-container">
    <input
      class="example-combobox-input example-dialog-input"
      placeholder="Select a country..."
      [value]="value()"
      [readonly]="true"
      [tabindex]="-1"
    />
    <span class="material-symbols-outlined example-icon example-arrow-icon" aria-hidden="true"
      >arrow_drop_down</span
    >
  </div>

  <ng-template
    [cdkConnectedOverlay]="{origin: combobox.element, usePopover: 'inline', matchWidth: true}"
    [cdkConnectedOverlayOpen]="popupExpanded()"
    [cdkConnectedOverlayDisableClose]="true"
  >
    <ng-template ngComboboxPopup [combobox]="combobox">
      <div class="example-popover">
        <div class="example-dialog" ngComboboxWidget>
          <div class="example-combobox-container">
            <!-- Inner Combobox (Editable Search Trigger) -->
            <div class="example-combobox-input-container">
              <span
                class="material-symbols-outlined example-icon example-search-icon"
                aria-hidden="true"
                >search</span
              >
              <input
                ngCombobox
                #innerCombobox="ngCombobox"
                #searchInput
                class="example-combobox-input"
                placeholder="Search..."
                [(ngModel)]="searchString"
                [alwaysExpanded]="true"
                (keydown.escape)="onSearchEscape($event)"
              />
            </div>

            <div aria-live="polite" class="cdk-visually-hidden">
              {{ options().length === 0 ? 'No results found for ' + searchString() : '' }}
            </div>

            <!-- Connected Popup wrapping the options listbox -->
            <ng-template ngComboboxPopup [combobox]="innerCombobox">
              <div class="example-popup example-popup-no-margin">
                @if (options().length === 0) {
                  <div class="example-no-results">No results found</div>
                }
                <div
                  #listbox="ngListbox"
                  ngListbox
                  ngComboboxWidget
                  class="example-listbox"
                  focusMode="activedescendant"
                  tabindex="-1"
                  selectionMode="explicit"
                  [(value)]="selectedCountries"
                  (click)="onCommit()"
                  (keydown.enter)="onCommit()"
                  [activeDescendant]="listbox.activeDescendant()"
                  [class.example-empty]="options().length === 0"
                >
                  @for (option of options(); track option) {
                    <div
                      class="example-option example-selectable example-stateful"
                      ngOption
                      [value]="option"
                      [label]="option"
                    >
                      <span>{{ option }}</span>
                      <span
                        aria-hidden="true"
                        class="material-symbols-outlined example-icon example-selected-icon"
                        >check</span
                      >
                    </div>
                  }
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </ng-template>
  </ng-template>
</div>
```
      File: `app.css`
