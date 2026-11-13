---
title: "Window: pageshow event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/pageshow_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: pageshow event

The **`pageshow`** event is sent to a `Window` when the browser navigates to a new document.

This includes:

- Initially loading the page.
- Navigating to the page from another page in the same window or tab.
- Restoring a frozen page on mobile OSes.
- Returning to the page using the browser's forward or back buttons (including when restored from the bfcache).
- Opening a page in a background tab.
- Prerendering a page, even before it is activated.

> **Warning:**
> Despite the name, the `pageshow` event does not fire when the page is actually _shown_ to the user. For example, it may be opened in a background tab or prerendered. If you are interested in responding to the page being shown to the user, use the following events:
>
> - `pagereveal`: Sent when a page is first rendered.
> - `visibilitychange`: Sent each time a page's visibility changes.
> - `prerenderingchange`: Sent when a prerendered page is activated.

> **Note:**
> During the initial page load, the `pageshow` event fires _after_ the `load` event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pageshow", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpageshow = (event) => { }
```

## Event type

A `PageTransitionEvent`. Inherits from `Event`.

## Event handler aliases

In addition to the `Window` interface, the event handler property `onpageshow` is also available on the following targets:

- `HTMLBodyElement`
- `HTMLFrameSetElement`
- `SVGSVGElement`

## Examples

This example sets up event handlers for events listed in the array `events`. The handler, `eventLogger()`, logs the type of event that occurred to the console, and includes the value of the `persisted` flag on `pageshow` and `pagehide` events.

### HTML

```html
<p>
  Open the console and watch the output as you navigate to and from this page.
  Try loading new pages into this tab, then navigating forward and backward
  through history, noting the events' output to the log.
</p>
```

### JavaScript

```js
const events = ["pagehide", "pageshow", "unload", "load"];

const eventLogger = (event) => {
  switch (event.type) {
    case "pagehide":
    case "pageshow": {
      let isPersisted = event.persisted ? "persisted" : "not persisted";
      console.log(`Event: ${event.type} - ${isPersisted}`);
      break;
    }
    default:
      console.log(`Event: ${event.type}`);
      break;
  }
};

events.forEach((eventName) => window.addEventListener(eventName, eventLogger));
```

## See also

- `pagehide`
