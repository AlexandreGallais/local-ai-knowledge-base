---
title: "`autocorrect` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/autocorrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `autocorrect` HTML global attribute

The **`autocorrect`** global attribute is an enumerated attribute that controls whether autocorrection of editable text is enabled for spelling and/or punctuation errors.

The specific autocorrection behavior, including which words are substituted, depends on the user agent and the services provided by the underlying device.
For example, on macOS a user agent might rely on registered replacement text and punctuation.
Other devices and browsers may use a different approach.

Autocorrection is relevant to editable text elements:

- `` elements, except for `password`, `email`, and `url`, which do not support autocorrection.
- `<textarea>` elements.
- Any element that has the `contenteditable` attribute set.

Editable elements have auto-correction enabled by default, except for within a `<form>` element, where the default value may be inherited from the form.
Explicitly setting the attribute overrides the default.

## Value

Possible values are:

- `on` or `""` (the empty string)
    Enable automatic correction of spelling and punctuation errors.

- `off`
    Disable automatic correction of editable text.

The `` element types that don't support auto-correction always have the `off` state: `password`, `email` and `url`.

For all other editable elements, setting any other value than those listed above is always treated as `on`.
The default value for elements that are not nested inside a `<form>` is `on`.

When nested in a `<form>`, the following elements inherit their default value of `autocorrect` from the form if it has been set: ``, `<fieldset>`, ``, `<output>`, `<select>`, and `<textarea>`.

## Examples

### Basic <example-value>

This example demonstrates basic `autocorrect` attribute usage.

#### HTML

We include two text `` elements with different values for their `autocorrect` attributes:

```html
<label for="vegetable">A vegetable: </label>
<input id="vegetable" name="vegetable" type="text" autocorrect="on" />

<label for="fruit">A fruit: </label>
<input id="fruit" name="fruit" type="text" autocorrect="off" />
```

#### Results

Enter invalid text into the fruit and vegetable text entry boxes above.
If auto-correction is supported on your browser, and there is an appropriate substitution provided by the underlying device, a typo in a vegetable name input should be auto-corrected.
Typos should not be corrected in the fruit name field.

### Enabling and disabling autocorrection

This example shows how you can enable and disable autocorrection using the `autocorrect` attribute.

#### HTML

The HTML markup defines a ``, a "name" `` element of `type="text"`, a "bio" `<textarea>` element, and two `` elements.

The "username" element has `autocorrect="off"` set because auto-correcting a name would be annoying!
The bio does not specify a value for `autocorrect`, which means that it is enabled (we could have set any value other than `off`).

```html
<button id="reset">Reset</button>
<label for="username">Name: </label>
<input id="username" name="username" type="text" autocorrect="off" />
<label for="bio">Biography: </label>
<textarea id="bio" name="bio"></textarea>
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 75px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}

button,
input,
textarea {
  display: block;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

#### JavaScript

The code checks whether the `autocorrect` is supported by checking if it is present on the prototype.
If it is not present this fact is logged.
If it is present then the value of the `autocorrect` property for each of the text-entry elements is logged.

A click handler is added for the button, which allows you to reset the entered text and the log.

```js
const resetButton = document.querySelector("#reset");
const userNameElement = document.querySelector("#username");
const bioElement = document.querySelector("#bio");

if (!("autocorrect" in HTMLElement.prototype)) {
  log("autocorrect not supported");
} else {
  log(`userNameElement.autocorrect: ${userNameElement.autocorrect}`);
  log(`bioElement.autocorrect: ${bioElement.autocorrect}`);
}

resetButton.addEventListener("click", (e) => {
  userNameElement.value = "";
  bioElement.value = "";
});
```

#### Results

If auto-correction is supported by your browser, the log area below the "Biography" and "Name" inputs should show that it is enabled for "Biography" inputs but not "Name" inputs.

Enter invalid text into the name and biography text entry boxes.
If the device has a substitute for the entered word, this will be used to autocorrect text in the "Biography" input (only).

## See also

- All global attributes.
- `spellcheck`.
