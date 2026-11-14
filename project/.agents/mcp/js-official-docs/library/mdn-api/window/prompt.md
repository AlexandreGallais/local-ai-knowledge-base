---
title: "Window: prompt() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/prompt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: prompt() method

`window.prompt()` instructs the browser to display a dialog with an optional message prompting the user to input some text, and to wait until the user either submits the text or cancels the dialog.

Under some conditions (when the user switches tabs, for example) the browser may not display a dialog, or may not wait for the user to submit text or to cancel the dialog.

## Syntax

```js
prompt()
prompt(message)
prompt(message, defaultValue)
```

### Parameters

- `message` (optional)
    A string of text to display to the user. Can be omitted if there is nothing to show
    in the prompt window.
- `defaultValue` (optional)
    A string containing the default value displayed in the text input field.

### Return value

A string containing the text entered by the user, or `null`.

## Examples

### Using a prompt with a message and default value

The following example shows how to check the returned value of a prompt.
When the user clicks the OK button, text entered in the input field is returned.
If the user clicks OK without entering any text, an empty string is returned.
If the user clicks the Cancel button, this function returns `null`.

```html
<button id="signButton">Check star sign</button>
<pre id="log"></pre>
```

```js
const signButton = document.querySelector("#signButton");
const log = document.querySelector("#log");

signButton.addEventListener("click", () => {
  let sign = prompt("What's your sign?");

  if (sign === null) {
    log.innerText = "OK, maybe next time.";
  } else if (sign.toLowerCase() === "") {
    log.innerText = "Don't be shy, enter your sign!";
  } else if (sign.toLowerCase() === "scorpio") {
    log.innerText = "Wow! I'm a Scorpio too!";
  } else {
    log.innerText = `${sign} is my favorite!`;
  }
});
```

### Prompt messages and default values

There are multiple ways to use a prompt, using `prompt`, `window.prompt`, and providing a message and default values:

```js
// open a blank prompt window
sign = prompt();
// open a blank prompt window
sign = window.prompt();
// open a prompt with the text "Are you feeling lucky"
sign = window.prompt("Are you feeling lucky");
// open a prompt with the text "Are you feeling lucky" and "sure" as the default value
sign = prompt("Are you feeling lucky", "sure");
```

## Notes

Dialog boxes are modal windows — they prevent the user from accessing the rest of the program's interface until the dialog box is closed.
For this reason, you should not overuse any function that creates a dialog box or a modal window.
Alternatively, a `<dialog>` element can be used for confirmations.

A prompt dialog contains a single-line textbox, a Cancel button, and an OK button, and returns the (possibly empty) text the user entered into that textbox.
The result is a string, which means you should sometimes cast the value given by the user.
For example, if their answer should be a Number, you should cast the value to Number.

```js
const number = Number(window.prompt("Type a number", ""));
```

## See also

- `<dialog>` element
- `alert`
- `confirm`
- Never Use a Warning When you Mean Undo on A List Apart (2017)
