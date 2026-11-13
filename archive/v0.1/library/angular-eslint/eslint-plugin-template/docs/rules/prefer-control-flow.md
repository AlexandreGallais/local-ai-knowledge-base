---
title: "@angular-eslint/template/prefer-control-flow"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-control-flow.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-control-flow`

Ensures that the built-in control flow is used.

- Type: suggestion

## Rationale

Angular v17 introduced built-in control flow (@if, @for, @switch) as a replacement for the structural directives (*ngIf, *ngFor, *ngSwitch). The new syntax is more readable, performant, and type-safe. Built-in control flow has better syntax highlighting in editors, clearer nesting behavior, built-in features like @empty for loops and @else for conditionals, and improved tree-shaking. The new syntax also enables better compile-time optimizations and runtime performance. While the old structural directives remain supported for backward compatibility, new code should use the modern built-in control flow. Teams migrating to v17+ are encouraged to adopt this syntax for consistency and to benefit from ongoing performance improvements.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="condition"></div>
      ~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="condition; else elseBlock"></div>
      ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="condition; then thenBlock else elseBlock"></div>
      ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="condition as value; else elseBlock"></div>
      ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngIf]="condition"></div>
     ~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<li *ngFor="let item of items">
                     ~~~~~~~~
  {{ item }}
</li>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<li *ngFor="let item of items; index as i; trackBy: trackByFn">
                     ~~~~~~~~~~
  {{ item }}
</li>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
                            ~~~~~~~~~~~~~~~~~
  <li>{{ item }}</li>
</ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
                            ~~~~~~~~~~~~~~~~~
  <li>{{ item }}</li>
</ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<container-element [ngSwitch]="switch_expression">
                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   <some-element *ngSwitchCase="match_expression_1">1</some-element>
   <some-element *ngSwitchCase="match_expression_2">2</some-element>
   <some-element *ngSwitchDefault>default</some-element>
</container-element>
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (condition) {
     Condition is truthy
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (condition) {
    Condition is truthy
  } @else if (anotherCondition) {
    Another condition is truthy
  } @else {
    No condition is truthy
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) {
    {{ item.name }}
  } @empty {
    There are no items.
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (condition) {
    @case (caseA) {
      Case A.
    }
    @case (caseB) {
      Case B.
    }
    @default {
      Default case.
    }
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<form [ngFormOptions]="{ updateOn: 'blur' }"></form>
```
