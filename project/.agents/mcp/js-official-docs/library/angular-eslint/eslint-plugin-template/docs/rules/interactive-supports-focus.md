---
title: "@angular-eslint/template/interactive-supports-focus"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/interactive-supports-focus.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/interactive-supports-focus`

[Accessibility] Ensures that elements with interactive handlers like `(click)` are focusable.

- Type: suggestion

## Rationale

Interactive elements with click handlers or other event listeners must be keyboard-accessible to users who cannot use a mouse. Elements that trigger actions must be focusable (either naturally like buttons and links, or via tabindex) so keyboard users can navigate to them and activate them with Enter or Space. Without this, keyboard-only users, screen reader users, and users with motor disabilities cannot interact with the application. Native interactive elements (button, a, input, select, textarea) are automatically focusable and keyboard-accessible. For custom interactive elements, you must add tabindex="0" to make them focusable and add appropriate keyboard event handlers. This is a WCAG Level A requirement for keyboard accessibility.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `["form"]`
   */
  allowList?: string[];
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div aria-hidden="false" (click)="onClick()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [attr.aria-hidden]="false" (click)="onClick()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div role="button" aria-disabled="false" (click)="onClick()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [attr.aria-disabled]="false" (click)="onClick()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div role="button" (click)="onClick()"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<span (click)="onClick()">Submit</span>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" [attr.aria-label]="clickableThing"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (click)="onClick()" role="invalid"></div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<area (click)="onClick()" class="foo">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<a (click)="onClick()">Click me</a>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div (keyup)="onKeyUp()" (keydown)="onKeyDown()" (keypress)="onKeyPress()">Cannot be focused</div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [attr.contenteditable]="false" (keyup)="onKeyUp()">Cannot be focused</div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error",
      {
        "allowList": []
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<form (keydown)="onKeyDown()"></form>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-hidden (click)="onClick()"></div>
<div aria-hidden="true" (click)="onClick()"></div>
<div [attr.aria-hidden]="true" (click)="onClick()"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div role="button" aria-disabled="true" (click)="onClick()"></div>
<div role="button" [attr.aria-disabled]="true" (click)="onClick()"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div role="presentation" (click)="onClick()"></div>
<div role="none" (click)="onClick()"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div role="progressbar" (click)="onClick()"></div>
<div role="region" (click)="onClick()"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="hidden" (click)="onClick()">
<input type="hidden" (click)="onClick()" tabindex="-1">
<input type="hidden" (click)="onClick()" [attr.tabindex]="-1">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text" (keyup)="onKeyUp()">
<input (keydown)="onKeydown()">
<input (click)="onClick()" role="combobox">
<button (click)="onClick()" class="foo">Foo</button>
<option (click)="onClick()" class="foo">Food</option>
<select (click)="onClick()" class="foo"></select>
<summary (click)="onClick()">Foo</summary>
<textarea (keypress)="onKeypress()" class="foo"></textarea>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input disabled type="text" (click)="onClick()">
<button disabled (click)="onClick()" class="foo">Foo</button>
<select disabled (click)="onClick()" class="foo"></select>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<area href="#" (click)="onClick()" class="foo"/>
<area (click)="onClick()" tabindex=0 class="foo"/>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<a (click)="onClick()" tabindex="0">Click me</a>
<a (click)="onClick()" tabindex={{0}}>Click me</a>
<a (click)="onClick()" [attr.tabindex]="0">Click me</a>
<a (click)="onClick()" tabindex="bad">Click me</a>
<a (click)="onClick()" [attr.tabindex]="undefined"}>Click me</a>
<a (click)="onClick()" [attr.tabindex]="dynamicTabindex">Click me</a>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<a role="button" (click)="onClick()" href="#">hash</a>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<a (click)="onClick()" href="http://x.y.z">x.y.z</a>
<a role="link" (click)="onClick()" href="http://x.y.z">x.y.z</a>
<a (click)="onClick()" href="javascript:void(0);">Click ALL the things!</a>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<a routerLink="route" (click)="onClick()"></a>
<a [routerLink]="route" (click)="onClick()"></a>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div (click)="onClick()" tabindex="invalid"></div>
<div (click)="onClick()" [attr.tabindex]="undefined"></div>
<span (click)="onClick()" [attr.tabindex]=="false">Submit</span>
<span (click)="onClick()" [attr.tabindex]=="null">Submit</span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span (click)="onClick()" tabindex="0">Click me!</span>
<span (click)="onClick()" [attr.tabindex]="0">Click me!</span>
<span (click)="onClick()" tabindex="-1">Click me!</span>
<span (click)="onClick()" [attr.tabindex]="-1">Click me!</span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div role="button" tabindex="0" (click)="onClick()"></div>
<div role="checkbox" tabindex="0" (click)="onClick()"></div>
<div role="link" tabindex="0" (click)="onClick()"></div>
<div role="menuitem" tabindex="0" (click)="onClick()"></div>
<div role="checkbox" tabindex="0" (click)="onClick()"></div>
<div role="menuitem" tabindex="0" (click)="onClick()"></div>
<div role="option" tabindex="0" (click)="onClick()"></div>
<div role="radio" tabindex="0" (click)="onClick()"></div>
<div role="spinbutton" tabindex="0" (click)="onClick()"></div>
<div role="switch" tabindex="0" (click)="onClick()"></div>
<div role="tablist" tabindex="0" (click)="onClick()"></div>
<div role="tab" tabindex="0" (click)="onClick()"></div>
<div role="textbox" tabindex="0" (click)="onClick()"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div contenteditable="true" (keyup)="onKeyUp()">Edit this text</div>
<div [attr.contenteditable]="true" (keydown)="onKeyDown()">Edit this text</div>
<div contenteditable (keypress)="onKeyPress()">Edit this too!</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<test-component (keydown)="onKeyDown()"></test-component>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<form (keydown)="onKeyDown()"></form>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/interactive-supports-focus": [
      "error",
      {
        "allowList": [
          "form",
          "section"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<form (keydown)="onKeyDown()"></form>
<section (keydown)="onKeyDown()"></section>
```
