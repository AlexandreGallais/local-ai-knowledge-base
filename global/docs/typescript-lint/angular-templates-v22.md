---
id: angular-templates-v22
title: Angular 22 templates
topic: typescript-lint
summary: Rules for control flow, class bindings, buttons, keyboard access and empty lists in templates. Angular 22.
tool: angular-eslint
version: "22.6"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, examples written for this base
---

# Angular 22 templates

Contents: 1. Control flow · 2. Class bindings · 3. Button type · 4. Click and keyboard · 5. Empty lists · Sources

## 1. Use @if and @for, never *ngIf and *ngFor (angular-eslint template prefer-control-flow)

Write `@if`, `@for` and `@switch` blocks. `*ngIf`, `*ngFor` and `*ngSwitch` are old. Each `@for` needs a `track` expression. [S1] [S2]

Wrong:

```html
<ul>
  <li *ngFor="let valve of valves">{{ valve.label }}</li>
</ul>
```

Right:

```html
<ul>
  @for (valve of valves(); track valve.id) {
    <li>{{ valve.label }}</li>
  }
</ul>
```

## 2. Bind one class at a time (angular-eslint template prefer-class-binding)

Write `[class.fault]="isFault()"`, never `[ngClass]`. Write `[style.width.px]`, never `[ngStyle]`. [S1]

Wrong:

```html
<li [ngClass]="{ fault: isFault() }">Valve</li>
```

Right:

```html
<li [class.fault]="isFault()">Valve</li>
```

## 3. Give every button its type (angular-eslint template button-has-type)

Write `type="button"` on each button that is not the submit button of a form. [S1]

Why: a button without type submits the form around it.

Wrong:

```html
<button (click)="stop()">Stop</button>
```

Right:

```html
<button type="button" (click)="stop()">Stop</button>
```

## 4. Put a click on a button, never on a plain element (angular-eslint template click-events-have-key-events)

Put `(click)` on a `<button>` or a link. A click on a `<li>` or a `<div>` cannot be reached with the keyboard. [S1]

Wrong:

```html
<li (click)="select()">Valve V-101</li>
```

Right:

```html
<li>
  <button type="button" (click)="select()">Valve V-101</button>
</li>
```

## 5. Show an empty list with @empty (angular-eslint template prefer-at-empty)

For the text of an empty list, write an `@empty` block inside `@for`, not a second `@if`. [S1]

Wrong:

```html
@for (valve of valves(); track valve.id) {
  <p>{{ valve.label }}</p>
}
@if (valves().length === 0) {
  <p>No valve</p>
}
```

Right:

```html
@for (valve of valves(); track valve.id) {
  <p>{{ valve.label }}</p>
} @empty {
  <p>No valve</p>
}
```

## Sources

- [S1] angular-eslint, rules of @angular-eslint/eslint-plugin-template, version 22.6, <https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin-template/docs/rules>, read 2026-11-13, MIT, summarized.
- [S2] Google, "Control flow", Angular 22, <https://angular.dev/guide/templates/control-flow>, read 2026-11-13, CC BY 4.0, summarized.
