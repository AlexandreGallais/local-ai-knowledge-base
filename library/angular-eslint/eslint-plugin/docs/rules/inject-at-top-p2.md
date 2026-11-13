---
title: "@angular-eslint/inject-at-top (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/inject-at-top.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/inject-at-top (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  protected readonly pageTitle = `Dashboard ${this.fullName}`;

  private get fullName() {
    return `${this.userService.firstName} ${this.userService.lastName}`.trim();
  }

  private readonly userService = inject(UserService);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class MyService {
  private count = 0;
  private readonly http = inject(HttpClient);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({})
class MyDirective {
  doThing() {}

  private readonly myService = inject(MyService);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  constructor() {}

  private readonly myService = inject(MyService);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class MyService {
  private readonly http = inject(HttpClient);
  private count = 0;
  private readonly router = inject(Router);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  protected readonly pageTitle = `Dashboard ${this.fullName}`;

  private get fullName() {
    return `${this.userService.firstName} ${this.userService.lastName}`.trim();
  }

  private readonly userService = inject(UserService);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  private readonly router = inject(Router);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly strategy = cond ? inject(PrimaryStrategy) : inject(FallbackStrategy);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly logger = inject(LoggerService, { optional: true }) ?? noopLogger;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly config = inject(AppConfig, { optional: true })!;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly featureFlags = inject(FlagsService) as FeatureFlags;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly tracedHttp = withTracing(inject(HttpClient));
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly apiClient = new ApiClient(inject(HttpClient));
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly handlers = [inject(HandlerA), inject(HandlerB)];
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly deps = { users: inject(UserService) };
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly userService = (audit(), inject(UserService));
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly currentUserId = `${inject(UserService).id}`;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly client = (() => inject(ApiClient))();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly services = collectServices([inject(UserService), { router: inject(Router) }]);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly legacyClient = (function () { return inject(ApiClient); })();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly tracedClient = (() => withTracing(inject(ApiClient)))();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Service()
class UserService {
  private get baseUrl() {
    return this.http.baseUrl;
  }

  private readonly http = inject(HttpClient);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error",
      {
        "additionalInjectFunctions": [
          "injectTranslations"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly t = injectTranslations();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error",
      {
        "additionalInjectFunctions": [
          "inject[A-Z].*"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class MyService {
  private readonly http = inject(HttpClient);
  private count = 0;
  private readonly flags = injectFeatureFlags();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error",
      {
        "additionalInjectFunctions": [
          "injectTranslations"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly t = withScope(injectTranslations());
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class PlainClass {
  private get userName() {
    return this.userService.name;
  }
  private readonly userService = inject(UserService);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly userService = inject(UserService);

  protected readonly pageTitle = `Dashboard ${this.fullName}`;

  private get fullName() {
    return `${this.userService.firstName} ${this.userService.lastName}`.trim();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class MyService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly config = inject(CONFIG_TOKEN);

  doThing() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private value = 42;
  private get doubled() {
    return this.value * 2;
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class MyDirective {
  private readonly optional = inject(SOME_TOKEN, { optional: true });
  foo() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({ name: 'x' })
class MyPipe {
  static readonly DEFAULT = 'default';
  private readonly myService = inject(MyService);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Service()
class UserService {
  private readonly http = inject(HttpClient);

  private get baseUrl() {
    return this.http.baseUrl;
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly count = 0;
  private readonly userServiceFactory = () => inject(UserService);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class MyService {
  private value = 0;
  build() {
    return inject(HttpClient);
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class MyDirective {
  private flag = false;
  private readonly userServiceFactory = function () { return inject(UserService); };
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly strategy = cond ? inject(PrimaryStrategy) : inject(FallbackStrategy);
  private count = 0;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly logger = inject(LoggerService, { optional: true }) ?? noopLogger;
  private count = 0;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly config = inject(AppConfig, { optional: true })!;
  private count = 0;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly featureFlags = inject(FlagsService) as FeatureFlags;
  private count = 0;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly tracedHttp = withTracing(inject(HttpClient));
  private count = 0;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly apiClient = new ApiClient(inject(HttpClient));
  private count = 0;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly handlers = [inject(HandlerA), inject(HandlerB)];
  private count = 0;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly deps = { users: inject(UserService) };
  private count = 0;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly userService = (audit(), inject(UserService));
  private count = 0;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/inject-at-top": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly currentUserId = `${inject(UserService).id}`;
  private count = 0;
}
```

---

#### Default Config
