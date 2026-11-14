---
title: "Observable: map() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/map/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable: map() method

The **`map()`** method of the `Observable` interface returns a new observable that emits the values of the source observable, each transformed by a mapping function.

## Syntax

```js
map(mapper)
```

### Parameters

- `mapper`
    A function to execute for each value emitted by the source observable. Its return value is emitted by the returned observable. The function is called with the following arguments:
    - `value`
        The current value being processed.
    - `index`
        The index of the current value being processed, starting from `0`.

### Return value

A new `Observable`. When subscribed to, it calls `mapper` for each value emitted by the source observable and emits the return value. When the source completes, the returned observable also completes.

## Description

Like other observable-returning operators, this method is lazy: calling it creates a new observable without subscribing to the source. Processing starts when the returned observable is subscribed to.

If `mapper` throws an exception, the returned observable errors and unsubscribes from the source. Errors from the source are also forwarded.

The return value of `mapper` is emitted as-is. In particular, a returned promise is emitted as a promise object; it is not awaited. To emit values from a returned promise or another observable, use `flatMap()` or `switchMap()`.

## Examples

### Using map()

This example displays the mouse coordinates when the pointer moves over either of two `` elements. The mapping function extracts the coordinates from each mouse event into an object with `x` and `y` properties.

```html
<div></div>
<div></div>
<p></p>
```

```css
div {
  height: 120px;
  background-color: purple;
  margin-bottom: 40px;
}
```

```js
const outputElem = document.querySelector("p");

document.body
  .when("mousemove")
  .filter((e) => e.target.matches("div"))
  .map((e) => ({ x: e.clientX, y: e.clientY }))
  .subscribe({ next: reportCoords });

function reportCoords(e) {
  outputElem.textContent = `${e.x},${e.y}`;
}
```

## See also

- `Observable.flatMap()`
- Using observables
- Observable explainer
