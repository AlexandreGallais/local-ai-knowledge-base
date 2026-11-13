---
title: "@angular-eslint/template/no-outerhtml"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-outerhtml.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-outerhtml`

Disallows using `outerHTML` on elements, which breaks change detection and detaches the element from the Angular view

- Type: problem

## Rationale

Setting an element's `outerHTML` replaces the element itself in the DOM, including the very node Angular is bound to. Angular keeps an internal reference to that node in order to apply future updates during change detection. Once the node has been swapped out, it no longer has a parent in the document, so the next attempt to write to `outerHTML` fails with `NoModificationAllowedError: Failed to set the 'outerHTML' property on 'Element': This element has no parent node`. The initial render appears to work, which makes the problem easy to miss until the bound value changes at runtime or in a test that calls `detectChanges()`.

Because this is inherent to how `outerHTML` works — not a fixable framework bug (see angular/angular#41131 and angular/angular#41576, both closed) — there is effectively no correct way to use `outerHTML` in an Angular template. A static `outerHTML="..."` attribute is not a real DOM attribute either and simply has no effect, so this rule disallows every form of `outerHTML` on native elements (`[outerHTML]`, `bind-outerHTML`, `[attr.outerHTML]` and the static attribute). Bindings to `outerHTML` on components are left alone, since there they are ordinary inputs rather than the DOM property.

In almost all cases the intent is to render dynamic markup inside the element, which is exactly what `[innerHTML]` does safely (it only replaces the element's content and preserves the host node). Note that `[innerHTML]` runs Angular's built-in sanitization; when rendering untrusted content, sanitization concerns still apply. If the goal was actually to replace the element (tag, attributes and all), the component should be restructured — for example by conditionally rendering different elements with `@if`/`@switch` — rather than reaching for `outerHTML`.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-outerhtml": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [outerHTML]="html"></div>
      ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-outerhtml": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<p bind-outerHTML="html">lib works!</p>
        ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-outerhtml": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div outerHTML="static"></div>
     ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-outerhtml": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (condition) {
  <span [outerHTML]="html"></span>
         ~~~~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-outerhtml": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [innerHTML]="html"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-outerhtml": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [outerHTML]="html"></my-component>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-outerhtml": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img [src]="url" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-outerhtml": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [class.active]="isActive"></div>
```
