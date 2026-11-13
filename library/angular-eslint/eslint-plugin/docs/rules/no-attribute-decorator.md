---
title: "@angular-eslint/no-attribute-decorator"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-attribute-decorator.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-attribute-decorator`

The @Attribute decorator is used to obtain a single value for an attribute. This is a much less common use case than getting a stream of values (using @Input), so the @Attribute decorator is often mistakenly used when @Input is intended. This rule disallows the usage of @Attribute decorator entirely to prevent these mistakes.

- Type: problem

## Rationale

The @Attribute decorator is frequently misunderstood and misused. Unlike @Input(), which creates a binding that updates when the input value changes, @Attribute reads the attribute value only once during component construction and never updates. This single-read behavior is rarely what developers intend when they want to receive data from a parent component. In almost all cases, @Input() is the correct choice because it provides reactive updates. The @Attribute decorator is only appropriate for very specific optimization scenarios where you know the value will never change and want to avoid the overhead of change detection for that property. To prevent bugs from this common mistake, this rule disallows @Attribute entirely and encourages using @Input() instead, or modern signal-based inputs via input().

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-attribute-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  constructor(@Attribute() foo: string) {}
              ~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-attribute-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  constructor(
    @Inject(TOKEN) token: string,
    randomNumber: number,
    @Attribute() foo: string,
    ~~~~~~~~~~~~
    @Attribute('baz') bar: string
    ~~~~~~~~~~~~~~~~~
  ) {}
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-attribute-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  foo() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-attribute-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  constructor() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-attribute-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  constructor(@Optional() foo: string, @Optional() bar: string, baz: number) {}
}
```
