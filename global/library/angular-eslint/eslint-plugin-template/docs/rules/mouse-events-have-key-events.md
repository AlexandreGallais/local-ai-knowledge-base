---
title: "@angular-eslint/template/mouse-events-have-key-events"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/mouse-events-have-key-events.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/mouse-events-have-key-events`

[Accessibility] Ensures that the mouse events `mouseout` and `mouseover` are accompanied by `focus` and `blur` events respectively. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users. See more at https://www.w3.org/WAI/WCAG21/Understanding/keyboard

- Type: suggestion

## Rationale

Elements that show or hide content on mouse hover (using mouseover and mouseout events) must also be accessible to keyboard users. When mouseover is used, there must be an equivalent focus event; when mouseout is used, there must be an equivalent blur event. This ensures that tooltips, dropdown menus, and other hover-triggered content can be accessed by users who navigate with keyboards instead of mice. For example, a tooltip that appears on mouseover should also appear when the element receives keyboard focus. This is essential for users with motor disabilities who cannot use a mouse, as well as screen reader users. This is a WCAG Level A requirement for keyboard accessibility.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/mouse-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (mouseover)="onMouseOver()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/mouse-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (mouseout)="onMouseOut()" (focus)="onFocus()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/mouse-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-test (mouseover)="onMouseOver()"></app-test>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/mouse-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-test (mouseout)="onMouseOut()"></app-test>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/mouse-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (mouseover)="onMouseOver()" (focus)="onFocus()"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/mouse-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (mouseout)="onMouseOut()" (blur)="onBlur()"></div>
```
