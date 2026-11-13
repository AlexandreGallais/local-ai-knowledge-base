---
title: "@angular-eslint/sort-keys-in-type-decorator (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/sort-keys-in-type-decorator.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/sort-keys-in-type-decorator (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "imports",
          "standalone",
          "templateUrl",
          "styleUrl",
          "encapsulation",
          "changeDetection"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  selector: 'app-root',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
class Test {
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Directive": [
          "selector",
          "standalone"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  standalone: true,
  ~~~~~~~~~~~~~~~~
  selector: '[app-test]'
})
class Test {
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "NgModule": [
          "declarations",
          "imports"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  imports: [CommonModule],
  ~~~~~~~~~~~~~~~~~~~~~~~
  declarations: [AppComponent]
})
class Test {
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Pipe": [
          "name",
          "standalone"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  standalone: true,
  ~~~~~~~~~~~~~~~~
  name: 'myPipe'
})
class Test {
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "imports",
          "standalone",
          "templateUrl",
          "styleUrl",
          "encapsulation",
          "changeDetection"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styleUrl: './app.component.css',
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  selector: 'app-root',
  templateUrl: './app.component.html'
})
class Test {
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "NgModule": [
          "declarations",
          "imports",
          "exports",
          "providers",
          "bootstrap"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule({
  exports: [AppComponent],
  ~~~~~~~~~~~~~~~~~~~~~~~
  declarations: [AppComponent]
})
class Test {
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "styleUrl"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styleUrl: './app.component.css', // Inline comment for styleUrl
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  selector: 'app-root' // Inline comment for selector
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "styleUrl"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  // Comment above styleUrl
  styleUrl: './app.component.css',
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Comment above selector
  selector: 'app-root'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "styleUrl"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  /* This is a multi-line comment
     above styleUrl property */
  styleUrl: './app.component.css',
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* This is a multi-line comment
     above selector property */
  selector: 'app-root'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "imports",
          "standalone",
          "templateUrl",
          "styleUrl",
          "encapsulation",
          "changeDetection"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  // Comment above changeDetection
  changeDetection: ChangeDetectionStrategy.OnPush, // Inline comment for changeDetection
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* Multi-line comment
     above selector */
  selector: 'app-root', /* Inline multi-line comment after selector */
  // Comment above imports
  imports: [
    // Comment inside imports array
    CommonModule, // Comment after CommonModule
    FormsModule /* Comment after FormsModule */
  ],
  /* Comment above standalone */
  standalone: true, // Comment after standalone
  // Comment above templateUrl
  templateUrl: './app.component.html',
  /* Multi-line comment
     above styleUrl */
  styleUrl: './app.component.css',
  // Comment above encapsulation
  encapsulation: ViewEncapsulation.None /* Inline comment for encapsulation */
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "imports",
          "standalone",
          "templateUrl",
          "styleUrl",
          "encapsulation",
          "changeDetection"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styleUrl: './app.component.css',
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MyService, myProvider]
})
class Test {
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector"
        ],
        "allowUnconfiguredProperties": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  custom: true
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "template"
        ],
        "allowUnconfiguredProperties": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  template: '<div></div>',
  custom: true,
  selector: 'app-root'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({
  useFactory: createService,
  providedIn: 'root'
})
class TestService {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-test',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './test.component.html',
  template: '<div>Test</div>',
  styleUrl: './test.component.css',
  styleUrls: ['./test.component.css'],
  styles: ['div { color: red; }'],
  providers: [TestService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [ViewService],
  host: { '[class.test]': 'true' },
  hostDirectives: [TestDirective],
  inputs: ['value'],
  outputs: ['change'],
  animations: [trigger('test', [])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exportAs: 'appTest',
  queries: { contentChild: new ContentChild('test') },
  preserveWhitespaces: false,
  jit: true,
  moduleId: 'test-module',
  interpolation: ['{{', '}}']
})
export class TestComponent {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: '[appTest]',
  standalone: true,
  providers: [TestService],
  host: { '[class.test]': 'true' },
  hostDirectives: [OtherDirective],
  inputs: ['value'],
  outputs: ['change'],
  exportAs: 'appTest',
  queries: { contentChild: new ContentChild('test') },
  jit: true
})
export class TestDirective {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule({
  id: 'test-module',
  imports: [CommonModule],
  declarations: [TestComponent],
  providers: [TestService],
  exports: [TestComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  jit: true
})
export class TestModule {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'testPipe',
  standalone: true,
  pure: false
})
export class TestPipe {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Type({
  a: 'a',
  b: 'b',
  c: 'c'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Type({})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Type({
  a: 'a'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "imports",
          "standalone",
          "templateUrl",
          "styleUrl",
          "encapsulation",
          "changeDetection"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-root',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Directive": [
          "selector",
          "standalone"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: '[app-test]',
  standalone: true
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "NgModule": [
          "declarations",
          "imports"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule]
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Pipe": [
          "name",
          "standalone"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'myPipe',
  standalone: true
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "imports",
          "standalone",
          "templateUrl",
          "styleUrl",
          "encapsulation",
          "changeDetection"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "NgModule": [
          "declarations",
          "imports",
          "exports",
          "providers",
          "bootstrap"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule({
  declarations: [AppComponent],
  exports: [AppComponent]
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "imports",
          "standalone",
          "templateUrl",
          "styleUrl",
          "encapsulation",
          "changeDetection"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  // Comment above selector
  selector: 'app-root', // Inline comment for selector
  /* Multi-line comment
     above imports */
  imports: [
    CommonModule,
    FormsModule
  ], // Inline comment after imports
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // Comment above encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "NgModule": [
          "declarations",
          "imports",
          "exports",
          "providers",
          "bootstrap"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule({
  // Leading comment for declarations
  declarations: [
    /* Component list comment */
    AppComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule, // Common module comment
    RouterModule /* Router module comment */
  ],
  /* Multi-line export comment
     with multiple lines
     before the property */
  exports: [AppComponent]
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector"
        ],
        "allowUnconfiguredProperties": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-root',
  custom: true
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "selector",
          "template"
        ],
        "allowUnconfiguredProperties": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-root',
  template: '<div></div>'
})
class Test {}
```

---

#### Custom Config
