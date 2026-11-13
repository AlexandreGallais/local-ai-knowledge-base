---
title: "@angular-eslint/prefer-inject"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-inject.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/prefer-inject`

Prefer using the inject() function over constructor parameter injection

- Type: suggestion

## Rationale

The inject() function is Angular's modern dependency injection API that offers several advantages over constructor-based injection. First, it enables dependency injection outside of constructors, allowing you to use DI in functions, factories, and even at the class field level. This makes code more flexible and composable. Second, inject() is more concise and reduces boilerplate - you don't need constructor parameter properties or manual field assignments. Third, inject() works naturally with modern TypeScript features and tree-shaking. Fourth, it's required for using many modern Angular features like functional guards, interceptors, and the new signal-based APIs. Angular provides an automated migration schematic (ng generate @angular/core:inject) to convert constructor injection to inject(), making adoption straightforward. This is the recommended approach for all new Angular code.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class UserService {
  constructor(private http: HttpClient) {}
              ~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Service()
class UserService {
  constructor(private http: HttpClient) {}
              ~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  constructor(
    private userService: UserService,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    private http: HttpClient
    ~~~~~~~~~~~~~~~~~~~~~~~~
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class ConfigService {
  constructor(
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class ConfigService {
  constructor(
    @Optional() private logger?: LoggerService,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class ConfigService {
  constructor(
    @Self() private control: NgControl,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class ConfigService {
  constructor(
    @SkipSelf() private skipSelfService: SkipSelfService,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class ConfigService {
  constructor(
    @Host() private hostService: HostService,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class ConfigService {
  constructor(
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @Optional() @Self() private logger?: LoggerService,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent extends BaseComponent {
  constructor(
    private service: MyService,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~
  ) {
    super();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  constructor(elementRef: ElementRef) {}
              ~~~~~~~~~~~~~~~~~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class PlainClass {
  constructor(private value: string) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class UserService {
  private http = inject(HttpClient);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Service()
class UserService {
  private http = inject(HttpClient);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  constructor() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent extends BaseComponent {
  constructor() {
    super();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-inject": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class Logger {
  constructor(level: string) {}
}
```
