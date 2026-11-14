---
title: "@angular-eslint/template/no-distracting-elements"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-distracting-elements.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-distracting-elements`

[Accessibility] Enforces that no distracting elements are used

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

Elements like <marquee> and <blink> create distracting motion that can cause problems for users with attention disorders, vestibular disorders, or seizure disorders. Moving text is harder to read for everyone, including users with dyslexia or cognitive disabilities. These elements are also deprecated in HTML5 and not well-supported across browsers. WCAG guidelines require that moving, blinking, or scrolling content can be paused, stopped, or hidden by users. Instead of these elements, use modern CSS animations with appropriate controls, or simply use static content that doesn't distract from the main page content.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-distracting-elements": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<marquee></marquee>{{ test }}
~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-distracting-elements": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div></div><blink></blink>
           ~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-distracting-elements": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div>Valid</div>
```
