---
title: "NavigationPrecommitController"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationprecommitcontroller/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationPrecommitController

The **`NavigationPrecommitController`** interface of the `Navigation API` is passed as an argument to a navigation precommit handler callback.

The callback is used to handle any modifications to the navigation that are required before it is committed (and the destination URL is actually displayed in the browser), such as canceling or redirecting it somewhere else as required.
This interface provides methods to redirect to a new URL and update history and state, and to dynamically configure post-commit navigation behavior.

## Instance methods

- `addHandler()`
    Adds a handler callback function that will be run after the navigation has committed, as though it has been added to `NavigateEvent.intercept()` using the `options.handler` argument.
- `redirect()`
    Redirects the browser to a specified URL and specifies history behavior and any desired state information.

## Description

When specifying same-document navigation behavior via the `NavigateEvent.intercept()` method, it is possible to specify navigation precommit actions via the `precommitHandler` callback. Precommit actions are used to modify or cancel in-flight navigation, or to perform work while the navigation is ongoing and before it is committed (see Basic <example-value> navigation example).

To specify the redirect behavior, you use the `NavigationPrecommitController` object that is passed into your the `precommitHandler` callback function.
Inside the function body, you can call the `NavigationPrecommitController.redirect()` method, which takes as an argument an object containing the redirect URL, plus any required history behavior and state information.

After a navigation is committed, a post-commit handler callback can be run in order to perform operations such as fetching and rendering content.
If the post-commit navigation code depends on data gathered at runtime in your `precommitHandler`, you can call the `addHandler()` in your precommit handler to dynamically add this post-commit handler callback.
Note that if the post-commit code is independent of the pre-commit code you can instead pass the `handler` callback to the `NavigateEvent.intercept()` method.

See the `intercept()` description for additional context.

## Examples

### Basic <example-value> navigation example

The following snippet shows how you would redirect the browser to a sign-in page if the user navigates to a restricted page and is not signed in.

```js
navigation.addEventListener("navigate", (event) => {
  const url = new URL(event.destination.url);

  if (url.pathname.startsWith("/restricted/") && !userSignedIn) {
    event.intercept({
      async precommitHandler(controller) {
        controller.redirect("/signin/", {
          state: "signin-redirect",
          history: "push",
        });
      },
    });
  }
});
```

This pattern is simpler than the alternative of canceling the original navigation and starting a new one to the redirect location, because it avoids exposing the intermediate state. For example, only one `navigatesuccess` or `navigateerror` event fires, and if the navigation was triggered by a call to `Navigation.navigate()`, the promise only fulfills once the redirect destination is reached.

### Add handler that is conditional on precommit behavior

This is a small modification of the previous example that also shows a message to the user indicating the reason they have landed on the sign-in page after the redirection.
This uses `addHandler()` in the pre-commit handler to add the post-commit handler that displays the message.

```js
navigation.addEventListener("navigate", (event) => {
  const url = new URL(event.destination.url);

  if (url.pathname.startsWith("/restricted/") && !userSignedIn) {
    event.intercept({
      async precommitHandler(controller) {
        controller.redirect("/signin/", {
          state: "signin-redirect",
          history: "push",
        });

        // Use addHandler to trigger logic once the /signin/ page commits
        controller.addHandler(() => {
          showMessage("Please sign in to view that content.");
        });
      },
    });
  }
});
```

One benefit of this approach is that the handler only runs if the redirect is committed.
The handler would be run for all events if it were added by passing `options.handler` to `intercept()`.

## See also

- Modern client-side routing: the Navigation API
