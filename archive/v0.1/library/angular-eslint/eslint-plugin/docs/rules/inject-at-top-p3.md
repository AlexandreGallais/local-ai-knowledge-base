---
title: "@angular-eslint/inject-at-top (part 3 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/inject-at-top.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/inject-at-top (part 3 of 3)

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
  private readonly client = (() => inject(ApiClient))();
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
  private count = 0;
  private readonly strategyFactory = () => (cond ? inject(PrimaryStrategy) : inject(FallbackStrategy));
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
  private count = 0;
  private readonly userServiceFactory = withFactory(() => inject(UserService));
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
  private count = 0;
  private readonly apiClient = new ApiClient(function () { return inject(HttpClient); });
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
  private count = 0;
  private readonly handlersFactory = () => collectHandlers([inject(HandlerA), inject(HandlerB)]);
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
  private count = 0;
  private readonly t = injectTranslations();
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

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private readonly t = injectTranslations();
  private count = 0;
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

#### ✅ Valid Code

```ts
@Injectable()
class MyService {
  private readonly http = inject(HttpClient);
  private readonly t = injectTranslations();
  private readonly flags = injectFeatureFlags();

  doThing() {}
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

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly t = injectTranslationsLater();
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

#### ✅ Valid Code

```ts
@Component({})
class MyComponent {
  private count = 0;
  private readonly translationsFactory = () => injectTranslations();
}
```
