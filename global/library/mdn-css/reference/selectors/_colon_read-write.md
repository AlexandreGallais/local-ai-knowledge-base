---
title: "`:read-write` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_read-write/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:read-write` CSS pseudo-class

The **`:read-write`** CSS pseudo-class represents an element (such as `input` or `textarea`) that is editable by the user.

```css
label {
  display: block;
  margin-top: 1em;
}

*:read-write {
  background-color: ivory;
  border: 2px solid darkorange;
  border-radius: 5px;
}
```

```html
<p>Please fill in your details:</p>

<label for="email">Email Address:</label>
<input id="email" name="email" type="email" value="user@example.com" />

<label for="note">Short note about yourself:</label>
<textarea id="note" name="note">Don't be shy</textarea>

<label for="pic">Your picture:</label>
<input id="pic" name="pic" type="file" />
```

## Syntax

```css
:read-write {
  /* ... */
}
```

## Examples

### Confirming form details using read-only controls

You can use `readonly` form controls when you want a user to verify information they entered earlier, which you want to submit with new data in read-write controls.
In the example below, the `:read-only` pseudo-class is used to make the `<textarea>` (a user's address) look like a regular paragraph. The `:read-write` pseudo-class provides a way to highlight the editable `<textarea>` (the delivery instructions):

```css
body {
  font-family: "Josefin Sans", sans-serif;
  margin: 10px auto;
}

legend {
  color: white;
  background: black;
  padding: 5px 10px;
}

fieldset > div {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

label,
textarea {
  display: block;
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  box-sizing: border-box;
  padding: 5px;
  height: 30px;
}

textarea {
  width: 50%;
}

textarea {
  height: 70px;
  resize: none;
}

label {
  width: 40%;
}
```

```css
textarea:read-only {
  border: 0;
}

textarea:read-write {
  box-shadow: inset 1px 1px 3px #cccccc;
  border-radius: 5px;
}
```

```html
<fieldset>
  <legend>Confirm details</legend>
  <div>
    <label for="address">Address:</label>
    <textarea id="address" name="address" readonly>
123 Choco Mountain,
Awesome Ridge,
CA</textarea>
  </div>
  <div>
    <label for="instructions">Delivery instructions</label>
    <textarea id="instructions" name="instructions"></textarea>
  </div>
</fieldset>
```

### Styling read-write non-form controls

This selector doesn't just select ``/`<textarea>` elements — it will select _any_ element that can be edited by the user, such as a `` element with `contenteditable` set on it.

```html
<p contenteditable>This paragraph is editable; it is read-write.</p>

<p>This paragraph is not editable; it is read-only.</p>
```

```css
body {
  font-family: sans-serif;
}

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

- `:read-only`
- HTML `contenteditable` attribute
