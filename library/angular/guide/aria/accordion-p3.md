---
title: "Accordion (part 3 of 5)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/accordion.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Accordion (part 3 of 5)

### Multiple expansion mode

Set `[multiExpandable]="true"` to allow multiple panels to be open simultaneously. Users can expand as many panels as needed without closing others.

  **Basic**

      File: `TS`

```ts
import {Component} from '@angular/core';
import {
  AccordionGroup,
  AccordionTrigger,
  AccordionPanel,
  AccordionContent,
} from '@angular/aria/accordion';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent],
})
export class App {}
```
      File: `HTML`

```html
<div ngAccordionGroup class="basic-accordion">
  <h3>
    <span ngAccordionTrigger [panel]="panel1" #trigger1="ngAccordionTrigger" [expanded]="true">
      Which attribute tells assistive tech whether the panel is open or closed?
      <span
        aria-hidden="true"
        class="expand-icon"
        [class.expand-icon__expanded]="trigger1.expanded()"
      ></span>
    </span>
  </h3>
  <div ngAccordionPanel #panel1="ngAccordionPanel">
    <ng-template ngAccordionContent>
      <p>
        Use <code>aria-expanded</code> on the button element. Set it to "true" when the content
        panel is visible and "false" when the content is hidden. This is a crucial state indicator
        for screen reader users.
      </p>
    </ng-template>
  </div>

  <h3>
    <span ngAccordionTrigger [panel]="panel2" #trigger2="ngAccordionTrigger">
      How do you link the button to the content it controls?
      <span
        aria-hidden="true"
        class="expand-icon"
        [class.expand-icon__expanded]="trigger2.expanded()"
      ></span>
    </span>
  </h3>
  <div ngAccordionPanel #panel2="ngAccordionPanel">
    <ng-template ngAccordionContent>
      <p>
        Use the <code>aria-controls</code> attribute on the button, and set its value to match the
        id of the related content panel. This establishes a programmatic relationship, allowing
        assistive technologies to jump directly to the relevant content.
      </p>
    </ng-template>
  </div>

  <h3>
    <span ngAccordionTrigger [panel]="panel3" #trigger3="ngAccordionTrigger" [expanded]="true">
      What role should the heading element containing the accordion button have?
      <span
        aria-hidden="true"
        class="expand-icon"
        [class.expand-icon__expanded]="trigger3.expanded()"
      ></span>
    </span>
  </h3>
  <div ngAccordionPanel #panel3="ngAccordionPanel">
    <ng-template ngAccordionContent>
      <p>
        The element containing the button should typically have <code>role="heading"</code> with an
        appropriate <code>aria-level</code> to define the structure. This ensures the accordion
        section is recognized as a section header, making the page structure navigable for users.
      </p>
    </ng-template>
  </div>
</div>
```
      File: `CSS`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font);
}

[ngAccordionGroup] {
  width: 500px;
}

h3 {
  font-size: 1rem;
  margin: 0;
  color: var(--secondary-contrast);
  box-sizing: border-box;
  position: relative;
}

h3:focus-within::before,
h3:hover::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 2px;
  background-color: var(--vivid-pink);
  top: 0;
  left: 0;
}

h3:not(:first-of-type) {
  border-block-start: 1px solid var(--senary-contrast);
}

p {
  margin: 0;
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: var(--tertiary-contrast);
  font-size: 0.875rem;
}

[ngAccordionTrigger] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  cursor: pointer;
  padding: 1.5rem;
}

[ngAccordionTrigger][aria-expanded='true'] {
  background-image: var(--pink-to-purple-horizontal-gradient);
  background-clip: text;
  color: transparent;
}

[ngAccordionTrigger][aria-disabled='true'] {
  opacity: 0.5;
  cursor: default;
}

.expand-icon {
  position: relative;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-left: 1rem;
}

.expand-icon::before,
.expand-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  top: 50%;
  background-color: var(--quaternary-contrast);
  transition: .3s ease-out;
}

