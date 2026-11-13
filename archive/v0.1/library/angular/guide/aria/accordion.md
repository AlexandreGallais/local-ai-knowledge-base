---
title: "Accordion (part 1 of 5)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/accordion.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Accordion

  - Accordion ARIA pattern
  - Accordion API Reference

## Overview

An accordion organizes related content into expandable and collapsible sections, reducing page scrolling and helping users focus on relevant information. Each section has a trigger button and a content panel. Clicking a trigger toggles the visibility of its associated panel.

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
<div ngAccordionGroup class="basic-accordion" [multiExpandable]="false">
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
    <span ngAccordionTrigger [panel]="panel3" #trigger3="ngAccordionTrigger">
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

## Usage

Accordions work well for organizing content into logical groups where users typically need to view one section at a time.

**Use accordions when:**

- Displaying FAQs with multiple questions and answers
- Organizing long forms into manageable sections
- Reducing scrolling on content-heavy pages
- Progressively disclosing related information

**Avoid accordions when:**

- Building navigation menus (use the Menu component instead)
- Creating tabbed interfaces (use the Tabs component instead)
- Showing a single collapsible section (use a disclosure pattern instead)
- Users need to see multiple sections simultaneously (consider a different layout)

## Features

- **Expansion modes** - Control whether one or multiple panels can be open at the same time
- **Keyboard navigation** - Navigate between triggers using arrow keys, Home, and End
- **Lazy rendering** - Content is only created when a panel expands, improving initial load performance
- **Disabled states** - Disable the entire group or individual triggers
- **Focus management** - Control whether disabled items can receive keyboard focus
- **Programmatic control** - Expand, collapse, or toggle panels from your component code
- **RTL support** - Automatic support for right-to-left languages
