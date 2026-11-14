---
title: "`<input type=\"reset\">` HTML attribute value"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/reset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="reset">` HTML attribute value

`` elements of type **`reset`** are rendered as buttons, with a default `click` event handler that resets all inputs in the form to their initial values.

```html
<form>
  <div class="controls">
    <label for="comments">Comments:</label>
    <textarea id="comments" name="comments"></textarea>

    <input type="reset" value="Reset" />
  </div>
</form>
```

```css
.controls {
  padding-top: 1rem;
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 1fr 2fr;
  gap: 0.7rem;
}

label {
  font-size: 0.8rem;
  justify-self: end;
}

input[type="reset"] {
  width: 5rem;
  justify-self: end;
}

input[type="reset"] {
  grid-column: 2;
  grid-row: 2;
}
```

## Value

An `` element's `value` attribute contains a string that is used as the button's label providing the button with an accessible description. Buttons such as `reset` don't have a value otherwise.

### Setting the value attribute

```html
<input type="reset" value="Reset the form" />
```

### Omitting the value attribute

If you don't specify a `value`, you get a button with the default label (typically "Reset," but this will vary depending on the user agent):

```html
<input type="reset" />
```

## Using reset buttons

`` buttons are used to reset forms. If you want to create a custom button and then customize the behavior using JavaScript, you need to use ``, or better still, a `` element.

You should usually avoid including reset buttons in your forms. They're rarely useful, and are instead more likely to frustrate users who click them by mistake (often while trying to click the submit button).

### A basic reset button

We'll begin by creating a basic reset button:

```html
<form>
  <div>
    <label for="example">Type in some sample text</label>
    <textarea id="example"></textarea>
  </div>
  <div>
    <input type="reset" value="Reset the form" />
  </div>
</form>
```

This renders like so:

Try entering some text into the text field, and then pressing the reset button.

### Adding a reset keyboard shortcut

To add a keyboard shortcut to a reset button — just as you would with any `` for which it makes sense — you use the `accesskey` global attribute.

In this example, `r` is specified as the access key (you'll need to press `r` plus the particular modifier keys for your browser/OS combination; see `accesskey` for a useful list of those).

```html
<form>
  <div>
    <label for="example">Type in some sample text</label>
    <textarea id="example"></textarea>
  </div>
  <div>
    <input type="reset" value="Reset the form" accesskey="r" />
  </div>
</form>
```

The problem with the above example is that there's no way for the user to know what the access key is! This is especially true since the modifiers are typically non-standard to avoid conflicts. When building a site, be sure to provide this information in a way that doesn't interfere with the site design (for example by providing an easily accessible link that points to information on what the site access keys are). Adding a tooltip to the button (using the `title` attribute) can also help, although it's not a complete solution for accessibility purposes.

### Disabling and enabling a reset button

To disable a reset button, specify the `disabled` attribute on it, like so:

```html
<input type="reset" value="Disabled" disabled />
```

You can enable and disable buttons at run time by setting `disabled` to `true` or `false`; in JavaScript this looks like `btn.disabled = true` or `btn.disabled = false`.

> **Note:**
> See the `` page for more ideas about enabling and disabling buttons.

## Validation

Buttons don't participate in constraint validation; they have no real value to be constrained.

## Examples

We've included basic <example-value> above. There isn't really anything more to say about reset buttons.

## Technical summary

       | Value
       | A string used as the button's label

       | Events
       | `click`

       | Supported common attributes
       |
        `type` and
        `value`

       | IDL attributes
       | `value`

       | DOM interface
       | `HTMLInputElement`

       | Implicit ARIA Role
       | `button`

## See also

- `` and the `HTMLInputElement` interface which implements it.
- Forms and buttons
- HTML forms
- The `` element
