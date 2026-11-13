---
title: "@angular-eslint/template/banana-in-box"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/banana-in-box.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/banana-in-box`

Ensures that the two-way data binding syntax is correct

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

The Angular two-way binding syntax is [(ngModel)]="value", where the parentheses are INSIDE the brackets, resembling a banana in a box. A common typo is ([ngModel])="value" with the parentheses outside, which creates a one-way binding FROM the template TO the component (the opposite of what's intended). This will make the input update when the value changes but won't update the value when the user types. This syntax error is easy to make and can be hard to spot visually, but it breaks two-way data binding. The correct syntax is: [()] for two-way binding, [] for property binding (component to template), and () for event binding (template to component).

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/banana-in-box": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input type="text" name="foo" ([ngModel])="foo">
                              ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/banana-in-box": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<app-item ([bar])="bar" ([item])="item" [(test)]="test"></app-item>
          ~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~
<div [baz]="oneWay" (emitter)="emitter" ([twoWay])="twoWay"></div>
                                        ~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/banana-in-box": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text" name="foo" [ngModel]="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/banana-in-box": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text" name="foo" [(ngModel)]="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/banana-in-box": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button type="button" (click)="navigate(['/resources'])">
  Navigate
</button>
```
