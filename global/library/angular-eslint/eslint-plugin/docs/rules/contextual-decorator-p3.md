---
title: "@angular-eslint/contextual-decorator (part 3 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/contextual-decorator.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/contextual-decorator (part 3 of 3)

```ts
@Component({
  template: 'Hi!'
})
class Test {
  @ContentChild(Pane) pane: Pane;

  @Input()
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }
  private _label: string;

  @ViewChild(Pane)
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
    @Host() @Optional() private readonly host: DynamicHost,
    @Inject(LOCALE_ID) private readonly localeId: string,
    @Inject(TEST_BASE) @Optional() testBase: TestBase,
    @Optional() @Self() public readonly test: Test,
    @Optional() @SkipSelf() protected readonly parentTest: ParentTest
  ) {}

  @HostListener('mouseover')
  mouseOver(): void {
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

#### ✅ Valid Code

```ts
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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
@Directive({
  selector: 'test'
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

```ts
@Directive({
  selector: 'test'
})
class Test {
  @ContentChild(Pane) pane: Pane;

  @Input()
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }
  private _label: string;

  @ViewChild(Pane)
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
    @Host() @Optional() private readonly host: DynamicHost,
    @Inject(LOCALE_ID) private readonly localeId: string,
    @Inject(TEST_BASE) @Optional() testBase: TestBase,
    @Optional() @Self() public readonly test: Test,
    @Optional() @SkipSelf() protected readonly parentTest: ParentTest
  ) {}

  @HostListener('mouseover')
  mouseOver(): void {
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

#### ✅ Valid Code

```ts
@Injectable({
  providedIn: 'root'
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
@Injectable({
  providedIn: 'root'
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
@Injectable({
  providedIn: 'root'
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
@Injectable({
  providedIn: 'root'
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
@Injectable({
  providedIn: 'root'
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
@Injectable({
  providedIn: 'root'
})
class Test {
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }
  private _type: string;

  private prop: string | undefined;

  constructor(
    @Host() @Optional() private readonly host: DynamicHost,
    @Inject(LOCALE_ID) private readonly localeId: string,
    @Inject(TEST_BASE) @Optional() testBase: TestBase,
    @Optional() @Self() public readonly test: Test,
    @Optional() @SkipSelf() protected readonly parentTest: ParentTest
  ) {}

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

#### ✅ Valid Code

```ts
@NgModule({
  providers: []
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
@NgModule({
  providers: []
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
@NgModule({
  providers: []
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
@NgModule({
  providers: []
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
@NgModule({
  providers: []
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
@NgModule({
  providers: []
})
class Test {
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }
  private _type: string;

  private prop: string | undefined;

  constructor(
    @Host() @Optional() private readonly host: DynamicHost,
    @Inject(LOCALE_ID) private readonly localeId: string,
    @Inject(TEST_BASE) @Optional() testBase: TestBase,
    @Optional() @Self() public readonly test: Test,
    @Optional() @SkipSelf() protected readonly parentTest: ParentTest
  ) {}

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

#### ✅ Valid Code

```ts
@Pipe({
  name: 'test'
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
@Pipe({
  name: 'test'
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
@Pipe({
  name: 'test'
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
@Pipe({
  name: 'test'
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
@Pipe({
  name: 'test'
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
@Pipe({
  name: 'test'
})
class Test {
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }
  private _type: string;

  private prop: string | undefined;

  constructor(
    @Host() @Optional() private readonly host: DynamicHost,
    @Inject(LOCALE_ID) private readonly localeId: string,
    @Inject(TEST_BASE) @Optional() testBase: TestBase,
    @Optional() @Self() public readonly test: Test,
    @Optional() @SkipSelf() protected readonly parentTest: ParentTest
  ) {}

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

#### ✅ Valid Code

```ts
@Service()
class Test {
  constructor(
    @Optional() testBase: TestBase,
    @Inject(LOCALE_ID) private readonly localeId: string,
    @Self() public readonly test: Test,
    @SkipSelf() protected readonly parentTest: ParentTest,
    @Host() private readonly host: DynamicHost,
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
@Injectable()
class TestService {
  constructor() {}
}

@Component({
  selector: 'app-test',
  template: '<h1>Hello</h1>',
  providers: [TestService]
})
class TestComponent implements OnChanges {
  @Output() emitter = new EventEmitter<void>();

  constructor(private test: TestService) {}
}
```
