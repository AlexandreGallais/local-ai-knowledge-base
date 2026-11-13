---
name: write-component
description: Use when you write or change an Angular component or directive, an own UI control included (list, menu, tabs, dialog, switch) - never with Material, CDK or Angular Aria.
---

# Write an Angular component

## Rules

- Never import Angular Material, the CDK or Angular Aria. The team writes its own components.
- A native element first (`button`, `select`, `dialog`, `details`, `progress`); a directive enriches it.
- A role written in ARIA promises its whole keyboard: write all its keys.
- Angular 22: no `standalone: true`, no `changeDetection: OnPush` (both are the default); `host` instead
  of `@HostBinding` and `@HostListener`; `input()`, `output()`, `model()`, signals for the state.

## Steps

1. Read the version of `@angular/core` in `package.json`.
2. Generate the files, then adapt them by hand:
   `npx --no -- ng generate component <path/name> --style=scss`.
   No Angular CLI in the project: copy `/opt/local-ai-base/templates/angular/component/` instead.
3. An own control: read `docs/components/component-rules.md`, then its line in `patterns.md`, and
   `keyboard-focus.md`. An overlay: `overlays.md`.
4. Write the template: the role and every state (`aria-expanded`, `aria-selected`, `aria-checked`,
   `aria-disabled`), an accessible name, one tab stop.
5. Put a pure computation (an index, a range) in a function of its own file, tested alone, as
   `move-active-index.ts` in the template.
6. Write the test: find elements by role, drive by the keyboard, check the ARIA attributes. Follow
   `select-box.spec.ts` of the template.
7. Run the check commands of `.agents/profile.json`. A lint rule you do not know: call the rule tool
   of the practices server with its id.

## Example

Wrong:

```html
<div class="option" (click)="choose(option)">{{ option.label }}</div>
```

Right:

```html
<ul role="listbox" tabindex="-1" (click)="chooseFromPointer($event)" (keydown)="onKeydown($event)">
  <li role="option" [attr.aria-selected]="option.value === value()" [attr.data-index]="$index">{{ option.label }}</li>
</ul>
```

## Pitfalls

- jsdom has no `showModal()` nor `showPopover()`: such a component is tested in a real browser.
- A click on an option is lost if the list closes first: `(mousedown)="$event.preventDefault()"`.
- Never write "accessible" because a tool passes: try the keyboard.

## Final check

- Is there no import of Material, CDK or Angular Aria?
- Do Tab, the arrows, Enter, Escape, Home and End do what the pattern says?
- Did format, lint, build and tests end at 0 errors?
