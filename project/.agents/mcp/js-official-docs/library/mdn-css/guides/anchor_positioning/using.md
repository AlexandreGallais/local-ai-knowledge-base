---
title: "Using CSS anchor positioning (part 1 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/anchor_positioning/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS anchor positioning

The **CSS anchor positioning** module defines features that allow you to tether elements together. Elements can be defined as **anchor elements** and **anchor-positioned elements**. Anchor-positioned elements can be bound to anchor elements. The anchor-positioned elements can then have their size and position set relative to the size and location of the anchor elements to which they are bound.

CSS anchor positioning also provides CSS-only mechanisms for specifying multiple alternative positions for an anchor-positioned element. For example, if a tooltip is anchored to a form field but the tooltip would otherwise be rendered offscreen in its default position settings, the browser can try rendering it in a different suggested position so it is placed onscreen, or, alternatively, hide it altogether if desired.

This article explains the fundamental anchor positioning concepts, and how to use the module's association, positioning, and sizing features at a basic level. We've included links to reference pages with additional examples and syntax details for each concept discussed below. For information on specifying alternative positions and hiding anchor-positioned elements, see the Fallback options and conditional hiding for overflow guide.

## Fundamental concepts

It's very common to want to tether, or bind, one element to another. For example:

- Error messages that appear alongside form controls.
- Tooltips or infoboxes that pop up next to a UI element to provide more information about it.
- Settings or options dialogs that can be accessed to quickly configure UI elements.
- Drop-down or popover menus that appear next to an associated navigation bar or button.

Modern interfaces frequently call for some content — often reusable and dynamically-generated — to be situated relative to an anchor element. Creating such use cases would be fairly straightforward if the element to tether to (aka the **anchor element**) was always in the same place in the UI and the tethered element (aka the **anchor-positioned element**, or just **positioned element**) could always be placed immediately before or after it in the source order. However, things are rarely that simple.

The location of positioned elements relative to their anchor element needs to be maintained and adjusted as the anchor element moves or otherwise changes configuration (e.g., by scrolling, changing the viewport size, drag and drop, etc.). For example, if an element such as a form field gets close to the edge of the viewport, its tooltip may end up offscreen. Generally, you want to bind the tooltip to its form control and ensure the tooltip is kept fully visible on-screen as long as the form field is visible, automatically moving the tooltip if needed. You may have noticed this as the default behavior in your operating system when you right-click (`Ctrl` + click) context menus on your desktop or laptop.

Historically, associating an element with another element and dynamically changing a positioned element's location and size based on an anchor's position required JavaScript, which added complexity and performance issues. It also wasn't guaranteed to work in all situations. The features defined in the CSS anchor positioning module enable implementing such use cases performantly and declaratively with CSS (and HTML) instead of JavaScript.

## Associating anchor and positioned elements

To associate an element with an anchor, you need to first declare which element is the anchor, and then specify which positioned element(s) to associate with that anchor. This creates an anchor reference between the two. This association can be created explicitly via CSS or implicitly.

### Explicit CSS anchor association

To declare an element as an anchor with CSS, you need to set an anchor name on it via the `anchor-name` property. The anchor name needs to be a `dashed-ident`. In this example, we also set the anchor's `width` to `fit-content` to get a small square anchor, which better demonstrates the anchoring effect.

```css
.anchor {
  font-size: 1.8rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  border-radius: 10px;
  border: 1px solid black;
  padding: 3px;
}
```

```css
.anchor {
  anchor-name: --my-anchor;
  width: fit-content;
}
```

Converting an element to an anchor-positioned element requires two steps: It needs to be absolutely or fixed positioned using the `position` property. The positioned element then has its `position-anchor` property set to the value of the anchor element's `anchor-name` property to associate the two together:

```css
.infobox {
  color: darkblue;
  background-color: azure;
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
}
```

```css
.infobox {
  position: fixed;
  position-anchor: --my-anchor;
}
```

We'll apply the above CSS to the following HTML:

```html
<div class="anchor">⚓︎</div>

<div class="infobox">
  <p>This is an information box.</p>
</div>
```

This will render as follows:

The anchor and infobox are now associated, but for the moment you'll have to trust us on this. They are not tethered to each other yet — if you were to position the anchor and move it somewhere else on the page, it would move on its own, leaving the infobox in the same place. You'll see the actual tethering in action when we look at positioning elements based on anchor position.

### Implicit anchor association

