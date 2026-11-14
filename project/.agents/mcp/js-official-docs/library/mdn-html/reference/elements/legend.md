---
title: "`<legend>` HTML field set legend element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/legend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<legend>` HTML field set legend element

The **`<legend>`** HTML element represents a caption for the content of its parent `<fieldset>`.

In customizable `<select>` elements, the `<legend>` element is allowed as a child of `<optgroup>`, to provide a label that is easy to target and style. This replaces any text set in the `<optgroup>` element's `label` attribute, and it has the same semantics.

```html
<fieldset>
  <legend>Choose your favorite monster</legend>

  <input type="radio" id="kraken" name="monster" value="K" />
  <label for="kraken">Kraken</label><br />

  <input type="radio" id="sasquatch" name="monster" value="S" />
  <label for="sasquatch">Sasquatch</label><br />

  <input type="radio" id="mothman" name="monster" value="M" />
  <label for="mothman">Mothman</label>
</fieldset>
```

```css
legend {
  background-color: black;
  color: white;
  padding: 3px 6px;
}

input {
  margin: 0.4rem;
}
```

## Attributes

This element only includes the global attributes.

## Examples

See `<form>` for examples on `<legend>`.

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       |
        Phrasing content
        and
        headings
        (h1–h6 elements).

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        A `<fieldset>` whose first child is this
        `&#x3C;legend>` element. In customizable select elements, a `&#x3C;legend>` element is permitted as a child of `<optgroup>` .

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLLegendElement`

## See also

- ARIA: Form role
