---
title: "Presentation: receiver property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentation/receiver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Presentation: receiver property

The **read-only** `Presentation` attribute
`receiver`, which is only available in browser contexts which are
**receiving** a presentation, returns the
`PresentationReceiver` object which can be used to access and communicate
with the browser context which controls the presentation. This property is always
`null` when accessed from outside a browser context which is receiving a
presentation.

## Value

If the code is running in a context which is receiving a presentation, the returned
value is a `PresentationReceiver` which can then be used to communicate
with the context which is the source of the presentation.

If the current context is not receiving a presentation, `receiver` is
`null`.

## Examples

### Determining whether or not the context is receiving a presentation

You can easily determine whether or not the context is the receiver for a presentation
by checking the value of `navigator.presentation.receiver`. If it's a non-null value, then
the context is indeed receiving a presentation. If it's `null`, there's no
incoming presentation.

```js
footer.textContent = navigator.presentation.receiver
  ? "Receiving presentation"
  : "(idle)";
```

### Accessing the connection list

This example uses `receiver` to access the list of incoming connections and
to build and display a list of those connections' ID strings.

```js
const listElem = document.getElementById("connection-view");

navigator.presentation.receiver.connectionList.then((connections) => {
  connections.forEach((connection) => {
    listElem.appendChild(document.createElement("li")).textContent =
      connection.id;
  });
});
```

After getting access to the output list element in the variable
`connectionView`, `navigator.presentation.receiver` is used to get a
reference to the `PresentationReceiver` object for this context, and its
`connectionList` is used to get a
`Promise` which will be called when the list is available.

The promise handler receives as its input parameter an array of the incoming
connections. We iterate over these using `forEach()`,
appending a new item to the `connectionView` list element for each
connection.

## See also

- Presentation API
- `Presentation`
- `PresentationReceiver`
