---
title: "`data-*` HTML global attributes"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/data-_star_/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `data-*` HTML global attributes

The **`data-*`** global attributes form a class of attributes called **custom data attributes**, that allow proprietary information to be exchanged between the HTML and its DOM representation by scripts.

```html
<h1>Secret <example-value></h1>

<ul>
  <li data-id="10784">Jason Walters, 003: Found dead in "A View to a Kill".</li>
  <li data-id="97865">
    Alex Trevelyan, 006: Agent turned terrorist leader; James' nemesis in
    "Goldeneye".
  </li>
  <li data-id="45732">
    James Bond, 007: The main man; shaken but not stirred.
  </li>
</ul>
```

```css
h1 {
  margin: 0;
}

ul {
  margin: 10px 0 0;
}

li {
  position: relative;
  width: 200px;
  padding-bottom: 10px;
}

li::after {
  content: "Data ID: " attr(data-id);
  position: absolute;
  top: -22px;
  left: 10px;
  background: black;
  color: white;
  padding: 2px;
  border: 1px solid #eeeeee;
  opacity: 0;
  transition: 0.5s opacity;
}

li:hover::after {
  opacity: 1;
}
```

All such custom data are available via the `HTMLElement` interface of the element the attribute is set on. The `HTMLElement.dataset` property gives access to them.
The `*` may be replaced by any name following the production rule of XML names which includes the following recommendations:

- The name should not start with `xml` (case-insensitive), as it's reserved for future XML specifications.
- The name should not contain any colon characters (`:`), as XML assigns meaning to such names.
- The name should not contain any capital letters, as XML is all lowercase.

These are recommendations. If these naming recommendations are not followed, no errors will occur. The attributes will still be matched using CSS attribute selectors, with the attribute being case insensitive and any attribute value being case-sensitive. Attributes not conforming to these three recommendations will also still be recognized by the JavaScript `HTMLElement.dataset` property and user-agents will include the attribute in the `DOMStringMap` containing all the custom data attributes for an `HTMLElement`.

If you plan to use `HTMLElement.dataset`, the portion of the attribute name following the `data-` can only include characters allowed in JavaScript property names (and hyphens, which will be removed). The `dataset` version of the attribute name removes the "data-" prefix and converts the rest of the name from kebab-case to camelCase. For example, `element.getAttribute("data-test")` is equivalent to `element.dataset.test` and `data-test-abc` will be accessible as `HTMLElement.dataset.testAbc` (or by `HTMLElement.dataset["testAbc"]`). Avoid non-alphabetic characters following a hyphen, such as `data-test-1` or `data--test`, as they will not be recognized by `HTMLElement.dataset`.

## Usage notes

By adding `data-*` attributes, even ordinary HTML elements can become rather complex and powerful program-objects. For example, a space-ship "sprite_"_ in a game could just be an `` element with a `class` attribute and several `data-*` attributes:

```html
<img
  class="spaceship cruiserX3"
  src="shipX3.png"
  data-ship-id="324"
  data-weapons="laserI laserII"
  data-shields="72%"
  data-x="414354"
  data-y="85160"
  data-z="31940" />
```

```js
function clickSpaceship() {
  spaceships[this.dataset.shipId].blasted();
}

document.querySelectorAll("img.spaceship").forEach((ship) => {
  ship.addEventListener("click", clickSpaceship);
});
```

For a more in-depth tutorial about using HTML data attributes, see Using data attributes.

## See also

- All global attributes.
- The `HTMLElement.dataset` property that allows you to access and modify these values.
- Using data attributes
