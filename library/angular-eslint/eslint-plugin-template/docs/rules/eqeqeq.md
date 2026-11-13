---
title: "@angular-eslint/template/eqeqeq"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/eqeqeq.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/eqeqeq`

Requires `===` and `!==` in place of `==` and `!=`

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

The == and != operators perform type coercion before comparison, which can lead to unexpected and confusing results. For example, "0" == 0 is true, [] == false is true, and null == undefined is true. These implicit conversions make code harder to understand and can hide bugs. The strict equality operators === and !== compare both value and type without coercion, making comparisons predictable and explicit. This is a widely accepted JavaScript/TypeScript best practice that Angular templates should follow for consistency with TypeScript code. The rule can optionally allow == and != when comparing to null or undefined, as this is a common pattern for checking if a value exists.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `false`
   */
  allowNullOrUndefined?: boolean;
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ 'null' == test }}
   ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ 'null' ==  test }}
   ~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error",
      {
        "allowNullOrUndefined": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [attr.disabled]="test != 'undefined' && null == '3'"></div>
                      ~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error",
      {
        "allowNullOrUndefined": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [attr.disabled]="test !=  'undefined' && null == '3'"></div>
                      ~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [prop]="condition1 === 'value1' ? true : (condition2 != 'value2' ? true : false)"></div>
                                               ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="test == true || test1 !== undefined"></div>
            ~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ one != '02' ? c > d : 'hey!' }}
   ~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ a === b && 1 == b ? c > d : 'hey!' }}
              ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ c > d ? a != b : 'hey!' }}
           ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ c > d ? a   !=     b : 'hey!' }}
           ~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ c > d ? 'hey!' : a == false }}
                    ~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error",
      {
        "allowNullOrUndefined": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ undefined == test1 && a === b ? (c > d ? d != '0' : v === 4) : 'hey!' }}
                                            ~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ undefined != test1 }}
   ~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ a === 1 }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [class.testing]="b === false">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngIf="c === test">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error",
      {
        "allowNullOrUndefined": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *appShow="(d == null && e === null && (f | lowercase) == undefined) || g === undefined">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error",
      {
        "allowNullOrUndefined": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@let value = someSignal();
@if (value != null) {
  <span>{{ value }}</span>
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error",
      {
        "allowNullOrUndefined": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ value == undefined }}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/eqeqeq": [
      "error",
      {
        "allowNullOrUndefined": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-container *ngIf="title != null">title is not null</ng-container>
```
