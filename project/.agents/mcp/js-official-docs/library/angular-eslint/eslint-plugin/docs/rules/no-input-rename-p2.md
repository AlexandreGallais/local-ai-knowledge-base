---
title: "@angular-eslint/no-input-rename (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-input-rename.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/no-input-rename (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  inputs: ['a: b']
           ~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error",
      {
        "allowedNames": [
          "check",
          "test"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  outputs: ['abort'],
  'inputs': [boundary, `test: copy`, 'check: check'],
                       ~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  ['inputs']: ['orientation: orientation'],
               ~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  [`inputs`]: ['orientation: orientation'],
               ~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Custom() @Input(`change`) _change = getInput();
                   ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  _change = input(1, { alias: `change` });
                              ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  _change = input.required<number>({ alias: `change` });
                                            ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Input('change') change = (this.subject$ as Subject<{blur: boolean}>).pipe();
         ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  change = input(1, { alias: 'change' });
                             ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  change = input.required<number>({ alias: 'change' });
                                           ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Input({ alias: 'change' }) change = (this.subject$ as Subject<{blur: boolean}>).pipe();
                  ~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error",
      {
        "allowedNames": [
          "allowedName"
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
  @Input(`devicechange`) set setter(setter: string) {}
         ~~~~~~~~~~~~~~

  @Input('allowedName') test: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  @Input('aria-invalid') ariaBusy: string;
         ~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  ariaBusy = input(1, { alias: 'aria-invalid' });
                               ~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  ariaBusy = input.required<number>({ alias: 'aria-invalid' });
                                             ~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'foo'
})
class Test {
  @Input('fooColor') colors: string;
         ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'foo'
})
class Test {
  colors = input(1, { alias: 'fooColor' });
                             ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'foo'
})
class Test {
  colors = input.required<number>({ alias: 'fooColor' });
                                           ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  'selector': 'foo'
})
class Test {
  @Input('foocolor') color: string;
         ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  'selector': 'foo'
})
class Test {
  color = input(1, { alias: 'foocolor' });
                            ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  'selector': 'foo'
})
class Test {
  color = input.required<number>({ alias: 'foocolor' });
                                          ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'click',
})
class Test {}

@Injectable()
class Test {
  @Input('click') blur = this.getInput();
         ~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'click',
})
class Test {}

@Injectable()
class Test {
  blur = input(1, { alias: 'click' });
                           ~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'click',
})
class Test {}

@Injectable()
class Test {
  blur = input.required<number>({ alias: 'click' });
                                         ~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'img[fooDirective]',
})
class Test {
  @Input('notFooDirective') foo: Foo;
         ~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'img[fooDirective]',
})
class Test {
  foo = input({ alias: 'notFooDirective' });
                       ~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'img[fooDirective]',
})
class Test {
  foo = input.required<number>({ alias: 'notFooDirective' });
                                        ~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  color = input(1, { alias: 'test', after: 'it' });
                            ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  color = input.required<number>({ alias: 'test', after: 'it' });
                                          ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  color = input(1, { before: 'it', alias: 'test', });
                                          ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  color = input.required<number>({ before: 'it', alias: 'test', });
                                                        ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  color = input(1, { before: 'it', alias: 'test' });
                                          ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  color = input.required<number>({ before: 'it', alias: 'test' });
                                                        ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  color = input(1, { before: 'it', alias: 'test', after: 'it' });
                                          ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  color = input.required<number>({ before: 'it', alias: 'test', after: 'it' });
                                                        ~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Page({
  inputs: ['play', popstate, `online`, 'obsolete: obsol', 'store: storage'],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  @Input() buttonChange = new EventEmitter<'change'>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  buttonChange = input(1);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  buttonChange = input.required<number>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  inputs,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  inputs: [...test],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  inputs: func(),
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  inputs: [func(), 'a'],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'qx-menuitem',
  hostDirectives: [{
    directive: CdkMenuItem,
    inputs: ['cdkMenuItemDisabled: disabled'],
  }]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'qx-menuitem',
  'hostDirectives': [{
    directive: CdkMenuItem,
    inputs: ['cdkMenuItemDisabled: disabled'],
  }]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'qx-menuitem',
  ['hostDirectives']: [{
    directive: CdkMenuItem,
    inputs: ['cdkMenuItemDisabled: disabled'],
  }]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  @Input() set setter(setter: string) {}
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
      "error",
      {
        "allowedNames": [
          "aria-wrong"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  inputs: ['foo: aria-wrong']
})
class Test {
  @Input('aria-wrong') set setter(setter: string) {}
  func = input(1, { alias: 'aria-wrong' });
  required = input.required<number>({ alias: 'aria-wrong' });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-input-rename": [
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
  @Input(change) touchMove: EventEmitter<{ action: 'click' | 'close' }> = new EventEmitter<{ action: 'click' | 'close' }>();
}
```

---

#### Default Config
