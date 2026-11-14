---
title: "@angular-eslint/template/no-duplicate-attributes"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-duplicate-attributes.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-duplicate-attributes`

Ensures that there are no duplicate input properties or output event listeners

- Type: problem

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Duplicate input properties or output event listeners on the same element create ambiguous behavior and are almost always a mistake. When the same input or output appears multiple times, Angular uses the last occurrence, silently ignoring earlier ones. This can lead to confusing bugs where it appears that a binding is set but it has no effect. Duplicate attributes can occur during refactoring or when combining multiple sources of bindings. The rule can be configured to allow certain patterns like two-way data binding (which creates both an input and output with related names) and Angular style precedence (where multiple style bindings are intentionally combined). Catching duplicates early prevents hard-to-debug issues where bindings mysteriously do not work.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Whether or not two-way data binding is allowed as an exception to the rule.
   *
   * Default: `true`
   */
  allowTwoWayDataBinding?: boolean;
  /**
   * Whether or not Angular style precedence is allowed as an exception to the rule. See https://angular.dev/guide/templates/class-binding#styling-precedence
   *
   * Default: `false`
   */
  allowStylePrecedenceDuplicates?: boolean;
  /**
   * Input or output properties for which duplicate presence is allowed as an exception to the rule.
   *
   * Default: `[]`
   */
  ignore?: string[];
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [name]="foo" [name]="bar">
       ~~~~~~~~~~~~ ~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [name]="foo" name="bar">
       ~~~~~~~~~~~~ ~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input name="foo" name="bar">
       ~~~~~~~~~~ ~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input (change)="foo($event)" (change)="bar($event)">
       ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [(ngModel)]="model" [(ngModel)]="otherModel">
       ~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [name]="foo" [other]="bam" [name]="bar">
       ~~~~~~~~~~~~               ~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [name]="foo" [name]="bar" [name]="bam">
       ~~~~~~~~~~~~ ~~~~~~~~~~~~ ~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [(ngModel)]="model" [name]="foo" [(ngModel)]="otherModel" name="bar">
       ~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input (@fade.start)="animationStarted($event)" (@fade.start)="animationStarted($event)">
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input (window:resize)="windowResized($event)" (resize)="resize()" (window:resize)="windowResized2($event)">
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error",
      {
        "allowTwoWayDataBinding": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [(ngModel)]="model" (ngModelChange)="modelChanged()">
       ~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error",
      {
        "ignore": [
          "class"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [name]="foo" class="css-static" name="bar" [class]="dynamic">
       ~~~~~~~~~~~~                    ~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error",
      {
        "allowStylePrecedenceDuplicates": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input class="foo" class="bar" [class]="dynamic">
       ~~~~~~~~~~~ ~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error",
      {
        "allowStylePrecedenceDuplicates": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input style="color: blue" [style]="styleExpression" style="width:50px">
       ~~~~~~~~~~~~~~~~~~~                           ~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input name="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [name]="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input (change)="bar()">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [(ngModel)]="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [(ngModel)]="model" (ngModelChange)="modelChanged()">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (@fade.start)="animationStarted($event)" (@fade.done)="animationDone($event)"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (window:keydown)="windowKeydown($event)" (document:keydown)="documentKeydown($event)" (document:keyup)="documentKeyup($event)" (keyup)="keyup($event)" (keydown)="keydown($event)"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.width.px]="col.width" [width]="col.width"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [class.disabled]="!enabled" [disabled]="!enabled"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [@.disabled]="!enabled" [.disabled]="!enabled"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.width]="col.width + 'px'" [width]="col.width"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error",
      {
        "allowStylePrecedenceDuplicates": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div class="foo" name="bar" [class]="dynamic"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-duplicate-attributes": [
      "error",
      {
        "allowStylePrecedenceDuplicates": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div style="color: blue" [style]="styleExpression"></div>
```
