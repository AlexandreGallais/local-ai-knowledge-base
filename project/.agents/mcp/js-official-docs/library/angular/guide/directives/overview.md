---
title: "Directives"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/directives/overview.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Directives
Directives add behavior to elements and components in your Angular applications.

A directive can change how an element looks, how it behaves, or how it fits into the DOM. Angular ships with several built-in directives, and you can write your own.

## When to use a directive

Directives are most effective when they encapsulate **reusable** behavior that you want to apply to an existing element or component.

Common examples include:

- Applying the same appearance or behavior across many elements, such as autofocus or a tooltip.
- Reading from or writing to the host element's DOM, attributes, or classes.
- Adding behavior to a component you don't own without changing its source.

If you need to render your own markup or manage a piece of UI with its own template, reach for a component, a specialized directive with its own template.

## A quick example

Suppose you want elements to highlight when the user hovers over them with a mouse, changing their background color to yellow. Rather than repeat the same event-handling logic on every element, you can package that behavior in a directive and apply it wherever you need it.

The following `appHighlight` directive sets the host element's background color when the mouse enters and clears it when the mouse leaves:

```ts
import {Directive, signal} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'isHovered.set(true)',
    '(mouseleave)': 'isHovered.set(false)',
    '[style.background-color]': 'isHovered() ? "yellow" : null',
  },
})
export class HighlightDirective {
  protected isHovered = signal(false);
}
```

The `host` metadata listens for mouse events to update the `isHovered` signal, and binds the host element's `background-color` style to the signal's value.

Apply the directive by adding its selector as an attribute on an element:

```angular-html
<p appHighlight>Highlight me!</p>
```

Every element that carries the `appHighlight` attribute gains the same hover behavior, with the logic defined in one place.

## Types of directives

Angular has three primary types of directives:

| Directive type                                                  | Details                                                                           |
| :-------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Components                                  | Define reusable UI with their own template.                                       |
| Attribute directives   | Change the appearance or behavior of an element, component, or another directive. |
| Structural directives | Change the DOM layout by adding and removing DOM elements.                        |

## What's next

Learn more about each type of directive in the following guides.

  - Attribute directives
  - Structural directives
  - Directive composition API
