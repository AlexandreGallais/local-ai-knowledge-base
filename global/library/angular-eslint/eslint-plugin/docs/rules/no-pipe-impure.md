---
title: "@angular-eslint/no-pipe-impure"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-pipe-impure.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-pipe-impure`

Disallows the declaration of impure pipes

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Impure pipes are executed on every change detection cycle, regardless of whether their inputs have changed. In a typical Angular application, change detection runs very frequently (on every user interaction, timer, HTTP request, etc.). An impure pipe in a template with a list of 100 items might execute 100 times per change detection cycle, potentially thousands of times per second, causing severe performance problems. Pure pipes (the default) only re-execute when their input references change, making them much more efficient. Impure pipes should be avoided unless you have a specific need and understand the performance implications. In most cases, you can achieve the same result with a pure pipe and proper change detection strategy.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  pure: false
  ~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test',
  'pure': false,
  ~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test',
  ['pure']: !true
  ~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test',
  [`pure`]: false
  ~~~~~~~~~~~~~~~
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe()
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const options = {};
@Pipe(options)
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'test',
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  pure: true
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  'pure': !0,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  ['pure']: !!isPure(),
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const pure = 'pure';
@Pipe({
  [pure]: false
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const pure = false;
@Pipe({
  pure,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function isPure() {
  return false;
}

@Pipe({
  [`pure`]: isPure(),
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-pipe-impure": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule({
  bootstrap: [Foo]
})
class Test {}
```
