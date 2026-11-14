---
title: "HTMLButtonElement: interestForElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/interestforelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: interestForElement property

The **`interestForElement`** property of the `HTMLButtonElement` interface gets or sets the target element of an interest invoker, in cases where the associated `` element is specified as an interest invoker.

See Creating an interest invoker for more details.

## Value

An `Element` object instance, or `null` if the associated `` element does not have a target element set.

## Examples

### Basic `interestForElement` usage

In this example, we use a `` element's `interestForElement` property to set its target element and then retrieve the target element's `tagName`. The `tagName` is then printed in the `` element's text content.

#### HTML

We include a `` element and a `` element. We turn the `` element into a popover by setting a `popover` attribute on it.

```html
<button href="#">a button</button>
<div id="mypopover" popover>I am a <code>&lt;div&gt;</code> element.</div>
```

#### JavaScript

We get references to the `` and `` elements in script, then declare an interest invoker-target relationship between the `` and the `` by setting the `` element's `interestForElement` property equal to a reference to the ``. We then set the button's text content equal to a string containing the target element's `tagName`, retrieved via `invoker.interestForElement.tagName`.

```js
const invoker = document.querySelector("button");
const popover = document.querySelector("div");

invoker.interestForElement = popover;

invoker.textContent = `My target is a ${invoker.interestForElement.tagName} element`;
```

#### Result

The example renders like this:

Try showing interest in the button (for example, by hovering or focusing it) to make the `` appear.

## See also

- Using interest invokers
- The Popover API
