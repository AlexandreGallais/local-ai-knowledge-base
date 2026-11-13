---
title: "Format data based on locale"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/i18n/format-data-locale.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Format data based on locale

Angular provides the following built-in data transformation pipes.
The data transformation pipes use the `LOCALE_ID` token to format data based on rules of each locale.

| Data transformation pipe                | Details                                           |
| :-------------------------------------- | :------------------------------------------------ |
| `DatePipe`         | Formats a date value.                             |
| `CurrencyPipe` | Transforms a number into a currency string.       |
| `DecimalPipe`   | Transforms a number into a decimal number string. |
| `PercentPipe`   | Transforms a number into a percentage string.     |

## Use DatePipe to display the current date

To display the current date in the format for the current locale, use the following format for the `DatePipe`.

```angular-html
{{ today | date }}
```

## Override current locale for CurrencyPipe

Add the `locale` parameter to the pipe to override the current value of `LOCALE_ID` token.

To force the currency to use American English \(`en-US`\), use the following format for the `CurrencyPipe`

```angular-html
{{ amount | currency: 'USD' : 'symbol' : '1.2-2' : 'en-US' }}
```

HELPFUL: The locale specified for the `CurrencyPipe` overrides the global `LOCALE_ID` token of your application.

## What's next

  - Prepare component for translation
