---
title: "HTMLInputElement: search event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/search_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: search event

The **`search`** event is fired when a search is initiated using an `` element of `type="search"`.

There are several ways a search can be initiated, such as by pressing `Enter` while the `` is focused, or, if the `incremental` attribute is present, after a UA-defined timeout elapses since the most recent keystroke (with new keystrokes resetting the timeout so the firing of the event is debounced).

Current UA implementations of `` have an additional control to clear the field. Using this control also fires the `search` event. In that case the `value` of the `` element will be the empty string.

This event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("search", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsearch = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
// addEventListener version
const input = document.querySelector('input[type="search"]');

input.addEventListener("search", () => {
  console.log(`The term searched for was ${input.value}`);
});
```

```js
// onsearch version (but note that this replaces other event listeners
// added using onsearch, if any)
const input = document.querySelector('input[type="search"]');

input.onsearch = () => {
  console.log(`The term searched for was ${input.value}`);
};
```

## Specifications

This event is not part of any specification.
