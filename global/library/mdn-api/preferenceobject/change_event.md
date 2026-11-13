---
title: "PreferenceObject: change event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferenceobject/change_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceObject: change event

The **`change`** event of the `PreferenceObject` interface is fired when a `PreferenceObject` `override` value changes. This can happen due to `requestOverride` or `clearOverride` method calls.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("change", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Basic usage

The following snippet logs the user's preferred color scheme to the console when it changes.

```js
navigator.preferences.colorScheme.addEventListener("change", (event) => {
  console.log(navigator.preferences.colorScheme.value);
});
```
