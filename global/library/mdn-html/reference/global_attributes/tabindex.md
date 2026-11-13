---
title: "`tabindex` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/tabindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `tabindex` HTML global attribute

The **`tabindex`** global attribute allows developers to make HTML elements focusable, allow or prevent them from being sequentially focusable (usually with the `Tab` key, hence the name) and determine their relative ordering for sequential focus navigation.

```html
<p>Click anywhere in this pane, then try tabbing through the elements.</p>

<label>First in tab order:<input type="text" /></label>

<div tabindex="0">Tabbable due to tabindex.</div>

<div>Not tabbable: no tabindex.</div>

<label>Third in tab order:<input type="text" /></label>
```

```css
p {
  font-style: italic;
  font-weight: bold;
}

div,
label {
  display: block;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

div:focus {
  font-weight: bold;
}
```

It accepts an integer as a value, with different results depending on the integer's value:

> **Note:**
> If an HTML element renders and has `tabindex` attribute with any valid integer value, the element can be focused with JavaScript (by calling the `focus()` method) or visually by clicking with the mouse. The particular `tabindex` value controls whether the element is `tabbable` (i.e., reachable via sequential keyboard navigation, usually with the `Tab` key).

- A _negative value_ (the exact negative value doesn't actually matter, usually `tabindex="-1"`) means that the element is not reachable via sequential keyboard navigation.

  > **Note:**
  > `tabindex="-1"` may be useful for elements that should not be navigated to directly using the `Tab` key, but need to have keyboard focus set to them. Examples include an off-screen modal window that should be focused when it comes into view, or a form submission error message that should be immediately focused when an errant form is submitted.

- `tabindex="0"` means that the element should be focusable in sequential keyboard navigation, after any positive `tabindex` values. The focus navigation order of these elements is defined by their order in the document source.
- A _positive value_ means the element should be focusable in sequential keyboard navigation, with its order defined by the value of the number. That is, `tabindex="4"` is focused before `tabindex="5"` and `tabindex="0"`, but after `tabindex="3"`. If multiple elements share the same positive `tabindex` value, their order relative to each other follows their position in the document source. The maximum value for `tabindex` is 32767.
- If the `tabindex` attribute is included with no value set, whether the element is focusable is determined by the user agent.

  > **Warning:**
  > You are recommended to only use `0` and `-1` as `tabindex` values. Avoid using `tabindex` values greater than `0` and CSS properties that can change the order of focusable HTML elements (Ordering flex items). Doing so makes it difficult for people who rely on using keyboard for navigation or assistive technology to navigate and operate page content. Instead, write the document with the elements in a logical sequence.

Some focusable HTML elements have a default `tabindex` value of `0` set under the hood by the user agent. These elements are an `` or `<area>` with `href` attribute, ``, `<frame>` (deprecated), ``, ``, `<object>`, `<select>`, `<textarea>`, and SVG `` element, or a `<summary>` element that provides summary for a `` element. Developers shouldn't add the `tabindex` attribute to these elements unless it changes the default behavior (for example, including a negative value will remove the element from the focus navigation order).

> **Warning:**
> The tabindex attribute must not be used on the `<dialog>` element.

## Accessibility concerns

Avoid using the `tabindex` attribute in conjunction with non-interactive content to make something intended to be interactive focusable by keyboard input. An example of this would be using a `` element to describe a button, instead of the `` element.

Interactive components authored using non-interactive elements are not listed in the accessibility tree. This prevents assistive technology from being able to navigate to and manipulate those components. The content should be semantically described using interactive elements (``, ``, ``, ``, `<select>`, `<textarea>`, etc.) instead. These elements have built-in roles and states that communicate status to the accessibility that would otherwise have to be managed by ARIA.

- Using the tabindex attribute | Vispero

## See also

- All global attributes
- `HTMLElement.tabIndex` that reflects this attribute
- Accessibility problems with `tabindex`: see Don't Use Tabindex Greater than 0 by Adrian Roselli
- Reading order
