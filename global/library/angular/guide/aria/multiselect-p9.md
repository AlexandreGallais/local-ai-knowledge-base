---
title: "Multiselect (part 9 of 10)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/multiselect.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Multiselect (part 9 of 10)

### Controlled selection

Forms sometimes need to limit the number of selections or validate user choices. Programmatic control over selection enables these constraints while maintaining accessibility.

  **Basic**

      File: `app.ts`

```ts
import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';
import {afterRenderEffect, Component, computed, signal, viewChild, effect} from '@angular/core';

@Component({
  selector: 'app-root:not([theme="limited-basic"])',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule],
})
export class App {
  /** The combobox listbox popup. */
  readonly listbox = viewChild(Listbox);

  /** The options available in the listbox. */
  readonly selectedValues = signal<string[]>([]);

  /** The string that is displayed in the combobox. */
  readonly displayValue = computed(() => {
    const values = this.selectedValues();
    if (values.length === 0) {
      return 'Select 2 labels';
    }
    if (values.length === 1) {
      return values[0];
    }
    return `${values[0]} & ${values[1]}`;
  });

  /** The labels that are available for selection. */
  readonly labels = [
    {value: 'Important', disabled: computed(() => this.isOptionDisabled('Important'))},
    {value: 'Starred', disabled: computed(() => this.isOptionDisabled('Starred'))},
    {value: 'Work', disabled: computed(() => this.isOptionDisabled('Work'))},
    {value: 'Personal', disabled: computed(() => this.isOptionDisabled('Personal'))},
    {value: 'To Do', disabled: computed(() => this.isOptionDisabled('To Do'))},
    {value: 'Later', disabled: computed(() => this.isOptionDisabled('Later'))},
    {value: 'Read', disabled: computed(() => this.isOptionDisabled('Read'))},
    {value: 'Travel', disabled: computed(() => this.isOptionDisabled('Travel'))},
  ];

  /** Whether the popup is expanded. */
  readonly popupExpanded = signal(false);

  constructor() {
    // Scrolls to the active item when the active option changes.
    afterRenderEffect(() => {
      this.listbox()?.scrollActiveItemIntoView();
    });
  }

  isOptionDisabled(value: string) {
    const values = this.selectedValues();
    if (!values || values.length < 2) {
      return false;
    }
    return !values.includes(value);
  }
}
```
      File: `app.html`

