---
title: "@angular-eslint/pipe-prefix"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/pipe-prefix.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/pipe-prefix`

Enforce consistent prefix for pipes.

- Type: suggestion

## Rationale

Prefixing pipe names helps prevent naming collisions between pipes from different libraries or modules, and makes it clear which pipes belong to your application versus third-party libraries. For example, prefixing with 'app' creates pipe names like 'appCurrency' instead of just 'currency', avoiding conflicts with Angular's built-in pipes.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `[]`
   */
  prefixes?: string[];
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'foo-bar'
        ~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'ng'
        ~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng",
          "mg",
          "sg"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'foo-bar'
        ~~~~~~~~~
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng"
        ]
      }
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

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
export function mockPipe(name: string): any {
  @Pipe({ name })
  class MockPipe implements PipeTransform {
    transform(input: any): any {
      return input;
    }
  }
  return MockPipe;
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": []
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'ngBarFoo'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'ngBarFoo'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng",
          "sg",
          "mg"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'ngBarFoo'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng",
          "sg",
          "mg"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: `ngBarFoo`
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/pipe-prefix": [
      "error",
      {
        "prefixes": [
          "ng"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const pipeName = 'fooBar';
@Pipe({
  name: pipeName
})
class Test {}
```
