---
title: "Toolbar (part 1 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/toolbar.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Toolbar

  - Toolbar ARIA pattern
  - Toolbar API Reference

## Overview

A container for grouping related controls and actions with keyboard navigation, commonly used for text formatting, toolbars, and command panels.

  **Basic**

      File: `app.ts`

```ts
import {Component, signal} from '@angular/core';
import {Toolbar, ToolbarWidget, ToolbarWidgetGroup} from '@angular/aria/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Toolbar, ToolbarWidget, ToolbarWidgetGroup],
})
export class App {
  readonly bold = signal(false);
  readonly italic = signal(false);
  readonly underlined = signal(false);
  readonly alignment = signal<'left' | 'center' | 'right'>('left');
}
```
      File: `app.html`

```html
<div ngToolbar aria-label="Text Formatting Tools">
  <div class="group">
    <button
      ngToolbarWidget
      value="undo"
      type="button"
      aria-label="undo"
      class="material-symbols-outlined"
      translate="no"
    >
      undo
    </button>

    <button
      ngToolbarWidget
      value="redo"
      type="button"
      aria-label="redo"
      class="material-symbols-outlined"
      translate="no"
    >
      redo
    </button>
  </div>

  <div class="separator" role="separator"></div>

  <div class="group">
    <button
      ngToolbarWidget
      value="bold"
      type="button"
      aria-label="bold"
      class="material-symbols-outlined"
      [attr.aria-pressed]="bold()"
      (click)="bold.set(!bold())"
      translate="no"
    >
      format_bold
    </button>

    <button
      ngToolbarWidget
      value="italic"
      type="button"
      aria-label="italic"
      class="material-symbols-outlined"
      [attr.aria-pressed]="italic()"
      (click)="italic.set(!italic())"
      translate="no"
    >
      format_italic
    </button>

    <button
      ngToolbarWidget
      value="underlined"
      type="button"
      aria-label="underlined"
      class="material-symbols-outlined"
      [attr.aria-pressed]="underlined()"
      (click)="underlined.set(!underlined())"
      translate="no"
    >
      format_underlined
    </button>
  </div>

  <div class="separator" role="separator"></div>

  <div ngToolbarWidgetGroup role="radiogroup" class="group" aria-label="Text alignment options">
    <button
      ngToolbarWidget
      role="radio"
      type="button"
      value="align left"
      aria-label="align left"
      class="material-symbols-outlined"
      [attr.aria-checked]="alignment() === 'left'"
      (click)="alignment.set('left')"
      translate="no"
    >
      format_align_left
    </button>

    <button
      ngToolbarWidget
      role="radio"
      type="button"
      value="align center"
      aria-label="align center"
      class="material-symbols-outlined"
      [attr.aria-checked]="alignment() === 'center'"
      (click)="alignment.set('center')"
      translate="no"
    >
      format_align_center
    </button>

    <button
      ngToolbarWidget
      role="radio"
      type="button"
      value="align right"
      aria-label="align right"
      class="material-symbols-outlined"
      [attr.aria-checked]="alignment() === 'right'"
      (click)="alignment.set('right')"
      translate="no"
    >
      format_align_right
    </button>
  </div>
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
}

[ngToolbar] {
  gap: 1.5rem;
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--septenary-contrast);
}

.group {
  gap: 0.5rem;
  display: flex;
}

.separator {
  width: 1px;
  align-self: center;
  height: calc(100% - 1rem);
  background-color: var(--quinary-contrast);
}

[ngToolbarWidget] {
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1.25rem;
  background-color: transparent;
  color: var(--primary-contrast);
}

[ngToolbarWidget]:hover {
  background-color: color-mix(in srgb, var(--primary-contrast) 10%, transparent);
}

[ngToolbarWidget]:active {
  background-color: color-mix(in srgb, var(--primary-contrast) 15%, transparent);
}

[ngToolbarWidget]:focus {
  outline-offset: -1px;
  outline: 1px solid color-mix(in srgb, var(--hot-pink) 60%, transparent);
}

[ngToolbarWidget][aria-pressed="true"],
[ngToolbarWidget][aria-checked="true"] {
  color: color-mix(in srgb, var(--hot-pink) 80%, var(--primary-contrast));
  background-color: color-mix(in srgb, var(--hot-pink) 10%, transparent);
}
```

  **Material**

      File: `app.ts`

