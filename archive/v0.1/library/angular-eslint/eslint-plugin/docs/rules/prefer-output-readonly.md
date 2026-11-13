---
title: "@angular-eslint/prefer-output-readonly"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-output-readonly.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/prefer-output-readonly`

Prefer to declare `@Output`, `OutputEmitterRef` and `OutputRef` as `readonly` since they are not supposed to be reassigned

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Output properties should never be reassigned after initialization because they are meant to be stable references that parent components can bind to. Reassigning an output would break those bindings. For @Output() with EventEmitter, marking the property as 'readonly' makes this constraint explicit and leverages TypeScript's type system to prevent accidental reassignment. The correct pattern is '@Output() readonly userClick = new EventEmitter<User>()', not '@Output() userClick: EventEmitter<User>' where the emitter could be reassigned later. Note that the modern output() function (introduced in Angular v17.3) returns an OutputEmitterRef which is inherently immutable, so this rule is less relevant for those outputs but remains important for traditional EventEmitter-based outputs.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  @Output() testEmitter = new EventEmitter<string>();
            ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testEmitter: OutputEmitterRef<string>;
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testEmitter = output();
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testEmitter = output<string>();
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testEmitter: OutputRef<string>;
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testEmitter = outputFromObservable(testObservable);
  ~~~~~~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testEmitter = new EventEmitter<string>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  @Output() readonly testEmitter = new EventEmitter<string>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testEmitter: NotOutputEmitterRef<string>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testEmitter: OutputEmitterRef<string>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testEmitter = notOutput();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testEmitter = output();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testEmitter = notOutput<string>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testEmitter = output<string>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testEmitter: OutputRef<string>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-output-readonly": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testEmitter = outputFromObservable(testObservable);
}
```
