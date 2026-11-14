---
title: "HTMLElement: loseinterest event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/loseinterest_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: loseinterest event

The **`loseinterest`** event of the `HTMLElement` interface is fired on the target element of an interest invoker when interest is lost, allowing code to be run in response.

This event is normally cancelable, except when the user hits the `Esc` key to lose interest in all interest invokers contained in the document.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("loseinterest", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onloseinterest = (event) => { }
```

## Event type

An `InterestEvent`. Inherits from `Event`.

## Examples

### Basic <example-value> invoker event usage

In this example, we use the `interest` and `loseinterest` events to report when interest is shown and lost on a `` element that acts as an interest invoker. We do this by printing messages into the target `` element's text content.

#### HTML

We set up the relationship between the `` element interest invoker and its target `` element by setting the value of the `` element's `interestfor` attribute equal to the `` element's `id`.

```html
<button href="#" interestfor="mytarget">Interest invoker</button>
<p id="mytarget">No interest being shown currently.</p>
```

#### JavaScript

We get a reference to the `` element and its target element via the `interestForElement` property.

```js
const invoker = document.querySelector("[interestfor]");
const target = invoker.interestForElement;
```

We then set two event listeners on the target element, for the `interest` and `loseinterest` events.

- When interest is shown, we update the target `` element's text content to report the event and include the element that triggered it; in this example, that's the `` element. Note how you can get a reference to the interest invoker via the event object's `source` property.
- When interest is lost, we update the paragraph text to report that interest is no longer being shown.

```js
target.addEventListener("interest", (e) => {
  target.textContent = `Interest being shown via the ${e.source.tagName} element.`;
});

target.addEventListener("loseinterest", () => {
  target.textContent = `Interest lost.`;
});
```

#### Result

The example renders like this:

Try showing and losing interest in the button (for example, by hovering or focusing it) to see how the `` text changes.

## See also

- `interest` event
- Popover API
- Using interest invokers
