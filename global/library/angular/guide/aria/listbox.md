---
title: "Listbox (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/listbox.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Listbox

  - Listbox pattern
  - Listbox API Reference

## Overview

A directive that displays a list of options for users to select from, supporting keyboard navigation, single or multiple selection, and screen reader support.

  **Basic**

      File: `app.ts`

```ts
import {Listbox, Option} from '@angular/aria/listbox';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Listbox, Option],
})
export class App {
  /** The options available in the listbox. */
  options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
  ];
}
```
      File: `app.html`

```html
<div class="listbox-container">
  <div ngListbox [value]="['Option 1']">
    @for (option of options; track option) {
      <div ngOption [value]="option">
        <span class="example-option-text">{{ option }}</span>
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
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font);
}

.listbox-container {
  width: 200px;
  height: 11rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--septenary-contrast);
  font-size: 0.9rem;
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

[ngOption]:not([aria-selected='true']) .example-option-check {
  display: none;
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
import {Listbox, Option} from '@angular/aria/listbox';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Listbox, Option],
})
export class App {
  /** The options available in the listbox. */
  options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
  ];
}
```
      File: `app.html`

```html
<div class="material-listbox">
  <div ngListbox>
    @for (option of options; track option) {
      <div ngOption [value]="option">
        <span class="example-option-text">{{ option }}</span>
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

.material-listbox {
  width: 200px;
  height: 13rem;
  padding: 0.5rem;
  border-radius: 2rem;
  background-color: var(--septenary-contrast);
  font-size: 0.9rem;
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

[ngOption]:not([aria-selected='true']) .example-option-check {
  display: none;
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

```ts
import {Listbox, Option} from '@angular/aria/listbox';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Listbox, Option],
})
export class App {
  /** The options available in the listbox. */
  options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
  ];
}
```
      File: `app.html`

```html
<div class="retro-listbox">
  <div ngListbox>
    @for (option of options; track option) {
      <div ngOption [value]="option">
        <span class="example-option-text">{{ option }}</span>
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
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

:host {
  display: flex;
  justify-content: center;
  font-size: 0.8rem;

  font-family: 'Press Start 2P';
  --retro-button-color: color-mix(in srgb, var(--hot-pink) 80%, var(--page-background));
  --retro-shadow-light: color-mix(in srgb, var(--retro-button-color) 90%, #fff);
  --retro-shadow-dark: color-mix(in srgb, var(--retro-button-color) 90%, #000);
  --retro-flat-shadow:
    4px 0px 0px 0px var(--tertiary-contrast), 0px 4px 0px 0px var(--tertiary-contrast),
    -4px 0px 0px 0px var(--tertiary-contrast), 0px -4px 0px 0px var(--tertiary-contrast);
}

.retro-listbox {
  width: 200px;
  height: 11rem;
  padding: 0.5rem;
  box-shadow: var(--retro-flat-shadow);
  background-color: var(--septenary-contrast);
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
  padding: 0 1rem;
  font-size: 0.6rem;
  min-height: 2.25rem;
}

[ngOption]:hover {
  background-color: color-mix(in srgb, var(--primary-contrast) 5%, transparent);
}

[ngOption][data-active='true'] {
  outline-offset: -2px;
  outline: 2px dashed var(--hot-pink);
}

[ngOption][aria-selected='true'] {
  color: var(--hot-pink);
  background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
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

## Usage

Listbox is a foundational directive used by the Select, Multiselect, and Autocomplete patterns. For most dropdown needs, use those documented patterns instead.

Consider using listbox directly when:

- **Building custom selection components** - Creating specialized interfaces with specific behavior
- **Visible selection lists** - Displaying selectable items directly on the page (not in dropdowns)
- **Custom integration patterns** - Integrating with unique popup or layout requirements

Avoid listbox when:

- **Navigation menus are needed** - Use the Menu directive for actions and commands

## Features

Angular's listbox provides a fully accessible list implementation with:

- **Keyboard Navigation** - Navigate options with arrow keys, select with Enter or Space
- **Screen Reader Support** - Built-in ARIA attributes including role="listbox"
- **Single or Multiple Selection** - `multi` attribute controls selection mode
- **Horizontal or Vertical** - `orientation` attribute for layout direction
- **Type-ahead Search** - Type characters to jump to matching options
- **Signal-Based Reactivity** - Reactive state management using Angular signals
