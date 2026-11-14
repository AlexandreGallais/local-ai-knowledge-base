# common/src/pipes/keyvalue_pipe

## KeyValue

```ts
export interface KeyValue<K, V>
```

A key value pair.
Usually used to represent the key value pairs from a Map or Object.

@publicApi

## KeyValuePipe

```ts
export class KeyValuePipe implements PipeTransform
```

@ngModule CommonModule
@description

Transforms Object or Map into an array of key value pairs.

The output array will be ordered by keys.
By default the comparator will be by Unicode point value.
You can optionally pass a compareFn if your keys are complex types.
Passing `null` as the compareFn will use natural ordering of the input.

@usageNotes
### Examples

This examples show how an Object or a Map can be iterated by ngFor with the use of this
keyvalue pipe.

{@example common/pipes/ts/keyvalue_pipe.ts region='KeyValuePipe'}

@see [Built-in Pipes](guide/templates/pipes#built-in-pipes)

@publicApi