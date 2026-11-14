---
title: "@angular-eslint/use-pipe-transform-interface"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/use-pipe-transform-interface.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/use-pipe-transform-interface`

Ensures that `Pipes` implement `PipeTransform` interface

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

Implementing the PipeTransform interface provides TypeScript compile-time checking to ensure your pipe has the correct transform() method signature. Without the interface, typos in the method name or incorrect parameters won't be caught until runtime. The interface also serves as self-documentation and enables better IDE support like autocomplete and inline documentation. While Angular requires pipes to have a transform() method, using the PipeTransform interface leverages TypeScript's type system to catch implementation errors during development rather than at runtime.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-pipe-transform-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({ name: 'test' })
class Test {
      ~~~~
  transform(value: string) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-pipe-transform-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { HttpClient } from '@angular/common/http';
import type { PipeTransform } from '@angular/core';
import { Component,
  Pipe,
  Directive } from '@angular/core';

@Pipe({ name: 'test' })
class Test implements AnInterface {
      ~~~~
  transform(value: string) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-pipe-transform-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import type { OnInit } from '@angular/core';

@OtherDecorator() @Pipe({ name: 'test' })
class Test implements AnInterface, AnotherInterface {
      ~~~~
  transform(value: string) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-pipe-transform-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({ name: 'test' })
class Test<T> {
      ~~~~
  transform(value: T): T {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-pipe-transform-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({ name: 'test' })
class Test<T, U extends SomeType> {
      ~~~~
  transform(value: T): U {}
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-pipe-transform-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({ template: 'test' })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-pipe-transform-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({ name: 'test' })
class Test implements PipeTransform {
  transform(value: string) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-pipe-transform-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@OtherDecorator() @Pipe({ name: 'test' })
class Test implements PipeTransform {
  transform(value: string) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-pipe-transform-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({ name: 'test' })
class Test implements ng.PipeTransform {
  transform(value: string) {}
}
```
