---
title: "Tabs (part 2 of 5)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/tabs.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Tabs (part 2 of 5)

## Examples

### Selection follows focus

When selection follows focus, tabs activate immediately as you navigate with arrow keys. This provides instant feedback and works well for lightweight content.

  **Basic**

      File: `app.ts`

```ts
import {Component} from '@angular/core';
import {Tab, Tabs, TabList, TabPanel, TabContent} from '@angular/aria/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TabList, Tab, Tabs, TabPanel, TabContent],
})
export class App {}
```
      File: `app.html`

```html
<div ngTabs>
  <div ngTabList selectionMode="follow" selectedTab="movie">
    <div ngTab value="movie">Movie</div>
    <div ngTab value="theatres">Cast</div>
    <div ngTab value="showtimes">Reviews</div>
  </div>

  <div class="sliding-window">
    <div ngTabPanel [preserveContent]="true" value="movie">
      <ng-template ngTabContent>Panel 1</ng-template>
    </div>

    <div ngTabPanel [preserveContent]="true" value="theatres">
      <ng-template ngTabContent>Panel 2</ng-template>
    </div>

    <div ngTabPanel [preserveContent]="true" value="showtimes">
      <ng-template ngTabContent>Panel 3</ng-template>
    </div>
  </div>
</div>
```
      File: `app.css`

```css
:host {
  font-family: var(--inter-font);
  display: flex;
  justify-content: center;
}

[ngTabs] {
  overflow: hidden;
  width: 600px;
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--primary-contrast) 10%, transparent);
}

[ngTabList] {
  padding: 0;
  display: flex;
  list-style: none;
  position: relative;
  border-bottom: 1px solid color-mix(in srgb, var(--primary-contrast) 10%, transparent);
}

[ngTab] {
  flex: 1;
  outline: none;
  padding: 0.75rem 0;
  cursor: pointer;
  text-align: center;
  color: color-mix(in srgb, var(--primary-contrast) 60%, transparent);
}

[ngTab][aria-selected='false']:focus {
  outline-offset: -8px;
  border-radius: 0.7rem;
  outline: 2px solid var(--bright-blue);
}

[ngTab]:hover {
  background-color: color-mix(in srgb, var(--bright-blue) 5%, transparent);
}

[ngTab][aria-selected='true'] {
  color: var(--page-background);
  background-color: var(--bright-blue);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.sliding-window {
  width: 300%;
  display: flex;
  transition: all 0.2s ease-in-out;
}

[ngTabList]:has([ngTab]:nth-child(1)[aria-selected='true']) ~ .sliding-window {
  transform: translateX(0%);
}
[ngTabList]:has([ngTab]:nth-child(2)[aria-selected='true']) ~ .sliding-window {
  transform: translateX(-33.333%);
}
[ngTabList]:has([ngTab]:nth-child(3)[aria-selected='true']) ~ .sliding-window {
  transform: translateX(-66.666%);
}

[ngTabPanel] {
  display: grid;
  place-items: center;
  padding: 1rem;
  min-height: 100px;
  flex: 1;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

[ngTabPanel]:focus {
  outline-offset: -4px;
  border-radius: 0.5rem;
  outline: 2px solid var(--bright-blue);
}
```

  **Material**

      File: `app.ts`

```ts
import {Component} from '@angular/core';
import {Tab, Tabs, TabList, TabPanel, TabContent} from '@angular/aria/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TabList, Tab, Tabs, TabPanel, TabContent],
})
export class App {}
```
      File: `app.html`

```html
<div ngTabs class="material-tabs">
  <div ngTabList selectionMode="follow" selectedTab="movie">
    <div ngTab value="movie">Movie</div>
    <div ngTab value="theatres">Cast</div>
    <div ngTab value="showtimes">Reviews</div>
    <div class="bottom-border"></div>
  </div>

  <div class="sliding-window">
    <div ngTabPanel [preserveContent]="true" value="movie">
      <ng-template ngTabContent>Panel 1</ng-template>
    </div>

    <div ngTabPanel [preserveContent]="true" value="theatres">
      <ng-template ngTabContent>Panel 2</ng-template>
    </div>

    <div ngTabPanel [preserveContent]="true" value="showtimes">
      <ng-template ngTabContent>Panel 3</ng-template>
    </div>
  </div>
</div>
```
      File: `app.css`

