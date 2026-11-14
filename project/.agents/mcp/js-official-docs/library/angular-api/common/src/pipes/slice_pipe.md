# common/src/pipes/slice_pipe

## SlicePipe

```ts
export class SlicePipe implements PipeTransform
```

@ngModule CommonModule
@description

Creates a new `Array` or `String` containing a subset (slice) of the elements.

@usageNotes

All behavior is based on the expected behavior of the JavaScript API `Array.prototype.slice()`
and `String.prototype.slice()`.

When operating on an `Array`, the returned `Array` is always a copy even when all
the elements are being returned.

When operating on a blank value, the pipe returns the blank value.

### List Example

This `ngFor` example:

{@example common/pipes/ts/slice_pipe.ts region='SlicePipe_list'}

produces the following:

```html
<li>b</li>
<li>c</li>
```

### String Examples

{@example common/pipes/ts/slice_pipe.ts region='SlicePipe_string'}

@see [Built-in Pipes](guide/templates/pipes#built-in-pipes)

@publicApi

## SlicePipe.transform

```ts
transform<T>(value: ReadonlyArray<T>, start: number, end?: number): Array<T>
```

@param value a list or a string to be sliced.
@param start the starting index of the subset to return:
  - **a positive integer**: return the item at `start` index and all items after
    in the list or string expression.
  - **a negative integer**: return the item at `start` index from the end and all items after
    in the list or string expression.
  - **if positive and greater than the size of the expression**: return an empty list or
string.
  - **if negative and greater than the size of the expression**: return entire list or string.
@param end the ending index of the subset to return:
  - **omitted**: return all items until the end.
  - **if positive**: return all items before `end` index of the list or string.
  - **if negative**: return all items before `end` index from the end of the list or string.