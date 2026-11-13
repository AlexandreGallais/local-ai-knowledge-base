---
title: "ARIA: aria-modal attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-modal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-modal attribute

The `aria-modal` attribute indicates whether an element is modal when displayed.

## Description

A section of content is "modal" means navigation is limited to the area itself and the background (the ancestors and siblings of the modal) is hidden. Setting `aria-modal="true"` on `dialog` and `alertdialog` role containers indicates the presence of a "modal" element to users of assistive technology, but does not actually make the element modal. The features that make the element actually modal must be implemented by the developer.

> **Note:**
> ARIA only modifies the accessibility tree, modifying how assistive technology presents the content to your users. ARIA doesn't change anything about an element's function or behavior. To create a modal effect you must use JavaScript to manage behavior, focus, and ARIA states.

Relevant only on `dialog` and `alertdialog` containers, setting `aria-modal="true"` tells assistive technologies to let the user know the ability to interact with, or access other content on the page requires the modal dialog to be closed or otherwise lose focus.

Modal dialogs are when content is displayed and the user's interaction is limited to only that section until it is dismissed.

When creating modal dialogs, `aria-modal="true"` tells assistive technologies that the windows underneath the current dialog are not part of the modal content.

When a modal element is displayed, focus should be placed in the modal. Focus needs to be "trapped" inside the modal when it is visible, until it is dismissed. Assistive technology (AT) can then navigate the modal's content and understand the scope of the modal's content. The `aria-modal` attribute helps AT communicate the bounds of the modal and distinguishes it from the rest of the page's content. When dismissed, focus should return to the element that triggered the modal.

Ensure the modal is controllable using only its descendant elements. If a modal dialog has a close button, the button should be a descendant contained with the modal container in the DOM.

When a modal element is displayed, authors **should** mark all other contents as inert (such as "inert subtrees" in HTML). Disabled content is not inert content. Inert content cannot be interacted with using both normal and specialized browsing modes such as caret browsing, which allow an assistive technology user to explore a page in detail. This includes disabled content, whose content may provide meaning.

The `inert` attribute is a boolean attribute that indicates, by its presence, that the element and all its shadow-including descendants are to be made inert.

Including `aria-modal="true"` on a `dialog` or `alertdialog`, removes the requirement of putting `aria-hidden` on background content, as the `aria-modal` informs assistive technologies that content outside a dialog is inert. Note that while support for the `<dialog>` element is good, thoroughly testing your implementation is vitally important.

If a dialog is not modal — there is no inert background and focus isn't confined to the dialog — either include `aria-modal="false"` or omit the attribute altogether.

## Example

```html
<div id="backdrop" class="no-scroll">
  <div
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="dialog_label"
    aria-describedby="dialog_desc">
    <h2 id="dialog_label">Confirmation</h2>
    <div id="dialog_desc">
      <p>Are you sure you want to delete this file?</p>
    </div>
    <button id="close-btn" type="button">No. Close this popup.</button>
    <button id="confirm-btn" type="button">Yes. Delete the file.</button>
  </div>
</div>
```

```js
document.getElementById("close-btn").addEventListener("click", () => {
  closeDialog();
});

document.getElementById("confirm-btn").addEventListener("click", (event) => {
  deleteFile();
});
```

This partial example includes an `alertdialog` nested in a full-screen, non-scrollable backdrop.

The `role="alertdialog"` identifies the element that serves as the alert dialog container. The `aria-labelledby` provides the alert dialog an accessible name by referring to the element that provides the alert dialog title. The `aria-describedby` attribute gives the alert dialog an accessible description by referring to the alert dialog content that describes the primary message or purpose of the alert dialog.

The `aria-modal="true"` informs the assistive technology user that the content underneath the dialog is not interactive so long as the element with a declaration of `role="alertdialog"` has focus.

The `aria-modal` attribute exposes the existence of the modal to assistive technologies so the disabling of the content behind the modal can be communicated to AT users. Like all ARIA attributes, `aria-modal` itself has no effect on the page's functionality; focus management and disabling, interactivity on background elements, and the ability to remove focus from the alertdialog must all be managed with JavaScript.

## Values

- `false` (default)
    Element is not modal.
- `true`
    Element is modal.

## Associated interfaces

- `Element.ariaModal`
    The `ariaModal` property, part of the `Element` interface, reflects the value of the `aria-modal` attribute.
- `ElementInternals.ariaModal`
    The `ariaModal` property, part of the `ElementInternals` interface, reflects the value of the `aria-modal` attribute.

## Associated roles

Used in roles:

- `window`

Inherits into roles:

- `alertdialog`
- `dialog`

## See also

- HTML `<dialog>` element
- `alertdialog` role
- `dialog` role
- HTML `inert` global attribute
- HTMLElement API `inert` property
