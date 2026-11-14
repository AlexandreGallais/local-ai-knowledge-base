# common/src/i18n/locale_data_api

## NumberFormatStyle

```ts
export enum NumberFormatStyle
```

Format styles that can be used to represent numbers.
@see {@link getLocaleNumberFormat}
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
`getLocaleNumberFormat` is deprecated

## Plural

```ts
export enum Plural
```

Plurality cases used for translating plurals to different languages.

@see {@link NgPlural}
@see {@link NgPluralCase}
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
`getLocalePluralCase` is deprecated

## FormStyle

```ts
export enum FormStyle
```

Context-dependant translation forms for strings.
Typically the standalone version is for the nominative form of the word,
and the format version is used for the genitive case.
@see [CLDR website](http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles)
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
locale data getters are deprecated

## TranslationWidth

```ts
export enum TranslationWidth
```

String widths available for translations.
The specific character widths are locale-specific.
Examples are given for the word "Sunday" in English.

@publicApi

@deprecated 18.0
locale data getters are deprecated

## FormatWidth

```ts
export enum FormatWidth
```

String widths available for date-time formats.
The specific character widths are locale-specific.
Examples are given for `en-US`.

@see {@link getLocaleDateFormat}
@see {@link getLocaleTimeFormat}
@see {@link getLocaleDateTimeFormat}
@see [Internationalization (i18n) Guide](guide/i18n)
@publicApi

@deprecated 18.0
Date locale data getters are deprecated

## NumberSymbol

```ts
export const NumberSymbol
```

Symbols that can be used to replace placeholders in number patterns.
Examples are based on `en-US` values.

@see {@link getLocaleNumberSymbol}
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
`getLocaleNumberSymbol` is deprecated

@object-literal-as-enum

## WeekDay

```ts
export enum WeekDay
```

The value for each day of the week, based on the `en-US` locale

@publicApi

@deprecated 18.0
Week locale getters are deprecated

## getLocaleId

```ts
export function getLocaleId(locale: string): string
```

Retrieves the locale ID from the currently loaded locale.
The loaded locale could be, for example, a global one rather than a regional one.
@param locale A locale code, such as `fr-FR`.
@returns The locale code. For example, `fr`.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
This function serves no purpose when relying on the `Intl` API.

## getLocaleDayPeriods

```ts
export function getLocaleDayPeriods( locale: string, formStyle: FormStyle, width: TranslationWidth, ): Readonly<[string, string]>
```

Retrieves day period strings for the given locale.

@param locale A locale code for the locale format rules to use.
@param formStyle The required grammatical form.
@param width The required character width.
@returns An array of localized period strings. For example, `[AM, PM]` for `en-US`.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Use `Intl.DateTimeFormat` for date formating instead.

## getLocaleDayNames

```ts
export function getLocaleDayNames( locale: string, formStyle: FormStyle, width: TranslationWidth, ): ReadonlyArray<string>
```

Retrieves days of the week for the given locale, using the Gregorian calendar.

@param locale A locale code for the locale format rules to use.
@param formStyle The required grammatical form.
@param width The required character width.
@returns An array of localized name strings.
For example,`[Sunday, Monday, ... Saturday]` for `en-US`.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Use `Intl.DateTimeFormat` for date formating instead.

## getLocaleMonthNames

```ts
export function getLocaleMonthNames( locale: string, formStyle: FormStyle, width: TranslationWidth, ): ReadonlyArray<string>
```

Retrieves months of the year for the given locale, using the Gregorian calendar.

@param locale A locale code for the locale format rules to use.
@param formStyle The required grammatical form.
@param width The required character width.
@returns An array of localized name strings.
For example,  `[January, February, ...]` for `en-US`.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Use `Intl.DateTimeFormat` for date formating instead.

## getLocaleEraNames

```ts
export function getLocaleEraNames( locale: string, width: TranslationWidth, ): Readonly<[string, string]>
```

Retrieves Gregorian-calendar eras for the given locale.
@param locale A locale code for the locale format rules to use.
@param width The required character width.

@returns An array of localized era strings.
For example, `[AD, BC]` for `en-US`.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Use `Intl.DateTimeFormat` for date formating instead.

## getLocaleFirstDayOfWeek

```ts
export function getLocaleFirstDayOfWeek(locale: string): WeekDay
```

Retrieves the first day of the week for the given locale.