.expand-icon::after {
  transform: rotate(90deg);
}

.expand-icon__expanded::before {
  transform: translateY(-50%) rotate(-90deg);
  opacity: 0;
}

.expand-icon__expanded::after {
  transform: translateY(-50%) rotate(0);
  background-color: var(--electric-violet);
}
```

  **Material**

      File: `TS`

```ts
import {Component} from '@angular/core';
import {
  AccordionGroup,
  AccordionTrigger,
  AccordionPanel,
  AccordionContent,
} from '@angular/aria/accordion';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent],
})
export class App {}
```
      File: `HTML`

```html
<div ngAccordionGroup class="material-accordion">
  <h3>
    <span ngAccordionTrigger [panel]="panel1" #trigger1="ngAccordionTrigger" [expanded]="true">
      Which attribute tells assistive tech whether the panel is open or closed?
      <span
        aria-hidden="true"
        class="material-symbols-outlined expand-icon"
        [class.expand-icon__expanded]="trigger1.expanded()"
        translate="no"
        >keyboard_arrow_up</span
      >
    </span>
  </h3>
  <div ngAccordionPanel #panel1="ngAccordionPanel">
    <ng-template ngAccordionContent>
      <p>
        Use <code>aria-expanded</code> on the button element. Set it to "true" when the content
        panel is visible and "false" when the content is hidden. This is a crucial state indicator
        for screen reader users.
      </p>
    </ng-template>
  </div>

  <h3>
    <span ngAccordionTrigger [panel]="panel2" #trigger2="ngAccordionTrigger">
      How do you link the button to the content it controls?
      <span
        aria-hidden="true"
        class="material-symbols-outlined expand-icon"
        [class.expand-icon__expanded]="trigger2.expanded()"
        translate="no"
        >keyboard_arrow_up</span
      >
    </span>
  </h3>
  <div ngAccordionPanel #panel2="ngAccordionPanel">
    <ng-template ngAccordionContent>
      <p>
        Use the <code>aria-controls</code> attribute on the button, and set its value to match the
        id of the related content panel. This establishes a programmatic relationship, allowing
        assistive technologies to jump directly to the relevant content.
      </p>
    </ng-template>
  </div>

  <h3>
    <span ngAccordionTrigger [panel]="panel3" #trigger3="ngAccordionTrigger" [expanded]="true">
      What role should the heading element containing the accordion button have?
      <span
        aria-hidden="true"
        class="material-symbols-outlined expand-icon"
        [class.expand-icon__expanded]="trigger3.expanded()"
        translate="no"
        >keyboard_arrow_up</span
      >
    </span>
  </h3>
  <div ngAccordionPanel #panel3="ngAccordionPanel">
    <ng-template ngAccordionContent>
      <p>
        The element containing the button should typically have <code>role="heading"</code> with an
        appropriate <code>aria-level</code> to define the structure. This ensures the accordion
        section is recognized as a section header, making the page structure navigable for users.
      </p>
    </ng-template>
  </div>
</div>
```
      File: `CSS`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-family: var(--inter-font);
}

[ngAccordionGroup] {
  width: 500px;
}

h3 {
  font-size: 1rem;
  margin: 0;
  color: var(--secondary-contrast);
  box-sizing: border-box;
  border-block-start: 1px solid var(--quinary-contrast);
  border-inline: 1px solid var(--quinary-contrast);
}

h3:focus-within,
h3:hover {
  background-color: var(--septenary-contrast);
}

h3:first-of-type {
  border-radius: 1rem 1rem 0 0;
}

h3:last-of-type {
  border-block-end: 1px solid var(--quinary-contrast);
  border-radius: 0 0 1rem 1rem;
}

h3:last-of-type:has([aria-expanded='true']) {
  border-block-end: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

p {
  margin: 0;
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: var(--tertiary-contrast);
  font-size: 0.875rem;
  border-inline: 1px solid var(--quinary-contrast);
  border-radius: 0 0 1rem 1rem;
  border-block-end: 1px solid var(--quinary-contrast);
  margin-block-end: 1rem;
}

[ngAccordionTrigger] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  cursor: pointer;
  padding: 1.5rem;
}

[ngAccordionTrigger][aria-disabled='true'] {
  opacity: 0.5;
  cursor: default;
}

.expand-icon {
  font-size: 1.5rem;
  color: var(--quaternary-contrast);
  transition: transform .3s ease-out;
}

.expand-icon__expanded {
  transform: rotate(180deg);
}
```

  **Retro**

      File: `TS`

