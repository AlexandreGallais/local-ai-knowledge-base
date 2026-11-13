---
title: "@angular-eslint/template/prefer-at-empty"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-at-empty.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-at-empty`

Prefer using `@empty` with `@for` loops instead of a separate `@if` or `@else` block to reduce code and make it easier to read.

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

The @for loop has a built-in @empty block for displaying content when the collection is empty. Using this feature is clearer and more concise than separate @if blocks that check collection.length === 0 or collection.length > 0. When @if and @for blocks check the same collection, combining them with @empty eliminates duplication, reduces nesting, and makes the template intent immediately obvious. For example, @for (item of items) {...} @empty {No items} is more readable than @if (items.length > 0) { @for (item of items) {...} } @else {No items}. The @empty pattern is the idiomatic Angular way to handle empty collections and should be preferred wherever applicable.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track $index) {}
@if (items.length === 0) {
~~~~
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track $index) {}
@if (items.length == 0) {
~~~~
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track $index) {}
@if (0 === items.length) {
~~~~
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track $index) {}
@if (0 == items.length) {
~~~~
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track $index) {}
@if (!items.length) {
~~~~
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length === 0) {
~~~~
  No items
}
@for (item of items; track $index) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length == 0) {
~~~~
  No items
}
@for (item of items; track $index) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 === items.length) {
~~~~
  No items
}
@for (item of items; track $index) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 == items.length) {
~~~~
  No items
}
@for (item of items; track $index) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (!items.length) {
~~~~
  No items
}
@for (item of items; track $index) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length > 0) {
~~~~
  @for (item of items; track $index) {}
} @else {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length !== 0) {
~~~~
  @for (item of items; track $index) {}
} @else {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length != 0) {
~~~~
  @for (item of items; track $index) {}
} @else {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 < items.length) {
~~~~
  @for (item of items; track $index) {}
} @else {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 !== items.length) {
~~~~
  @for (item of items; track $index) {}
} @else {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 != items.length) {
~~~~
  @for (item of items; track $index) {}
} @else {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length) {
~~~~
  @for (item of items; track $index) {}
} @else {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length === 0) {
~~~~
  No items
} @else {
  @for (item of items; track $index) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length == 0) {
~~~~
  No items
} @else {
  @for (item of items; track $index) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 === items.length) {
~~~~
  No items
} @else {
  @for (item of items; track $index) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (0 == items.length) {
~~~~
  No items
} @else {
  @for (item of items; track $index) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (!items.length) {
~~~~
  No items
} @else {
  @for (item of items; track $index) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length > 0) {
~~~~
  @for (item of items; track $index) {}
}
@if (items.length === 0) {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length === 0) {
  No items
}
@if (items.length > 0) {
~~~~
  @for (item of items; track $index) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length > 0) {
~~~~
  @for (item of items; track $index) {}
} @else if (condition) {
 Condition is true
} @else {
 Condition is false
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track $index) {}
<!-- comment -->
@if (items.length === 0) {
~~~~
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<!-- The Angular compiler will ignore the space between the two blocks. -->
@for (item of items; track $index) {}
&nbsp;
@if (items.length === 0) {
~~~~
  Not empty
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length === 0) {
~~~~
  Not empty
}
@for (item of items; track $index) {}
@empty {
  Existing
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track $index) {}
@empty {
  Existing
}
@if (items.length === 0) {
~~~~
  Not empty
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length > 0) {
~~~~
  @for (item of items; track $index) {}
  @empty {
    Existing
  }
} @else {
  Empty
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length === 0) {
~~~~
  Empty
} @else {
  @for (item of items; track $index) {}
  @empty {
    Existing
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length === 0) {
~~~~
  Empty
} @else {
  @for (item of items; track $index) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length > 0) {
~~~~
  <!-- before -->
  @for (item of items; track $index) {}
  <!-- after -->
} @else {
  Empty
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (items.length === 0) {
~~~~
  Empty
} @else {
  <!-- before -->
  @for (item of items; track $index) {}
  <!-- after -->
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (evt of eventQueue(); track evt) {
  {{ evt }}
}
@if (eventQueue().length === 0) {
~~~~
  Awaiting app bootstrap...
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track $index) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track $index) {} @empty {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (alpha.length > 0) {
  @for (item of beta; track $index) {}
} @else {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (items.length > 0) {
  Items:
  @for (item of items; track $index) {}
} @else {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (items.length === 0) {
  No items
} @else {
  Items:
  @for (item of items; track $index) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (items.length > 0) {
  @for (item of items; track $index) {}
  Total: {{ $count }}
} @else {
  No items
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (items.length === 0) {
  No items
} @else {
  @for (item of items; track $index) {}
  Total: {{ $count }}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (items.length > 0) {
  @for (item of items; track $index) {}
}
@if (items.length > 0) {
  Not empty
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (items.length > 0) {
  @for (item of items; track $index) {}
}
---
@if (items.length === 0) {
  Not empty
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track $index) {}
---
@if (items.length === 0) {
  Not empty
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track $index) {}
@if (items.length > 0) {
  Not empty
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (items.length > 0) {
  Not empty
}
@for (item of items; track $index) {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-at-empty": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (beta.length > 0) {
  @for (item of alpha; track $index) {}
  @for (item of beta; track $index) {}
} @else {
  Empty
}
```
