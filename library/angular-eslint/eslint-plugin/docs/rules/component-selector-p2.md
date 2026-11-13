---
title: "@angular-eslint/component-selector (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/component-selector.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/component-selector (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "sg",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'foo-bar'
            ~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "sg",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'app-foo-bar'
            ~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "attribute",
        "prefix": [
          "cd",
          "ng"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: '[app-foo-bar]'
            ~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": [
          "foo",
          "cd",
          "ng"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'app-foo-bar[baz].app'
            ~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "attribute",
        "prefix": "ng",
        "style": "camelCase"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: '[ng-bar-foo]'
            ~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "app",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'appFooBar'
            ~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "app",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'app'
            ~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "style": "camelCase",
        "prefix": "app"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'app'
            ~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": [
          "app",
          "ng"
        ],
        "style": "camelCase"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: '[appFooBar]'
            ~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "attribute",
        "prefix": [
          "app",
          "ng"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: `app-foo-bar`
            ~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "attribute",
        "prefix": [
          "app",
          "ng"
        ],
        "style": "camelCase"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'appFooBar'
            ~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": [
          "app"
        ],
        "style": "camelCase"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'appFooBar'
            ~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": [
          "app"
        ],
        "style": "camelCase"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'appselector'
            ~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": [
          "app",
          "toh"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'root'
            ~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "sg",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'sgggg-bar'
            ~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      [
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case"
        }
      ]
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'appFooBar'
            ~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      [
        {
          "type": "attribute",
          "prefix": "app",
          "style": "camelCase"
        }
      ]
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: '[app-foo-bar]'
            ~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      [
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case"
        },
        {
          "type": "attribute",
          "prefix": "app",
          "style": "camelCase"
        }
      ]
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'appFooBar'
            ~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      [
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case"
        },
        {
          "type": "attribute",
          "prefix": "app",
          "style": "camelCase"
        }
      ]
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: '[app-foo-bar]'
            ~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      [
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case"
        },
        {
          "type": "attribute",
          "prefix": "app",
          "style": "camelCase"
        }
      ]
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'lib-foo-bar'
            ~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      [
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case"
        },
        {
          "type": "attribute",
          "prefix": "app",
          "style": "camelCase"
        }
      ]
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: '[libFooBar]'
            ~~~~~~~~~~~~~
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "sg",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'sg-foo-bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "attribute",
        "prefix": [
          "app",
          "ng"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: '[ng-foo-bar]'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": [
          "app",
          "cd",
          "ng"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-foo-bar[baz].app'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": [
          "app",
          "cd",
          "ngg"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({ selector: 'app-bar' }) class TestOne {}
@Component({ selector: 'ngg-bar' }) class TestTwo {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "app",
        "style": "camelCase"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'appBarFoo'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "app1",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app1-foo-bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "app",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const selectorName = 'appFooBar';
@Component({
  selector: selectorName
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "app",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const selecto = 'appFooBar';
@Component({
  selector,
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "app",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-foo-bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "attribute",
        "prefix": [
          "app",
          "baz"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'baz-[app-bar-foo][foe].bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": [
          "app",
          "ng"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'app-bar-foo[baz].bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": [
          "attribute",
          "element"
        ],
        "prefix": [
          "app",
          "ng"
        ],
        "style": "camelCase"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: `[appFooBar]`
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": [
          "attribute",
          "element"
        ],
        "prefix": [
          "app",
          "ng"
        ],
        "style": "camelCase"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: `
    [appFooBar]
  `
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": [
          "attribute",
          "element"
        ],
        "prefix": [
          "app",
          "ng"
        ],
        "style": "camelCase"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: `
    [appFooBar],
    [appBarFoo]
  `
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": [
          "attribute",
          "element"
        ],
        "prefix": [
          "app",
          "ng"
        ],
        "style": "camelCase"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: `button[appFooBar]`
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": [
          "element"
        ],
        "prefix": [
          "app"
        ],
        "style": "camelCase"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: `app-foo-bar`,
  encapsulation: ViewEncapsulation.ShadowDom
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": [
          "element"
        ],
        "prefix": [
          "app"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: `app-foo-bar`,
  encapsulation: ViewEncapsulation.ShadowDom
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": [
          "element"
        ],
        "prefix": [
          "bar"
        ],
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'app-foo-bar'
})
class Test {}
```

---

#### Custom Config
