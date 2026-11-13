---
title: "@angular-eslint/no-output-native"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-output-native.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-output-native`

Ensures that output bindings, including aliases, are not named as standard DOM events

- Type: suggestion

## Rationale

Naming an @Output() the same as a native DOM event (like 'click', 'change', or 'blur') creates ambiguous and confusing template bindings. For example, if a component has '@Output() click', the template '(click)="handler()"' could be binding to either the component's custom output OR the native DOM click event, depending on the context. This ambiguity leads to bugs and makes code harder to understand. Instead, use descriptive names that clearly indicate these are custom component events, such as 'userSelected' or 'itemDeleted' instead of generic names like 'click' or 'select'.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  'outputs': ['pagehide']
              ~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  inputs: ['abort'],
  ['outputs']: [boundary, `test: copy`],
                          ~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  inputs: ['abort'],
  [`outputs`]: [boundary, `test: copy`],
                          ~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  outputs: ['orientationchange: orientation'],
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Output() change: EventEmitter<any> = new EventEmitter<{}>();
            ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  change = output();
  ~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Output() @Custom('change') 'change' = new EventEmitter<void>();
                              ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  'change' = output();
  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Output('change') _change = (this.subject$ as Subject<{blur: boolean}>).pipe();
          ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  _change = output({ alias: 'change' });
                            ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  @Output('getter') get 'cut'() {}
                        ~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  @Output(`devicemotion`) get getter() {}
          ~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  @Output('click') blur = this.getOutput();
          ~~~~~~~  ~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  blur = output({ alias: 'click' });
  ~~~~                   ~~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  @Output() Drag = new EventEmitter<{ click: string }>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  Drag = output<{ click: string }>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  @Output(`changelower`) changeText = new EventEmitter<{ bar: string, blur: string }>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {
  changeText = output<{ bar: string, blur: string }>({ alias: `changelower` });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  @Output('buttonChange') changelower = new EventEmitter<ComplextObject>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  changelower = new output<ComplextObject>({ alias: 'buttonChange' });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test<SVGScroll> {
  @Output() SVgZoom = new EventEmitter<SVGScroll>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test<SVGScroll> {
   SVgZoom = output<SVGScroll>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
  [click] = output<Blur>({ alias: blur });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
    "@angular-eslint/no-output-native": [
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
