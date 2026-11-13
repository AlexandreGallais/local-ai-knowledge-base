---
title: "@angular-eslint/require-localize-metadata"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/require-localize-metadata.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/require-localize-metadata`

Ensures that $localize tagged messages contain helpful metadata to aid with translations.

- Type: suggestion

## Rationale

When internationalizing Angular applications with @angular/localize, adding metadata (description, meaning, and custom IDs) to $localize tagged strings is essential for high-quality translations. The description helps translators understand the context and purpose of the text they're translating. For example, "Open" could mean "open a file" (access/view) or "open an account" (establish/create) - context matters for accurate translation. The meaning field distinguishes identical text that needs different translations in different contexts. Custom IDs provide stable references that persist across code changes, preventing retranslation when only code structure changes. Without this metadata, translators work blind, leading to poor translations, wasted effort on retranslating unchanged strings, and difficulty managing large translation projects. This rule ensures your $localize strings include helpful metadata for translation workflows.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `false`
   */
  requireDescription?: boolean;
  /**
   * Default: `false`
   */
  requireMeaning?: boolean;
  /**
   * Default: `false`
   */
  requireCustomId?: boolean | string;
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`Hello i18n!`;
                               ~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedTexts = {
  helloI18n: $localize`:An introduction header for this sample:Hello i18n!`
};
localizedTexts.helloI18n = $localize`Hello i18n!`;
                                    ~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
return $localize`Hello i18n!`;
                ~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
someFunction($localize`Hello i18n!`);
                      ~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`:site header|:Hello i18n!`;
                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`:@@custom_id:Hello i18n!`;
                               ~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`:site header|@@custom_id:Hello i18n!`;
                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireMeaning": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`Hello i18n!`;
                               ~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true,
        "requireMeaning": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`:An introduction header for this sample:Hello i18n!`;
                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireMeaning": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`:|An introduction header for this sample:Hello i18n!`;
                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true,
        "requireMeaning": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`:Hello i18n!`;
                               ~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireCustomId": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`Hello i18n!`;
                               ~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireCustomId": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`:@some.custom.id:Hello i18n!`;
                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireCustomId": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`:meaning|description:Hello i18n!`;
                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireCustomId": "^some.wrong.pattern$"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const localizedText = $localize`:@@some.custom.id:Hello i18n!`;
                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const localizedText = $localize`Hello i18n!`;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const localizedText = $localize`:site header|:Hello i18n!`;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const localizedText = $localize`:@@custom_id:Hello i18n!`;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const localizedText = $localize`:site header|@@custom_id:Hello i18n!`;
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
let localizedText = $localize`:An introduction header for this sample:Hello i18n!`;
localizedText = $localize`:An introduction header for this sample modified:Hello i18n modified!`;
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const localizedTexts = {
  helloI18n: $localize`:An introduction header for this sample:Hello i18n!`
};
localizedTexts.helloI18n = $localize`:An introduction header for this sample modified:Hello i18n modified!`;
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
return $localize`:An introduction header for this sample:Hello i18n!`;
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
someFunction($localize`:An introduction header for this sample:Hello i18n!`);
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const localizedText = `Hello i18n!`;
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireMeaning": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const localizedText = $localize`:site header|:Hello i18n!`;
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireDescription": true,
        "requireMeaning": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const localizedText = $localize`:site header|An introduction header for this sample:Hello i18n!`;
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireCustomId": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const localizedText = $localize`:@@some.custom.id:Hello i18n!`;
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/require-localize-metadata": [
      "error",
      {
        "requireCustomId": "^some.*id$"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
const localizedText = $localize`:@@some.custom.id:Hello i18n!`;
```
