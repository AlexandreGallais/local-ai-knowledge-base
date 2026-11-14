# common/src/i18n/format_number

## formatCurrency

```ts
export function formatCurrency( value: number, locale: string, currency: string, currencyCode?: string, digitsInfo?: string, ): string
```

@ngModule CommonModule
@description

Formats a number as currency using locale rules.

@param value The number to format.
@param locale A locale code for the locale format rules to use.
@param currency A string containing the currency symbol or its name,
such as "$" or "Canadian Dollar". Used in output string, but does not affect the operation
of the function.
@param currencyCode The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)
currency code, such as `USD` for the US dollar and `EUR` for the euro.
Used to determine the number of digits in the decimal part.
@param digitsInfo Decimal representation options, specified by a string in the following format:
`{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`. See `DecimalPipe` for more details.

@returns The formatted currency value.

@see {@link formatNumber}
@see {@link DecimalPipe}
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi

## formatPercent

```ts
export function formatPercent(value: number, locale: string, digitsInfo?: string): string
```

@ngModule CommonModule
@description

Formats a number as a percentage according to locale rules.

@param value The number to format.
@param locale A locale code for the locale format rules to use.
@param digitsInfo Decimal representation options, specified by a string in the following format:
`{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`. See `DecimalPipe` for more details.

@returns The formatted percentage value.

@see {@link formatNumber}
@see {@link DecimalPipe}
@see [Internationalization (i18n) Guide](guide/i18n)
@publicApi

## formatNumber

```ts
export function formatNumber(value: number, locale: string, digitsInfo?: string): string
```

@ngModule CommonModule
@description

Formats a number as text, with group sizing, separator, and other
parameters based on the locale.

@param value The number to format.
@param locale A locale code for the locale format rules to use.
@param digitsInfo Decimal representation options, specified by a string in the following format:
`{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`. See `DecimalPipe` for more details.

@returns The formatted text string.
@see [Internationalization (i18n) Guide](guide/i18n)

@publicApi