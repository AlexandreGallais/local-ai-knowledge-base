# common/src/pipes/i18n_plural_pipe

## I18nPluralPipe

```ts
export class I18nPluralPipe implements PipeTransform
```

@ngModule CommonModule
@description

Maps a value to a string that pluralizes the value according to locale rules.

@usageNotes

### Example

{@example common/pipes/ts/i18n_pipe.ts region='I18nPluralPipeComponent'}

@see [Built-in Pipes](guide/templates/pipes#built-in-pipes)

@publicApi

## I18nPluralPipe.transform

```ts
transform( value: number | null | undefined, pluralMap: {[count: string]: string}, locale?: string, ): string
```

@param value the number to be formatted
@param pluralMap an object that mimics the ICU format, see
https://unicode-org.github.io/icu/userguide/format_parse/messages/.
@param locale a `string` defining the locale to use (uses the current {@link LOCALE_ID} by
default).