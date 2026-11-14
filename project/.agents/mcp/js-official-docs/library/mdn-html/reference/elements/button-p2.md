---
title: "`<button>` HTML button element (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/button/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<button>` HTML button element (part 2 of 2)

## Accessibility

### Icon buttons

Buttons that only display an icon do not have an _accessible name_. Accessible names provide information for assistive technology, such as screen readers, to access when they parse the document and generate an accessibility tree. Assistive technology then uses the accessibility tree to navigate and manipulate page content.

To give an icon button an accessible name, put text in the `` element that concisely describes the button's functionality.

#### Examples

```html
<button name="favorite">
  <svg fill="black" viewBox="0 0 42 42">
    <path
      d="M21,1c1.081,0,5.141,12.315,6.201,13.126s13.461,1.053,13.791,2.137 c0.34,1.087-9.561,8.938-9.961,10.252c-0.409,1.307,
      3.202,13.769,2.331,14.442c-0.879,0.673-11.05-6.79-12.361-6.79 c-1.311,0-11.481,7.463-12.36,6.79c-0.871-0.674,2.739-13.136,
      2.329-14.442c-0.399-1.313-10.3-9.165-9.96-10.252 c0.33-1.084,12.731-1.326,13.791-2.137S19.91,1,21,1z"></path>
  </svg>
  Add to favorites
</button>
```

##### Result

If you want to visually hide the button's text, an accessible way to do so is to use a combination of CSS properties to remove it visually from the screen, but keep it parsable by assistive technology.

However, it is worth noting that leaving the button text visible can help people who may not be familiar with the icon's meaning or understand the button's purpose. This is especially important for people who are not technologically sophisticated or who may have different cultural interpretations of the icon the button uses.

- What is an accessible name? | Vispero
- MDN Understanding WCAG, Guideline 4.1 explanations
- Understanding Success Criterion 4.1.2 | W3C Understanding WCAG 2.0

### Size and Proximity

#### Size

Interactive elements such as buttons should have an area large enough to be easy to activate. This helps a variety of people, including people with motor control issues and people using non-precise forms of input such as a stylus or fingers. A minimum interactive size of 44×44 CSS pixels is recommended.

- Understanding Success Criterion 2.5.5: Target Size | W3C Understanding WCAG 2.1
- Target Size and 2.5.5 | Adrian Roselli
- Quick test: Large touch targets - The A11Y Project

#### Proximity

Large amounts of interactive content — including buttons — placed in close visual proximity to each other should have space separating them. This spacing is beneficial for people who are experiencing motor control issues, who may accidentally activate the wrong interactive content.

Spacing may be created using CSS properties such as `margin`.

- Hand tremors and the giant-button-problem - Axess Lab

### ARIA state information

To describe the state of a button the correct ARIA attribute to use is `aria-pressed` and not `aria-checked` or `aria-selected`. To find out more read the information about the ARIA button role.

### Button styles

It is best not to override the default focus ring for elements that have focus. If the button styles are overridden, it is important to **ensure that the focus state has enough contrast** so that people experiencing low vision conditions can perceive it and people with cognitive differences will understand it.

The `:focus-visible` pseudo-class can be used to apply styles to an element that has `:focus` only when the user agent's heuristics determine that the focus should be highlighted, such as when a `` receives keyboard focus. See :focus vs :focus-visible for more information.

Color contrast ratio is determined by comparing the luminosity of the button text and background color values to the background the button is placed on. To meet current Web Content Accessibility Guidelines (WCAG), a ratio of 4.5:1 is required for text content and 3:1 for large text. (Large text is defined as 18.66px and `bold` or larger, or 24px or larger.)

- WebAIM: Color Contrast Checker
- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.3 | W3C Understanding WCAG 2.0

### Clicking and focus

Whether clicking on a `` or `` button types causes it to (by default) become focused varies by browser and OS. Most browsers do give focus to a button being clicked, but Safari does not, by design.

## Examples

### Creating a basic <example-value>

This example creates a clickable button.
The `type="button"` attribute ensures the button has no default behavior.
You can make this button interactive using JavaScript or attributes such as `command` and `commandfor`.

```html
<button type="button" name="button">I'm a button</button>
```

### Using the `request-close` value for the `command` attribute

