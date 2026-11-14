---
title: "Observable: catch() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/observable/catch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Observable: catch() method

The **`catch()`** method of the `Observable` interface returns a new observable that replaces an error from the source observable with values from another observable.

## Syntax

```js
catch(callback)
```

### Parameters

- `callback`
    A function to execute when the source observable errors. It must return a value that can be converted to an observable by `Observable.from()`: an `Observable`, a `Promise`, an iterable object, or an async iterable object. The function is called with the following argument:
    - `error`
        The error from the source observable.

### Return value

A new `Observable`. When subscribed to, it emits the source observable's values until the source errors, then calls `callback` and emits values from the observable converted from its return value. It completes when the source completes without an error, or when the replacement observable completes.

## Description

Like other observable-returning operators, this method is lazy: calling it creates a new observable without subscribing to the source. Processing starts when the returned observable is subscribed to.

If `callback` throws an exception or its return value cannot be converted to an observable, the returned observable errors. Errors from the replacement observable are also forwarded; they do not call `callback` again.

`catch()` does not resume the source subscription or retry it automatically. The source subscription has already ended when `callback` runs. To handle an error from one inner observable while continuing to receive source values, place `catch()` inside the mapper passed to `flatMap()` or `switchMap()`.

## Examples

### Handling errors in an inner observable

This example reports the distance dragged until it exceeds 100 pixels. The error handler ends the current drag's stream while allowing future drags to start.

```html
<div>Press here and move the mouse.</div>
<p>Waiting for a drag</p>
```

```css
div {
  padding: 20px;
  border: 1px solid;
  user-select: none;
}
```

```js
const target = document.querySelector("div");
const output = document.querySelector("p");

target
  .when("mousedown")
  .switchMap((start) =>
    document
      .when("mousemove")
      .takeUntil(document.when("mouseup"))
      .map((move) => {
        const distance = Math.hypot(
          move.clientX - start.clientX,
          move.clientY - start.clientY,
        );
        if (distance > 100) {
          throw new Error("Too far! Start a new drag.");
        }
        return distance;
      })
      .catch((error) => {
        output.textContent = error.message;
        return [];
      }),
  )
  .subscribe((distance) => {
    output.textContent = `Distance: ${Math.round(distance)} pixels`;
  });
```

Placing `catch()` inside `switchMap()` keeps the error within the inner stream. The empty array completes that stream without emitting another value.

## See also

- `Observable.finally()`
- `Observable.switchMap()`
- Using observables
- Observable explainer
