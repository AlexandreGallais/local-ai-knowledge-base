---
title: "@angular-eslint/consistent-component-styles"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/consistent-component-styles.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/consistent-component-styles`

Ensures consistent usage of `styles`/`styleUrls`/`styleUrl` within Component metadata

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

Consistency in how styles are declared makes codebases easier to navigate and maintain. When some components use styleUrl while others use styleUrls, or when styles are sometimes arrays and sometimes strings, it becomes harder for developers to predict what they'll find when opening a component. This rule enforces a consistent pattern across your codebase. Angular 17+ introduced the singular styleUrl property alongside the existing styleUrls array for common cases where components have only one stylesheet. Choosing one approach and sticking with it reduces cognitive load and makes the codebase feel more cohesive.

## Rule Options

The rule accepts an options object with the following properties:

```ts
type Options = "array" | "string";

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: [':host { display: block; }']
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  standalone: true,
  imports: [MatButtonModule],
  styles: [':host { display: block; }'],
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  providers: []
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styleUrls: ['./test.component.css']
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  standalone: true,
  imports: [MatButtonModule],
  styleUrls: ['./test.component.css'],
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  providers: []
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const type = 'block';
@Component({
  styles: [`:host\t{ display: ${type}; }`]
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: [':host\t{ display: block; }']
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: [':host{ display: block; }']
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: [":host{ display: block; }"]
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: [`:host{ display: block; }`]
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styleUrls: [`./test.component.css`]
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "string"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: [':host { display: block; }']
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "string"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styleUrls: ['./test.component.css']
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: ':host { display: block; }'
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  standalone: true,
  imports: [MatButtonModule],
  styles: ':host { display: block; }',
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  providers: []
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styleUrl: './test.component.css',
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const type = 'block';
@Component({
  styles: `:host\t{ display: ${type}; }`
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: ':host\t{ display: block; }'
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: ':host{ display: block; }'
          ~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: ":host{ display: block; }"
          ~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: `:host{ display: block; }`
          ~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: ':host { display: block; }',
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: `
    :host { display: block; }
  `,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'my-test',
  standalone: true,
  imports: [CommonModule],
  styles: `
    :host { display: block; }
  `,
  providers: [FooService]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: [
    ':host { display: block; }',
    `.foo { color: red; }`
  ],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styleUrl: `./test.component.css`,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styleUrls: [
    '../shared.css',
    `./test.component.css`
  ],
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'my-test',
  standalone: true,
  imports: [CommonModule],
  styleUrls: [
    '../shared.css',
    `./test.component.css`
  ],
  providers: [FooService]
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "string"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: ':host { display: block; }',
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "string"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: `
    :host { display: block; }
  `,
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "string"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'my-test',
  standalone: true,
  imports: [CommonModule],
  styles: `
    :host { display: block; }
  `,
  providers: [FooService]
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "string"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: [
    ':host { display: block; }',
    `.foo { color: red; }`
  ],
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "string"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styleUrl: `./test.component.css`,
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "string"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styleUrls: [
    '../shared.css',
    `./test.component.css`
  ],
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "string"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'my-test',
  standalone: true,
  imports: [CommonModule],
  styleUrls: [
    '../shared.css',
    `./test.component.css`
  ],
  providers: [FooService]
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: [':host { display: block; }'],
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: [
    `
      :host { display: block; }
    `
  ],
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'my-test',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
      :host { display: block; }
    `
  ],
  providers: [FooService]
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: [
    ':host { display: block; }',
    `.foo { color: red; }`
  ],
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styleUrls: [`./test.component.css`],
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styleUrls: [
    '../shared.css',
    `./test.component.css`
  ],
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/consistent-component-styles": [
      "error",
      "array"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'my-test',
  standalone: true,
  imports: [CommonModule],
  styleUrls: [
    '../shared.css',
    `./test.component.css`
  ],
  providers: [FooService]
})
class Test {}
```
