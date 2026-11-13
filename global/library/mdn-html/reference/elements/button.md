---
title: "`<button>` HTML button element (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/button/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<button>` HTML button element

The **``** HTML element is an interactive element activated by a user with a mouse, keyboard, finger, voice command, or other assistive technology. Once activated, it then performs an action, such as submitting a form or opening a dialog.

By default, HTML buttons are presented in a style resembling the platform the user agent runs on, but you can change buttons' appearance with CSS.

```html
<button class="favorite styled" type="button">Add to favorites</button>
```

```css
.styled {
  border: 0;
  line-height: 2.5;
  padding: 0 20px;
  font-size: 1rem;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 1px black;
  border-radius: 10px;
  background-color: tomato;
  background-image: linear-gradient(
    to top left,
    rgb(0 0 0 / 0.2),
    rgb(0 0 0 / 0.2) 30%,
    transparent
  );
  box-shadow:
    inset 2px 2px 3px rgb(255 255 255 / 0.6),
    inset -2px -2px 3px rgb(0 0 0 / 0.6);
}

.styled:hover {
  background-color: red;
}

.styled:active {
  box-shadow:
    inset -2px -2px 3px rgb(255 255 255 / 0.6),
    inset 2px 2px 3px rgb(0 0 0 / 0.6);
}
```

## Attributes

This element's attributes include the global attributes.

- `autofocus`
    This Boolean attribute specifies that the button should have input focus when the page loads. **Only one element in a document can have this attribute.**

- `command`
    Specifies the action to be performed on an element being controlled by a control `` specified via the `commandfor` attribute. The possible values are:
    - `"show-modal"`
        The button will show a `<dialog>` as modal. If the dialog is already modal, no action will be taken. This is a declarative equivalent of calling the `HTMLDialogElement.showModal()` method on the `<dialog>` element.
    - `"close"`
        The button will close a `<dialog>` element.
        If the dialog is already closed, no action will be taken.
        This is a declarative equivalent of calling the `HTMLDialogElement.close()` method on the `<dialog>` element.
        When used with the `value` attribute, the button's value will be passed as the dialog's `returnValue` property.
    - `"request-close"`
        The button will trigger a `cancel` event on a `<dialog>` element to request that the browser dismiss it, followed by a `close` event.
        This differs from the `close` command in that authors can call `Event.preventDefault()` on the `cancel` event to prevent the `<dialog>` from closing.
        If the dialog is already closed, no action will be taken.
        This is a declarative equivalent of calling the `HTMLDialogElement.requestClose()` method on the `<dialog>` element.
        When used with the button's `value` attribute, the value will be passed as the dialog's `returnValue` property.
    - `"show-popover"`
        The button will show a hidden popover. If you try to show an already showing popover, no action will be taken. See `Popover API` for more details. This is equivalent to setting a value of `show` for the `popovertargetaction` attribute, and also provides a declarative equivalent to calling the `HTMLElement.showPopover()` method on the popover element.
    - `"hide-popover"`
        The button will hide a showing popover. If you try to hide an already hidden popover, no action will be taken. See `Popover API` for more details. This is equivalent to setting a value of `hide` for the `popovertargetaction` attribute, and also provides a declarative equivalent to calling the `HTMLElement.hidePopover()` method on the popover element.
    - `"toggle-popover"`
        The button will toggle a popover between showing and hidden. If the popover is hidden, it will be shown; if the popover is showing, it will be hidden. See `Popover API` for more details. This is equivalent to setting a value of `toggle` for the `popovertargetaction` attribute, and also provides a declarative equivalent to calling the `HTMLElement.togglePopover()` method on the popover element.
    - Custom values
        This attribute can represent custom values that are prefixed with a two hyphen characters (`--`). Buttons with a custom value will dispatch the `CommandEvent` on the controlled element.

- `commandfor`
    Turns a `` element into a command button, controlling a given interactive element by issuing the command specified in the button's `command` attribute. The `commandfor` attribute takes the ID of the element to control as its value. This is a more general version of `popovertarget`.
- `disabled`
    This Boolean attribute prevents the user from interacting with the button: it cannot be pressed or focused.
- `form`
    The `<form>` element to associate the button with (its _form owner_). The value of this attribute must be the `id` of a `<form>` in the same document. (If this attribute is not set, the `` is associated with its ancestor `<form>` element, if any.)

    This attribute lets you associate `` elements to `<form>`s anywhere in the document, not just inside a `<form>`. It can also override an ancestor `<form>` element.

- `formaction`
    The URL that processes the information submitted by the button. Overrides the `action` attribute of the button's form owner. Does nothing if there is no form owner.
- `formenctype`
    If the button is a submit button (it's inside/associated with a `<form>` and doesn't have `type="button"`), specifies how to encode the form data that is submitted. Possible values:
    - `application/x-www-form-urlencoded`: The default if the attribute is not used.
    - `multipart/form-data`: Used to submit `` elements with their `type` attributes set to `file`.
    - `text/plain`: Specified as a debugging aid; shouldn't be used for real form submission.

    If this attribute is specified, it overrides the `enctype` attribute of the button's form owner.

