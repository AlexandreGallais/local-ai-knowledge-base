---
title: "Using the View Transition API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/view_transition_api/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the View Transition API (part 2 of 3)

## Different animations for different elements

By default, all of the different elements that change during the view update are transitioned using the same animation. If you want some elements to animate differently from the default `root` animation, you can separate them out using the `view-transition-name` property. For example, in our View Transitions SPA demo the `` elements are given a `view-transition-name` of `figure-caption` to separate them from the rest of the page in terms of view transitions:

```css
figcaption {
  view-transition-name: figure-caption;
}
```

With this CSS applied, the generated pseudo-element tree will now look like this:

```plain
html
  ├─ ::view-transition
  |  ├─ ::view-transition-group(root)
  │  │  └─ ::view-transition-image-pair(root)
  │  │     ├─ ::view-transition-old(root)
  │  │     └─ ::view-transition-new(root)
  |  └─ ::view-transition-group(figure-caption)
  │     └─ ::view-transition-image-pair(figure-caption)
  │        ├─ ::view-transition-old(figure-caption)
  │        └─ ::view-transition-new(figure-caption)
  ├─ head
  └─ body
     └─ …
```

The existence of the second set of pseudo-elements allows separate view transition styling to be applied just to the ``. The different old and new view captures are handled separately from one another.

The following code applies a custom animation just to the ``:

```css
@keyframes grow-x {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes shrink-x {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

::view-transition-group(figure-caption) {
  height: auto;
  right: 0;
  left: auto;
  transform-origin: right center;
}

::view-transition-old(figure-caption) {
  animation: 0.25s linear both shrink-x;
}

::view-transition-new(figure-caption) {
  animation: 0.25s 0.25s linear both grow-x;
}
```

Here we've created a custom CSS animation and applied it to the `::view-transition-old(figure-caption)` and `::view-transition-new(figure-caption)` pseudo-elements. We've also added a number of other styles to both to keep them in the same place and stop the default styling from interfering with our custom animations.

> **Note:**
> You can use `*` as the identifier in a pseudo-element to target all snapshot pseudo-elements, regardless of what name they have. For example:
>
> ```css
> ::view-transition-group(*) {
>   animation-duration: 2s;
> }
> ```

### Valid `view-transition-name` values

The `view-transition-name` property can take a unique `custom-ident` value, which can be any identifier that wouldn't be misinterpreted as a keyword. The value of `view-transition-name` for each rendered element must be unique. If two rendered elements have the same `view-transition-name` at the same time, `ViewTransition.ready` will reject and the transition will be skipped.

It can also take keyword values of:

- `none`: Causes the element to not participate in a separate snapshot, unless it has a parent element with a `view-transition-name` set, in which case it will be snapshotted as part of that element.
- `match-element`: Automatically sets unique `view-transition-name` values on all selected elements.

### Taking advantage of the default animation styles

Note that we also discovered another transition option that is simpler and produced a nicer result than the above. Our final `` view transition ended up looking like this:

```css
figcaption {
  view-transition-name: figure-caption;
}

::view-transition-group(figure-caption) {
  height: 100%;
}
```

This works because, by default, `::view-transition-group()` transitions `width` and `height` between the old and new views with a smooth scale. We just needed to set a fixed `height` on both states to make it work.

> **Note:**
> Smooth transitions with the View Transition API contains several other customization examples.

## Controlling view transitions with JavaScript

A view transition has an associated `ViewTransition` object instance, which contains several promise members allowing you to run JavaScript in response to different states of the transition being reached. For example, `ViewTransition.ready` fulfills once the pseudo-element tree is created and the animation is about to start, whereas `ViewTransition.finished` fulfills once the animation is finished, and the new page view is visible and interactive to the user.

The `ViewTransition` can be accessed like so:

1. Via the `Document.activeViewTransition`/`Element.startViewTransition()` property. This provides a consistent way to access the active view transition in any context, without having to worry about saving it for easy access later on.
2. In the case of same-document (SPA) transitions, the `document.startViewTransition()` method returns the `ViewTransition` associated with the transition.
3. In the case of cross-document (MPA) transitions:
   - A `pageswap` event is fired when a document is about to be unloaded due to a navigation. Its event object (`PageSwapEvent`) provides access to the `ViewTransition` via the `PageSwapEvent.viewTransition` property, as well as a `NavigationActivation` via `PageSwapEvent.activation` containing the navigation type and current and destination document history entries.
     > **Note:**
     > If the navigation has a cross-origin URL anywhere in the redirect chain, the `activation` property returns `null`.
   - A `pagereveal` event is fired when a document is first rendered, either when loading a fresh document from the network or activating a document (either from back/forward cache (bfcache) or prerender). Its event object (`PageRevealEvent`) provides access to the `ViewTransition` via the `PageRevealEvent.viewTransition` property.

Let's have a look at some example code to show how these features could be used.

### A JavaScript-powered custom same-document (SPA) transition

The following JavaScript could be used to create a circular reveal view transition emanating from the position of the user's cursor on click, with animation provided by the `Web Animations API`.

