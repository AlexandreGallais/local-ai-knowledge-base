---
title: "@angular-eslint/template/no-nested-tags"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-nested-tags.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-nested-tags`

Denies nesting of `` and `` tags.

- Type: problem

## Rationale

Nesting `` tags inside other `` tags, or `` tags inside other `` tags, is invalid HTML and causes serious issues with Angular hydration. All browsers automatically close the outer tag when they encounter the inner tag, transforming `123` into `123` in the DOM. This creates a mismatch between the server-rendered HTML and what Angular expects during hydration, breaking incremental hydration and potentially causing runtime errors. The browser's automatic correction of invalid HTML happens before Angular processes the template, so Angular cannot fix or work around it. Always use different elements (like `` and ``, or nested `` tags) or restructure your template to avoid nesting these specific tags. Explicit `<ng-template>` elements are an exception because they are not rendered in-place; tags inside them are not nested in the parent element's DOM.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-nested-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<a><a></a></a>
   ~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-nested-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<p>@if(true) {<p></p>}</p>
              ~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-nested-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<a><a *ngFor="let item of items"></a></a>
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-nested-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<p><ng-container><p></p></ng-container></p>
                 ~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-nested-tags": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<a><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div>
  <a>fail</a>
  ~~~~~~~~~~~
</div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></a>
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-nested-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<a></a>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-nested-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<a></a><a></a>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-nested-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<p></p>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-nested-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<p></p><p></p>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-nested-tags": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<p>
  Text
  <ng-template #content>
    <p>Text</p>
  </ng-template>
</p>
```
