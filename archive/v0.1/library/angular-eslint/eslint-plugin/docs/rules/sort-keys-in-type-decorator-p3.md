---
title: "@angular-eslint/sort-keys-in-type-decorator (part 3 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/sort-keys-in-type-decorator.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/sort-keys-in-type-decorator (part 3 of 3)

```json
{
  "rules": {
    "@angular-eslint/sort-keys-in-type-decorator": [
      "error",
      {
        "Component": [
          "moduleId",
          "standalone",
          "signal",
          "selector",
          "imports",
          "template",
          "templateUrl",
          "styleUrl",
          "styleUrls",
          "styles",
          "encapsulation",
          "changeDetection",
          "providers",
          "viewProviders",
          "animations",
          "entryComponents",
          "preserveWhitespaces",
          "interpolation",
          "hostDirectives",
          "host"
        ],
        "Directive": [
          "standalone",
          "selector",
          "inputs",
          "outputs",
          "providers",
          "exportAs",
          "queries",
          "hostDirectives",
          "host",
          "jit"
        ],
        "Injectable": [
          "providedIn"
        ],
        "NgModule": [
          "id",
          "jit",
          "imports",
          "declarations",
          "providers",
          "exports",
          "entryComponents",
          "bootstrap",
          "schemas"
        ],
        "Pipe": [
          "standalone",
          "name",
          "pure"
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
  moduleId: 'test-module',
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule],
  template: '<div></div>',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TestService],
  host: {'[class.test]': 'true'}
})
class TestComponent {}

@Directive({
  standalone: true,
  selector: '[appTest]',
  inputs: ['value'],
  outputs: ['change'],
  providers: [TestService],
  host: {'[class.test]': 'true'}
})
class TestDirective {}

@Injectable({
  providedIn: 'root'
})
class TestService {}

@NgModule({
  id: 'test-module',
  imports: [CommonModule],
  declarations: [TestComponent],
  providers: [TestService],
  exports: [TestComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class TestModule {}

@Pipe({
  standalone: true,
  name: 'testPipe',
  pure: true
})
class TestPipe {}
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

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-root'
})
class TestComponent {}

@Injectable({
  useFactory: createService
})
class TestService {}
```
