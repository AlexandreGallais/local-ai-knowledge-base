---
title: "SVGAElement: interestForElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/interestforelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: interestForElement property

The **`interestForElement`** property of the `SVGAElement` interface gets or sets the target element of an interest invoker, in cases where the associated `` element is specified as an interest invoker.

See Creating an interest invoker for more details.

## Value

An `Element` object instance, or `null` if the associated `` element does not have a target element set.

## Examples

### Basic `interestForElement` usage

In this example, we use an SVG `` element's `interestForElement` property to set its target element and then retrieve the target element's `tagName`. The `tagName` is then included in the `` element's text content.

#### HTML

The markup contains an SVG `` element with a `<text>` element, and the link text is included within the `<text>` element. There's also an HTML `` element. We turn the `` element into a popover by setting the `popover` attribute on it.

```html
<svg>
  <a href="#">
    <text x="90" y="20" text-anchor="middle">A link</text>
  </a>
</svg>
<div id="mypopover" popover>I am a <code>&lt;div&gt;</code> element.</div>
```

```css
svg {
  width: 200px;
  height: 100px;
}

svg a text {
  fill: blue;
  text-decoration: underline;
}
```

#### JavaScript

We get references to the ``, `<text>`, and `` elements in script. We then create the interest invoker-target relationship between the `` and the `` by setting the `` element's `interestForElement` property equal to a reference to the ``. We then update the `<text>` content to display the target element's `tagName`, retrieved via `invoker.interestForElement.tagName`.

```js
const invoker = document.querySelector("a");
const invokerText = document.querySelector("text");
const popover = document.querySelector("div");

invoker.interestForElement = popover;

invokerText.textContent = `My target is a ${invoker.interestForElement.tagName} element`;
```

#### Result

The example renders like this:

Try showing interest in the link (for example, by hovering or focusing it) to make the `` appear.

## See also

- Using interest invokers
- The Popover API
