---
title: "@angular-eslint/no-empty-lifecycle-method"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-empty-lifecycle-method.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-empty-lifecycle-method`

Disallows declaring empty lifecycle methods

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Empty lifecycle methods add noise to the codebase without providing any value. When a developer sees ngOnInit(), ngOnDestroy(), or other lifecycle hooks, they expect to find important initialization, cleanup, or other lifecycle-related logic. Finding an empty method wastes time during code review and maintenance. Empty lifecycle methods often remain after code has been refactored or removed, serving as dead code that clutters the component. They also require unnecessary imports of lifecycle interfaces (like OnInit, OnDestroy). Removing empty lifecycle methods makes components cleaner, easier to understand, and reduces the file size.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  ngAfterContentChecked() {}
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test extends BaseDirective {
  ngAfterContentInit() {}
  ~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test extends BaseTest implements AfterViewChecked, OnDestroy {
  'ngAfterViewChecked'() {}
  ~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  ['ngAfterViewInit']() {}
  ~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { HttpInterceptor } from '@angular/common/http';
import {
  DoCheck,
  DoBootstrap
} from '@angular/core';
@Pipe()
class Test {
  [`ngDoBootstrap`]() {}
  ~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import {
  AfterViewChecked,
  DoCheck,
  AfterViewInit,
} from '@angular/core';
@Component()
class Test
    implements AfterViewChecked,
                AfterViewInit,
                DoCheck {
  ngDoCheck() {}
  ~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import {OnChanges, AfterContentInit} from '@angular/core';
@Directive()
class Test implements OnChanges, AfterContentInit {
  ngOnChanges() {}
  ~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import * as ng from '@angular/core';
@Injectable()
class Test implements ng.OnDestroy {
  ngOnDestroy() {}
  ~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import {DoBootstrap, OnInit} from '@angular/core';
@NgModule()
class Test implements OnInit, DoBootstrap {
  ngOnInit() {
    this.init();
  }
}

@NgModule()
class Test2 implements OnInit, DoBootstrap {
  ngOnInit() {}
  ~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test extends BaseComponent<unknown> implements OnInit {
  ngOnInit() {}
  ~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Service()
class Test {
  ngOnDestroy() {}
  ~~~~~~~~~~~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngAfterContentChecked() { console.log('AfterContentChecked'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  ngAfterContentInit() { console.log('AfterContentInit'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class Test {
  ngAfterViewChecked() { console.log('AfterViewChecked'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule()
class Test {
  ngAfterViewInit() { console.log('AfterViewInit'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe()
class Test {
  ngDoBootstrap() { console.log('DoBootstrap'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngDoCheck() { console.log('DoCheck'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  ngOnChanges() { console.log('OnChanges'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class Test {
  ngOnDestroy() { console.log('OnDestroy'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule()
class Test {
  ngOnInit() { console.log('OnInit'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  [ngOnInit]() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-empty-lifecycle-method": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  ngOnInit() {}
}
```
