---
title: "Performance: mark() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/mark/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: mark() method

The **`mark()`** method creates a named `PerformanceMark` object representing a high resolution timestamp marker in the browser's performance timeline.

## Syntax

```js
mark(name)
mark(name, markOptions)
```

### Parameters

- `name`
    A string representing the name of the mark. Must not be the same name as one of the properties of the deprecated `PerformanceTiming` interface.

- `markOptions` (optional)
    An object for specifying a timestamp and additional metadata for the mark.
    - `detail` (optional)
        Arbitrary metadata to include in the mark. Defaults to `null`. Must be structured-cloneable.
        - `devtools` (optional) (experimental)
            Some browsers have use a structured `devtools` object within the `detail` object as part of an Extensibility API that surfaces these in custom tracks in performance traces. See the Chrome's Extensibility API documentation for more information.
            - `dataType` (experimental)
                A string which must be set to `marker`. Identifies as a marker.
            - `color` (optional) (experimental)
                Defaults to `"primary"`. Must be one of `"primary"`, `"primary-light"`, `"primary-dark"`, `"secondary"`, `"secondary-light"`, `"secondary-dark"`, `"tertiary"`, `"tertiary-light"`, `"tertiary-dark"`, `"error"`.
            - `properties` (optional) (experimental)
                Array of key-value pairs. Values can be any JSON-compatible type.
            - `tooltipText` (optional) (experimental)
                Short description for tooltip.

    - `startTime` (optional)
        `DOMHighResTimeStamp` to use as the mark time. Defaults to `performance.now()`.

### Return value

The `PerformanceMark` entry that was created.

### Exceptions

- `SyntaxError`: Thrown if the `name` is one of the properties of the deprecated `PerformanceTiming` interface. See the example below.
- `TypeError`: Thrown if `startTime` is negative.

## Examples

### Creating named markers

The following example uses `mark()` to create named `PerformanceMark` entries. You can create several marks with the same name. You can also assign them, to have a reference to the `PerformanceMark` object that has been created.

```js
performance.mark("login-started");
performance.mark("login-started");
performance.mark("login-finished");
performance.mark("form-sent");

const videoMarker = performance.mark("video-loaded");
```

### Creating markers with details

The performance mark is configurable using the `markOptions` object where you can put additional information in the `detail` property, which can be of any type.

```js
performance.mark("login-started", {
  detail: "Login started using the login button in the top menu.",
});

performance.mark("login-started", {
  detail: { htmlElement: myElement.id },
});
```

### Creating markers with a different start time

The default timestamp of the `mark()` method is `performance.now()`. You can set it to a different time using the `startTime` option in `markOptions`.

```js
performance.mark("start-checkout", {
  startTime: 20.0,
});

performance.mark("login-button-pressed", {
  startTime: myEvent.timeStamp,
});
```

### DevTools Extensibility API

For browsers that support the Extensibility API you can use the `detail` parameter to provide more details in a `devtools` object that will be used to display this in performance profiles:

```js
// Marker indicating when the processed image was uploaded
performance.mark("Image Upload", {
  detail: {
    devtools: {
      dataType: "marker",
      color: "secondary",
      properties: [
        ["Image Size", "2.5MB"],
        ["Upload Destination", "Cloud Storage"],
      ],
      tooltipText: "Processed image uploaded",
    },
  },
});
```

### Reserved names

Note in order to maintain backwards compatibility, names that are part of the deprecated `PerformanceTiming` interface can't be used. The following example throws:

```js
performance.mark("navigationStart");
// SyntaxError: "navigationStart" is part of
// the PerformanceTiming interface,
// and cannot be used as a mark name
```

## See also

- `performance.measure()`
- `console.timeStamp()`
- `console.time()`
- `console.timeEnd()`
