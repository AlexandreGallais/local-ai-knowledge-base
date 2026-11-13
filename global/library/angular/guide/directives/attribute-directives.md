---
title: "Attribute directives"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/directives/attribute-directives.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Attribute directives

Attribute directives change the appearance or behavior of DOM elements and Angular components.

## Use template bindings for one-off behavior

Angular's template syntax already covers changing a single element's classes, styles, properties, and events:

- Class and style bindings add and remove CSS classes and inline styles.
- Property and attribute bindings set DOM properties and HTML attributes.
- Event listeners respond to user interaction.

Attribute directives are useful when you want to package this kind of behavior into a reusable unit that you can apply to any element or component.

## Building an attribute directive

A custom attribute directive is a JavaScript class with the `@Directive()` decorator. The decorator's `selector` defines the attribute that applies the directive. The square brackets make this an attribute selector, so the directive matches elements that carry the attribute. By convention, use a prefix such as `app` to avoid naming collisions:

```ts
import {Directive} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {}
```

HELPFUL: The CLI command `ng generate directive` scaffolds a directive along with its test file.

A directive can change its host declaratively through host bindings or imperatively through a reference to the host element. This example injects `ElementRef` and accesses the element through its `nativeElement` property to set the background to yellow:

File: `highlight.directive.ts`

```ts
import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private el = inject(ElementRef);

  constructor() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

IMPORTANT: Directives _do not_ support namespaces.

```angular-html
<p app:Highlight>This is invalid</p>
```

## Applying an attribute directive

To apply the directive, add its selector as an attribute on an element:

File: `app.component.html`

```html
<p appHighlight>Highlight me!</p>
```

Angular creates an instance of `HighlightDirective` for that `` element, injects a reference to the element, and sets its background to yellow.

## Handling user events

To respond to user interaction, bind host element events to handler methods through the `host` property of the `@Directive()` decorator. The following directive highlights the host element while the pointer is over it and clears the highlight when the pointer leaves:

File: `highlight.directive.ts`

```ts
// #docplaster
import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class HighlightDirective {
  private el = inject(ElementRef);

  onMouseEnter() {
    this.highlight('yellow');
  }

  onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

The `host` property maps the `mouseenter` and `mouseleave` events to the `onMouseEnter()` and `onMouseLeave()` methods, which delegate to a `highlight()` helper that sets the background color on the host element. For more on host event bindings, see binding to the host element.

## Accepting input values

Like components, directives accept inputs through the `input()` function. Give an input the same name as the selector so that a single binding both applies the directive and passes a value to it:

File: `highlight.directive.ts`

```ts
appHighlight = input('');
```

Read the input by calling it as a signal, and fall back to a default when no color is set:

File: `highlight.directive.ts`

```ts
onMouseEnter() {
  this.highlight(this.appHighlight() || 'red');
}
```

In the template, bind the value to the selector. Because the input shares the selector's name, `[appHighlight]` both applies the directive and sets its value. Here the bound `color` is a property on the component:

File: `app.component.html`

```html
<p [appHighlight]="color">Highlight me!</p>
```

File: `app.component.ts`

```ts
export class AppComponent {
  color = '';
}
```

A directive can declare more than one input. The following directive adds a `defaultColor` input, then falls back through `appHighlight`, `defaultColor`, and finally `red`:

File: `highlight.directive.ts`

```ts
import {Directive, ElementRef, inject, input} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class HighlightDirective {
  private el = inject(ElementRef);

  defaultColor = input('');

  appHighlight = input('');

  onMouseEnter() {
    this.highlight(this.appHighlight() || this.defaultColor() || 'red');
  }

  onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

Bind both inputs on the same element. Because `defaultColor` takes a static string rather than a dynamic expression, it doesn't need square brackets:

File: `app.component.html`

```html
<p [appHighlight]="color" defaultColor="violet">Highlight me too!</p>
```

## Deactivating Angular processing with `NgNonBindable`

To prevent expression evaluation in the browser, add `ngNonBindable` to the host element.
`ngNonBindable` deactivates interpolation, directives, and binding in templates.

In the following example, the expression `{{ 1 + 1 }}` renders just as it does in your code editor, and does not display `2`.

File: `app.component.html`

```html
<p>Use ngNonBindable to stop evaluation.</p>
<p ngNonBindable>This should not evaluate: {{ 1 + 1 }}</p>
```

Applying `ngNonBindable` to an element stops binding for that element's child elements.
However, `ngNonBindable` still lets directives work on the element where you apply `ngNonBindable`.
In the following example, the `appHighlight` directive is still active but Angular does not evaluate the expression `{{ 1 + 1 }}`.

File: `app.component.html`

```html
<h3>ngNonBindable with a directive</h3>
<div ngNonBindable [appHighlight]="'yellow'">
  This should not evaluate: {{ 1 + 1 }}, but will highlight yellow.
</div>
```

If you apply `ngNonBindable` to a parent element, Angular disables interpolation and binding of any sort, such as property binding or event binding, for the element's children.

## What's next

  - Structural directives
  - Directive composition API
