---
title: "Document: createTouchList() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createtouchlist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createTouchList() method

The **`Document.createTouchList()`** method creates and returns a new `TouchList` object.

## Syntax

```js
createTouchList(touch1)
createTouchList(touch1, touch2)
createTouchList(touch1, touch2, /* …, */ touchN)
```

### Parameters

- `touch1`, …, `touchN`
    Zero or more `Touch` objects. Firefox also
    accepts an array of
    `Touch` objects.

### Return value

A `TouchList` object containing the `Touch` objects specified by the `touches` parameter.

## Examples

This example illustrates using the `Document.createTouchList()` method to
create `TouchList` objects.

In following code snippet, some `Touch` objects are created for the
`target` element and those touch points are then used to create some
`TouchList` objects.

```js
const target = document.getElementById("target");

// Create some touch points
const touch1 = document.createTouch(window, target, 1, 15, 20, 35, 40);
const touch2 = document.createTouch(window, target, 2, 25, 30, 45, 50);

// Create an empty TouchList objects
const list0 = document.createTouchList();

// Create a TouchList with only one Touch object
const list1 = document.createTouchList(touch1);

// Create a list with two Touch objects
const list2 = document.createTouchList(touch1, touch2);
```

## Specifications

This feature is not part of any current specification. It is no longer on track to become a standard.

## See also

- Touch events
- `Touch`
- `TouchEvent`
- `TouchList`
- `Document.createTouch()`
