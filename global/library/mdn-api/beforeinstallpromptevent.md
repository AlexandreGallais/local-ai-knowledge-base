---
title: "BeforeInstallPromptEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/beforeinstallpromptevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BeforeInstallPromptEvent

The **`BeforeInstallPromptEvent`** is the interface of the `beforeinstallprompt` event fired at the `Window` object before a user is prompted to "install" a website to a home screen on mobile.

This interface inherits from the `Event` interface.

## Constructor

- `BeforeInstallPromptEvent()`(non-standard) (experimental)
    Creates a new `BeforeInstallPromptEvent` object.

## Instance properties

_Inherits properties from its parent, `Event`._

- `BeforeInstallPromptEvent.platforms` (read-only)(non-standard) (experimental)
    Returns an array of string items containing the platforms on which the event was dispatched. This is provided for user agents that want to present a choice of versions to the user such as, for example, "web" or "play" which would allow the user to choose between a web version or an Android version.
- `BeforeInstallPromptEvent.userChoice` (read-only)(non-standard) (experimental)
    Returns a `Promise` that resolves to an object describing the user's choice when they were prompted to install the app.

## Instance methods

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

- Making PWAs installable
- How to provide your own in-app install experience on web.dev (2021)
