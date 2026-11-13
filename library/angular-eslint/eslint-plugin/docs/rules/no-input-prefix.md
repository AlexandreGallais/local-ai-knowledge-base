---
title: "@angular-eslint/no-input-prefix"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-input-prefix.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-input-prefix`

Ensures that input bindings, including aliases, are not named or prefixed by the configured disallowed prefixes

- Type: suggestion

## Rationale

In HTML and Angular templates, attributes don't use prefixes like 'is' or 'has', so input properties shouldn't either. For example, prefer '@Input() disabled' over '@Input() isDisabled', so it's used in templates as '[disabled]="true"' rather than '[isDisabled]="true"'. This creates a more natural, HTML-like API for your components and follows Angular's style guide. The component class can still use prefixed names internally, but the input binding name (the public API) should follow HTML conventions.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `[]`
   */
  prefixes?: string[];
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  inputs: ['on']
           ~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  outputs: [onCredit],
  'inputs': [onLevel, `test: on`, onFunction()],
                      ~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  ['inputs']: ['onTest: test', ...onArray],
               ~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  [`inputs`]: ['onTest: test', ...onArray],
               ~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Input() on: EventEmitter<any> = new EventEmitter<{}>();
           ~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Input() @Custom('on') 'onPrefix' = new EventEmitter<void>();
                         ~~~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Custom() @Input(`on`) _on = getInput();
                   ~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Custom() @Input({ required: true, alias: `on` }) _on = getInput();
                                            ~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Input('onPrefix') _on = (this.subject$ as Subject<{on: boolean}>).pipe();
         ~~~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Input({ alias: 'onPrefix', required: true }) _on = (this.subject$ as Subject<{on: boolean}>).pipe();
                  ~~~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Input('setter') set 'on-setter'() {}
                       ~~~~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Input(`onSetter`) set setter() {}
         ~~~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on",
          "is",
          "should"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  @Input('on') isPrefix = this.getInput();
         ~~~~  ~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Input() on: string = 'on';
           ~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  @Input('on') isPrefix = `on`;
         ~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Page({
  inputs: ['on', onChange, `onLine`, 'on: on2', 'offline: on', ...onCheck, onInput()],
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  on = new EventEmitter();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  @Input() buttonChange = new EventEmitter<'on'>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  @Input() On = new EventEmitter<{ on: onType }>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  @Input(`one`) ontype = new EventEmitter<{ bar: string, on: boolean }>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  @Input({ alias: `one` }) ontype = new EventEmitter<{ bar: string, on: boolean }>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  @Input('oneProp') common = new EventEmitter<ComplextOn>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  @Input({ alias: 'oneProp' }) common = new EventEmitter<ComplextOn>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test<On> {
  @Input() ON = new EventEmitter<On>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const on = 'on';
@Component()
class Test {
  @Input(on) touchMove: EventEmitter<{ action: 'on' | 'off' }> = new EventEmitter<{ action: 'on' | 'off' }>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const test = 'on';
const on = 'on';
@Directive()
class Test {
  @Input(test) [on]: EventEmitter<OnTest>;
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error",
      {
        "prefixes": [
          "on"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  @Input() notOn: string = 'on';
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo',
  'inputs': [`test: foo`]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'foo',
  ['inputs']: [`test: foo`]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo',
  [`inputs`]: [`test: foo`]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'foo',
})
class Test {
  @Input() set 'setter'() {}
}
```
