---
title: "@angular-eslint/template/prefer-self-closing-tags"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-self-closing-tags.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-self-closing-tags`

Ensures that self-closing tags are used for elements with a closing tag but no content.

- Type: layout
- 🔧 Supports autofix (`--fix`)

## Rationale

Self-closing tags like <app-component /> are more concise and eliminate visual clutter when elements have no content. This pattern is familiar from HTML void elements (like  and ) and from JSX/React. Using self-closing syntax makes it immediately obvious that an element is empty, whereas <app-component></app-component> requires scanning to the closing tag to confirm there is no content. The shorter syntax also reduces the chance of accidentally nesting content where none was intended. Angular v15.1+ supports self-closing tags for components and structural elements. The rule automatically skips native HTML elements (div, span, etc.) and index.html files since browser support varies. For Angular components and directives, self-closing tags improve template readability.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component></my-component>
              ~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component *ngIf="condition" type="text" [name]="foo"></my-component>
                                                         ~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component
  type="text"
  [name]="foo"
  [items]="items">
</my-component>
~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component
  type="text"
  [name]="foo"
  [items]="items"
></my-component>
 ~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template></ng-template>
             ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template> </ng-template>
              ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-content></ng-content>
            ~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-content
  selector="my-selector"
></ng-content>
 ~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-content>
</ng-content>
~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-content select="foo>bar">
</ng-content>
~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component type="text" [name]="foo">With some content</my-component>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component
  *ngIf="condition"
  type="text"
  [name]="foo"
  [items]="items" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img src="foo" *ngIf="condition" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<slot></slot><math></math><rb></rb><svg></svg><template></template><selectedcontent></selectedcontent>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<svg>
  <title></title>
  <use href="#icon"></use>
  <path d=""></path>
</svg>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<math><mi></mi></math>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
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
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngIf="condition"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<th scope="col"></th>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<th *ngIf="condition" scope="col"></th>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template/>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template>Content</ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-content/>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-content select="my-selector" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-content>Fallback content</ng-content>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-content>&nbsp;</ng-content>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-content> <!-- comment --> </ng-content>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-content
     select="content"
   >
    <p>Fallback content</p>
  </ng-content>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-content select="[slot='icon-only']">
    <ng-content select="[slot=text]" />
  </ng-content>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-content select="[slot='foo>bar']" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-content select="[slot='foo>bar']">Fallback</ng-content>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

**Filename: src/index.html**

```html
<app-root></app-root>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

**Filename: sub_projects/acme/index.html**

```html
<acme-root></acme-root>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-container>&nbsp;</ng-container>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-self-closing-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component>  <!-- not empty -->  </my-component>
```