- `formmethod`
    If the button is a submit button (it's inside/associated with a `<form>` and doesn't have `type="button"`), this attribute specifies the HTTP method used to submit the form. Possible values:
    - `post`: The data from the form are included in the body of the HTTP request when sent to the server. Use when the form contains information that shouldn't be public, like login credentials.
    - `get`: The form data are appended to the form's `action` URL, with a `?` as a separator, and the resulting URL is sent to the server. Use this method when the form has no side effects, like search forms.
    - `dialog`: This method is used to indicate that the button closes the dialog with which it is associated, and does not transmit the form data at all.

    If specified, this attribute overrides the `method` attribute of the button's form owner.

- `formnovalidate`
    If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the `novalidate` attribute of the button's form owner.

    This attribute is also available on `` and `` elements.

- `formtarget`
    If the button is a submit button, this attribute is an author-defined name or standardized, underscore-prefixed keyword indicating where to display the response from submitting the form. This is the `name` of, or keyword for, a _browsing context_ (a tab, window, or ``). If this attribute is specified, it overrides the `target` attribute of the button's form owner. The following keywords have special meanings:
    - `_self`: Load the response into the same browsing context as the current one. This is the default if the attribute is not specified.
    - `_blank`: Load the response into a new unnamed browsing context — usually a new tab or window, depending on the user's browser settings.
    - `_parent`: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.
    - `_top`: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.

- `interestfor` (experimental) (non-standard)
    Defines the `` element as an **interest invoker**. Its value is the `id` of a target element, which will be affected in some way (normally shown or hidden) when interest is shown or lost on the invoker element (for example, by hovering/unhovering or focusing/blurring it). See Using interest invokers for more details and examples.

- `name`
    The name of the button, submitted as a pair with the button's `value` as part of the form data, when that button is used to submit the form.

- `popovertarget`
    Turns a `` element into a popover control button; takes the ID of the popover element to control as its value. Establishing a relationship between a popover and its invoker button using the `popovertarget` attribute has two additional useful effects:
    - The browser creates an implicit `aria-details` and `aria-expanded` relationship between popover and invoker, and places the popover in a logical position in the keyboard focus navigation order when shown. This makes the popover more accessible to keyboard and assistive technology (AT) users (see also Popover accessibility features).
    - The browser creates an implicit anchor reference between the two, making it very convenient to position popovers relative to their controls using CSS anchor positioning. See Popover anchor positioning for more details.

- `popovertargetaction`
    Specifies the action to be performed on a popover element being controlled by a control ``. Possible values are:
    - `"hide"`
        The button will hide a shown popover. If you try to hide an already hidden popover, no action will be taken.
    - `"show"`
        The button will show a hidden popover. If you try to show an already showing popover, no action will be taken.
    - `"toggle"`
        The button will toggle a popover between showing and hidden. If the popover is hidden, it will be shown; if the popover is showing, it will be hidden. If `popovertargetaction` is omitted, `"toggle"` is the default action that will be performed by the control button.

- `type`
    The default behavior of the button. Possible values are:
    - `submit`: The button submits the form data to the server. This is the default if the attribute is not specified for buttons associated with a `<form>`, or if the attribute is an empty or invalid value.
    - `reset`: The button resets all the controls to their initial values, like \. (This behavior tends to annoy users.)
    - `button`: The button has no default behavior, and does nothing when pressed by default. It can have client-side scripts listen to the element's events, which are triggered when the events occur.

- `value`
    Defines the value associated with the button's `name` when it's submitted with the form data.
    This value is passed to the server in params when the form is submitted using this button.
    When used with the `close` or `request-close` commands, the `value` attribute sets the `returnValue` of the `<dialog>` element being controlled.

## Notes

A submit button with the attribute `formaction` set, but without an associated form does nothing. You have to set a form owner, either by wrapping it in a `<form>` or set the attribute `form` to the id of the form.

`` elements are much easier to style than `` elements. You can add inner HTML content (think ``, ``, or even ``), and use `::after` and `::before` pseudo-elements for complex rendering.

If your buttons are not for submitting form data to a server, be sure to set their `type` attribute to `button`. Otherwise, they will try to submit form data and to load the (nonexistent) response, possibly destroying the current state of the document.

While `` has no default behavior, event handlers can be scripted to trigger behaviors. An activated button can perform programmable actions using JavaScript, such as removing an item from a list.

By default, user agents style buttons as `display: flow-root`, which establishes a new block formatting context and centers the button's children both horizontally and vertically as long as they do not overflow. If the button is defined as a flex or grid container, the children will behave as flex or grid items. A button set to `display: inline` will be styled as if the value were set to `display: inline-block`.
