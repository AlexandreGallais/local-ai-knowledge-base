---
title: "ValidityState: tooLong property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/validitystate/toolong/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ValidityState: tooLong property

The read-only **`tooLong`** property of the `ValidityState` interface indicates if the value of an `` or `<textarea>`, after having been edited by the user, exceeds the maximum code-unit length established by the element's `maxlength` attribute.

## Value

A boolean that is `true` if the `ValidityState` does not conform to the constraints.

## Examples

### Textarea with too long character count

The following example checks the validity of a textarea element.
A constraint has been added using the `maxlength` attribute so the textarea expects a maximum of 10 characters.
If there are too many characters in the textarea (which is true below), the element fails constraint validation, and the styles matching `:invalid` CSS pseudo-class are applied.

When editing the textarea, the browser will not allow the user to add characters that would fail constraint validation of maximum character count, so at first, only deleting characters is allowed.
Newline characters are normalized and count as a single character in the maximum length calculation.

```css
textarea:invalid {
  outline: red solid 3px;
}
```

```css
body {
  margin: 0.5rem;
}
textarea {
  width: 75%;
}
pre {
  padding: 1rem;
  height: 2rem;
  background-color: lightgrey;
  outline: 1px solid grey;
}
```

```html
<pre id="log">Validation logged here...</pre>
<textarea name="story" id="userText" maxlength="10" rows="5">
It was a dark and

stormy night...
</textarea>
```

```js
const userInput = document.getElementById("userText");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

userInput.addEventListener("input", () => {
  userInput.reportValidity();
  if (userInput.validity.tooLong) {
    log("Too many characters in the textarea.");
  } else {
    log("Input is valid…");
  }
});
```

## See also

- Constraint validation
- Forms: Data form validation
