---
title: "@angular-eslint/template/label-has-associated-control"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/label-has-associated-control.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/label-has-associated-control`

[Accessibility] Ensures that a label element/component is associated with a form element

- Type: suggestion

## Rationale

Form labels must be associated with their form controls for accessibility and usability. This association can be achieved by: (1) wrapping the input inside the label, (2) using the 'for' attribute with a matching input 'id', or (3) for Angular Material, ensuring proper accessibility attributes are set. This association provides multiple benefits: screen readers can announce what each form field is for, clicking the label focuses the input (increasing the clickable area), and it creates a clear connection between labels and fields for all users. This is a WCAG Level A requirement.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `false`
   */
  checkIds?: boolean;
  /**
   * Default: `["input","meter","output","progress","select","textarea"]`
   */
  controlComponents?: string[];
  /**
   * Default: `[{"inputs":["for","htmlFor"],"selector":"label"}]`
   */
  labelComponents?: {
    inputs?: string[];
    selector: string;
  }[];
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/label-has-associated-control": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<label>Label</label>
~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/label-has-associated-control": [
      "error",
      {
        "checkIds": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<label for="id">Label</label>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<input id="otherId" />
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/label-has-associated-control": [
      "error",
      {
        "labelComponents": [
          {
            "inputs": [
              "id"
            ],
            "selector": "app-label"
          }
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<app-label anotherAttribute="id"></app-label>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/label-has-associated-control": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-container *ngFor="let item of items; index as index">
  <label for="item-{{index}}">Label #{{index}</label>
  <input id="item-{{index}}" [(ngModel)]="item.name">
</ng-container>
<label for="id"></label>
<label for="{{id}}"></label>
<label [attr.for]="id"></label>
<label [htmlFor]="id"></label>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/label-has-associated-control": [
      "error",
      {
        "controlComponents": [
          "my-custom-control"
        ],
        "labelComponents": [
          {
            "inputs": [
              "for",
              "htmlFor",
              "myCustomFor"
            ],
            "selector": "label"
          }
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<label [myCustomFor]="customId">Label</label>
<my-custom-control [id]="customId"></my-custom-control>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/label-has-associated-control": [
      "error",
      {
        "controlComponents": [
          "app-input"
        ],
        "labelComponents": [
          {
            "inputs": [
              "id"
            ],
            "selector": "app-label"
          }
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-label id="name"></app-label>
<app-label id="{{name}}"></app-label>
<app-label [id]="name"></app-label>
<label [htmlFor]="id"></label>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/label-has-associated-control": [
      "error",
      {
        "controlComponents": [
          "app-input"
        ],
        "labelComponents": [
          {
            "inputs": [
              "id"
            ],
            "selector": "app-label"
          }
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<label><input type="radio"></label>
<label><meter></meter></label>
<label><output></output></label>
<label><progress></progress></label>
<label><select><option>1</option></select></label>
<label><textarea></textarea></label>
<a-label><input></a-label>
<label>
  Label
  <input>
</label>
<label>
  Label
  <span><input></span>
</label>
<app-label>
  <span>
    <app-input></app-input>
  </span>
</app-label>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/label-has-associated-control": [
      "error",
      {
        "checkIds": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="radio" id="id"/>
<label for="id"></label>
```
