---
title: "@angular-eslint/template/no-any"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-any.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-any`

The use of "$any" nullifies the compile-time benefits of Angular's type system

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

The $any() type cast function in Angular templates disables TypeScript's type checking for an expression, removing all the benefits of static typing. This means typos, incorrect property access, and invalid method calls won't be caught until runtime. While $any() can be a quick fix for type errors, it's better to properly type your component properties or fix the underlying type issue. Overusing $any() makes templates less safe and can hide real bugs. If you're using $any() frequently, it often indicates that your component's types need improvement. Use $any() sparingly and only when you have a specific reason why TypeScript's type checking isn't applicable.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ $any(framework).name }}
   ~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ this.$any(framework).name }}
   ~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<a [href]="$any(getHref())">Click here</a>
           ~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="$any(attributeList)['NPSScore']">Content</div>
            ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div>{{ $any(attributeList)['NPSScore'] }}</div>
        ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div>{{ this.$any(attributeList)['NPSScore'] }}</div>
        ~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div>{{ $any(attributeList)['NPSScore']['another'] }}</div>
        ~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ $any(framework).name }}
   ~~~~~~~~~~~~~~~
<div>
  {{ this.$any(framework).name }}
     ~~~~~~~~~~~~~~~~~~~~
</div>
<a [href]="$any(getHref())">Click here</a>'
           ~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ $any }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ obj.$any() }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ obj?.x?.y!.z!.$any() }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ obj[read][$any] }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ $any['test'] }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ obj['test'].$any }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ obj['test'].$any() }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ obj.$any()['test'] }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ test()['value'] }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<a [href]="$test()">Click here</a>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button type="button" (click)="anyClick()">Click here</button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-any": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ $any }}
{{ obj?.x?.y!.z!.$any() }}
<a [href]="$test()">Click here</a>
<button type="button" (click)="anyClick()">Click here</button>
```
