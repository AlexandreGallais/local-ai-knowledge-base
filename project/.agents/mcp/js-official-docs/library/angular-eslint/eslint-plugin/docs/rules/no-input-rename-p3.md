---
title: "@angular-eslint/no-input-rename (part 3 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-input-rename.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/no-input-rename (part 3 of 3)

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
  touchMove = input(1, { alias: change });
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
  touchMove = input.required<number>({ alias: change });
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
const blur = 'blur';
const click = 'click';
@Directive()
class Test {
  @Input(blur) [click]: EventEmitter<Blur>;
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
const blur = 'blur';
const click = 'click';
@Directive()
class Test {
  [click] = input(1, { alias: blur });
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
const blur = 'blur';
const click = 'click';
@Directive()
class Test {
  [click] = input.required<number>({ alias: blur });
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
  selector: 'foo[bar]'
})
class Test {
  @Input() bar: string;
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
  selector: 'foo[bar]'
})
class Test {
  bar = input(1);
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
  selector: 'foo[bar]'
})
class Test {
  bar = input.required<number>();
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
@Directive({
  'selector': 'foo',
  'inputs': [`test: foo`]
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
  'selector': 'foo',
  ['inputs']: [`test: foo`]
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
  'selector': 'foo',
  [`inputs`]: [`test: foo`]
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
  selector: '[foo], test',
})
class Test {
  @Input('foo') label: string;
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
  selector: '[foo], test',
})
class Test {
  label = input(1, { alias: 'foo' });
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
  selector: '[foo], test',
})
class Test {
  label = input.required<number>(1, { alias: 'foo' });
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
@Directive({
  selector: 'foo'
})
class Test {
  @Input('aria-label') ariaLabel: string;
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
@Directive({
  selector: 'foo'
})
class Test {
  ariaLabel = input(1, { alias: 'aria-label' });
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
@Directive({
  selector: 'foo'
})
class Test {
  ariaLabel = input.required<number>('aria-label');
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

#### ✅ Valid Code

```ts
@Component({
  inputs: ['foo: allowedName']
})
class Test {
  @Input() bar: string;
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
@Directive({
  selector: 'foo'
})
class Test {
  @Input('fooMyColor') myColor: string;
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
@Directive({
  selector: 'foo'
})
class Test {
  myColor = input(1, { alias: 'fooMyColor' });
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
@Directive({
  selector: 'foo'
})
class Test {
  myColor = input.required<number>('fooMyColor');
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
@Directive({
  selector: 'img[fooDirective]'
})
class Test {
  @Input foo: Foo;
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
@Directive({
  selector: 'img[fooDirective]'
})
class Test {
  foo = input(1);
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
@Directive({
  selector: 'img[fooDirective]'
})
class Test {
  foo = input.required<number>();
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
@Directive({
  selector: 'img[fooDirective]'
})
class Test {
  @Input('fooDirective') foo: Foo;
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
@Directive({
  selector: 'img[fooDirective]'
})
class Test {
  foo = input(1, { alias: 'fooDirective' });
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
@Directive({
  selector: 'img[fooDirective]'
})
class Test {
  foo = input.required<number>({ alias: 'fooDirective' });
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
  selector: 'foo'
})
class Test {
  @Input({ required: true }) name: string;
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
  selector: 'foo'
})
class Test {
  @Input({ transform: (val) => val ?? '', required: true }) foo!: string;
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
  selector: 'foo'
})
class Test {
  foo = input.required<string>({ transform: (val) => val ?? '' });
}
```
