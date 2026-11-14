---
title: "@angular-eslint/directive-selector (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/directive-selector.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/directive-selector (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": "element",
        "prefix": "bar",
        "style": "kebab-case"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": "attribute",
        "prefix": "app",
        "style": "camelCase"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: '[app-bar-foo]'
            ~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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

#### ❌ Invalid Code

```ts
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
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
    "@angular-eslint/directive-selector": [
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
@Directive({
  selector: 'app-foo-bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
@Directive({
  selector: '[app-foo-bar]'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
@Directive({
  selector: 'app-foo-bar[baz].app'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
@Directive({ selector: 'app-bar' }) class TestOne {}
@Directive({ selector: 'ngg-bar' }) class TestTwo {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
@Directive({
  selector: 'appBarFoo'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
@Directive({
  selector: 'app1-foo-bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
@Directive({
  selector: selectorName
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
const selector = 'appFooBar';
@Directive({
  selector,
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
@Directive({
  selector: `[app-foo-bar]`
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
@Directive({
  selector: 'baz-[app-bar-foo][foe].bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
@Directive({
  selector: 'app-bar-foo[baz].bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": "attribute",
        "style": "camelCase",
        "prefix": []
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: '[fooBar]'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": "attribute",
        "style": "camelCase",
        "prefix": ""
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: '[fooBar]'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": [
          "attribute"
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
@Directive({
  selector: `
    [app-foo-bar]
  `
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": [
          "attribute"
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
@Directive({
  selector: `
    [app-foo-bar],
    [app-bar-foo]
  `
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": [
          "attribute"
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
@Directive({
  selector: 'button[app-foo-bar]'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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

#### ✅ Valid Code

```ts
@Directive({
  selector: 'app-foo-bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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

#### ✅ Valid Code

```ts
@Directive({
  selector: '[appFooBar]'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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

#### ✅ Valid Code

```ts
@Directive({
  selector: 'app-foo-bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
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

#### ✅ Valid Code

```ts
@Directive({
  selector: '[appFooBar]'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
      "error",
      [
        {
          "type": "element",
          "prefix": [
            "app",
            "lib"
          ],
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

#### ✅ Valid Code

```ts
@Directive({
  selector: 'lib-foo-bar'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
      "error",
      [
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case"
        },
        {
          "type": "attribute",
          "prefix": [
            "app",
            "lib"
          ],
          "style": "camelCase"
        }
      ]
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: '[libFooBar]'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-selector": [
      "error",
      [
        {
          "type": "attribute",
          "prefix": "app",
          "style": "camelCase"
        },
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

#### ✅ Valid Code
