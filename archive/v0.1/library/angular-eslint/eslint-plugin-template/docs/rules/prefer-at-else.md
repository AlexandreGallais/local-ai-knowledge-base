---
title: "@angular-eslint/template/prefer-at-else"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-at-else.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-at-else`

Prefer using `@else` instead of a second `@if` with the opposite condition to reduce code and make it easier to read.

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

When two consecutive @if blocks test opposite conditions (like @if (isLoggedIn) and @if (!isLoggedIn)), the second should be replaced with @else for clarity and maintainability. Using @else makes it immediately obvious that exactly one of the two branches will execute, whereas two separate @if statements require readers to mentally verify that the conditions are opposites. The @else pattern is more concise, eliminates duplication, and prevents bugs that could occur if the conditions drift out of sync during maintenance. This rule automatically detects opposite conditions including negation (!), comparison operators (<, >, ==, !=, etc.), and special cases like array.length === 0 versus array.length > 0.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {}
@if (!a) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (!a) {}
@if (a) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a > b) {}
@if (a <= b) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a <= b) {}
@if (a > b) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a >= b) {}
@if (a < b) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a < b) {}
@if (a >= b) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a === b) {}
@if (a !== b) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a !== b) {}
@if (a === b) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a == b) {}
@if (a != b) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a != b) {}
@if (a == b) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a.length > 0) {}
@if (a.length === 0) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a.length === 0) {}
@if (a.length > 0) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 < a.length) {}
@if (a.length === 0) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a.length === 0) {}
@if (0 < a.length) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 < a.length) {}
@if (0 === a.length) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 === a.length) {}
@if (0 < a.length) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a.length > 0) {}
@if (0 === a.length) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 === a.length) {}
@if (a.length > 0) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a.length > 0) {}
@if (a.length == 0) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a.length == 0) {}
@if (a.length > 0) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {
  1
} @else {
  2
}
@if (!a) {
~~~~
  3
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {
  1
}
@if (!a) {
~~~~
  2
} @else {
  3
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {
  1
} @else {
  2
}
@if (!a) {
~~~~
  3
} @else {
  4
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component>
  @if (a) {
    <button>1</button>
  } @else {
    <button>2</button>
  }
  @if (!a) {
  ~~~~
    <button>3</button>
  }
</my-component>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component>
  @if (a) {
    <button>1</button>
  }
  @if (!a) {
  ~~~~
    <button>2</button>
  } @else {
    <button>3</button>
  }
</my-component>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {
  <button>1</button>
}
@if (!a) {
~~~~
  <button>2</button>
}
@if (!a) {
  <button>3</button>
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {}

@if (!a) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {}
&nbsp;
@if (!a) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {}
<!-- comment -->
@if (!a) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a; as alias) {}
@if (!a) {}
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {}
@if (!a; as alias) {}
~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {
} @else {
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {}
@if (b) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {}
@if (!b) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a.b) {}
@if (!c.b) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a === true) {}
@if (a === false) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a === b) {}
@if (a != b) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a > 0) {}
@if (a < 0) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a > 1) {}
@if (a <= 0) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a >= b) {}
@if (a <= b) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a.length > 1) {}
@if (a.length <= 0) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {}
text
@if (!a) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {}
<element/>
@if (!a) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {}
@if (b) {}
@if (!a) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-else": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {}
@else if (b) {}
@if (!a) {}
```
