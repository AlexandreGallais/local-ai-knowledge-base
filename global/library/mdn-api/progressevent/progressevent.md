---
title: "ProgressEvent: ProgressEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/progressevent/progressevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProgressEvent: ProgressEvent() constructor

The **`ProgressEvent()`** constructor returns a new `ProgressEvent` object, representing the current completion of a long process.

## Syntax

```js
new ProgressEvent(type)
new ProgressEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `loadstart`, `progress`, `abort`, `error`, `load`, `timeout`, or `loadend`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `lengthComputable` (optional)
        A boolean value indicating if the total work to be done, and the amount of work already done, by the underlying process is calculable.
        In other words, it tells if the progress is measurable or not.
        It defaults to `false`.
    - `loaded` (optional)
        A number representing the amount of work already performed by the underlying process.
        For a `ProgressEvent` dispatched by the browser in HTTP messages, the value refers to the size, in bytes, of the message body, excluding headers and other overhead.
        In a `ProgressEvent` you create yourself, you can assign any numeric value to `loaded` that represents the amount of work completed relative to the `total` value.
        It defaults to `0`.
    - `total` (optional)
        A number indicating the total size of the data being transmitted or processed.
        For `ProgressEvent`s dispatched by the browser in HTTP messages, the value refers to the size, in bytes, of a resource and is derived from the `Content-Length` response header.
        In a `ProgressEvent` you create yourself, you may wish to normalize `total` to a value such as `100` or `1` if revealing the precise number of bytes of a resource is a concern.
        If using `1` as a total, for example, then `loaded` should be a decimal value between `0` and `1`.
        It defaults to `0`.

### Return value

A new `ProgressEvent` object.

## Example

### File upload

The example demonstrates how a `ProgressEvent` is built using a constructor. This is particularly useful for tracking the progress of processes like file uploads, downloads, or any long-running tasks.

```js
function updateProgress(loaded, total) {
  const progressEvent = new ProgressEvent("progress", {
    lengthComputable: true,
    loaded,
    total,
  });

  document.dispatchEvent(progressEvent);
}

document.addEventListener("progress", (event) => {
  console.log(`Progress: ${event.loaded}/${event.total}`);
});

updateProgress(50, 100);
```

### Using fractions in a ProgressEvent

The total number of bytes of a resource may reveal too much information about a download, so a number between 0 and 1 may be used instead:

```js
function updateProgress(loaded, total) {
  const progressEvent = new ProgressEvent("progress", {
    lengthComputable: true,
    loaded,
    total,
  });

  document.dispatchEvent(progressEvent);
}

document.addEventListener("progress", (event) => {
  console.log(`Progress: ${event.loaded}/${event.total}`);
});

updateProgress(0.123456, 1);
```

## See also

- The `ProgressEvent` interface it belongs to.