```js
// Store the last click event
let lastClick;
addEventListener("click", (event) => (lastClick = event));

function spaNavigate(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow(data);
    return;
  }

  // Get the click position, or fallback to the middle of the screen
  const x = lastClick?.clientX ?? innerWidth / 2;
  const y = lastClick?.clientY ?? innerHeight / 2;
  // Get the distance to the furthest corner
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );

  // Create a transition:
  const transition = document.startViewTransition(() => {
    updateTheDOMSomehow(data);
  });

  // Wait for the pseudo-elements to be created:
  transition.ready.then(() => {
    // Animate the root's new view
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0 at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in",
        // Specify which pseudo-element to animate
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}
```

This animation also requires the following CSS, to turn off the default CSS animation and stop the old and new view states from blending in any way (the new state "wipes" right over the top of the old state, rather than transitioning in):

```css
::view-transition-image-pair(root) {
  isolation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
  display: block;
}
```

### A JavaScript-powered custom cross-document (MPA) transition

The List of Chrome DevRel team members demo provides a basic set of team profile pages, and demonstrates how to use the `pageswap` and `pagereveal` events to customize the outgoing and inbound animations of a cross-document view transition based on the "from" and "to" URLs.

The `pageswap` event listener looks as follows. This sets view transition names on the elements on the outbound page that link to the profile pages. When navigating from the home page to a profile page, custom animations are provided _only_ for the linked element that is clicked in each case.

```js
window.addEventListener("pageswap", async (e) => {
  // Only run this if an active view transition exists
  if (e.viewTransition) {
    const currentUrl = e.activation.from?.url
      ? new URL(e.activation.from.url)
      : null;
    const targetUrl = new URL(e.activation.entry.url);

    // Going from profile page to homepage
    // ~> The big img and title are the ones!
    if (isProfilePage(currentUrl) && isHomePage(targetUrl)) {
      // Set view-transition-name values on the elements to animate
      document.querySelector(`#detail main h1`).style.viewTransitionName =
        "name";
      document.querySelector(`#detail main img`).style.viewTransitionName =
        "avatar";

      // Remove view-transition-names after snapshots have been taken
      // Stops naming conflicts resulting from the page state persisting in BFCache
      await e.viewTransition.finished;
      document.querySelector(`#detail main h1`).style.viewTransitionName =
        "none";
      document.querySelector(`#detail main img`).style.viewTransitionName =
        "none";
    }

    // Going to profile page
    // ~> The clicked items are the ones!
    if (isProfilePage(targetUrl)) {
      const profile = extractProfileNameFromUrl(targetUrl);

      // Set view-transition-name values on the elements to animate
      document.querySelector(`#${profile} span`).style.viewTransitionName =
        "name";
      document.querySelector(`#${profile} img`).style.viewTransitionName =
        "avatar";

      // Remove view-transition-names after snapshots have been taken
      // Stops naming conflicts resulting from the page state persisting in BFCache
      await e.viewTransition.finished;
      document.querySelector(`#${profile} span`).style.viewTransitionName =
        "none";
      document.querySelector(`#${profile} img`).style.viewTransitionName =
        "none";
    }
  }
});
```

> **Note:**
> We remove the `view-transition-name` values after snapshots have been taken in each case. If we left them set, they would persist in the page state saved in the bfcache upon navigation. If the back button was then pressed, the `pagereveal` event handler of the page being navigated back to would then attempt to set the same `view-transition-name` values on different elements. If multiple elements have the same `view-transition-name` set, the view transition is skipped.

The `pagereveal` event listener looks as follows. This works in a similar way to the `pageswap` event listener, although bear in mind that here we are customizing the "to" animation, for page elements on the new page.

```js
window.addEventListener("pagereveal", async (e) => {
  // If the "from" history entry does not exist, return
  if (!navigation.activation.from) return;

  // Only run this if an active view transition exists
  if (e.viewTransition) {
    const fromUrl = new URL(navigation.activation.from.url);
    const currentUrl = new URL(navigation.activation.entry.url);

    // Went from profile page to homepage
    // ~> Set VT names on the relevant list item
    if (isProfilePage(fromUrl) && isHomePage(currentUrl)) {
      const profile = extractProfileNameFromUrl(fromUrl);

      // Set view-transition-name values on the elements to animate
      document.querySelector(`#${profile} span`).style.viewTransitionName =
        "name";
      document.querySelector(`#${profile} img`).style.viewTransitionName =
        "avatar";

      // Remove names after snapshots have been taken
      // so that we're ready for the next navigation
      await e.viewTransition.ready;
      document.querySelector(`#${profile} span`).style.viewTransitionName =
        "none";
      document.querySelector(`#${profile} img`).style.viewTransitionName =
        "none";
    }

    // Went to profile page
    // ~> Set VT names on the main title and image
    if (isProfilePage(currentUrl)) {
      // Set view-transition-name values on the elements to animate
      document.querySelector(`#detail main h1`).style.viewTransitionName =
        "name";
      document.querySelector(`#detail main img`).style.viewTransitionName =
        "avatar";

      // Remove names after snapshots have been taken
      // so that we're ready for the next navigation
      await e.viewTransition.ready;
      document.querySelector(`#detail main h1`).style.viewTransitionName =
        "none";
      document.querySelector(`#detail main img`).style.viewTransitionName =
        "none";
    }
  }
});
```