@param locale A locale code for the locale format rules to use.
@returns A day index number, using the 0-based week-day index for `en-US`
(Sunday = 0, Monday = 1, ...).
For example, for `fr-FR`, returns 1 to indicate that the first day is Monday.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Intl's [`getWeekInfo`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo) has partial support (Chromium M99 & Safari 17).
You may want to rely on the following alternatives:
- Libraries like [`Luxon`](https://moment.github.io/luxon/#/) rely on `Intl` but fallback on the ISO 8601 definition (monday) if `getWeekInfo` is not supported.
- Other librairies like [`date-fns`](https://date-fns.org/), [`day.js`](https://day.js.org/en/) or [`weekstart`](https://www.npmjs.com/package/weekstart) library provide their own locale based data for the first day of the week.

## getLocaleWeekEndRange

```ts
export function getLocaleWeekEndRange(locale: string): [WeekDay, WeekDay]
```

Range of week days that are considered the week-end for the given locale.

@param locale A locale code for the locale format rules to use.
@returns The range of day values, `[startDay, endDay]`.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Intl's [`getWeekInfo`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo) has partial support (Chromium M99 & Safari 17).
Libraries like [`Luxon`](https://moment.github.io/luxon/#/) rely on `Intl` but fallback on the ISO 8601 definition (Saturday+Sunday) if `getWeekInfo` is not supported .

## getLocaleDateFormat

```ts
export function getLocaleDateFormat(locale: string, width: FormatWidth): string
```

Retrieves a localized date-value formatting string.

@param locale A locale code for the locale format rules to use.
@param width The format type.
@returns The localized formatting string.
@see {@link FormatWidth}
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Use `Intl.DateTimeFormat` for date formating instead.

## getLocaleTimeFormat

```ts
export function getLocaleTimeFormat(locale: string, width: FormatWidth): string
```

Retrieves a localized time-value formatting string.

@param locale A locale code for the locale format rules to use.
@param width The format type.
@returns The localized formatting string.
@see {@link FormatWidth}
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi
@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Use `Intl.DateTimeFormat` for date formating instead.

## getLocaleDateTimeFormat

```ts
export function getLocaleDateTimeFormat(locale: string, width: FormatWidth): string
```

Retrieves a localized date-time formatting string.

@param locale A locale code for the locale format rules to use.
@param width The format type.
@returns The localized formatting string.
@see {@link FormatWidth}
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Use `Intl.DateTimeFormat` for date formating instead.

## getLocaleNumberSymbol

```ts
export function getLocaleNumberSymbol(locale: string, symbol: NumberSymbol): string
```

Retrieves a localized number symbol that can be used to replace placeholders in number formats.
@param locale The locale code.
@param symbol The symbol to localize. Must be one of `NumberSymbol`.
@returns The character for the localized symbol.
@see {@link NumberSymbol}
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Use `Intl.NumberFormat` to format numbers instead.

## getLocaleNumberFormat

```ts
export function getLocaleNumberFormat(locale: string, type: NumberFormatStyle): string
```

Retrieves a number format for a given locale.

Numbers are formatted using patterns, like `#,###.00`. For example, the pattern `#,###.00`
when used to format the number 12345.678 could result in "12'345,678". That would happen if the
grouping separator for your language is an apostrophe, and the decimal separator is a comma.

<b>Important:</b> The characters `.` `,` `0` `#` (and others below) are special placeholders
that stand for the decimal separator, and so on, and are NOT real characters.
You must NOT "translate" the placeholders. For example, don't change `.` to `,` even though in
your language the decimal point is written with a comma. The symbols should be replaced by the
local equivalents, using the appropriate `NumberSymbol` for your language.

Here are the special characters used in number patterns:

| Symbol | Meaning |
|--------|---------|
| . | Replaced automatically by the character used for the decimal point. |
| , | Replaced by the "grouping" (thousands) separator. |
| 0 | Replaced by a digit (or zero if there aren't enough digits). |
| # | Replaced by a digit (or nothing if there aren't enough). |
| ¤ | Replaced by a currency symbol, such as $ or USD. |
| % | Marks a percent format. The % symbol may change position, but must be retained. |
| E | Marks a scientific format. The E symbol may change position, but must be retained. |
| ' | Special characters used as literal characters are quoted with ASCII single quotes. |

@param locale A locale code for the locale format rules to use.
@param type The type of numeric value to be formatted (such as `Decimal` or `Currency`.)
@returns The localized format string.
@see {@link NumberFormatStyle}
@see [CLDR website](http://cldr.unicode.org/translation/number-patterns)
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Let `Intl.NumberFormat` determine the number format instead

## getLocaleCurrencySymbol

```ts
export function getLocaleCurrencySymbol(locale: string): string | null
```

Retrieves the symbol used to represent the currency for the main country
corresponding to a given locale. For example, '$' for `en-US`.

@param locale A locale code for the locale format rules to use.
@returns The localized symbol character,
or `null` if the main country cannot be determined.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Use the `Intl` API to format a currency with from currency code

## getLocaleCurrencyName

```ts
export function getLocaleCurrencyName(locale: string): string | null
```

Retrieves the name of the currency for the main country corresponding
to a given locale. For example, 'US Dollar' for `en-US`.
@param locale A locale code for the locale format rules to use.
@returns The currency name,
or `null` if the main country cannot be determined.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Use the `Intl` API to format a currency with from currency code

## getLocaleCurrencyCode

```ts
export function getLocaleCurrencyCode(locale: string): string | null
```

Retrieves the default currency code for the given locale.

The default is defined as the first currency which is still in use.

@param locale The code of the locale whose currency code we want.
@returns The code of the default currency for the given locale.

@publicApi

@deprecated 18.0
We recommend you create a map of locale to ISO 4217 currency codes.
Time relative currency data is provided by the CLDR project. See https://www.unicode.org/cldr/charts/44/supplemental/detailed_territory_currency_information.html

## getLocalePluralCase

```ts
export const getLocalePluralCase: (locale: string)
```

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Use `Intl.PluralRules` instead

## getLocaleExtraDayPeriodRules

```ts
export function getLocaleExtraDayPeriodRules(locale: string): (Time | [Time, Time])[]
```

Retrieves locale-specific rules used to determine which day period to use
when more than one period is defined for a locale.

There is a rule for each defined day period. The
first rule is applied to the first day period and so on.
Fall back to AM/PM when no rules are available.

A rule can specify a period as time range, or as a single time value.

This functionality is only available when you have loaded the full locale data.
See the ["I18n guide"](guide/i18n/format-data-locale).

@param locale A locale code for the locale format rules to use.
@returns The rules for the locale, a single time value or array of *from-time, to-time*,
or null if no periods are available.

@see {@link getLocaleExtraDayPeriods}
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
Let `Intl.DateTimeFormat` determine the day period instead.

## getLocaleExtraDayPeriods

```ts
export function getLocaleExtraDayPeriods( locale: string, formStyle: FormStyle, width: TranslationWidth, ): string[]
```

Retrieves locale-specific day periods, which indicate roughly how a day is broken up
in different languages.
For example, for `en-US`, periods are morning, noon, afternoon, evening, and midnight.

This functionality is only available when you have loaded the full locale data.
See the ["I18n guide"](guide/i18n/format-data-locale).

@param locale A locale code for the locale format rules to use.
@param formStyle The required grammatical form.
@param width The required character width.
@returns The translated day-period strings.
@see {@link getLocaleExtraDayPeriodRules}
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
To extract a day period use `Intl.DateTimeFormat` with the `dayPeriod` option instead.

## getLocaleDirection

```ts
export function getLocaleDirection(locale: string): 'ltr' | 'rtl'
```

Retrieves the writing direction of a specified locale
@param locale A locale code for the locale format rules to use.
@publicApi
@returns 'rtl' or 'ltr'
@see [Internationalization (i18n) Guide](guide/i18n)

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
For dates and numbers, let `Intl.DateTimeFormat()` and `Intl.NumberFormat()` determine the writing direction.
The `Intl` alternative [`getTextInfo`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo).
has only partial support (Chromium M99 & Safari 17).
3rd party alternatives like [`rtl-detect`](https://www.npmjs.com/package/rtl-detect) can work around this issue.

## Time

```ts
export type Time
```

Represents a time value with hours and minutes.

@publicApi

@deprecated 18.0
Locale date getters are deprecated

## getCurrencySymbol

```ts
export function getCurrencySymbol(code: string, format: 'wide' | 'narrow', locale = 'en'): string
```

Retrieves the currency symbol for a given currency code.

For example, for the default `en-US` locale, the code `USD` can
be represented by the narrow symbol `$` or the wide symbol `US$`.

@param code The currency code.
@param format The format, `wide` or `narrow`.
@param locale A locale code for the locale format rules to use.

@returns The symbol, or the currency code if no symbol is available.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
You can use `Intl.NumberFormat().formatToParts()` to extract the currency symbol.
For example: `Intl.NumberFormat('en', {style:'currency', currency: 'USD'}).formatToParts().find(part => part.type === 'currency').value`
returns `$` for USD currency code in the `en` locale.
Note: `US$` is a currency symbol for the `en-ca` locale but not the `en-us` locale.

## getNumberOfCurrencyDigits

```ts
export function getNumberOfCurrencyDigits(code: string): number
```

Reports the number of decimal digits for a given currency.
The value depends upon the presence of cents in that particular currency.

@param code The currency code.
@returns The number of decimal digits, typically 0 or 2.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

@deprecated 18.0
Angular recommends relying on the `Intl` API for i18n.
This function should not be used anymore. Let `Intl.NumberFormat` determine the number of digits to display for the currency