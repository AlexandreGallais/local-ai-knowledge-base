---
title: "@angular-eslint/contextual-lifecycle"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/contextual-lifecycle.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/contextual-lifecycle`

Ensures that lifecycle methods are used in a correct context

- Type: problem

## Rationale

Angular lifecycle hooks are only invoked for specific class types. For example, ngOnInit(), ngOnChanges(), and ngOnDestroy() are only called for components and directives, not for services (@Injectable), pipes (@Pipe), or modules (@NgModule). Defining these lifecycle methods in the wrong class type gives a false impression that they will be called, leading to bugs where initialization or cleanup logic never executes. This rule ensures lifecycle methods are only used where Angular will actually invoke them.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  ngDoBootstrap() {}
  ~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  ngDoBootstrap() {}
  ~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  ngAfterContentChecked() { console.log('AfterContentChecked'); }
  ~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  ngAfterContentInit() { console.log('ngAfterContentInit'); }
  ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  ngAfterViewInit() { console.log('ngAfterViewInit'); }
  ~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  ngDoBootstrap() {}
  ~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  ngDoCheck() { console.log('ngDoCheck'); }
  ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  ngOnChanges() { console.log('ngOnChanges'); }
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  ngOnInit() { console.log('ngOnInit'); }
  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  ngAfterContentChecked() { console.log('ngAfterContentChecked'); }
  ~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  ngAfterContentInit() { console.log('ngAfterContentInit'); }
  ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  ngAfterViewChecked() { console.log('ngAfterViewChecked'); }
  ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  ngAfterViewInit() { console.log('ngAfterViewInit'); }
  ~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  ngDoCheck() { console.log('ngDoCheck'); }
  ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  ngOnChanges() { console.log('ngOnChanges'); }
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  ngOnInit() { console.log('ngOnInit'); }
  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  ngOnDestroy() { console.log('ngOnDestroy'); }
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test {
  ngAfterContentChecked() { console.log('ngAfterContentChecked'); }
  ~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test {
  ngAfterContentInit() { console.log('ngAfterContentInit'); }
  ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test {
  ngAfterViewChecked() { console.log('ngAfterViewChecked'); }
  ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test {
  ngAfterViewInit() { console.log('ngAfterViewInit'); }
  ~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test {
  ngDoBootstrap() {}
  ~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test {
  ngDoCheck() { console.log('ngDoCheck'); }
  ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test {
  ngOnChanges() { console.log('ngOnChanges'); }
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test {
  ngOnInit() { console.log('ngOnInit'); }
  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Service()
class Test {
  ngOnInit() { console.log('ngOnInit'); }
  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Service()
class Test {
  ngAfterViewInit() { console.log('ngAfterViewInit'); }
  ~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test implements DoCheck {
  constructor() {}

  ngDoCheck() {}
  ~~~~~~~~~
}

@Directive()
class TestDirective implements OnInit {
  ngOnInit() {
    console.log('Initialized');
  }
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
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
    "@angular-eslint/contextual-lifecycle": [
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
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngAfterContentInit() { console.log('AfterContentInit'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngAfterViewChecked() { console.log('AfterViewChecked'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngAfterViewInit() { console.log('AfterViewInit'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
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
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngOnChanges() { console.log('OnChanges'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngOnDestroy() { console.log('OnDestroy'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngOnInit() { console.log('OnInit'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  ngAfterContentChecked() { console.log('AfterContentChecked'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
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
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  ngAfterViewChecked() { console.log('AfterViewChecked'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  ngAfterViewInit() { console.log('AfterViewInit'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  ngDoCheck() { console.log('DoCheck'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
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
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  ngOnDestroy() { console.log('OnDestroy'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  ngOnInit() { console.log('OnInit'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule()
class Test {
  ngDoBootstrap() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe()
class Test {
  ngOnDestroy() { console.log('OnDestroy'); }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-lifecycle": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Service()
class Test {
  ngOnDestroy() { console.log('OnDestroy'); }
}
```
