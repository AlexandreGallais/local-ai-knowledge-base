---
title: "@angular-eslint/contextual-decorator (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/contextual-decorator.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/contextual-decorator (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({
  providedIn: 'root'
})
class Test {
  @Input()
  ~~~~~~~~
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }
  private _label: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({
  providedIn: 'root'
})
class Test {
  @Input()
  ~~~~~~~~
  set label(value: string) {
    this._label = value;
  }
  get label(): string {
    return this._label;
  }
  private _label: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({
  providedIn: 'root'
})
class Test {
  @ViewChild(Pane)
  ~~~~~~~~~~~~~~~~
  set label(value: Pane) {
    doSomething();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({
  providedIn: 'root'
})
class Test {
  @HostListener('mouseover')
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  mouseOver() {
    this.doSomething();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({
  providedIn: 'root'
})
class Test {
  constructor(
    @Attribute('test') private readonly test: string
    ~~~~~~~~~~~~~~~~~~
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({
  providedIn: 'root'
})
class Test {
  @ContentChild(Pane) pane: Pane;
  ~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({
  providedIn: 'root'
})
class Test {
  @ContentChildren(Pane, { descendants: true }) arbitraryNestedPanes: QueryList<Pane>;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({
  providedIn: 'root'
})
class Test {
  @HostBinding('class.card-outline') private isCardOutline: boolean;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  providers: []
})
class Test {
  @Input() label: string;
  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  providers: []
})
class Test {
  @Output() emitter = new EventEmitter<void>();
  ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  providers: []
})
class Test {
  @ViewChild(Pane) pane: Pane;
  ~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  providers: []
})
class Test {
  @ViewChildren(Pane) panes: QueryList<Pane>;
  ~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  providers: []
})
class Test {
  @ContentChild(Pane) pane: Pane;
  ~~~~~~~~~~~~~~~~~~~

  @Input()
  ~~~~~~~~
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }
  private _label: string;

  @ViewChild(Pane)
  ~~~~~~~~~~~~~~~~
  set label(value: Pane) {
    doSomething();
  }

  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }
  private _type: string;

  private prop: string | undefined;

  constructor(
    @Attribute('test') private readonly test: string,
    ~~~~~~~~~~~~~~~~~~
    @Inject(LOCALE_ID) localeId: string
  ) {}

  @HostListener('mouseover')
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  mouseOver() {
    this.doSomething();
  }

  clickHandler(): void {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @Input()
  ~~~~~~~~
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }
  private _label: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @Input()
  ~~~~~~~~
  set label(value: string) {
    this._label = value;
  }
  get label(): string {
    return this._label;
  }
  private _label: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @ViewChild(Pane)
  ~~~~~~~~~~~~~~~~
  set label(value: Pane) {
    doSomething();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @HostListener('mouseover')
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  mouseOver() {
    this.doSomething();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  constructor(
    @Attribute('test') private readonly test: string
    ~~~~~~~~~~~~~~~~~~
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @ContentChild(Pane) pane: Pane;
  ~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @ContentChildren(Pane, { descendants: true }) arbitraryNestedPanes: QueryList<Pane>;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @HostBinding('class.card-outline') private isCardOutline: boolean;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @Input() label: string;
  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @Output() emitter = new EventEmitter<void>();
  ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @ViewChild(Pane) pane: Pane;
  ~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @ViewChildren(Pane) panes: QueryList<Pane>;
  ~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  name: 'test'
})
class Test {
  @ContentChild(Pane) pane: Pane;
  ~~~~~~~~~~~~~~~~~~~

  @Input()
  ~~~~~~~~
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }
  private _label: string;

  @ViewChild(Pane)
  ~~~~~~~~~~~~~~~~
  set label(value: Pane) {
    doSomething();
  }

  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }
  private _type: string;

  private prop: string | undefined;

  constructor(
    @Attribute('test') private readonly test: string,
    ~~~~~~~~~~~~~~~~~~
    @Inject(LOCALE_ID) localeId: string
  ) {}

  @HostListener('mouseover')
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  mouseOver() {
    this.doSomething();
  }

  clickHandler(): void {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Service()
class Test {
  @Input() label: string;
  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Service()
class Test {
  @Output() emitter = new EventEmitter<void>();
  ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'test'
})
class TestDirective {
  @Input() label: string;
}

@Pipe({
  name: 'test'
})
class Test {
  @Input() label: string;
  ~~~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @Input()
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }
  private _label: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @Input()
  set label(value: string) {
    this._label = value;
  }
  get label(): string {
    return this._label;
  }
  private _label: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @ViewChild(Pane)
  set label(value: Pane) {
    doSomething();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @HostListener('mouseover')
  mouseOver() {
    this.doSomething();
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  constructor(
    @Host() private readonly host: DynamicHost
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  constructor(
    @Inject(LOCALE_ID) private readonly localeId: string
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  constructor(
    @Optional() testBase: TestBase,
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  constructor(
    @Self() public readonly test: Test,
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  constructor(
    @SkipSelf() protected readonly parentTest: ParentTest
  ) {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @ContentChild(Pane) pane: Pane;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @ContentChildren(Pane, { descendants: true }) arbitraryNestedPanes: QueryList<Pane>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @HostBinding('class.card-outline') private isCardOutline: boolean;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @Input() label: string;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @Output() emitter = new EventEmitter<void>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @ViewChild(Pane)
  set pane(value: Pane) {
    console.log('panel setter called');
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @ViewChildren(Pane) panes: QueryList<Pane>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/contextual-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code
