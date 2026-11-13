---
title: "@angular-eslint/template/click-events-have-key-events"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/click-events-have-key-events.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/click-events-have-key-events`

[Accessibility] Ensures that the click event is accompanied with at least one key event keyup, keydown or keypress.

- Type: suggestion

## Rationale

Elements with click handlers must also be operable via keyboard for users who cannot use a mouse. This includes users with motor disabilities, users of assistive technologies, and keyboard-only users. While native interactive elements like buttons and links are keyboard-accessible by default (activated by Enter or Space keys), non-interactive elements with click handlers (like divs or spans) are not. For such elements, you must add keyboard event handlers (keyup, keydown, or keypress) that perform the same action as the click handler. Alternatively, use a semantic button element which handles this automatically. This is a WCAG Level A requirement for keyboard accessibility.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Directive names that, when present on the element, cause it to be ignored. Entries wrapped in slashes, e.g. `/^tui/`, are treated as regular expressions.
   *
   * Default: `[]`
   */
  ignoreWithDirectives?: string[];
  /**
   * Require key events to specify a key via a pseudo-event, e.g. `(keydown.enter)`. A bare `(keydown)` will not satisfy the rule.
   *
   * Default: `false`
   */
  requireKeyCode?: boolean;
  /**
   * Only key events whose key (the last segment of the pseudo-event, e.g. `enter` in `(keydown.shift.enter)`) is in this list satisfy the rule. Implies `requireKeyCode`.
   *
   * Default: `[]`
   */
  allowedKeyCodes?: string[];
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" (handleSomething)="handleSomething()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<header (click)="onClick()"></header>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<a (click)="onClick()"></a>
~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" aria-hidden="false"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" [attr.aria-hidden]="'false'"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" role="header"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" role="aside"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" [attr.role]="'header'"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" [attr.aria-hidden]="ariaHidden"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" [attr.hidden]="hidden"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "ignoreWithDirectives": [
          "testDirective",
          "otherDirective"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div myDirective (click)="onClick()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "ignoreWithDirectives": [
          "/^tui/"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div myDirective (click)="onClick()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "requireKeyCode": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" (keydown)="onKeydown()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "requireKeyCode": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "allowedKeyCodes": [
          "Enter",
          "ArrowLeft",
          "ArrowRight"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" (keydown.space)="onKeydown()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "allowedKeyCodes": [
          "Enter"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" (keydown)="onKeydown()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (click)="onClick()" (keyup)="onKeyup()"></div>
<div (keyup)="onKeyup()" (click)="onClick()"></div>
<div (click)="onClick()" (keyup)="onKeyup()" (handleSomething)="handleSomething()"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (click)="onClick()" (keyup.enter)="onKeyup()"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<cui-button (click)="onClick()"></cui-button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (click)="onClick()" aria-hidden></div>
<div (click)="onClick()" aria-hidden="true"></div>
<div (click)="onClick()" [attr.aria-hidden]="true"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (click)="onClick()" role="presentation"></div>
<div (click)="onClick()" [attr.role]="'none'"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input (click)="onClick()">
<button (click)="onClick()"></button>
<textarea (click)="onClick()"></textarea>
<select (click)="onClick()">
  <option (click)="onClick()"></option>
</select>
<textarea (click)="onClick()"></textarea>
<a href="#" (click)="onClick()"></a>
<a [attr.href]="href" class="anchor" (click)="onClick()"></a>
<a [routerLink]="'route'" (click)="onClick()"></a>
<div role="button" (click)="doSomething()"></div>
<span role="button" (click)="doSomething()"></span>
<p role="button" (click)="doSomething()"></p>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "ignoreWithDirectives": [
          "myDirective"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div myDirective (click)="onClick()"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "ignoreWithDirectives": [
          "myDirective"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [myDirective] (click)="onClick()"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "ignoreWithDirectives": [
          "/^tui/"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div tuiOption (click)="onClick()"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "requireKeyCode": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (click)="onClick()" (keydown.enter)="onKeydown()"></div>
<div (click)="onClick()" (keyup.shift.space)="onKeyup()"></div>
<div (click)="onClick()" (keydown)="onKeydown()" (keydown.enter)="onKeydown()"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/click-events-have-key-events": [
      "error",
      {
        "allowedKeyCodes": [
          "Enter",
          "ArrowLeft"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (click)="onClick()" (keydown.enter)="onKeydown()"></div>
<div (click)="onClick()" (keyup.Enter)="onKeyup()"></div>
<div (click)="onClick()" (keydown.shift.arrowleft)="onKeydown()"></div>
<div (click)="onClick()" (keydown.space)="onKeydown()" (keydown.enter)="onKeydown()"></div>
```
