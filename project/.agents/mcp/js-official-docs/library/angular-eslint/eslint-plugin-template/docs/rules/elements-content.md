---
title: "@angular-eslint/template/elements-content"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/elements-content.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/elements-content`

[Accessibility] Ensures that the heading, anchor and button elements have content in them

- Type: suggestion

## Rationale

Interactive elements like buttons, anchors (links), and headings must have accessible text content for screen readers. For example, '<mat-icon>delete</mat-icon>' is not accessible because screen readers will just announce 'button' without explaining what it does. Solutions include adding visible text, using aria-label, or including visually-hidden text with CSS. This ensures all users, including those using screen readers, know the purpose of each interactive element. This is a fundamental WCAG requirement for web accessibility.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `["aria-label","innerHtml","innerHTML","innerText","outerHTML","textContent","title"]`
   */
  allowList?: string[];
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/elements-content": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<h1 class="size-1"></h1>
~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/elements-content": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<a href="#" [routerLink]="['route1']"></a>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/elements-content": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button></button>
~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/elements-content": [
      "error",
      {
        "allowList": [
          "aria-labelledby"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button [ariaLabelledBy]="label"></button>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/elements-content": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<h1>Heading Content!</h1>
<h2><app-content></app-content></h2>
<h3 [innerHtml]="dangerouslySetHTML"></h3>
<h4 [innerText]="text"></h4>
<a>Anchor Content!</a>
<a><app-content></app-content></a>
<a [innerHTML]="dangerouslySetHTML"></a>
<a [innerText]="text"></a>
<a [outerHTML]="text"></a>
<a [textContent]="text"></a>
<a aria-hidden></a>
<button [attr.aria-hidden]="true"></button>
<button [textContent]="dynamicText"></button>
<h5 [attr.aria-label]="text"></h5>
<h6 title="text"></h6>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/elements-content": [
      "error",
      {
        "allowList": [
          "appTooltipLabel",
          "ariaLabel"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<button appTooltipLabel="directive adds aria-label"></button>
<button [appTooltipLabel]="label"></button>
<h1 ariaLabel="Important Content"></h1>
<a [ariaLabel]="label"></a>
```