```css
:host {
  font-family: var(--inter-font);
  display: flex;
  justify-content: center;
}

[ngTabs] {
  overflow: hidden;
  width: 600px;
  border-radius: 0.5rem;
  background-color: color-mix(in srgb, var(--bright-blue) 5%, transparent);
}

[ngTabList] {
  padding: 0;
  display: flex;
  list-style: none;
  position: relative;
  border-bottom: 1px solid color-mix(in srgb, var(--primary-contrast) 20%, transparent);
}

[ngTab] {
  flex: 1;
  outline: none;
  padding: 1rem 0;
  cursor: pointer;
  text-align: center;
  color: color-mix(in srgb, var(--primary-contrast) 60%, transparent);
}

[ngTab]:focus {
  outline-offset: -8px;
  border-radius: 0.7rem;
  outline: 2px solid var(--bright-blue);
}

[ngTab]:hover {
  background-color: color-mix(in srgb, var(--primary-contrast) 5%, transparent);
}

[ngTab][aria-selected='true'] {
  color: var(--bright-blue);
}

.bottom-border {
  position: absolute;
  pointer-events: none;
  left: 0;
  bottom: 0;
  height: 3px;
  width: calc(100% / 3);
  background-color: var(--bright-blue);
  transition: all 0.2s ease-in-out;
  transform: translateX(0%);
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}

[ngTab]:nth-child(1)[aria-selected='true'] ~ .bottom-border {
  transform: translateX(0%);
}
[ngTab]:nth-child(2)[aria-selected='true'] ~ .bottom-border {
  transform: translateX(100%);
}
[ngTab]:nth-child(3)[aria-selected='true'] ~ .bottom-border {
  transform: translateX(200%);
}

.sliding-window {
  width: 300%;
  display: flex;
  transition: all 0.2s ease-in-out;
}

[ngTabList]:has([ngTab]:nth-child(1)[aria-selected='true']) ~ .sliding-window {
  transform: translateX(0%);
}
[ngTabList]:has([ngTab]:nth-child(2)[aria-selected='true']) ~ .sliding-window {
  transform: translateX(-33.333%);
}
[ngTabList]:has([ngTab]:nth-child(3)[aria-selected='true']) ~ .sliding-window {
  transform: translateX(-66.666%);
}

[ngTabPanel] {
  display: grid;
  place-items: center;
  padding: 1rem;
  min-height: 100px;
  flex: 1;
}

[ngTabPanel]:focus {
  outline-offset: -4px;
  border-radius: 0.5rem;
  outline: 2px solid var(--bright-blue);
}
```

  **Retro**

      File: `app.ts`

```ts
import {Component} from '@angular/core';
import {Tab, Tabs, TabList, TabPanel, TabContent} from '@angular/aria/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TabList, Tab, Tabs, TabPanel, TabContent],
})
export class App {}
```
      File: `app.html`

```html
<div ngTabs class="retro-tabs">
  <div ngTabList selectionMode="follow" selectedTab="movie">
    <div ngTab value="movie">Movie</div>
    <div ngTab value="theatres">Cast</div>
    <div ngTab value="showtimes">Reviews</div>
  </div>

  <div ngTabPanel value="movie">
    <ng-template ngTabContent>Line 1</ng-template>
  </div>

  <div ngTabPanel value="theatres">
    <ng-template ngTabContent>Line 2</ng-template>
  </div>

  <div ngTabPanel value="showtimes">
    <ng-template ngTabContent>Line 3</ng-template>
  </div>
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-size: 0.8rem;

  font-family: 'Press Start 2P';
  --retro-button-color: var(--bright-blue);
  --retro-shadow-light: color-mix(in srgb, #fff 20%, transparent);
  --retro-shadow-dark: color-mix(in srgb, #000 20%, transparent);
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

[ngTabs] {
  width: 600px;
}

[ngTabList] {
  gap: 1rem;
  display: flex;
}

[ngTab] {
  flex: 1;
  outline: none;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  color: #000;
  background-color: #fff;
  box-shadow: var(--retro-clickable-shadow);
  transition:
    transform 0.1s,
    box-shadow 0.1s;
}

[ngTab]:focus,
[ngTab]:hover {
  transform: translate(1px, 1px);
}

[ngTab]:focus {
  outline-offset: 2px;
  outline: 4px dashed var(--bright-blue);
}

[ngTab]:hover {
  background-color: color-mix(in srgb, var(--bright-blue) 50%, #fff);
}

[ngTab]:active,
[ngTab][aria-selected='true'] {
  color: var(--page-background);
  background-color: var(--bright-blue);
  box-shadow: var(--retro-pressed-shadow);
  transform: translate(4px, 4px);
}

[ngTabPanel] {
  flex: 1;
  font-size: 1.5rem;
  color: #000;
  background-color: #fff;
  padding: 1rem;
  margin-top: 1rem;
  min-height: 100px;
  display: grid;
  place-items: center;
  box-shadow: var(--retro-flat-shadow);
  background: linear-gradient(rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 50%);
  background-color: color-mix(in srgb, var(--bright-blue) 10%, #fff);
  background-size: 100% 4px;
}

[ngTabPanel]:focus {
  outline-offset: 4px;
  outline: 4px dashed var(--bright-blue);
}

[ngTabPanel][inert] {
  display: none;
}
```

Set `[selectionMode]="'follow'"` on the tab list to enable this behavior.