```html
<div
  #combobox="ngCombobox"
  ngCombobox
  [(expanded)]="popupExpanded"
  [preserveContent]="true"
  class="select"
>
  <span class="combobox-label">
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
        [multi]="true"
        ngComboboxWidget
        focusMode="activedescendant"
        [tabindex]="-1"
        selectionMode="explicit"
        [(value)]="selectedValues"
        [activeDescendant]="listbox.activeDescendant()"
      >
        @for (label of labels; track label.value) {
          <div ngOption [value]="label.value" [label]="label.value" [disabled]="label.disabled()">
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

.select {
  display: flex;
  position: relative;
  align-items: center;
  color: color-mix(in srgb, var(--hot-pink) 90%, var(--primary-contrast));
  background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--hot-pink) 80%, transparent);
  /* Modernized additions for div-trigger Select: */
  height: 2.5rem;
  padding: 0 2.5rem;
  cursor: pointer;
  box-sizing: border-box;
  width: 16rem;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
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

.select:focus,
.select:focus-within {
  outline: 2px solid color-mix(in srgb, var(--hot-pink) 50%, transparent);
}

.combobox-label {
  gap: 1rem;
  left: 1.5rem;
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

.example-popup-container.closing {
  animation: smoothPopupClose 150ms ease-in forwards;
}

@keyframes smoothPopupClose {
  0% {
    max-height: 11rem;
    opacity: 1;
  }
  100% {
    max-height: 0;
    opacity: 0;
  }
}

[ngListbox] {
  gap: 2px;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
  outline: none;
}

[ngOption] {
  display: flex;
  cursor: pointer;
  align-items: center;
  margin: 1px;
  padding: 0 1rem;
  min-height: 2.25rem;
  border-radius: 0.5rem;
  outline: none;
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

[ngOption]:not([aria-selected='true']) .example-option-check {
  display: none;
}

[ngOption][aria-disabled='true'] {
  opacity: 0.6;
  cursor: default;
}

[ngOption][aria-disabled='true']:hover {
  background-color: transparent;
}

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
import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';
import {afterRenderEffect, Component, computed, signal, viewChild, effect} from '@angular/core';

@Component({
  selector: 'app-root:not([theme="limited-material"])',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule],
})
export class App {
  /** The combobox listbox popup. */
  readonly listbox = viewChild(Listbox);

  /** The options available in the listbox. */
  readonly selectedValues = signal<string[]>([]);

  /** The string that is displayed in the combobox. */
  readonly displayValue = computed(() => {
    const values = this.selectedValues();
    if (values.length === 0) {
      return 'Select 2 labels';
    }
    if (values.length === 1) {
      return values[0];
    }
    return `${values[0]} & ${values[1]}`;
  });

  /** The labels that are available for selection. */
  readonly labels = [
    {value: 'Important', disabled: computed(() => this.isOptionDisabled('Important'))},
    {value: 'Starred', disabled: computed(() => this.isOptionDisabled('Starred'))},
    {value: 'Work', disabled: computed(() => this.isOptionDisabled('Work'))},
    {value: 'Personal', disabled: computed(() => this.isOptionDisabled('Personal'))},
    {value: 'To Do', disabled: computed(() => this.isOptionDisabled('To Do'))},
    {value: 'Later', disabled: computed(() => this.isOptionDisabled('Later'))},
    {value: 'Read', disabled: computed(() => this.isOptionDisabled('Read'))},
    {value: 'Travel', disabled: computed(() => this.isOptionDisabled('Travel'))},
  ];

  /** Whether the popup is expanded. */
  readonly popupExpanded = signal(false);

  constructor() {
    // Scrolls to the active item when the active option changes.
    afterRenderEffect(() => {
      this.listbox()?.scrollActiveItemIntoView();
    });
  }

  isOptionDisabled(value: string) {
    const values = this.selectedValues();
    if (!values || values.length < 2) {
      return false;
    }
    return !values.includes(value);
  }
}
```
      File: `app.html`

```html
<div
  #combobox="ngCombobox"
  ngCombobox
  [(expanded)]="popupExpanded"
  [preserveContent]="true"
  class="select"
>
  <span class="combobox-label">
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
        [multi]="true"
        ngComboboxWidget
        focusMode="activedescendant"
        [tabindex]="-1"
        selectionMode="explicit"
        [(value)]="selectedValues"
        [activeDescendant]="listbox.activeDescendant()"
      >
        @for (label of labels; track label.value) {
          <div ngOption [value]="label.value" [label]="label.value" [disabled]="label.disabled()">
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

.select {
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 3rem;
  color: var(--on-primary);
  background-color: var(--primary);
  border: 1px solid color-mix(in srgb, var(--primary) 80%, transparent);
  /* Modernized additions for div-trigger Select: */
  height: 3rem;
  padding: 0 2.5rem;
  cursor: pointer;
  box-sizing: border-box;
  width: 16rem;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
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

.select:focus,
.select:focus-within {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.combobox-label {
  gap: 1rem;
  left: 1.5rem;
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

.example-popup-container.closing {
  animation: smoothPopupClose 150ms ease-in forwards;
}

@keyframes smoothPopupClose {
  0% {
    max-height: 13rem;
    opacity: 1;
  }
  100% {
    max-height: 0;
    opacity: 0;
  }
}

[ngListbox] {
  gap: 2px;
  padding: 2px;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
  outline: none;
}

[ngOption] {
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0 1rem;
  min-height: 3rem;
  border-radius: 3rem;
  outline: none;
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

[ngOption]:not([aria-selected='true']) .example-option-check {
  display: none;
}

[ngOption][aria-disabled='true'] {
  opacity: 0.6;
  cursor: default;
}

[ngOption][aria-disabled='true']:hover {
  background-color: transparent;
}

.example-option-check {
  font-size: 0.9rem;
}

.example-option-text {
  flex: 1;
}
```

  **Retro**

      File: `app.ts`
