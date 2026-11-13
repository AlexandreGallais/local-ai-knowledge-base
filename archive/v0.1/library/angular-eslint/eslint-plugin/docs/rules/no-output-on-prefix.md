---
title: "@angular-eslint/no-output-on-prefix"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-output-on-prefix.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-output-on-prefix`

Ensures that output bindings, including aliases, are not named "on", nor prefixed with it. See more at https://angular.dev/guide/components/outputs#choosing-event-names

- Type: suggestion

## Rationale

Angular's template syntax allows both '(eventName)' and 'on-eventName' for event bindings. If you prefix an output with 'on', this creates awkward template syntax like '(onUserClick)' or the even more redundant 'on-onUserClick'. This violates the principle of least surprise and makes templates harder to read. Instead, name outputs as simple actions or events (like 'userClick'), which Angular templates will bind as '(userClick)' or 'on-userClick'.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  outputs: ['on']
            ~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  inputs: [onCredit],
  'outputs': [onLevel, `test: on`, onFunction()],
                       ~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  ['outputs']: ['onTest: test', ...onArray],
                ~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  [`outputs`]: ['onTest: test', ...onArray],
                ~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Output() on: EventEmitter<any> = new EventEmitter<{}>();
            ~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  on = output();
  ~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Output() @Custom('on') 'onPrefix' = new EventEmitter<void>();
                          ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  'onPrefix' = output();
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Custom() @Output(`on`) _on = getOutput();
                    ~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  _on = output({ alias: `on` });
                        ~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Output('onPrefix') _on = (this.subject$ as Subject<{on: boolean}>).pipe();
          ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  _on = output({ alias: 'onPrefix' });
                        ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Output('getter') get 'on-getter'() {}
                        ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Output(`onGetter`) get getter() {}
          ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  @Output('on') onPrefix = this.getOutput();
          ~~~~  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  onPrefix = output({ alias: 'on' });
  ~~~~~~~~                   ~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Page({
  outputs: ['on', onChange, `onLine`, 'on: on2', 'offline: on', ...onCheck, onOutput()],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
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

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  @Output() buttonChange = new EventEmitter<'on'>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  buttonChange = output<'on'>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  @Output() On = new EventEmitter<{ on: onType }>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  On = output<{ on: onType }>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  @Output(`one`) ontype = new EventEmitter<{ bar: string, on: boolean }>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  ontype = output<{ bar: string, on: boolean }>({ alias: `one` });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  @Output('oneProp') common = new EventEmitter<ComplextOn>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  common = output<ComplextOn>({ alias: 'oneProp' });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test<On> {
  @Output() ON = new EventEmitter<On>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test<On> {
  ON = output<On>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const on = 'on';
@Component()
class Test {
  @Output(on) touchMove: EventEmitter<{ action: 'on' | 'off' }> = new EventEmitter<{ action: 'on' | 'off' }>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const on = 'on';
@Component()
class Test {
  touchMove = output<{ action: 'on' | 'off' }>({ alias: on });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
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
  @Output(test) [on]: EventEmitter<OnTest>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
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
  [on] = output<OnTest>({ alias: test });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo',
  'outputs': [`test: foo`]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'foo',
  ['outputs']: [`test: foo`]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  'selector': 'foo',
  [`outputs`]: [`test: foo`]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-on-prefix": [
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
  @Output() get 'getter'() {}
}
```
