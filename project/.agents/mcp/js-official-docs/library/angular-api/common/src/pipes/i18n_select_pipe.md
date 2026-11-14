# common/src/pipes/i18n_select_pipe

## I18nSelectPipe

```ts
export class I18nSelectPipe implements PipeTransform
```

@ngModule CommonModule
@description

Generic selector that displays the string that matches the current value.

If none of the keys of the `mapping` match the `value`, then the content
of the `other` key is returned when present, otherwise an empty string is returned.

@usageNotes

### Example

{@example common/pipes/ts/i18n_pipe.ts region='I18nSelectPipeComponent'}

@see [Built-in Pipes](guide/templates/pipes#built-in-pipes)

@publicApi

## I18nSelectPipe.transform

```ts
transform(value: string | null | undefined, mapping: {[key: string]: string}): string
```

@param value a string to be internationalized.
@param mapping an object that indicates the text that should be displayed
for different values of the provided `value`.