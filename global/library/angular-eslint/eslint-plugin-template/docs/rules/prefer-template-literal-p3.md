---
title: "@angular-eslint/template/prefer-template-literal (part 3 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-template-literal.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/prefer-template-literal (part 3 of 3)

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ (value + 1) + '-suffix' }}
   ~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ ('value' | pipe) + '-suffix' }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 42 + "-suffix" }}
   ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ null + "-suffix" }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ undefined + "-suffix" }}
   ~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ true + "-suffix" }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ value + "-suffix" }}
   ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ value() + "-suffix" }}
   ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ [42] + "-suffix" }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ `'pre\`fix"-${value}-"suf\`fix'` + "-suf`fix" }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ (condition ? 'true' : 'false') + "-suffix" }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ ('value' | pipe) + "-suffix" }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 42 + `prefix-${value}-suffix` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ null + `prefix-${value}-suffix` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ undefined + `prefix-${value}-suffix` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ false + `prefix-${value}-suffix` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ value2 + `prefix-${value}-suffix` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ value2() + `prefix-${value}-suffix` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ [42] + `prefix-${value}-suffix` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ (condition ? 'true' : 'false') + `prefix-${value}-suffix` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ ('value' | pipe) + `prefix-${value}-suffix` }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
<ng-container
    *ngTemplateOutlet="selector;
        context: {
            name: 'test-' + item.id,
                  ~~~~~~~~~~~~~~~~~
            value: 42
        }
    "
/>

<div></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
<div [ngStyle]="{
    width: 10 + 'px'
           ~~~~~~~~~
}"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
<div [ngStyle]="
     { width: 10 + 'px' }
              ~~~~~~~~~
"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
<ng-container
    *ngTemplateOutlet="
      selector;
        context: {
            name: 'test-' + item.id,
                  ~~~~~~~~~~~~~~~~~
            value: 42
        }
    "
/>

<div></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
<div [class]="
     'a' + 'b'
     ~~~~~~~~~
"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'a' + 'b' + 'c' }}
   ~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ x.type + '' + y }}
   ~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ x.type + '' + $any(x).label + '' + $any(x).to }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'a' + 'b' + 'c' + 'd' }}
   ~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ 'prefix-' + value + '-middle-' + value2 + '-suffix' }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

**Filename: components/widget.component.html**

```html
{{ getValue() + '-' + getOther() + '-end' }}
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ `prefix-${value}-suffix` }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ 42 + 42 }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ value + value2 }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ value() + value2() }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ 'simple-quote' | pipe }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ "double-quote" }}"
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ `backquote` }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (`prefix-${value}-suffix`) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@defer (when `prefix-${value}-suffix`) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@let letValue = `prefix-${value}-suffix`;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<h1>{{ `prefix-${value}-suffix` }}</h1>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component class="prefix-{{value}}-suffix"></my-component>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [class]="`prefix-${value}-suffix`"></my-component>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component *directive="`prefix-${value}-suffix` | pipe" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-template-literal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

**Filename: /components/widget/inline-template-widget-1.component.html**

```html
<div [style.--row-height]="itemSize() + 'px'">Example</div>
```
