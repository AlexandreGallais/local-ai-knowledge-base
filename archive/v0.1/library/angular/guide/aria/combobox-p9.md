---
title: "Combobox (part 9 of 19)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/combobox.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Combobox (part 9 of 19)

### Readonly mode

A pattern that combines a readonly combobox with listbox to create single-selection dropdowns with keyboard navigation and screen reader support.

  **Basic**

      File: `app.ts`

```ts
import {afterRenderEffect, Component, computed, signal, viewChild} from '@angular/core';
import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root[theme="icons-basic"], app-root:not([theme])',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule],
})
export class App {
  readonly listbox = viewChild(Listbox);

  readonly selectedValues = signal<string[]>([]);
  readonly popupExpanded = signal(false);

  readonly displayIcon = computed(() => {
    const val = this.selectedValues()[0];
    const label = this.labels.find((label) => label.value === val);
    return label ? label.icon : '';
  });

  readonly displayValue = computed(() => this.selectedValues()[0] || 'Select a label');

  readonly labels = [
    {value: 'Important', icon: 'label'},
    {value: 'Starred', icon: 'star'},
    {value: 'Work', icon: 'work'},
    {value: 'Personal', icon: 'person'},
    {value: 'To Do', icon: 'checklist'},
    {value: 'Later', icon: 'schedule'},
    {value: 'Read', icon: 'menu_book'},
    {value: 'Travel', icon: 'flight'},
  ];

  constructor() {
    afterRenderEffect(() => {
      this.listbox()?.scrollActiveItemIntoView();
    });
  }

  onCommit() {
    this.popupExpanded.set(false);
  }
}
```
      File: `app.html`

```html
<div
  ngCombobox
  #combobox="ngCombobox"
  [(expanded)]="popupExpanded"
  [preserveContent]="true"
  class="select"
>
  <span class="combobox-label">
    <span class="selected-label-icon material-symbols-outlined" translate="no" aria-hidden="true">{{
      displayIcon()
    }}</span>
    <span class="selected-label-text">{{ displayValue() }}</span>
  </span>
  <span class="example-arrow material-symbols-outlined" translate="no" aria-hidden="true"
    >arrow_drop_down</span
  >
</div>

<ng-template
  [cdkConnectedOverlay]="{origin: combobox.element, usePopover: 'inline', matchWidth: true}"
  [cdkConnectedOverlayOpen]="popupExpanded()"
>
  <ng-template ngComboboxPopup [combobox]="combobox">
    <div class="example-popup-container">
      <div
        #listbox="ngListbox"
        ngListbox
        ngComboboxWidget
        [tabindex]="-1"
        focusMode="activedescendant"
        selectionMode="explicit"
        [(value)]="selectedValues"
        [activeDescendant]="listbox.activeDescendant()"
        (click)="onCommit()"
        (keydown.enter)="onCommit()"
        (keydown.space)="onCommit()"
      >
        @for (label of labels; track label.value) {
          <div ngOption [value]="label.value" [label]="label.value">
            <span
              class="example-option-icon material-symbols-outlined"
              translate="no"
              aria-hidden="true"
              >{{ label.icon }}</span
            >
            <span class="example-option-text">{{ label.value }}</span>
            <span
              class="example-option-check material-symbols-outlined"
              translate="no"
              aria-hidden="true"
              >check</span
            >
          </div>
        }
      </div>
    </div>
  </ng-template>
</ng-template>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font);
}

.select,
[ngListbox],
[ngOption] {
  outline: none;
}

.select {
  display: flex;
  position: relative;
  align-items: center;
  color: color-mix(in srgb, var(--hot-pink) 90%, var(--primary-contrast));
  background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--hot-pink) 80%, transparent);
  cursor: pointer;
  padding: 0 3.5rem;
  height: 2.5rem;
  box-sizing: border-box;
  width: 14rem;
  user-select: none;
  -webkit-user-select: none;
}

.select span {
  user-select: none;
  -webkit-user-select: none;
}

.select:hover {
  background-color: color-mix(in srgb, var(--hot-pink) 15%, transparent);
}

.select[aria-disabled='true'] {
  opacity: 0.6;
  cursor: default;
}

.selected-label-icon {
  font-size: 1.25rem;
}

.select:focus,
.select:focus-within {
  outline: 2px solid color-mix(in srgb, var(--hot-pink) 50%, transparent);
}

.combobox-label {
  gap: 1rem;
  left: 1rem;
  display: flex;
  position: absolute;
  align-items: center;
  pointer-events: none;
}

.example-arrow {
  right: 1rem;
  position: absolute;
  pointer-events: none;
  transition: transform 150ms ease-in-out;
}

.select[aria-expanded='true'] .example-arrow {
  transform: rotate(180deg);
}

.example-popup-container {
  width: 100%;
  padding: 0.5rem;
  margin-top: 8px;
  border-radius: 0.5rem;
  background-color: var(--septenary-contrast);
  font-size: 0.9rem;
  max-height: 11rem;
  box-sizing: border-box;
  overflow: hidden;
  animation: smoothPopupOpen 150ms ease-out forwards;
  transform-origin: top;
}

@keyframes smoothPopupOpen {
  0% {
    max-height: 0;
    opacity: 0;
  }
  16.7% {
    opacity: 1;
  }
  100% {
    max-height: 11rem;
    opacity: 1;
  }
}

[ngListbox] {
  gap: 2px;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
}

[ngOption] {
  display: flex;
  cursor: pointer;
  align-items: center;
  margin: 1px;
  padding: 0 1rem;
  min-height: 2.25rem;
  border-radius: 0.5rem;
}

[ngOption]:hover {
  background-color: color-mix(in srgb, var(--primary-contrast) 5%, transparent);
}

[ngOption][data-active='true'] {
  outline-offset: -2px;
  outline: 2px solid color-mix(in srgb, var(--hot-pink) 50%, transparent);
}

[ngOption][aria-selected='true'] {
  color: var(--hot-pink);
  background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
}

.example-option-icon {
  font-size: 1.25rem;
  padding-right: 1rem;
}

[ngOption]:not([aria-selected='true']) .example-option-check {
  display: none;
}

.example-option-icon,
.example-option-check {
  font-size: 0.9rem;
}

.example-option-text {
  flex: 1;
}
```

  **Material**

      File: `app.ts`

