---
title: "@angular-eslint/template/no-call-expression"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-call-expression.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-call-expression`

Disallows calling expressions in templates, except for output handlers

- Type: suggestion

## Rationale

Calling functions or methods in Angular templates (like {{ formatDate(date) }} or *ngIf="isValid()") causes those functions to execute on every change detection cycle. In a typical application, change detection runs very frequently—on every user interaction, HTTP request, or timer event. If a function is called in a template that renders a list of 100 items, it might execute 100 times per change detection cycle, potentially thousands of times per second. This can cause severe performance problems. Instead, use component properties, pipes (which cache results), or computed signals (in modern Angular). For example, instead of {{ formatDate(date) }}, use {{ date | date }} or create a computed signal or getter that calculates the value once per change detection cycle.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `[]`
   */
  allowList?: string[];
  /**
   * Default: `undefined`
   */
  allowPrefix?: string;
  /**
   * Default: `undefined`
   */
  allowSuffix?: string;
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div>{{ getInfo() }}</div>
        ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<a href="{{ getUrls().user }}"></a>
            ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<p [test]="test?.getInfo()"></p>
           ~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<a [href]="id && createUrl() && test($any)">info</a>
                 ~~~~~~~~~~~    ~~~~~~~~~~
{{ id || obj?.nested1() }}
         ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<a [href]="id ? a?.createUrl() : editUrl(3)">info</a>
                ~~~~~~~~~~~~~~   ~~~~~~~~~~
{{ 1 === 2 ? 3 : obj?.nested1() }}
                 ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ obj?.nested1() }} {{ obj!.nested1() }}
   ~~~~~~~~~~~~~~       ~~~~~~~~~~~~~~
<button [type]="obj!.$any(b)!.getType()">info</button>
                ~~~~~~~~~~~~~~~~~~~~~~~
<a [href]="obj.propertyA?.href()">info</a>
           ~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (foo()) {
     ~~~~~
  <div [id]="foo()"></div>
             ~~~~~
} @else if (foo()) {
            ~~~~~
  <div [id]="foo()"></div>
             ~~~~~
} @else {
  <div [id]="foo()"></div>
             ~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (foo()) {
         ~~~~~
  @case(foo()) {
        ~~~~~
    <div [id]="foo()"></div>
               ~~~~~
  }
  @default {
    <div [id]="foo()"></div>
               ~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of getFooList(); track item.getId()) {
              ~~~~~~~~~~~~        ~~~~~~~~~~~~
  <div [id]="foo()"></div>
             ~~~~~
} @empty {
  <div [id]="foo()"></div>
             ~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@defer (when foo(); prefetch when foo()) {
             ~~~~~                ~~~~~
  <div [id]="foo()"></div>
             ~~~~~
} @error {
  <div [id]="foo()"></div>
             ~~~~~
} @loading {
  <div [id]="foo()"></div>
             ~~~~~
} @placeholder {
  <div [id]="foo()"></div>
             ~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@defer (on idle; hydrate when foo()) {
                              ~~~~~
  <div></div>
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ foo(bar(), baz()) }}
   ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ foo()() }}
   ~~~~~~~
   ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ foo().bar() }}
   ~~~~~~~~~~~
   ~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error",
      {
        "allowList": [
          "ok"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ notOk().ok() }}
   ~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ info }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button type="button" (click)="handleClick()">Click Here</button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ $any(info) }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input (change)="obj?.changeHandler()">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<form [formGroup]="form" (ngSubmit)="form.valid || save()"></form>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<form [formGroup]="form" (ngSubmit)="form.valid && save()"></form>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<form [formGroup]="form" (ngSubmit)="id ? save() : edit()"></form>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error",
      {
        "allowList": [
          "nested",
          "getHref"
        ],
        "allowPrefix": "$",
        "allowSuffix": "$"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ obj?.nested() }} {{ obj!.nested() }}
<a [href]="getHref()">info</a>
{{ $validWithPrefix() }} {{ validWithSuffix$() }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (condition) {
  <div></div>
} @else if (otherCondition) {
  <div></div>
} @else {
  <div></div>
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (condition) {
  @case(value) {
    <div></div>
  }
  @default {
    <div></div>
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of list; track item.id) {
  <div></div>
} @empty {
  <div></div>
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-call-expression": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@defer (on viewport(ref); prefetch on viewport(ref)) {
  <div></div>
} @error {
  <div></div>
} @loading {
  <div></div>
} @placeholder {
  <div></div>
}
```