```ts
import {Component, signal} from '@angular/core';
import {Toolbar, ToolbarWidget, ToolbarWidgetGroup} from '@angular/aria/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Toolbar, ToolbarWidget, ToolbarWidgetGroup],
})
export class App {
  readonly bold = signal(false);
  readonly italic = signal(false);
  readonly underlined = signal(false);
  readonly alignment = signal<'left' | 'center' | 'right'>('left');
}
```
      File: `app.html`

```html
<div ngToolbar class="material-toolbar" aria-label="Text Formatting Tools">
  <div class="group">
    <button
      ngToolbarWidget
      value="undo"
      type="button"
      aria-label="undo"
      class="material-symbols-outlined"
      translate="no"
    >
      undo
    </button>

    <button
      ngToolbarWidget
      value="redo"
      type="button"
      aria-label="redo"
      class="material-symbols-outlined"
      translate="no"
    >
      redo
    </button>
  </div>

  <div class="separator" role="separator"></div>

  <div class="group">
    <button
      ngToolbarWidget
      value="bold"
      type="button"
      aria-label="bold"
      class="material-symbols-outlined"
      [attr.aria-pressed]="bold()"
      (click)="bold.set(!bold())"
      translate="no"
    >
      format_bold
    </button>

    <button
      ngToolbarWidget
      value="italic"
      type="button"
      aria-label="italic"
      class="material-symbols-outlined"
      [attr.aria-pressed]="italic()"
      (click)="italic.set(!italic())"
      translate="no"
    >
      format_italic
    </button>

    <button
      ngToolbarWidget
      value="underlined"
      type="button"
      aria-label="underlined"
      class="material-symbols-outlined"
      [attr.aria-pressed]="underlined()"
      (click)="underlined.set(!underlined())"
      translate="no"
    >
      format_underlined
    </button>
  </div>

  <div class="separator" role="separator"></div>

  <div ngToolbarWidgetGroup role="radiogroup" class="group" aria-label="Text alignment options">
    <button
      ngToolbarWidget
      role="radio"
      type="button"
      value="align left"
      aria-label="align left"
      class="material-symbols-outlined"
      [attr.aria-checked]="alignment() === 'left'"
      (click)="alignment.set('left')"
      translate="no"
    >
      format_align_left
    </button>

    <button
      ngToolbarWidget
      role="radio"
      type="button"
      value="align center"
      aria-label="align center"
      class="material-symbols-outlined"
      [attr.aria-checked]="alignment() === 'center'"
      (click)="alignment.set('center')"
      translate="no"
    >
      format_align_center
    </button>

    <button
      ngToolbarWidget
      role="radio"
      type="button"
      value="align right"
      aria-label="align right"
      class="material-symbols-outlined"
      [attr.aria-checked]="alignment() === 'right'"
      (click)="alignment.set('right')"
      translate="no"
    >
      format_align_right
    </button>
  </div>
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
}

[ngToolbar] {
  display: flex;
}

[ngToolbarWidget] {
  border: none;
  outline: none;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  font-size: 1.25rem;
  border-radius: 2rem;
  color: color-mix(in srgb, var(--vivid-pink) 70%, var(--full-contrast));
  background-color: color-mix(in srgb, var(--vivid-pink) 20%, transparent);
  transition:
    width 0.2s ease-in-out,
    background-color 0.15s ease-in-out,
    color 0.15s ease-in-out;
}

[ngToolbarWidget]:focus {
  outline-offset: 2px;
  outline: 2px solid var(--vivid-pink);
}

[ngToolbarWidget]:active,
[ngToolbarWidget][aria-pressed='true'],
[ngToolbarWidget][aria-checked='true'] {
  background-color: color-mix(in srgb, var(--vivid-pink) 80%, var(--full-contrast));
  color: var(--page-background);
}

[ngToolbarWidget][aria-checked='true'] {
  width: 4.5rem;
}

.group {
  display: flex;
  gap: 0.5rem;
}

.separator {
  width: 1px;
  margin: 0 1rem;
  height: calc(100% - 2rem);
  background-color: var(--quinary-contrast);
}
```

  **Retro**

      File: `app.ts`

