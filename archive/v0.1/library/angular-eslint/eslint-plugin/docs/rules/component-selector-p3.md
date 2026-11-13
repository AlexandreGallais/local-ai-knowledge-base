---
title: "@angular-eslint/component-selector (part 3 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/component-selector.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/component-selector (part 3 of 3)

```json
{
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "style": "kebab-case",
        "prefix": ""
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'singleword'
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
        "style": "kebab-case",
        "prefix": []
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'foo-bar'
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
        "style": "kebab-case",
        "prefix": ""
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'any-name-without-prefix'
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
@Component({
  selector: '[appFooBar]'
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
@Component({
  selector: '[appFooBar]'
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
@Component({
  selector: 'lib-foo-bar'
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
@Component({
  selector: '[libFooBar]'
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

```ts
@Component({
  selector: '[appFooBar]'
})
class Test {}
```
