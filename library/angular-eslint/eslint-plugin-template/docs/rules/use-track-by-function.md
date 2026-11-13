---
title: "@angular-eslint/template/use-track-by-function"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/use-track-by-function.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/use-track-by-function`

Ensures trackBy function is used

- Type: suggestion

## Rationale

When using *ngFor to render lists, Angular needs to track which items are added, removed, or moved to efficiently update the DOM. Without a trackBy function, Angular tracks items by object identity, meaning any change to the array (like sorting, filtering, or fetching fresh data from an API) causes Angular to destroy and recreate all DOM elements, even for items that haven't changed. This is inefficient and causes problems like: (1) poor performance with large lists, (2) loss of component state (like form input values), and (3) loss of CSS animations or focus. A trackBy function tells Angular how to identify unique items (usually by an id property), allowing Angular to reuse DOM elements for unchanged items. Use trackBy for all lists, especially those that update frequently or contain components with state.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `[]`
   */
  alias?: string[];
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ul>
  <li *ngFor="let item of [1, 2, 3];">
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {{ item }}
  </li>
</ul>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error",
      {
        "alias": [
          "ngForTrackByProperty"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ul>
  <li *ngFor="let item of [1, 2, 3];">
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {{ item }}
  </li>
</ul>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template ngFor let-item [ngForOf]="[1, 2, 3]" let-i="index">
                            ~~~~~~~~~~~~~~~~~~~~~
  {{ item }}
</ng-template>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error",
      {
        "alias": [
          "ngForTrackByProperty"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template ngFor let-item [ngForOf]="[1, 2, 3]" let-i="index">
                            ~~~~~~~~~~~~~~~~~~~~~
  {{ item }}
</ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngFor="let item of [1, 2, 3]; trackBy: trackByFn">
  {{ item }}
</div>
<ul>
  <li *ngFor="let item of [1, 2, 3];">
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {{ item }}
  </li>
</ul>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngFor="let item of [1, 2, 3];">
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {{ item }}
</div>
<ng-template ngFor let-item [ngForOf]="[1, 2, 3]" let-i="index">
                            ~~~~~~~~~~~~~~~~~~~~~
  {{ item }}
</ng-template>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error",
      {
        "alias": [
          "ngForTrackByProperty"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngFor="let item of [1, 2, 3]; trackBy: trackByFn">
  {{ item }}
</div>
<div *ngFor="let item of [1, 2, 3]; trackByProperty: trackByFn">
  {{ item }}
</div>
<ul>
  <li *ngFor="let item of [1, 2, 3];">
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {{ item }}
  </li>
</ul>
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngFor="let item of [1, 2, 3]; trackBy: trackByFn">
  {{ item }}
</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngFor="let item of [1, 2, 3]; let i = index; trackBy: trackByFn">
  {{ item }}
</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngFor="let item of [1, 2, 3]; trackBy : trackByFn">
  {{ item }}
</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngFor='let item of [1, 2, 3]; let i = index; trackBy: trackByFn'>
  {{ item }}
</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngFor  =  "let item of [1, 2, 3]; let i = index; trackBy : trackByFn">
  {{ item }}
</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template ngFor let-item [ngForOf]="[1, 2, 3]" let-i="index"
  [ngForTrackBy]="trackByFn">
  {{ item }}
</ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngFor="let item of ['a', 'b', 'c']; index as i; trackBy: trackByFn">
  {{ item }}
</div>

<ng-template ngFor let-item [ngForOf]="[1, 2, 3]" let-i="index"
  [ngForTrackBy]="trackByFn">
  {{ item }}
</ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngFor="
  let item of [1, 2, 3];
  let i = index;
  trackBy : trackByFn
">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error",
      {
        "alias": [
          "ngForTrackByProperty"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngFor="
  let item of [1, 2, 3];
  let i = index;
  trackByProperty: 'id'
">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error",
      {
        "alias": [
          "ngForTrackById"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngFor="let photo of photos; trackById"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/use-track-by-function": [
      "error",
      {
        "alias": [
          "ngForTrackByProperty"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template ngFor let-item [ngForOf]="[1, 2, 3]" let-i="index" [ngForTrackByProperty]="trackByFn">
  {{ item }}
</ng-template>
```