```ts
import {Component} from '@angular/core';
import {
  AccordionGroup,
  AccordionTrigger,
  AccordionPanel,
  AccordionContent,
} from '@angular/aria/accordion';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent],
})
export class App {}
```
      File: `HTML`

```html
<div ngAccordionGroup class="retro-accordion">
  <h3>
    <span ngAccordionTrigger [panel]="panel1" #trigger1="ngAccordionTrigger">
      Unlock Treasure Box
      <span aria-hidden="true" class="material-symbols-outlined" translate="no">{{
        trigger1.expanded() ? 'lock_open_right' : 'lock'
      }}</span>
    </span>
  </h3>
  <div ngAccordionPanel #panel1="ngAccordionPanel">
    <ng-template ngAccordionContent>
      <div class="treasure-box">👻</div>
    </ng-template>
  </div>

  <h3>
    <span ngAccordionTrigger [panel]="panel2" #trigger2="ngAccordionTrigger">
      Unlock Treasure Box
      <span aria-hidden="true" class="material-symbols-outlined" translate="no">{{
        trigger2.expanded() ? 'lock_open_right' : 'lock'
      }}</span>
    </span>
  </h3>
  <div ngAccordionPanel #panel2="ngAccordionPanel">
    <ng-template ngAccordionContent>
      <div class="treasure-box">💎💎💎</div>
    </ng-template>
  </div>

  <h3>
    <span ngAccordionTrigger [panel]="panel3" #trigger3="ngAccordionTrigger">
      Unlock Treasure Box
      <span aria-hidden="true" class="material-symbols-outlined" translate="no">{{
        trigger3.expanded() ? 'lock_open_right' : 'lock'
      }}</span>
    </span>
  </h3>
  <div ngAccordionPanel #panel3="ngAccordionPanel">
    <ng-template ngAccordionContent>
      <div class="treasure-box">🐸 ribbit...ribbit...</div>
    </ng-template>
  </div>
</div>
```
      File: `CSS`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

:host {
  display: flex;
  justify-content: center;
  font-family: 'Press Start 2P';

  --retro-button-color: color-mix(in srgb, var(--symbolic-yellow) 90%, var(--page-background));
  --retro-button-text-color: color-mix(in srgb, var(--symbolic-yellow) 10%, white);
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

[ngAccordionGroup] {
  width: 500px;
}

h3 {
  font-size: 1rem;
  margin: 0;
  color: var(--retro-button-text-color);
  background-color: var(--retro-button-color);
  box-shadow: var(--retro-clickable-shadow);
  transition:
    transform 0.1s,
    box-shadow 0.1s;
}

h3:focus-within,
h3:hover {
  box-shadow: var(--retro-pressed-shadow);
  transform: translate(1px, 1px);
  outline-offset: 6px;
  outline: 4px dashed color-mix(in srgb, var(--hot-pink) 60%, transparent);
}

h3:has([aria-disabled='true']) {
  opacity: 0.5;
  cursor: default;
}

.treasure-box {
  margin: 0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-color: var(--septenary-contrast);
  box-shadow: var(--retro-flat-shadow);
}

[ngAccordionTrigger] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  cursor: pointer;
  padding: 1.5rem;
}

[ngAccordionPanel] {
  padding: 1rem;
}
```

This mode is useful for form sections or when users need to compare content across multiple panels.

NOTE: The `multiExpandable` input defaults to `true`. Set it to `false` explicitly if you want single expansion behavior.
