# common/src/pipes/json_pipe

## JsonPipe

```ts
export class JsonPipe implements PipeTransform
```

@ngModule CommonModule
@description

Converts a value into its JSON-format representation.  Useful for debugging.

@usageNotes

The following component uses a JSON pipe to convert an object
to JSON format, and displays the string in both formats for comparison.

{@example common/pipes/ts/json_pipe.ts region='JsonPipe'}

@see [Built-in Pipes](guide/templates/pipes#built-in-pipes)

@publicApi

## JsonPipe.transform

```ts
transform(value: unknown): string
```

@param value A value of any type to convert into a JSON-format string.