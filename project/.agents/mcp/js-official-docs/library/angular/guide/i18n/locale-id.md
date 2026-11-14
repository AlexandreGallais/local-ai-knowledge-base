---
title: "Refer to locales by ID"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/i18n/locale-id.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Refer to locales by ID

Angular uses the Unicode _locale identifier_ \(Unicode locale ID\) to find the correct locale data for internationalization of text strings.

**Unicode locale ID**

- A locale ID conforms to the Unicode Common Locale Data Repository (CLDR) core specification.
  For more information about locale IDs, see Unicode Language and Locale Identifiers.

- CLDR and Angular use BCP 47 tags as the base for the locale ID

A locale ID specifies the language, country, and an optional code for further variants or subdivisions.
A locale ID consists of the language identifier, a hyphen \(`-`\) character, and the locale extension.

```html
{language_id}-{locale_extension}
```

HELPFUL: To accurately translate your Angular project, you must decide which languages and locales you are targeting for internationalization.

Many countries share the same language, but differ in usage.
The differences include grammar, punctuation, formats for currency, decimal numbers, dates, and so on.

For the examples in this guide, use the following languages and locales.

| Language | Locale                   | Unicode locale ID |
| :------- | :----------------------- | :---------------- |
| English  | Canada                   | `en-CA`           |
| English  | United States of America | `en-US`           |
| French   | Canada                   | `fr-CA`           |
| French   | France                   | `fr-FR`           |

The Angular repository includes common locales.

For a list of language codes, see ISO 639-2.

## Set the source locale ID

Use the Angular CLI to set the source language in which you are writing the component template and code.

By default, Angular uses `en-US` as the source locale of your project.

To change the source locale of your project for the build, complete the following actions.

1. Open the `angular.json` workspace build configuration file.
2. Add or modify the `sourceLocale` field inside the `i18n` section:

```json
{
  "projects": {
    "your-project": {
      "i18n": {
        "sourceLocale": "ca" // Use your desired locale code
      }
    }
  }
}
```

## Read the active locale outside dependency injection

Inside a component or service, inject the `LOCALE_ID` token to get the active locale.

If you can't inject `LOCALE_ID`, for example in a plain function outside an injection context, read `$localize.locale`.
Each localized build sets this value, and it is what the default `LOCALE_ID` factory reads.
If your application provides its own `LOCALE_ID`, `$localize.locale` does not reflect it.

```ts
declare const $localize: {locale?: string};

export const locale = (typeof $localize !== 'undefined' && $localize.locale) || 'en-US';
```

Put this in a file that has an `import` or `export`. If your project already includes the `@angular/localize` types, omit the `declare` line.

## What's next

  - Format data based on locale
