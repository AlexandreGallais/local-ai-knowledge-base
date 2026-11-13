---
title: "@angular-eslint/no-async-lifecycle-method"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-async-lifecycle-method.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-async-lifecycle-method`

Angular Lifecycle methods should not be async. Angular does not wait for async lifecycle but the code incorrectly suggests it does.

- Type: problem

## Rationale

Angular does not wait for async lifecycle methods to complete before continuing with the component lifecycle. If you make ngOnInit() async, Angular will call it and immediately move on without waiting for any await statements inside to resolve. This creates a misleading code pattern where it appears Angular will wait for asynchronous operations to complete, but it won't. For example, if ngOnInit() fetches data asynchronously, the component will continue rendering with potentially incomplete data. Instead of making lifecycle methods async, call async functions from within them and handle the promises appropriately, or use Angular patterns like resolvers, signals with async pipes, or reactive approaches with RxJS.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  async ngAfterContentChecked() { }
        ~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  async ngAfterContentInit() { }
        ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  async ngAfterViewChecked() { }
        ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  async ngAfterViewInit() { }
        ~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test {
  async ngDoBootstrap() { }
        ~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  async ngDoCheck() { }
        ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  async ngOnChanges() { }
        ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  async ngOnDestroy() { }
        ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  async ngOnInit() { }
        ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Service()
class Test {
  async ngOnDestroy() { }
        ~~~~~~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngAfterContentChecked() { }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngAfterContentInit() { }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngAfterViewChecked() { }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngAfterViewInit() { }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngDoBootstrap() { }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngDoCheck() { }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngOnChanges() { }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngOnDestroy() { }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngOnInit() { }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
async function ngAfterContentChecked() {}
async function ngAfterContentInit() {}
async function ngAfterViewChecked() {}
async function ngAfterViewInit() {}
async function ngDoBootstrap() {}
async function ngDoCheck() {}
async function ngOnChanges() {}
async function ngOnDestroy() {}
async function ngOnInit() {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-async-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  async ngOnInit() {}
}
```