The dialog in this example has two radio buttons that control whether or not the dialog can be closed.
Select **Yes** or **No**, and then click **Request to Close** to try to close the dialog.
If **Yes** is selected, the dialog closes; if **No** is selected, the dialog stays open and shows a message instead.

```html
<button type="button" commandfor="mydialog" command="show-modal">
  Open Dialog
</button>
<dialog id="mydialog">
  <div class="wrapper">
    <form>
      <fieldset>
        <legend>Allow this dialog to close when requested?</legend>
        <div>
          <input type="radio" id="no" name="close" value="no" checked />
          <label for="no">No</label>
        </div>
        <div>
          <input type="radio" id="yes" name="close" value="yes" />
          <label for="yes">Yes</label>
        </div>
      </fieldset>
    </form>
    <button commandfor="mydialog" command="request-close">
      Request to Close
    </button>
    <p class="warning" hidden>You must choose "Yes" to close this dialog.</p>
  </div>
</dialog>
```

```css
.warning {
  color: tomato;
}
```

```js
const dialog = document.querySelector("dialog");
const radio = document.querySelector("form").elements["close"];
const warning = document.querySelector(".warning");

dialog.addEventListener("cancel", (e) => {
  if (!e.cancelable) return;
  if (radio.value === "no") {
    warning.hidden = false;
    e.preventDefault();
  } else {
    warning.hidden = true;
  }
});
```

The **Open Dialog** button opens the `<dialog>` element using `command="show-modal"`.

The **Request to Close** button has `command="request-close"`, which targets the `<dialog>` element using the `commandfor="mydialog"` attribute. When it's clicked, it asks the `<dialog>` if it can be closed (unlike the `command="close"` attribute, which would close the `<dialog>` immediately).
This checks if the `<dialog>` is `cancelable` using a `cancel` event.

When the event is `cancelable`, the value of the radio buttons is checked:

- If set to `yes`, the dialog is closed.
- If set to `no`, the `hidden` attribute is turned off on the warning and the `preventDefault()` method is called, which prevents the default `<dialog>` closing behavior.

### Using the `value` attribute with dialog `close` command

This example demonstrates how to use the button `value` attribute with `close` command to populate the value of a dialog's `returnValue` property.

When either the **Cancel** or **Delete** button is clicked, the dialog closes and sets its `returnValue` to the button's `value` attribute.
The `close` event listener checks `dialog.returnValue` to determine which action the user chose and logs the result to the screen.

#### HTML

The HTML first defines a **Delete Record** button that uses the `commandfor` attribute to specify the dialog to be opened.

Within the dialog **Cancel** and **Delete** buttons use the `commandfor` attribute to indicate that they apply to the current dialog.
They also set the `command` attribute to "close" and set the `value` attribute to "cancel" and "delete" respectively — the value of the selected button is automatically copied to the dialog `returnValue` when the button is clicked.

```html
<button commandfor="confirm-dialog" command="show-modal">Delete Record</button>
<dialog id="confirm-dialog">
  <header>
    <h1>Delete Record?</h1>
  </header>
  <p>Are you sure? This action cannot be undone</p>
  <footer>
    <button commandfor="confirm-dialog" command="close" value="cancel">
      Cancel
    </button>
    <button commandfor="confirm-dialog" command="close" value="delete">
      Delete
    </button>
  </footer>
</dialog>
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 20px;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = text;
}
```

#### JavaScript

The code uses a `close` event listener to log the dialog's `returnValue`.

```js
const dialog = document.getElementById("confirm-dialog");

dialog.addEventListener("close", () => {
  switch (dialog.returnValue) {
    case "cancel":
      log("Cancel was clicked");
      break;
    case "delete":
      log("Delete was clicked");
      break;
    default:
      log("Closed with value:", dialog.returnValue);
  }
});
```

#### Results

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content,
        Interactive content,
        listed,
        labelable, and
        submittable
        form-associated
        element, palpable content.

       | Permitted content
       |
        Phrasing content
        but there must be no
        Interactive content. If the `<button>` is the first child of a customizable select element, then it may also
   contain zero or one `<selectedcontent>` element.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        <code
          >button</code
        >

       | Permitted ARIA roles
       |
        `checkbox`, `combobox`,
        `link`, `menuitem`,
        `menuitemcheckbox`,
        `menuitemradio`, `option`,
        `radio`, `switch`,
        `tab`

       | DOM interface
       | `HTMLButtonElement`