```ts
import {Component, signal} from '@angular/core';
import {Toolbar, ToolbarWidget, ToolbarWidgetGroup} from '@angular/aria/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Toolbar, ToolbarWidget, ToolbarWidgetGroup],
})
export class App {
  readonly bold = signal(false);
  readonly italic = signal(false);
  readonly underlined = signal(false);
  readonly alignment = signal<'left' | 'center' | 'right'>('left');
}
```
      File: `app.html`

```html
<div ngToolbar class="retro-toolbar" aria-label="Text Formatting Tools">
  <div class="group">
    <button
      ngToolbarWidget
      value="undo"
      type="button"
      aria-label="undo"
      class="material-symbols-outlined"
      translate="no"
    >
      undo
    </button>

    <button
      ngToolbarWidget
      value="redo"
      type="button"
      aria-label="redo"
      class="material-symbols-outlined"
      translate="no"
    >
      redo
    </button>
  </div>

  <div class="separator" role="separator"></div>

  <div class="group">
    <button
      ngToolbarWidget
      value="bold"
      type="button"
      aria-label="bold"
      class="material-symbols-outlined"
      [attr.aria-pressed]="bold()"
      (click)="bold.set(!bold())"
      translate="no"
    >
      format_bold
    </button>

    <button
      ngToolbarWidget
      value="italic"
      type="button"
      aria-label="italic"
      class="material-symbols-outlined"
      [attr.aria-pressed]="italic()"
      (click)="italic.set(!italic())"
      translate="no"
    >
      format_italic
    </button>

    <button
      ngToolbarWidget
      value="underlined"
      type="button"
      aria-label="underlined"
      class="material-symbols-outlined"
      [attr.aria-pressed]="underlined()"
      (click)="underlined.set(!underlined())"
      translate="no"
    >
      format_underlined
    </button>
  </div>

  <div class="separator" role="separator"></div>

  <div ngToolbarWidgetGroup role="radiogroup" class="group" aria-label="Text alignment options">
    <button
      ngToolbarWidget
      role="radio"
      type="button"
      value="align left"
      aria-label="align left"
      class="material-symbols-outlined"
      [attr.aria-checked]="alignment() === 'left'"
      (click)="alignment.set('left')"
      translate="no"
    >
      format_align_left
    </button>

    <button
      ngToolbarWidget
      role="radio"
      type="button"
      value="align center"
      aria-label="align center"
      class="material-symbols-outlined"
      [attr.aria-checked]="alignment() === 'center'"
      (click)="alignment.set('center')"
      translate="no"
    >
      format_align_center
    </button>

    <button
      ngToolbarWidget
      role="radio"
      type="button"
      value="align right"
      aria-label="align right"
      class="material-symbols-outlined"
      [attr.aria-checked]="alignment() === 'right'"
      (click)="alignment.set('right')"
      translate="no"
    >
      format_align_right
    </button>
  </div>
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;

  font-family: 'Press Start 2P';
  --retro-button-color: color-mix(in srgb, var(--vivid-pink) 80%, var(--page-background));
  --retro-pressed-tint: #fbfbfb;
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

:host-context(.docs-dark-mode) {
  --retro-pressed-tint: #151417;
}

[ngToolbar] {
  gap: 1.5rem;
  display: flex;
  padding: 1rem;
}

.group {
  gap: 1rem;
  display: flex;
}

.separator {
  width: 1px;
  align-self: center;
  height: calc(100% - 1rem);
  background-color: var(--quinary-contrast);
}

[ngToolbarWidget] {
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.25rem;
  color: var(--page-background);

  background-color: var(--retro-button-color);
  box-shadow: var(--retro-clickable-shadow);
  transition:
    transform 0.1s,
    box-shadow 0.1s;
}

[ngToolbarWidget]:focus,
[ngToolbarWidget]:hover {
  transform: translate(1px, 1px);
}

[ngToolbarWidget]:active,
[ngToolbarWidget][aria-pressed='true'],
[ngToolbarWidget][aria-checked='true'] {
  transform: translate(4px, 4px);
  box-shadow: var(--retro-pressed-shadow);
  background-color: color-mix(in srgb, var(--retro-button-color) 60%, var(--retro-pressed-tint));
}

[ngToolbarWidget]:focus {
  outline-offset: 4px;
  outline: 4px dashed var(--retro-button-color);
}
```
