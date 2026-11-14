# common/src/pipes/case_conversion_pipes

## LowerCasePipe

```ts
export class LowerCasePipe implements PipeTransform
```

Transforms text to all lower case.

@see {@link UpperCasePipe}
@see {@link TitleCasePipe}
@usageNotes

The following example defines a view that allows the user to enter
text, and then uses the pipe to convert the input text to all lower case.

{@example common/pipes/ts/lowerupper_pipe.ts region='LowerUpperPipe'}

@see [Built-in Pipes](guide/templates/pipes#built-in-pipes)

@ngModule CommonModule
@publicApi

## LowerCasePipe.transform

```ts
transform(value: string): string
```

@param value The string to transform to lower case.

## TitleCasePipe

```ts
export class TitleCasePipe implements PipeTransform
```

Transforms text to title case.
Capitalizes the first letter of each word and transforms the
rest of the word to lower case.
Words are delimited by any whitespace character, such as a space, tab, or line-feed character.

@see {@link LowerCasePipe}
@see {@link UpperCasePipe}

@usageNotes
The following example shows the result of transforming various strings into title case.

{@example common/pipes/ts/titlecase_pipe.ts region='TitleCasePipe'}

@see [Built-in Pipes](guide/templates/pipes#built-in-pipes)

@ngModule CommonModule
@publicApi

## TitleCasePipe.transform

```ts
transform(value: string): string
```

@param value The string to transform to title case.

## UpperCasePipe

```ts
export class UpperCasePipe implements PipeTransform
```

Transforms text to all upper case.
@see {@link LowerCasePipe}
@see {@link TitleCasePipe}
@see [Built-in Pipes](guide/templates/pipes#built-in-pipes)

@ngModule CommonModule
@publicApi

## UpperCasePipe.transform

```ts
transform(value: string): string
```

@param value The string to transform to upper case.