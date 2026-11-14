---
title: "HTMLMediaElement: load() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/load/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: load() method

The `HTMLMediaElement` method
**`load()`** resets the media element to its initial state and
begins the process of selecting a media source and loading the media in preparation
for playback to begin at the beginning.

The amount of media data that is
prefetched is determined by the value of the element's `preload` attribute.

This method is generally only useful when you've made dynamic changes to the set of
sources available for the media element, either by changing the element's
`src` attribute or by adding or removing
`` elements nested within the media element itself.
`load()` will reset the element and rescan the available sources, thereby
causing the changes to take effect.

## Syntax

```js
load()
```

### Parameters

None.

### Return value

None (`undefined`).

## Usage notes

Calling `load()` aborts all ongoing operations involving this media element,
then begins the process of selecting and loading an appropriate media resource given the
options specified in the `<audio>` or `` element
and its `src` attribute or child ``
element(s). This is described in more detail in the
HTML video and audio page.

The process of aborting any ongoing activities will cause any outstanding
`Promise`s returned by `play()` being
fulfilled or rejected as appropriate based on their status before the loading of new
media can begin. Pending play promises are aborted with an `"AbortError"`
`DOMException`.

Appropriate events will be sent to the media element itself as the load process
proceeds:

- If the element is already in the process of loading media, that load process is
  aborted and the **`abort`** event is sent.
- If the element has already been initialized with media, the
  **`emptied`** event is sent.
- If resetting the playback position to the beginning of the media actually changes
  the playback position (that is, it was not already at the beginning), a
  **`timeupdate`** event is sent.
- Once media has been selected and loading is ready to begin, the
  **`loadstart`** event is delivered.
- From this point onward, events are sent just like any media load.

## Examples

This example finds a `` element in the document and resets it by
calling `load()`.

```js
const mediaElem = document.querySelector("video");
mediaElem.load();
```
