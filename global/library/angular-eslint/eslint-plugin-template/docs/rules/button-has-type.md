---
title: "@angular-eslint/template/button-has-type"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/button-has-type.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/button-has-type`

Ensures that a button has a valid type specified

- Type: suggestion

## Rationale

Buttons default to `type="submit"` when no type is specified. If placed inside a form, the button triggers a form submission on click. Enforcing the type attribute clarifies the code's intent and prevents unintended form submissions.

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
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button></button>
~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button (click)="onClick()"></button>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button type="whatever"></button>
        ~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button [attr.type]="'whatever'"></button>
        ~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error",
      {
        "ignoreWithDirectives": [
          "myButton",
          "uiButton"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button myDirective></button>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
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
<button myButton></button>
~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error",
      {
        "ignoreWithDirectives": [
          "tui"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button tuiButton></button>
~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error",
      {
        "ignoreWithDirectives": [
          "myButton"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button myButton type="whatever"></button>
                 ~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [attr.type]="'button'"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [attr.type]="'submit'"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [attr.type]="'reset'"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button type="button"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button type="submit"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button type="reset"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button class="primary" type="submit"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button (click)="onClick()" type="button"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [class.primary]="true" [attr.type]="'submit'"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [disabled]="true" [attr.type]="'button'"></button>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error",
      {
        "ignoreWithDirectives": [
          "myButton"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<button myButton></button>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
      "error",
      {
        "ignoreWithDirectives": [
          "myButton"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [myButton]></button>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/button-has-type": [
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
<button tuiButton></button>
<button [tuiOption]="option"></button>
```
