---
title: "Window: beforeinstallprompt event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/beforeinstallprompt_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: beforeinstallprompt event

The **`beforeinstallprompt`** event fires when the browser has detected that a website can be installed as a Progressive Web App.

There's no guaranteed time this event is fired, but it usually happens on page load.

The typical use for this event is when a web app wants to provide its own in-app UI inviting the user to install the app, rather than the generic one provided by the browser. This enables the app to provide more context about the app, explaining to the user why they might want to install it.

In this scenario, the handler for this event will:

- Keep a reference to the `BeforeInstallPromptEvent` object that's passed into it
- Reveal its in-app installation UI (this should be hidden by default, because not all browsers will support installation).

When the user uses the in-app installation UI to install the app, the in-app installation UI calls the `prompt()` method of the retained `BeforeInstallPromptEvent` object to show the installation prompt.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("beforeinstallprompt", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbeforeinstallprompt = (event) => { }
```

## Event type

A `BeforeInstallPromptEvent`. Inherits from `Event`.

## Event methods

- `BeforeInstallPromptEvent.prompt()`(non-standard) (experimental)
    Show a prompt asking the user if they want to install the app. This method returns a `Promise` that resolves to an object describing the user's choice when they were prompted to install the app.

## Examples

In the following example an app provides its own install button, which has an `id` of `"install"`. Initially the button is hidden.

```html
<button id="install" hidden>Install</button>
```

The `beforeinstallprompt` handler:

- Cancels the event, which prevents the browser displaying its own install UI on some platforms
- Assigns the `BeforeInstallPromptEvent` object to a variable, so it can be used later
- Reveals the app's install button.

```js
let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden");
});
```

When clicked, the app's install button:

- Calls the `prompt()` method of the stored event object, to trigger the installation prompt.
- Resets its state by clearing the `installPrompt` variable and hiding itself again.

```js
installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  installPrompt = null;
  installButton.setAttribute("hidden", "");
});
```

## See also

- `BeforeInstallPromptEvent.prompt`
- `BeforeInstallPromptEvent`
