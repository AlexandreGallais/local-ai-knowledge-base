---
title: "ARIA: aria-posinset attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-posinset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-posinset attribute

The `aria-posinset` attribute defines an element's number or position in the current set of listitems or treeitems when not all items are present in the DOM.

## Description

Short for "position in set", the `aria-posinset` attribute defines the position of the element within the whole set of listitems or treeitems when only a subset of the items are present in the DOM.

If all the items in a list are present in the DOM, the browser can calculate the total and the position of each, making `aria-posinset` unnecessary. When only a portion of a set is in the DOM, include `aria-posinset` to provide information about the element's position within the set along with `aria-setsize` to inform the user how many items are in the full set.

The following example shows a listbox with four element options out of the 118 in the periodic table of chemical elements.

```html
<h2 id="periodic-table">Periodic table of chemical elements</h2>
<ul role="listbox" aria-labelledby="periodic-table">
  <li role="option" aria-setsize="118" aria-posinset="1">Hydrogen</li>
  <li role="option" aria-setsize="118" aria-posinset="3">Lithium</li>
  <li role="option" aria-setsize="118" aria-posinset="11">Sodium</li>
  <li role="option" aria-setsize="118" aria-posinset="19">Potassium</li>
</ul>
```

The value of each `aria-posinset` is an integer greater than or equal to `1`, and less than or equal to the size of the set when that size is known.

> **Note:**
> When using `aria-posinset` you must also include value for `aria-setsize`, which is the size of the entire set. If the size of the entire set is unknown, set `aria-setsize="-1"`.

For `menuitem`, `menuitemcheckbox`, or `menuitemradio`, set the value of `aria-posinset` with respect to the total number of items in the menu, excluding any separators.

In a `feed`, each `` element has `aria-posinset` set to a value that represents its position in the feed along with the `aria-setsize` set to either the number of articles that have been loaded or the total number in the feed, depending on which value is most helpful to users.

## Values

- `<integer>`
    Integer greater than or equal to 1, and less than or equal to the value of `aria-setsize`.

## Associated interfaces

- `Element.ariaPosInSet`
    The `ariaPosInSet` property, part of the `Element` interface, reflects the value of the `aria-posinset` attribute.
- `ElementInternals.ariaPosInSet`
    The `ariaPosInSet` property, part of the `ElementInternals` interface, reflects the value of the `aria-posinset` attribute.

## Associated roles

Used in roles:

- `article`
- `associationlistitemkey`
- `associationlistitemvalue`
- `comment`
- `listitem`
- `menuitem`
- `option`
- `radio`
- `row`
- `tab`

Inherits into roles:

- `comment`
- `menuitemcheckbox`
- `menuitemradio`
- `treeitem`

## See also

- `aria-setsize`