In some cases, an implicit anchor reference will be made between two elements, due to the semantic nature of their relationship:

- When using the Popover API to associate a popover with a control, an implicit anchor reference is made between the two. This can occur when:
  - Declaratively associating a popover with a control using the `popovertarget` and `id` attributes or the `commandfor` and `id` attributes.
  - Programmatically associating a popover action such as `showPopover()` with a control using the `source` option.
- A `<select>` element and its dropdown picker are opted into customizable select element functionality via the `appearance` property `base-select` value. In this case, an implicit popover-invoker relationship is created between the two, which also means they'll have an implicit anchor reference.

> **Note:**
> See Popover anchor positioning for more information on positioning elements relative to their implicit anchors.

> **Note:**
> The methods above associate an anchor with an element, but they are not yet tethered. To tether them together, the positioned element needs to be positioned relative to its anchor, which is done with CSS.

### Removing an anchor association

If you wish to remove an explicit anchor association previously made between an anchor element and a positioned element, you can do one of the following:

1. Set the anchor's `anchor-name` property value to `none`, or to a different `<dashed-ident>`, if you want a different element to be anchored to it.
2. Set the `position-anchor` property of the positioned element to `none`, or to an anchor name that doesn't exist in the current document, such as `--not-an-anchor-name`.

In the case of implicit anchor associations, you'll need to use the second method — the first method doesn't work. This is because the association is controlled internally, and you can't remove the `anchor-name` via CSS.

For example, to stop a customizable `<select>` element's picker from being anchored to the `<select>` element itself, you could use the following rule:

```css
::picker(select) {
  position-anchor: none;
}
```

## Anchor scoping

When multiple anchor elements are given the same `anchor-name` value and a positioned element has that name as its `position-anchor` property value, the positioned element will be associated with the _last_ anchor element in the source order with that `anchor-name` value.

For example, if a document contains multiple repeated components, each with a positioned element tethered to an anchor, all the positioned elements will be anchored to the last anchor on the page unless each component uses a different anchor name. This is likely not the desired behavior.

The `anchor-scope` property can fix this problem by limiting the visibility, or "scope", of an `anchor-name` value to a specific subtree. The result is that each positioned element can only be anchored to an element within the same subtree of the element that has the scope set on it.

- `anchor-scope: all` sets the scope so that _any_ `anchor-name` values set in the subtree can only be bound to by positioned elements in the same subtree.
- `anchor-scope: --my-anchor, --my-anchor2` sets the scope so that the specified `anchor-name` values, when set in the subtree, can only be bound to by positioned elements in the same subtree.
- `anchor-scope: none` is the default value; it specifies that no anchor scoping is set.

For example, let's say you have multiple anchors and anchor-positioned `` elements inside `` containers:

```html
<section class="scoped">
  <div class="anchor">⚓︎</div>
  <div class="positioned">Positioned 1</div>
</section>

<section class="scoped">
  <div class="anchor">⚓︎</div>
  <div class="positioned">Positioned 2</div>
</section>

<section class="scoped">
  <div class="anchor">⚓︎</div>
  <div class="positioned">Positioned 3</div>
</section>
```

We turn each `anchor` `` into an anchor element by giving them an `anchor-name` of `--my-anchor`. We then position each `positioned` `` relative to an element with the `--my-anchor` anchor name by giving them absolute positioning, a `position-anchor` value of `--my-anchor`, and a `position-area` value of `right`. Finally, we set the anchor scope of each `` container using `anchor-scope: --my-anchor`:

```css
html {
  height: 100%;
}

body {
  height: inherit;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.scoped {
  padding: 20px;
  background: #eeeeee;
}

.anchor {
  font-size: 1.8rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: blue;
  width: fit-content;
  padding: 3px;
}

.positioned {
  background: orange;
  width: fit-content;
  padding: 3px;
}
```

```css
.anchor {
  anchor-name: --my-anchor;
}

.positioned {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: right;
}

.scoped {
  anchor-scope: --my-anchor;
}
```

This results in the following positioning behavior:

Each positioned element is positioned relative to the anchor inside the same `` element. This is because each `` element has an `anchor-scope` of `--my-anchor` set on it; positioned elements inside each scoped container can therefore only be positioned relative to `my-anchor` anchors inside the same container.

If we didn't set `anchor-scope: --my-anchor` on the containers, all of the positioned elements would be positioned relative to the last anchor on the page.
