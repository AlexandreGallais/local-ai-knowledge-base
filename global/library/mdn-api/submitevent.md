---
title: "SubmitEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/submitevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SubmitEvent

The **`SubmitEvent`** interface defines the object used to represent an HTML form's `submit` event. This event is fired at the `<form>` when the form's submit action is invoked.

## Constructor

- `SubmitEvent()`
    Creates and returns a new `SubmitEvent` object whose `type` and other options are configured as specified. Note that currently the only valid `type` for a `SubmitEvent` is `submit`.

## Instance properties

_In addition to the properties listed below, this interface inherits the properties of its parent interface, `Event`._

- `submitter` (read-only)
    An `HTMLElement` object which identifies the button or other element which was invoked to trigger the form being submitted.

## Instance methods

_While `SubmitEvent` offers no methods of its own, it inherits any specified by its parent interface, `Event`._

## Examples

In this example, a shopping cart may have an assortment of different submit buttons depending on factors such as the user's settings, the shop's settings, and any minimum or maximum shopping card totals established by the payment processors. Each of the submit elements' `id` is used to identify which payment processor the button corresponds to.

```js
let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  let submitter = event.submitter;
  let handler = submitter.id;

  if (handler) {
    processOrder(form, handler);
  } else {
    showAlertMessage(
      "An unknown or unaccepted payment type was selected. Please try again.",
      "OK",
    );
  }
});
```

The handler ID is obtained by using the `submit` event's `submitter` property to get the submit button, from which we then get the ID. With that in hand, we can call a `processOrder()` function to handle the order, passing along the form and the handler ID.
