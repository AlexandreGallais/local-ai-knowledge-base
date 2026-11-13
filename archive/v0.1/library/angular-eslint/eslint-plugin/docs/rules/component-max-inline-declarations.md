---
title: "@angular-eslint/component-max-inline-declarations"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/component-max-inline-declarations.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/component-max-inline-declarations`

Enforces a maximum number of lines in inline template, styles and animations.

- Type: suggestion

## Rationale

When templates or styles exceed a few lines, keeping them inline makes components harder to read and maintain. Inline templates and styles cannot be syntax-highlighted as effectively as separate files, complicate code reviews, and make it difficult to quickly understand a component's structure. Moving larger templates and styles to separate files improves readability, enables better IDE support, and follows the separation of concerns principle.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `3`
   */
  template?: number;
  /**
   * Default: `3`
   */
  styles?: number;
  /**
   * Default: `15`
   */
  animations?: number;
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  template: `
            ~
    <div>first line</div>
    <div>second line</div>
    <div>third line</div>
    <div>fourth line</div>
  `
  ~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error",
      {
        "template": 0
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  template: '<div>first line</div>'
            ~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: [
          ~
    `
      div {
        display: block;
        height: 40px;
      }
    `
  ]
  ~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: `
          ~
    div {
      display: block;
      height: 40px;
    }
  `
  ~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: [
          ~
    `
      div {
        display: block;
      }
    `,
    `
      span {
        width: 30px;
      }
    `
  ]
  ~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error",
      {
        "styles": 0
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  styles: ['div { display: none; }']
          ~~~~~~~~~~~~~~~~~~~~~~~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  animations: [{
              ~
    transformPanelWrap: trigger('transformPanelWrap', [
      transition('* => void', query('@transformPanel', [animateChild()], {optional: true})),
    ]),
    transformPanel: trigger('transformPanel', [
      state('void', style({
        transform: 'scaleY(0.8)',
        minWidth: '100%',
        opacity: 0
      })),
      state('showing', style({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: 'scaleY(1)'
      })),
      state('next', style({height: '0px', visibility: 'hidden'}))
    ])
  }]
   ~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  animations: [
              ~
    trigger('dialogContainer', [
      transition('* => void', query('@transformPanel', [animateChild()], {optional: true}))
    ]),
    trigger('transformPanel', [
      state('void', style({
        transform: 'scaleY(0.8)',
        minWidth: '100%',
        opacity: 0
      })),
      state('showing', style({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: 'scaleY(1)'
      }))
    ]),
    trigger('transformPanel', [
      state('void', style({opacity: 0, transform: 'scale(1, 0)'}))
    ])
  ]
  ~
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error",
      {
        "animations": 2
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  animations: [{
              ~
    transformPanel: trigger('transformPanel', [
      state('void', style({opacity: 0, transform: 'scale(1, 0)'}))
    ])
  }]
   ~
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  template: '<div>just one line template</div>'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: ['div { display: none; }']
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styles: 'div { display: none; }'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  animations: [state('void', style({opacity: 0, transform: 'scale(1, 0)'}))]
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  styleUrls: ['./foobar.scss'],
  templateUrl: './foobar.html',
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  animations: [
    state('void', style({opacity: 0, transform: 'scale(1, 0)'}))
  ],
  templateUrl: './foobar.html',
})
class Test {}
```
