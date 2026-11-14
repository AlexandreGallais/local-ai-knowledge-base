---
title: "`<output>` HTML output element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/output/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<output>` HTML output element

The **`<output>`** HTML element is a container element into which a site or app can inject the results of a calculation or the outcome of a user action.

## Attributes

This element includes the global attributes.

- `for`
    A space-separated list of other elements' `id`s, indicating that those elements contributed input values to (or otherwise affected) the calculation.
- `form`
    The `<form>` element to associate the output with (its _form owner_). The value of this attribute must be the `id` of a `<form>` in the same document. (If this attribute is not set, the `<output>` is associated with its ancestor `<form>` element, if any.)

    This attribute lets you associate `<output>` elements to `<form>`s anywhere in the document, not just inside a `<form>`. It can also override an ancestor `<form>` element. The `<output>` element's name and content are not submitted when the form is submitted.

- `name`
    The element's name. Used in the `form.elements` API.

The `<output>` value, name, and contents are NOT submitted during form submission.

## Accessibility

Many browsers implement this element as an `aria-live` region. Assistive technology will thereby announce the results of UI interactions posted inside it without requiring that focus is switched away from the controls that produce those results.

Live-region updates are generally announced as plain text, so links, buttons, and other semantics nested inside `<output>` may not be conveyed in the announcement.

## Examples

In the following example, we provide a slider whose value can range between `0` and `100`, and an `` element into which you can enter a second number. The two numbers are added together, and the result is displayed in the `<output>` element each time the value of any of the controls changes.

```html
<input type="range" id="b" name="b" value="50" /> +
<input type="number" id="a" name="a" value="10" /> =
<output id="result" for="a b">60</output>
```

```js
const a = document.getElementById("a");
const b = document.getElementById("b");
const result = document.getElementById("result");

function updateResult() {
  const aValue = a.valueAsNumber;
  const bValue = b.valueAsNumber;
  result.value = aValue + bValue;
}

a.addEventListener("input", updateResult);
b.addEventListener("input", updateResult);

updateResult();
```

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content,
        listed,
        labelable,
        resettable
        form-associated element, palpable content.

       | Permitted content
       |
        Phrasing content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       | `status`

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLOutputElement`
