---
title: "@angular-eslint/prefer-host-metadata-property"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-host-metadata-property.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/prefer-host-metadata-property`

Use `host` metadata property instead of `@HostBinding` and `HostListener`

- Type: suggestion

## Rationale

Using the host metadata property in the @Component or @Directive decorator instead of separate @HostBinding and @HostListener decorators consolidates all host-related bindings in one place, making it easier to see all DOM interactions at a glance. The host property approach is generally more concise and keeps component metadata organized. With decorators, host bindings and listeners are scattered throughout the class on individual properties and methods, requiring developers to hunt through the file to understand all host interactions. The centralized host property makes this information immediately visible in the decorator metadata. This is particularly helpful during code reviews and when onboarding new team members who need to understand how a component interacts with its host element. Prior to Angular v20, the Angular team actually recommended using the decorators, partly because the decorators had better IDE support for typechecking. That is no longer the case and the Angular documentation clearly states that the host metadata should be used and that the decorators are purely still there for backwards compatibility.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-host-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  @HostBinding('class')
  ~~~~~~~~~~~~~~~~~~~~~
  readonly cssClass = 'my-class';
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-host-metadata-property": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  @HostListener('click')
  ~~~~~~~~~~~~~~~~~~~~~~
  bar() {}
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-host-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  host: {
    class: 'my-class',
  },
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-host-metadata-property": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  host: {
    '(click)': 'bar()'
  },
})
class Test {
  bar() {}
}
```
