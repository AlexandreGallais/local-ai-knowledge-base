---
title: "@angular-eslint/sort-lifecycle-methods"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/sort-lifecycle-methods.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/sort-lifecycle-methods`

Ensures that lifecycle methods are declared in order of execution

- Type: problem

## Rationale

Organizing lifecycle methods in the order they execute (ngOnChanges, ngOnInit, ngDoCheck, ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked, ngOnDestroy) makes the component lifecycle easier to understand and follow. When methods appear in execution order, developers can mentally trace the component's lifecycle from initialization through destruction just by reading down the file. This natural ordering helps both when writing new code (you know where to add lifecycle logic) and when debugging (you can follow the execution path visually). Randomly ordered lifecycle methods force developers to jump around the file and mentally reconstruct the execution sequence. Consistent ordering is a simple organizational principle that significantly improves code readability.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-lifecycle-methods": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  ngOnInit(): void {}
  ngOnChanges(): void {}
  ~~~~~~~~~~~
  ngDoCheck(): void {}
  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {}
  ngAfterViewInit(): void {}
  ngAfterViewChecked(): void {}
  ngOnDestroy(): void {}
  doSomething(): void {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-lifecycle-methods": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  ngOnChanges(): void {}
  ngOnInit(): void {}
  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {}
  ngOnDestroy(): void {}
  ngAfterViewChecked(): void {}
  ~~~~~~~~~~~~~~~~~~
  doSomething(): void {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-lifecycle-methods": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  ngDoCheck(): void {}
  ngAfterContentInit(): void {}
  ngOnDestroy(): void {}
  ngAfterContentChecked(): void {}
  ~~~~~~~~~~~~~~~~~~~~~
  ngAfterViewChecked(): void {}
  doSomething(): void {}
  doSomethingElse(): void {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-lifecycle-methods": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  ngOnInit(): void {}
  ngOnChanges(): void {}
  ~~~~~~~~~~~
 }
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-lifecycle-methods": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngOnChanges(): void {}
  ngOnInit(): void {}
  ngDoCheck(): void {}
  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {}
  ngAfterViewInit(): void {}
  ngAfterViewChecked(): void {}
  ngOnDestroy(): void {}
  doSomething(): void {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-lifecycle-methods": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngOnChanges(): void {}
  ngOnInit(): void {}
  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {}
  ngAfterViewChecked(): void {}
  ngOnDestroy(): void {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-lifecycle-methods": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngDoCheck(): void {}
  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {}
  ngAfterViewChecked(): void {}
  doSomething(): void {}
  doSomethingElse(): void {}
  doSomethingElseAgain(): void {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-lifecycle-methods": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngOnInit(): void {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-lifecycle-methods": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {}
```
