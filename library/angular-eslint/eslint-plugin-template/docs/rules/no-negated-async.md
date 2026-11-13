---
title: "@angular-eslint/template/no-negated-async"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-negated-async.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-negated-async`

Ensures that async pipe results, as well as values used with the async pipe, are not negated

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Angular's async pipes emit null initially, prior to the observable emitting any values, or the promise resolving. This can cause negations, like *ngIf="!(myConditional | async)" to thrash the layout and cause expensive side-effects like firing off XHR requests for a component which should not be shown.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{      !(foo | async) }}
        ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ !(foo | somethingElse | async) }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="!(a | async)"></div>
            ~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ nullable ?? !(obsVar | async) }}
               ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button [disabled]="!buttonDisabled$ | async">Click me!</button>
                    ~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ (foo | async) }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ !(foo | async | somethingElse) }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ (foo | async) == null }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ (foo | async) === false }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ !(foo | notAnAsyncPipe) }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-negated-async": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [class.mx-4]="!!(foo | async)"></div>
```
