---
title: "`<dialog>` HTML dialog element (part 1 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/dialog/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<dialog>` HTML dialog element

The **`<dialog>`** HTML element represents a modal or non-modal dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.

## Attributes

This element includes the global attributes.

> **Warning:**
> The `tabindex` attribute must not be used on the `<dialog>` element. See Additional notes.

- `closedby`
    Specifies the types of user actions that can be used to close the `<dialog>` element. This attribute distinguishes three methods by which a dialog might be closed:
    - A _light dismiss user action_, in which the `<dialog>` is closed when the user clicks or taps outside it. This is equivalent to the "light dismiss" behavior of "auto" state popovers.
    - A _platform-specific user action_, such as pressing the `Esc` key on desktop platforms, or a "back" or "dismiss" gesture on mobile platforms.
    - A developer-specified mechanism such as a `` with a `click` handler that invokes `HTMLDialogElement.close()` or a `<form>` submission.

    Possible values are:
    - `any`
        The dialog can be dismissed using any of the three methods.
    - `closerequest`
        The dialog can be dismissed with a platform-specific user action or a developer-specified mechanism.
    - `none`
        The dialog can only be dismissed with a developer-specified mechanism.

    If the `<dialog>` element does not have a valid `closedby` value specified, then
    - if it was opened using `showModal()`, it behaves as if the value was `"closerequest"`
    - otherwise, it behaves as if the value was `"none"`.

- `open`
    Indicates that the dialog box is active and is available for interaction. If the `open` attribute is not set, the dialog box will not be visible to the user.
    It is recommended to use the `.show()` or `.showModal()` method to render dialogs, rather than the `open` attribute. If a `<dialog>` is opened using the `open` attribute, it is non-modal.

    > **Note:**
    > While you can toggle between the open and closed states of non-modal dialog boxes by toggling the presence of the `open` attribute, this approach is not recommended. See `open` for more information.

## Description

The HTML `<dialog>` element is used to create both modal and non-modal dialog boxes.
Modal dialog boxes block interaction with other UI elements, making the rest of the page inert, while non-modal dialog boxes allow interaction with the rest of the page.

### Controlling dialogs using JavaScript

JavaScript can be used to display and close the `<dialog>` element.
You can use the `showModal()` method to display a modal dialog and the `show()` method to display a non-modal dialog. The dialog box can be closed using the `close()` method or using the `dialog` method when submitting a `<form>` that is nested within the `<dialog>` element.
Modal dialogs can also be closed by pressing the `Esc` key.

### Modal dialogs using invoker commands

Modal dialogs can be declaratively opened and closed using the Invoker Commands API HTML attributes `commandfor` and `command`, which can be set on `` elements.

The `command` attribute sets the particular command that is to be sent when the `` element is clicked, while `commandfor` sets the `id` of the target dialog.
The commands that can be sent for dialogs are `"show-modal"`, `"close"`, and `"request-close"`.

The HTML below demonstrates how to apply the attributes to a `` element so it can be pressed to open a modal `<dialog>` with an `id` of "my-dialog".

```html
<button command="show-modal" commandfor="my-dialog">Open dialog</button>

<dialog id="my-dialog">
  <p>This dialog was opened using an invoker command.</p>
  <button commandfor="my-dialog" command="close">Close</button>
</dialog>
```

### Non-modal dialogs using popover commands

Non-modal dialogs can be declaratively opened, closed, and toggled using the Popover API HTML attributes `popovertarget` and `popovertargetaction`, which can be defined on `` and `` elements.

The `<dialog>` must be turned into a popover by adding the `popover` attribute.
You can then use `popovertarget` on a button/input to indicate the target popover, and `popovertargetaction` to specify the action to occur on the popover when the button is clicked.
Note that, because the dialog is a popover, it will be non-modal, so you can close it by clicking outside the dialog.

The HTML below shows how to apply the attributes to a `` element so it can be pressed to show and hide a non-modal `<dialog>` with an `id` of "my-dialog".

