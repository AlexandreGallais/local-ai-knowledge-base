---
title: "`:placeholder-shown` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_placeholder-shown/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:placeholder-shown` CSS pseudo-class

The **`:placeholder-shown`** CSS pseudo-class represents any `` or `<textarea>` element that is currently displaying placeholder text.

```css
label {
  display: block;
  margin-top: 1em;
}

input:placeholder-shown {
  background-color: ivory;
  border: 2px solid darkorange;
  border-radius: 5px;
}
```

```html
<label for="name">Full Name:</label>
<input id="name" name="name" type="text" />

<label for="email">Email Address:</label>
<input id="email" name="email" type="email" placeholder="user@example.com" />

<label for="age">Your age:</label>
<input
  id="age"
  name="age"
  type="number"
  value="18"
  placeholder="You must be 18+" />
```

## Syntax

```css
:placeholder-shown {
  /* ... */
}
```

## Examples

### Basic <example-value>

This example applies special font and border styles when the placeholder is shown.

#### HTML

```html
<input placeholder="Type something here!" />
```

#### CSS

```css
input {
  border: 1px solid black;
  padding: 3px;
}

input:placeholder-shown {
  border-color: teal;
  color: purple;
  font-style: italic;
}
```

#### Result

### Overflowing text

When form fields are too small, placeholder text can get cropped in an undesirable way. You can use the `text-overflow` property to alter the way overflowing text is displayed.

#### HTML

```html
<input id="input1" placeholder="Name, Rank, and Serial Number" /> <br /><br />
<input id="input2" placeholder="Name, Rank, and Serial Number" />
```

#### CSS

```css
#input2:placeholder-shown {
  text-overflow: ellipsis;
}
```

#### Result

### Customized input field

The following example highlights the Student ID field with a custom style.

#### HTML

```html
<p>
  <label for="name">Student Name:</label>
  <input id="name" placeholder="Student Name" />
</p>
<p>
  <label for="branch">Student Branch:</label>
  <input id="branch" placeholder="Student Branch" />
</p>
<p>
  <label for="sid">8-Digit Student ID:</label>
  <input
    pattern="[0-9]{8}"
    id="sid"
    class="student-id"
    placeholder="8 digit id" />
</p>
```

#### CSS

```css
input {
  background-color: #e8e8e8;
  color: black;
}

input.student-id:placeholder-shown {
  background-color: yellow;
  color: red;
  font-style: italic;
}
```

#### Result

## See also

- The `::placeholder` pseudo-element styles the placeholder _itself_.
- Related HTML elements: ``, `<textarea>`
- HTML forms