```ts
import {afterRenderEffect, Component, computed, signal, viewChild} from '@angular/core';
import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root[theme="icons-material"], app-root:not([theme])',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule],
})
export class App {
  readonly listbox = viewChild(Listbox);

  readonly selectedValues = signal<string[]>([]);
  readonly popupExpanded = signal(false);

  readonly displayIcon = computed(() => {
    const val = this.selectedValues()[0];
    const label = this.labels.find((label) => label.value === val);
    return label ? label.icon : '';
  });

  readonly displayValue = computed(() => this.selectedValues()[0] || 'Select a label');

  readonly labels = [
    {value: 'Important', icon: 'label'},
    {value: 'Starred', icon: 'star'},
    {value: 'Work', icon: 'work'},
    {value: 'Personal', icon: 'person'},
    {value: 'To Do', icon: 'checklist'},
    {value: 'Later', icon: 'schedule'},
    {value: 'Read', icon: 'menu_book'},
    {value: 'Travel', icon: 'flight'},
  ];

  constructor() {
    afterRenderEffect(() => {
      this.listbox()?.scrollActiveItemIntoView();
    });
  }

  onCommit() {
    this.popupExpanded.set(false);
  }
}
```
      File: `app.html`

```html
<div
  ngCombobox
  #combobox="ngCombobox"
  [(expanded)]="popupExpanded"
  [preserveContent]="true"
  class="select"
>
  <span class="combobox-label">
    <span class="selected-label-icon material-symbols-outlined" translate="no" aria-hidden="true">{{
      displayIcon()
    }}</span>
    <span class="selected-label-text">{{ displayValue() }}</span>
  </span>
  <span class="example-arrow material-symbols-outlined" translate="no" aria-hidden="true"
    >arrow_drop_down</span
  >
</div>

<ng-template
  [cdkConnectedOverlay]="{origin: combobox.element, usePopover: 'inline', matchWidth: true}"
  [cdkConnectedOverlayOpen]="popupExpanded()"
>
  <ng-template ngComboboxPopup [combobox]="combobox">
    <div class="example-popup-container">
      <div
        #listbox="ngListbox"
        ngListbox
        ngComboboxWidget
        [tabindex]="-1"
        focusMode="activedescendant"
        selectionMode="explicit"
        [(value)]="selectedValues"
        [activeDescendant]="listbox.activeDescendant()"
        (click)="onCommit()"
        (keydown.enter)="onCommit()"
        (keydown.space)="onCommit()"
      >
        @for (label of labels; track label.value) {
          <div ngOption [value]="label.value" [label]="label.value">
            <span
              class="example-option-icon material-symbols-outlined"
              translate="no"
              aria-hidden="true"
              >{{ label.icon }}</span
            >
            <span class="example-option-text">{{ label.value }}</span>
            <span
              class="example-option-check material-symbols-outlined"
              translate="no"
              aria-hidden="true"
              >check</span
            >
          </div>
        }
      </div>
    </div>
  </ng-template>
</ng-template>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font);
  --primary: var(--hot-pink);
  --on-primary: var(--page-background);
}

.docs-light-mode {
  --on-primary: #fff;
}

.select,
[ngListbox],
[ngOption] {
  outline: none;
}

.select {
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 3rem;
  color: var(--on-primary);
  background-color: var(--primary);
  border: 1px solid color-mix(in srgb, var(--primary) 80%, transparent);
  cursor: pointer;
  height: 3rem;
  padding: 0 3.5rem;
  box-sizing: border-box;
  width: 14rem;
  user-select: none;
  -webkit-user-select: none;
}

.select span {
  user-select: none;
  -webkit-user-select: none;
}

.select:hover {
  background-color: color-mix(in srgb, var(--primary) 90%, transparent);
}

.select[aria-disabled='true'] {
  opacity: 0.6;
  cursor: default;
}

.selected-label-icon {
  font-size: 1.25rem;
}

.select:focus,
.select:focus-within {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.combobox-label {
  gap: 1rem;
  left: 1rem;
  display: flex;
  position: absolute;
  align-items: center;
  pointer-events: none;
}

.example-arrow {
  right: 1rem;
  position: absolute;
  pointer-events: none;
  transition: transform 150ms ease-in-out;
}

.select[aria-expanded='true'] .example-arrow {
  transform: rotate(180deg);
}

.example-popup-container {
  width: 100%;
  padding: 0.5rem;
  margin-top: 8px;
  border-radius: 2rem;
  background-color: var(--septenary-contrast);
  font-size: 0.9rem;
  max-height: 13rem;
  box-sizing: border-box;
  overflow: hidden;
  animation: smoothPopupOpen 150ms ease-out forwards;
  transform-origin: top;
}

@keyframes smoothPopupOpen {
  0% {
    max-height: 0;
    opacity: 0;
  }
  16.7% {
    opacity: 1;
  }
  100% {
    max-height: 13rem;
    opacity: 1;
  }
}

[ngListbox] {
  gap: 2px;
  padding: 2px;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
}

[ngOption] {
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0 1rem;
  min-height: 3rem;
  border-radius: 3rem;
}

[ngOption]:hover,
[ngOption][data-active='true'] {
  background-color: color-mix(in srgb, var(--primary-contrast) 5%, transparent);
}

[ngOption][data-active='true'] {
  outline-offset: -2px;
  outline: 2px solid var(--primary);
}

[ngOption][aria-selected='true'] {
  color: var(--primary);
  background-color: color-mix(in srgb, var(--primary) 10%, transparent);
}

.example-option-icon {
  font-size: 1.25rem;
  padding-right: 1rem;
}

[ngOption]:not([aria-selected='true']) .example-option-check {
  display: none;
}

.example-option-icon,
.example-option-check {
  font-size: 0.9rem;
}

.example-option-text {
  flex: 1;
}
```

  **Retro**

      File: `app.ts`

```ts
import {afterRenderEffect, Component, computed, signal, viewChild} from '@angular/core';
import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root[theme="icons-retro"], app-root:not([theme])',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule],
})
export class App {
  readonly listbox = viewChild(Listbox);

  readonly selectedValues = signal<string[]>([]);
  readonly popupExpanded = signal(false);

  readonly displayIcon = computed(() => {
    const val = this.selectedValues()[0];
    const label = this.labels.find((label) => label.value === val);
    return label ? label.icon : '';
  });

  readonly displayValue = computed(() => this.selectedValues()[0] || 'Select a label');

  readonly labels = [
    {value: 'Important', icon: 'label'},
    {value: 'Starred', icon: 'star'},
    {value: 'Work', icon: 'work'},
    {value: 'Personal', icon: 'person'},
    {value: 'To Do', icon: 'checklist'},
    {value: 'Later', icon: 'schedule'},
    {value: 'Read', icon: 'menu_book'},
    {value: 'Travel', icon: 'flight'},
  ];

  constructor() {
    afterRenderEffect(() => {
      this.listbox()?.scrollActiveItemIntoView();
    });
  }

  onCommit() {
    this.popupExpanded.set(false);
  }
}
```
      File: `app.html`
