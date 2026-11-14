---
title: "`:read-only` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_read-only/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:read-only` CSS pseudo-class

The **`:read-only`** CSS pseudo-class selects elements (such as certain `` types and `<textarea>`) that are not editable by the user. Elements on which the HTML attribute `readonly` doesn't have an effect (such as ``, ``, and all other non-form elements) are also selected by the `:read-only` pseudo-class. In fact, `:read-only` matches anything that `:read-write` doesn't match, making it equivalent to `:not(:read-write)`.

```css
label {
  display: block;
  margin-top: 1em;
}

*:read-only {
  font-weight: bold;
  color: indigo;
}
```

```html
<p>Please enter your details:</p>

<label for="email">Email Address:</label>
<input id="email" name="email" type="email" value="user@example.com" readonly />

<label for="note">Short note about yourself:</label>
<textarea id="note" name="note">Don't be shy</textarea>

<label for="pic">Your picture:</label>
<input id="pic" name="pic" type="file" />
```

## Syntax

```css
:read-only {
  /* ... */
}
```

## Examples

### Confirming form information using read-only or read-write controls

One use of read-only form controls is to allow the user to check and verify information that they may have entered in an earlier form (for example, shipping details), while still being able to submit the information along with the rest of the form. This example shows how to style these controls.

The `:read-only` pseudo-class is used to remove all the styling that makes the inputs look like clickable fields, making them look more like read-only paragraphs. The `:read-write` pseudo-class on the other hand is used to provide some nicer styling to the editable `<textarea>`.

```html
<fieldset>
  <legend>Check shipping details</legend>
  <div>
    <label for="name">Name: </label>
    <input id="name" name="name" type="text" value="Mr Soft" readonly />
  </div>
  <div>
    <label for="address">Address: </label>
    <textarea id="address" name="address" readonly>
23 Elastic Way,
Viscous,
Bright Ridge,
CA
</textarea>
  </div>
  <div>
    <label for="postal-code">Zip/postal code: </label>
    <input
      id="postal-code"
      name="postal-code"
      type="text"
      value="94708"
      readonly />
  </div>
</fieldset>

<fieldset>
  <legend>Final instructions</legend>
  <div>
    <label for="sms-confirm">Send confirmation by SMS?</label>
    <input id="sms-confirm" name="sms-confirm" type="checkbox" />
  </div>
  <div>
    <label for="instructions">Any special instructions?</label>
    <textarea id="instructions" name="instructions"></textarea>
  </div>
</fieldset>
```

```css
body {
  font-family: "Josefin Sans", sans-serif;
  margin: 20px auto;
  max-width: 460px;
}

fieldset {
  padding: 10px 30px 0;
  margin-bottom: 20px;
}

legend {
  color: white;
  background: black;
  padding: 5px 10px;
}

fieldset > div {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

label,
input[type="text"],
textarea {
  display: block;
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  box-sizing: border-box;
  padding: 5px;
  height: 30px;
}

input[type="text"],
textarea {
  width: 50%;
}

textarea {
  height: 110px;
  resize: none;
}

label {
  width: 40%;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  background-color: #eeeeee;
}
```

```css
input:read-only,
textarea:read-only {
  border: 0;
  box-shadow: none;
  background-color: #dddddd;
}

textarea:read-write {
  outline: 1px dashed red;
  outline-offset: 2px;
  border-radius: 5px;
}
```

### Styling read-only non-form controls

This selector doesn't just select ``/`<textarea>` elements — it will select _any_ element that cannot be edited by the user.

```html
<p contenteditable>This paragraph is editable; it is read-write.</p>

<p>This paragraph is not editable; it is read-only.</p>
```

```css
p {
  font-size: 150%;
  padding: 5px;
  border-radius: 5px;
}

p:read-only {
  background-color: red;
  color: white;
}

p:read-write {
  background-color: lime;
}
```

## See also

- `:read-write`
- HTML `contenteditable` attribute
