---
title: "@angular-eslint/no-output-rename"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-output-rename.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-output-rename`

Ensures that output bindings are not aliased

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Renaming outputs creates a confusing situation where the output has one name inside the component class (private name) and a different name in templates (public name). For example, with the @Output() decorator: '@Output("userDeleted") delete = new EventEmitter()' means you call 'this.delete.emit()' in the component but bind with '(userDeleted)' in templates. Similarly, with the output() function: 'userDeleted = output({ alias: "delete" })' means you call 'this.userDeleted.emit()' internally but bind with '(delete)' in templates. This dual naming makes the code harder to understand, complicates refactoring, and can cause bugs when developers forget which name to use in which context. Keep the internal and external names the same unless you have a strong reason for the mismatch.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  outputs: ['a: b']
            ~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  inputs: ['abort'],
  'outputs': [boundary, `test: copy`],
                        ~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  ['outputs']: ['orientation: orientation'],
                ~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  [`outputs`]: ['orientation: orientation'],
                ~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Custom() @Output(`change`) _change = getOutput();
                    ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  _change = output({ alias: `change` });
                            ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Output('change') change = (this.subject$ as Subject<{blur: boolean}>).pipe();
          ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  change = output({ alias: 'change' });
                           ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Output(`devicechange`) get getter() {}
          ~~~~~~~~~~~~~~

  @Output() test: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'foo'
})
class Test {
  @Output('fooColor') colors: string;
          ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'foo'
})
class Test {
  colors = output({ alias: 'fooColor' });
                           ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  'selector': 'foo'
})
class Test {
  @Output('foocolor') color: string;
          ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  'selector': 'foo'
})
class Test {
  color = output({ alias: 'foocolor' });
                          ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'kebab-case',
})
class Test {}

@Injectable()
class Test {
  @Output('kebab-case') blur = this.getOutput();
          ~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'kebab-case',
})
class Test {}

@Injectable()
class Test {
  blur = output({ alias: 'kebab-case' });
                         ~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  'selector': 'foo'
})
class Test {
  color = output({ alias: 'test', after: 'it' });
                          ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  'selector': 'foo'
})
class Test {
  color = output({ before: 'it', alias: 'test', });
                                        ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  'selector': 'foo'
})
class Test {
  color = output({ before: 'it', alias: 'test' });
                                        ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  'selector': 'foo'
})
class Test {
  color = output({ before: 'it', alias: 'test', after: 'it' });
                                        ~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
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
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Page({
  outputs: ['play', popstate, `online`, 'obsolete: obsol', 'store: storage'],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  change = new EventEmitter();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  @Output() buttonChange = new EventEmitter<'change'>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  buttonChange = output<'change'>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  outputs,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  outputs: [...test],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  outputs: func(),
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  outputs: [func(), 'a'],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  @Output() get getter() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const change = 'change';
@Component()
class Test {
  @Output(change) touchMove: EventEmitter<{ action: 'click' | 'close' }> = new EventEmitter<{ action: 'click' | 'close' }>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const change = 'change';
@Component()
class Test {
  touchMove = output<{ action: 'click' | 'close' }>({ alias: change });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const blur = 'blur';
const click = 'click';
@Directive()
class Test {
  @Output(blur) [click]: EventEmitter<Blur>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const blur = 'blur';
const click = 'click';
@Directive()
class Test {
  [click] = output({ alias: blur });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo[bar]'
})
class Test {
  @Output() bar: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo[bar]'
})
class Test {
  bar = output();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  'selector': 'foo',
  'outputs': [`test: foo`]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  'selector': 'foo',
  ['outputs']: [`test: foo`]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
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
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: '[foo], test',
})
class Test {
  @Output('foo') label: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: '[foo], test',
})
class Test {
  label = output({ alias: 'foo' });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo',
  hostDirectives: [{
    directive: CdkMenuItem,
    outputs: ['cdkMenuItemTriggered: triggered'],
  }]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo',
  'hostDirectives': [{
    directive: CdkMenuItem,
    outputs: ['cdkMenuItemTriggered: triggered'],
  }]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo',
  ['hostDirectives']: [{
    directive: CdkMenuItem,
    outputs: ['cdkMenuItemTriggered: triggered'],
  }]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'foo'
})
class Test {
  @Output('fooMyColor') myColor: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'foo'
})
class Test {
  myColor = output({ alias: 'fooMyColor' });
}
```
