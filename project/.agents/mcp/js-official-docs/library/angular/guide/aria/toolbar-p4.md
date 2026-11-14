---
title: "Toolbar (part 4 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/toolbar.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Toolbar (part 4 of 7)

### Vertical toolbar

Vertical toolbars stack controls top to bottom, useful for side panels or vertical command palettes. Up and down arrow keys navigate between widgets.

  **Basic**

      File: `app.ts`

```ts
import {Component, signal} from '@angular/core';
import {Toolbar, ToolbarWidget} from '@angular/aria/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Toolbar, ToolbarWidget],
})
export class App {
  readonly bold = signal(false);
  readonly italic = signal(false);
  readonly underlined = signal(false);
}
```
      File: `app.html`

```html
<div ngToolbar orientation="vertical" aria-label="Text Formatting Tools">
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
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: flex-start;
}

[ngToolbar] {
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--septenary-contrast);
}

.group {
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
}

.separator {
  height: 1px;
  align-self: center;
  width: calc(100% - 1rem);
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
import {Toolbar, ToolbarWidget} from '@angular/aria/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Toolbar, ToolbarWidget],
})
export class App {
  readonly bold = signal(false);
  readonly italic = signal(false);
  readonly underlined = signal(false);
}
```
      File: `app.html`

```html
<div
  ngToolbar
  orientation="vertical"
  class="vertical-material-toolbar"
  aria-label="Text Formatting Tools"
>
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
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: flex-start;
}

[ngToolbar] {
  display: flex;
  flex-direction: column;
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
    height 0.2s ease-in-out,
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
  background-color: var(--vivid-pink);
  color: var(--page-background);
}

[ngToolbarWidget][aria-checked='true'] {
  height: 4.5rem;
}

.group {
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
}

.separator {
  width: 1px;
  margin: 1rem 0;
  height: calc(100% - 2rem);
  background-color: var(--quinary-contrast);
}
```

  **Retro**

      File: `app.ts`

```ts
import {Component, signal} from '@angular/core';
import {Toolbar, ToolbarWidget} from '@angular/aria/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Toolbar, ToolbarWidget],
})
export class App {
  readonly bold = signal(false);
  readonly italic = signal(false);
  readonly underlined = signal(false);
}
```
      File: `app.html`

```html
<div ngToolbar orientation="vertical" class="retro-toolbar" aria-label="Text Formatting Tools">
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
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: flex-start;

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
  flex-direction: column;
}

.group {
  gap: 1rem;
  display: flex;
  flex-direction: column;
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

### Widget groups

Widget groups organize related controls that work together, such as text alignment options or formatting toggles. Groups maintain roving tabindex navigation while presenting the appropriate semantic structure to assistive technologies.

In the examples above, the alignment buttons are wrapped in `ngToolbarWidgetGroup` with `role="radiogroup"`. Selection is decoupled from the toolbar container, allowing you to manage state using Angular signals or custom directives:

```angular-html
<!-- Mutually exclusive radio group -->
<div ngToolbarWidgetGroup role="radiogroup" aria-label="Alignment">
  <button
    ngToolbarWidget
    role="radio"
    type="button"
    [attr.aria-checked]="alignment() === 'left'"
    (click)="alignment.set('left')"
  >
    Left
  </button>
  <button
    ngToolbarWidget
    role="radio"
    type="button"
    [attr.aria-checked]="alignment() === 'center'"
    (click)="alignment.set('center')"
  >
    Center
  </button>
  <button
    ngToolbarWidget
    role="radio"
    type="button"
    [attr.aria-checked]="alignment() === 'right'"
    (click)="alignment.set('right')"
  >
    Right
  </button>
</div>

<!-- Toggle button group -->
<div class="group" role="group" aria-label="Text styling">
  <button ngToolbarWidget type="button" [attr.aria-pressed]="bold()" (click)="bold.set(!bold())">
    Bold
  </button>
  <button
    ngToolbarWidget
    type="button"
    [attr.aria-pressed]="italic()"
    (click)="italic.set(!italic())"
  >
    Italic
  </button>
</div>
```
