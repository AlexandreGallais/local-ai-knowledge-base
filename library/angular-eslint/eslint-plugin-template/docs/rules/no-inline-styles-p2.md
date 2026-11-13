---
title: "@angular-eslint/template/no-inline-styles (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-inline-styles.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/no-inline-styles (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template>
  <div>
    <img style="position: relative;">
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  </div>
</ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<object style="padding: 30px;"></object>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<area style="padding: 30px;" />
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input style="color: red;">
~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [attr.style]="'padding: 10px;'">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [style.background-color]="'#fff'">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [style]="'border: 1px solid black;'" [ngStyle]="{ 'padding': '10px' }" [style.background-color]="'#fff'">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [ngStyle]="'background-color: #fff'">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": true,
        "allowBindToStyle": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [style]="'border: 1px solid black;'">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [attr.style]="'padding: 10px;'">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": true,
        "allowBindToStyle": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [ngStyle]="{ 'padding': '10px' }" [style]="'border: 1px solid black;'">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [style.color]="'red'"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [style.width.px]="100"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [style]="'color: red'"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [style]="{ color: 'red', 'background-color': '#fff' }"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [style.width]="10 + 'px'"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [style.color]="true ? 'red' : 'blue'"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [style.width]="`100px`"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div style="color: {{ 'red' }}"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [attr.style]="styles"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngStyle]="{ color: 'red' }"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngStyle]="'color: red'"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": "dynamic",
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngStyle]="{ color: 'red' }" [style.width.px]="column.width"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": true,
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngStyle]="{ color: 'red' }" [style.color]="'blue'"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img alt="Foo eating a sandwich.">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img src="foo" [attr.alt]="altText">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img src="foo" [attr.alt]="'Alt Text'">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img src="foo" alt="">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object aria-label="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object aria-labelledby="id1">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object>Meaningful description</object>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object title="An object">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<area aria-label="foo" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<area aria-labelledby="id1" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<area alt="This is descriptive!" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="image" alt="This is descriptive!">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="image" aria-label="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="image" aria-labelledby="id1">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [attr.stylesheet]="x">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [ngStyle]="{ 'background-color': '#fff' }">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [style.backgroundColor]="'#fff'">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [style]="{ 'background-color': '#fff' }">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [style]="styleObject">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [style.width.px]="w">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<input style="{{ x }}">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<input bind-style="x">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": true,
        "allowBindToStyle": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [ngStyle]="{ 'background-color': 'red' }" [style.background-color]="'#fff'">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowNgStyle": true,
        "allowBindToStyle": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [ngStyle]="{ 'background-color': 'red' }" [style]="styleObject" [style.background-color]="'#fff'">
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.color]="textColor"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.width.px]="column.width"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style]="styleObject"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style]="{ color: textColor, 'background-color': backgroundColor }"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style]="{ color: 'red', 'background-color': backgroundColor }"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-inline-styles": [
      "error",
      {
        "allowBindToStyle": "dynamic"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.width.px]="getWidth()"></div>
```

---

#### Custom Config