```html
<button popovertarget="my-dialog">Open dialog</button>

<dialog id="my-dialog" popover>
  <p>This dialog was opened using a popovertargetaction attribute.</p>
  <button popovertarget="my-dialog" popovertargetaction="hide">Close</button>
</dialog>
```

The Popover API also provides properties that can be used to get and set the state in JavaScript.

### Closing dialogs

It is important to provide a closing mechanism for every `<dialog>` element, and to ensure that this works on devices that might not have a physical keyboard.

There are numerous ways to close a dialog:

- Submitting the form within the `<dialog>` element with `method="dialog"` set on the `<form>` element (see the Using the dialog open attribute example).
- Clicking outside the dialog area when "light dismiss" is enabled (see the Popover API HTML attributes example).
- Pressing the `Esc` key, in dialogs where it is enabled (see the Popover API HTML attributes example).
- Calling the `HTMLDialogElement.close()` method (see the modal example).

### CSS Styling

A `<dialog>` can be selected using its element name (like any other element), and you can also match its state using pseudo-classes such as `:modal` and `:open`.

The CSS `::backdrop` pseudo-element can be used to style the backdrop of a modal dialog, which is displayed behind the `<dialog>` element when the dialog is displayed using the `HTMLDialogElement.showModal()` method.
This pseudo-element could be used, for example, to blur, darken, or otherwise obfuscate the inert content behind the modal dialog.

### Additional notes

- HTML `<form>` elements can be used to close a dialog box if they have the attribute `method="dialog"` or if the button used to submit the form has `formmethod="dialog"` set. When a `<form>` within a `<dialog>` is submitted via the `dialog` method, the dialog box closes, the states of the form controls are saved but not submitted, and the `returnValue` property gets set to the value of the button that was activated.
- The `autofocus` attribute should be added to the element the user is expected to interact with immediately upon opening a modal dialog. If no other element involves more immediate interaction, it is recommended to add `autofocus` to the close button inside the dialog, or the dialog itself if the user is expected to click/activate it to dismiss.
- Do not add the `tabindex` property to the `<dialog>` element as it is not interactive and does not receive focus. The dialog's contents, including the close button contained in the dialog, can receive focus and be interactive.

## Accessibility

When implementing a dialog, it is important to consider the most appropriate place to set user focus. When using `HTMLDialogElement.showModal()` to open a `<dialog>`, focus is set on the first nested focusable element. Explicitly indicating the initial focus placement by using the `autofocus` attribute will help ensure initial focus is set on the element deemed the best initial focus placement for any particular dialog. When in doubt, as it may not always be known where initial focus could be set within a dialog, particularly for instances where a dialog's content is dynamically rendered when invoked, the `<dialog>` element itself may provide the best initial focus placement.

Ensure a mechanism is provided to allow users to close the dialog. The most robust way to ensure that all users can close the dialog is to include an explicit button to do so, such as a confirmation, cancellation, or close button.

By default, a dialog invoked by the `showModal()` method can be dismissed by pressing the `Esc` key. A non-modal dialog does not dismiss via the `Esc` key by default, and depending on what the non-modal dialog represents, it may not be desired for this behavior. Keyboard users expect the `Esc` key to close modal dialogs; ensure that this behavior is implemented and maintained. If multiple modal dialogs are open, pressing the `Esc` key <example-value> close only the last shown dialog. When using `<dialog>`, this behavior is provided by the browser.

While dialogs can be created using other elements, the native `<dialog>` element provides usability and accessibility features that must be replicated if you use other elements for a similar purpose. If you're creating a custom dialog implementation, ensure that all expected default behaviors are supported and proper labeling recommendations are followed.

The `<dialog>` element is exposed by browsers in a manner similar to custom dialogs that use the ARIA role="dialog" attribute. `<dialog>` elements invoked by the `showModal()` method implicitly have aria-modal="true", whereas `<dialog>` elements invoked by the `show()` method or displayed using the `open` attribute or by changing the default `display` of a `<dialog>` are exposed as `[aria-modal="false"]`. When implementing modal dialogs, everything other than the `<dialog>` and its contents should be rendered inert using the `inert` attribute. When using `<dialog>` along with the `HTMLDialogElement.showModal()` method, this behavior is provided by the browser.
