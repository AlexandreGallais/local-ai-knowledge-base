# core/src/util/coercion

## booleanAttribute

```ts
export function booleanAttribute(value: unknown): boolean
```

Transforms a value (typically a string) to a boolean.
Intended to be used as a transform function of an input.

 @usageNotes
 ```ts
 status = input({ transform: booleanAttribute });
 ```
@param value Value to be transformed.

@see [Built-in transformations](guide/components/inputs#built-in-transformations)

@publicApi

## numberAttribute

```ts
export function numberAttribute(value: unknown, fallbackValue = NaN): number
```

Transforms a value (typically a string) to a number.
Intended to be used as a transform function of an input.
@param value Value to be transformed.
@param fallbackValue Value to use if the provided value can't be parsed as a number.

 @usageNotes
 ```ts
 status = input({ transform: numberAttribute });
 ```

@publicApi
@see [Built-in transformations](guide/components/inputs#built-in-transformations)