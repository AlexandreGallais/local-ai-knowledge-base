---
title: "`<label>` HTML label element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<label>` HTML label element

The **``** HTML element represents a caption for an item in a user interface.

```html
<div class="preference">
  <label for="cheese">I like cheese.</label>
  <input type="checkbox" name="cheese" id="cheese" />
</div>

<div class="preference">
  <label for="peas">I like peas.</label>
  <input type="checkbox" name="peas" id="peas" />
</div>
```

```css
.preference {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin: 0.5rem;
}
```

## Attributes

This element includes the global attributes.

- `for`
    The value is the `id` of the labelable form control in the same document, associating the `` with that form control. Note that its JavaScript reflection property is `htmlFor`.

## Usage notes

### Associating a label with a form control

The first element in the document with an `id` attribute matching the value of the `for` attribute is the _labeled control_ for this `label` element — if the element with that `id` is actually a labelable element. If it is _not_ a labelable element, then the `for` attribute has no effect. If there are other elements that also match the `id` value, later in the document, they are not considered.

Multiple `` elements can be associated with the same form control by having multiple `` elements with the same `for` attribute value, which gives the form control multiple labels.

Associating a `` with a form control, such as `` or `<textarea>` offers some major advantages:

- The label text is not only visually associated with its corresponding text input; it is programmatically associated with it too. This means that, for example, a screen reader will read out the label when the user is focused on the form input, making it easier for an assistive technology user to understand what data should be entered.
- When a user clicks or touches/taps a label, the browser passes the focus to its associated input (the resulting event is also raised for the input). That increased hit area for focusing the input provides an advantage to anyone trying to activate it — including those using a touch-screen device.

There are two ways to associate a `` with a form control, commonly referred to as _explicit_ and _implicit_ association.

To explicitly associate a `` element with an `` element, you first need to add the `id` attribute to the `` element. Next, you add the `for` attribute to the `` element, where the value of `for` is the same as the `id` in the `` element.

```html
<label for="peas">I like peas.</label>
<input type="checkbox" name="peas" id="peas" />
```

Alternatively, you can nest the `` directly inside the ``, in which case the `for` and `id` attributes are not needed because the association is implicit:

```html
<label>
  I like peas.
  <input type="checkbox" name="peas" />
</label>
```

> **Note:**
> A `` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element.

These two methods are equivalent, but there are a few considerations:

- While common browser and screen reader combinations support implicit association, not all assistive technologies do.
- Depending on your design, the type of association may impact stylability. Making the `` and form control sibling elements instead of parent-child means they are separate, adjacent boxes, enabling more customizable layout such as lining them up with grid or flex layout methods.
- Explicit association requires the form control to have an `id`, which must be unique in the whole document. This is hard especially in a componentized application. Frameworks often provide their own solutions, such as React's `useId()`, but it still requires extra orchestration to get right.

Generally, we recommend using explicit association with the `for` attribute, to ensure compatibility with external tools and assistive technologies. In fact, you can simultaneously nest _and_ provide `id`/`for` for maximum compatibility.

The form control that a label is labeling is called the _labeled control_ of the label element. Multiple labels can be associated with the same form control:

```html
<label for="username">Enter your username:</label>
<input id="username" name="username" type="text" />
<label for="username">Forgot your username?</label>
```

Elements that can be associated with a `` element include ``, `` (except for `type="hidden"`), `<meter>`, `<output>`, `<progress>`, `<select>` and `<textarea>`.

## Accessibility

### Interactive content

Other than the implicitly associated form control, don't place additional interactive elements such as `<anchors>` or `<buttons>` inside a ``. Doing so makes it difficult for people to activate the form input associated with the `label`.

**Don't do this:**

```html
<label for="tac">
  <input id="tac" type="checkbox" name="terms-and-conditions" />
  I agree to the <a href="terms-and-conditions.html">Terms and Conditions</a>
</label>
```

**Prefer this:**

```html
<p>
  <a href="terms-and-conditions.html">Read our Terms and Conditions</a>
</p>
<label for="tac">
  <input id="tac" type="checkbox" name="terms-and-conditions" />
  I agree to the Terms and Conditions
</label>
```

> **Note:**
> It is a good practice to place any necessary context, such as the link to the terms and conditions, before the form control, so that the user can read it before they interact with the control.

### Headings

Placing heading elements within a `` interferes with many kinds of assistive technology, because headings are commonly used as a navigation aid. If the label's text needs to be adjusted visually, use CSS classes applied to the `` element instead.

If a form, or a section of a form needs a title, use the `<legend>` element placed within a `<fieldset>`.

**Don't do this:**

```html
<label for="your-name">
  <h3>Your name</h3>
  <input id="your-name" name="your-name" type="text" />
</label>
```

**Prefer this:**

```html
<label class="large-label" for="your-name">
  Your name
  <input id="your-name" name="your-name" type="text" />
</label>
```

### Buttons

An `` element with a `type="button"` declaration and a valid `value` attribute does not need a label associated with it. Doing so may actually interfere with how assistive technology parses the button input. The same applies for the `` element.

## Examples

### Defining an implicit label

```html
<label>Click me <input type="text" /></label>
```

### Defining an explicit label with the "for" attribute

```html
<label for="username">Click me to focus on the input field</label>
<input type="text" id="username" />
```

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content,
        interactive content,
        form-associated element, palpable content.

       | Permitted content
       |
        Phrasing content, but no descendant `label` elements. No
        labelable
        elements other than the labeled control are allowed.

       | Tag omission
       | None, both the starting and ending tags are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLLabelElement`
