---
title: "Tabs (part 4 of 5)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/tabs.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Tabs (part 4 of 5)

### Vertical tabs

Arrange tabs vertically for interfaces like settings panels or navigation sidebars.

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
  <div ngTabList orientation="vertical" selectedTab="movie">
    <div ngTab value="movie">
      <span class="material-symbols-outlined" translate="no" aria-hidden="true">videocam</span>
    </div>
    <div ngTab value="theatres">
      <span class="material-symbols-outlined" translate="no" aria-hidden="true"
        >theater_comedy</span
      >
    </div>
    <div ngTab value="showtimes">
      <span class="material-symbols-outlined" translate="no" aria-hidden="true">reviews</span>
    </div>
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
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  font-family: var(--inter-font);
  display: flex;
  justify-content: center;
}

[ngTabs] {
  overflow: hidden;
  width: 600px;
  height: 200px;
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--primary-contrast) 10%, transparent);
  display: flex;
}

[ngTabList] {
  padding: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  position: relative;
  border-right: 1px solid color-mix(in srgb, var(--primary-contrast) 10%, transparent);
}

[ngTab] {
  flex: 1;
  outline: none;
  width: 80px;
  cursor: pointer;
  color: color-mix(in srgb, var(--primary-contrast) 60%, transparent);
  display: grid;
  place-items: center;
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
  border-bottom-left-radius: 0.5rem;
}

.sliding-window {
  height: 300%;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  flex: 1;
}

[ngTabList]:has([ngTab]:nth-child(1)[aria-selected='true']) ~ .sliding-window {
  transform: translateY(0%);
}
[ngTabList]:has([ngTab]:nth-child(2)[aria-selected='true']) ~ .sliding-window {
  transform: translateY(-33.333%);
}
[ngTabList]:has([ngTab]:nth-child(3)[aria-selected='true']) ~ .sliding-window {
  transform: translateY(-66.666%);
}

[ngTabPanel] {
  display: grid;
  place-items: center;
  padding: 1rem;
  flex: 1;
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
<div ngTabs>
  <div ngTabList class="material-tabs" orientation="vertical" selectedTab="movie">
    <div ngTab value="movie">
      <span class="material-symbols-outlined" translate="no" aria-hidden="true">videocam</span>
    </div>
    <div ngTab value="theatres">
      <span class="material-symbols-outlined" translate="no" aria-hidden="true"
        >theater_comedy</span
      >
    </div>
    <div ngTab value="showtimes">
      <span class="material-symbols-outlined" translate="no" aria-hidden="true">reviews</span>
    </div>
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
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  font-family: var(--inter-font);
  display: flex;;
  justify-content: center;
}

[ngTabs] {
  overflow: hidden;
  width: 600px;
  height: 200px;
  border-radius: 0.5rem;
  background-color: color-mix(in srgb, var(--bright-blue) 5%, transparent);
  display: flex;
}

[ngTabList] {
  padding: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  position: relative;
  border-right: 1px solid color-mix(in srgb, var(--primary-contrast) 20%, transparent);
}

[ngTab] {
  flex: 1;
  outline: none;
  width: 80px;
  cursor: pointer;
  color: color-mix(in srgb, var(--primary-contrast) 60%, transparent);
  display: grid;
  place-items: center;
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
  top: 0;
  right: 0;
  width: 3px;
  height: calc(100% / 3);
  background-color: var(--bright-blue);
  transition: all 0.2s ease-in-out;
  transform: translateY(0%);
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}

[ngTab]:nth-child(1)[aria-selected='true'] ~ .bottom-border {
  transform: translateY(0%);
}
[ngTab]:nth-child(2)[aria-selected='true'] ~ .bottom-border {
  transform: translateY(100%);
}
[ngTab]:nth-child(3)[aria-selected='true'] ~ .bottom-border {
  transform: translateY(200%);
}

.sliding-window {
  height: 300%;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  flex: 1;
}

[ngTabList]:has([ngTab]:nth-child(1)[aria-selected='true']) ~ .sliding-window {
  transform: translateY(0%);
}
[ngTabList]:has([ngTab]:nth-child(2)[aria-selected='true']) ~ .sliding-window {
  transform: translateY(-33.333%);
}
[ngTabList]:has([ngTab]:nth-child(3)[aria-selected='true']) ~ .sliding-window {
  transform: translateY(-66.666%);
}

[ngTabPanel] {
  display: grid;
  place-items: center;
  padding: 1rem;
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
  <div ngTabList orientation="vertical" selectedTab="movie">
    <div ngTab value="movie">
      <span class="material-symbols-outlined" translate="no" aria-hidden="true">videocam</span>
    </div>
    <div ngTab value="theatres">
      <span class="material-symbols-outlined" translate="no" aria-hidden="true"
        >theater_comedy</span
      >
    </div>
    <div ngTab value="showtimes">
      <span class="material-symbols-outlined" translate="no" aria-hidden="true">reviews</span>
    </div>
  </div>

  <div ngTabPanel [preserveContent]="true" value="movie">
    <ng-template ngTabContent>Line 1</ng-template>
  </div>

  <div ngTabPanel [preserveContent]="true" value="theatres">
    <ng-template ngTabContent>Line 2</ng-template>
  </div>

  <div ngTabPanel [preserveContent]="true" value="showtimes">
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
  width: 500px;
  display: flex;
}

[ngTabList] {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

[ngTab] {
  flex: 1;
  outline: none;
  padding: 1rem 1.5rem;
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
  margin-left: 1rem;
  min-width: 100px;
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

Set `[orientation]="'vertical'"` on the tab list. Navigation changes to Up/Down arrow keys.

### Lazy content rendering

Use the `ngTabContent` directive on an `ng-template` to defer rendering tab panels until they're shown.

```angular-html
<div ngTabs>
  <ul ngTabList [(selectedTab)]="selectedTab">
    <li ngTab value="tab1">Tab 1</li>
    <li ngTab value="tab2">Tab 2</li>
  </ul>

  <div ngTabPanel value="tab1">
    <ng-template ngTabContent>
      <!-- This content only renders when Tab 1 is shown -->
      <app-heavy-component />
    </ng-template>
  </div>

  <div ngTabPanel value="tab2">
    <ng-template ngTabContent>
      <!-- This content only renders when Tab 2 is shown -->
      <app-another-component />
    </ng-template>
  </div>
</div>
```

By default, content is removed from the DOM when the panel is hidden. Set `[preserveContent]="true"` to keep it, for example when the panel contains a video that shouldn't reset when switching tabs.
