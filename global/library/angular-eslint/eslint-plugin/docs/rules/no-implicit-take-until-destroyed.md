---
title: "@angular-eslint/no-implicit-take-until-destroyed"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-implicit-take-until-destroyed.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-implicit-take-until-destroyed`

Ensures that `takeUntilDestroyed()` is called with an explicit `DestroyRef` when used outside of an injection context

- Type: problem

## Rationale

The `takeUntilDestroyed()` operator can automatically infer the current component'<example-value>'s `DestroyRef` only when called within an injection context — specifically in constructors or field initializers of classes decorated with `@Component`, `@Directive`, `@Injectable`, `@Pipe`, or `@Service`, or in factory functions (`useFactory` in providers or `factory` in InjectionTokens). When used in lifecycle methods like `ngOnInit()` or `ngAfterViewInit()`, in regular methods, in constructors of plain classes not managed by Angular'<example-value>'t support the `ngOnDestroy` lifecycle), the injection context is not available, and `takeUntilDestroyed()` will throw a runtime error: "<example-value>" To fix this, inject `DestroyRef` using `inject(DestroyRef)` and pass it explicitly: `takeUntilDestroyed(this.destroyRef)`.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  ngOnInit() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  ngAfterViewInit() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  anyMethod() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  anyMethod() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class TestService {
  ngOnDestroy() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class TestService {
  loadData() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  constructor() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class AppModule {
  constructor() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class AppModule {
  private data = this.http.get('/api').pipe(takeUntilDestroyed());
                                            ~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  constructor() {
    this.loadData();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  private data = this.loadData();

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    return this.data$.pipe(takeUntilDestroyed());
                           ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class TestService {
  constructor() {
    this.#subscribe();
  }

  refresh() {
    this.#subscribe();
  }

  #subscribe() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
                    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  constructor() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  constructor() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class Test {
  constructor() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({ name: 'myPipe' })
class MyPipe {
  constructor() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Service()
class TestService {
  constructor() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  private data = this.http.get('/api').pipe(takeUntilDestroyed());
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class TestService {
  private data = this.http.get('/api').pipe(takeUntilDestroyed());
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({ name: 'myPipe' })
class MyPipe {
  private data = this.http.get('/api').pipe(takeUntilDestroyed());
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Service()
class TestService {
  private data = this.http.get('/api').pipe(takeUntilDestroyed());
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const MY_TOKEN = new InjectionToken('<example-value>', {
  factory: () => {
    return someObservable.pipe(takeUntilDestroyed());
  }
});
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngOnInit() {
    this.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  doSomething() {
    this.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class TestService {
  loadData() {
    this.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  providers: [
    {
      provide: SomeToken,
      useFactory: () => data$.pipe(takeUntilDestroyed())
    }
  ]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  #myObservable = new Subject();

  constructor() {
    this.#someLogic();
  }

  #someLogic() {
    this.#myObservable.pipe(takeUntilDestroyed()).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  constructor() {
    this.initSubscriptions();
  }

  private initSubscriptions() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  constructor() {
    this.setup();
  }

  private setup() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class TestService {
  constructor() {
    this.init();
  }

  private init() {
    this.data$.pipe(takeUntilDestroyed()).subscribe();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  private data = this.init();

  constructor() {
    this.init();
  }

  private init() {
    return this.data$.pipe(takeUntilDestroyed());
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-implicit-take-until-destroyed": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  constructor() {
    this.init(0);
  }

  private init(attempt: number) {
    if (attempt < 3) {
      this.init(attempt + 1);
    }
    this.data$.pipe(takeUntilDestroyed()).subscribe();
  }
}
```
