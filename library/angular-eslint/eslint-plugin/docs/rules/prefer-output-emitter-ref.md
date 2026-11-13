---
title: "@angular-eslint/prefer-output-emitter-ref"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-output-emitter-ref.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/prefer-output-emitter-ref`

Use `OutputEmitterRef` instead of `@Output()`

- Type: suggestion

## Rationale

The output() function is Angular's modern API for component outputs, intended to be used instead of the @Output() decorator (which still exists for backwards compatibility). OutputEmitterRef (returned by output()) provides better type safety, integrates seamlessly with Angular's signal ecosystem, and offers a more functional programming approach. Unlike @Output() which uses EventEmitter, output() is specifically designed for component outputs and has a cleaner, more predictable API, that resembles other function based and signals APIs that have been added to the framework in recent versions.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-emitter-ref": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  @Output()
  ~~~~~~~~~
  readonly change: EventEmitter<number>;
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-emitter-ref": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  change = outputValue();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-emitter-ref": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  change = new EventEmitter();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-emitter-ref": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly change = output();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-emitter-ref": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly change = output<string>();
}
```
