---
title: "Using the View Transition API (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/view_transition_api/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the View Transition API

This article explains the theory behind how the View Transition API works, how to create view transitions and customize the transition animations, and how to manipulate active view transitions. This covers view transitions for both DOM state updates in a single-page app (SPA), and navigating between documents in a multi-page app (MPA).

## The view transition process

Let's walk through the process by which a view transition works:

1. A view transition is triggered. How this is done depends on the type of view transition:
   - In the case of same-document transitions (SPAs), a view transition is triggered by passing the function that would trigger the view change DOM update as a callback to the `document.startViewTransition()` method, or `element.startViewTransition()` in the case of element-scoped view transitions.
   - In the case of cross-document transitions (MPAs), a view transition is triggered by initiating navigation to a new document. Both the current and destination documents of the navigation need to be on the same origin, and opt-in to the view transition by including a `@view-transition` at rule in their CSS with a `navigation` descriptor of `auto`.
     > **Note:**
     > An active view transition has an associated `ViewTransition` instance (for example, returned by `startViewTransition()` in the case of same-document (SPA) transitions). The `ViewTransition` object includes several promises, allowing you to run code in response to different parts of the view transition process being reached. See Controlling view transitions with JavaScript for more information.
2. On the current (old) view, the API captures static image **snapshots** of elements that have a non-`none` `view-transition-name` declared on them that are inside the view transition scope. By default, the scope is the entire document in the case of document-scoped view transitions, and the element `startViewTransition()` is called on and all its descendants in the case of element-scoped view transitions.
3. The view change occurs:
   - In the case of same-document transitions (SPAs), the callback passed to `startViewTransition()` is invoked, which causes the DOM to change.

     When the callback has run successfully, the `ViewTransition.updateCallbackDone` promise fulfills, allowing you to respond to the DOM updating.

   - In the case of cross-document transitions (MPAs), the navigation occurs between the current and destination documents.

4. The API captures "live" snapshots (meaning, interactive DOM regions) from the new view.

   At this point, the view transition is about to run, and the `ViewTransition.ready` promise fulfills, allowing you to respond by running a custom JavaScript animation instead of the default, for example.

5. The old snapshots animate "out", while the new snapshots animate "in". By default, the old snapshots animate from `opacity` 1 to 0, and the new snapshots animate from `opacity` 0 to 1, which creates a cross-fade.
6. When the transition animations have reached their end states, the snapshots are destroyed, and the `ViewTransition.finished` promise fulfills, allowing you to respond. If needed, you can delay a view transition from reaching its finished state until a specified `Promise` is resolved using the `ViewTransition.waitUntil()` method.

> **Note:**
> If the document's page visibility state is `hidden` (for example if the document is obscured by a window, the browser is minimized, or another browser tab is active) during a `document.startViewTransition()` call, the view transition is skipped entirely.

### An aside on snapshots

It is worth noting that when talking about view transitions, we commonly use the term _snapshot_ to refer to a part of the scope that has a `view-transition-name` declared on it. These sections will be animated separately from other parts of the scope with different `view-transition-name` values set on them. While the process of animating a snapshot via a view transition actually involves two separate snapshots—one of the old and one of the new UI states—we use snapshot to refer to both for simplicity.

The snapshot of the old UI state is a static image, so that the user can't interact with it as it animates "out".

The snapshot of the new UI state is an interactive DOM region, so that the user can start to interact with the new content as it animates "in".

### The view transition pseudo-element tree

To handle creating the outbound and inbound transition animations, the API constructs a pseudo-element tree with the following structure:

```plain
root
  ├─ ::view-transition
  │  └─ ::view-transition-group(root)
  │     └─ ::view-transition-image-pair(root)
  │        ├─ ::view-transition-old(root)
  │        └─ ::view-transition-new(root)
  ├─ head
  └─ body
     └─ …
```

In the case of same-document transitions (SPAs), the pseudo-element tree is made available in the document. For document-scoped view transitions, the root element is the `<html>` element. For element-scoped view transitions, the root element is the element `startViewTransition()` was called on.

In the case of cross-document transitions (MPAs), the pseudo-element tree is made available in the destination document only.

The most interesting parts of the tree structure are as follows:

- `::view-transition` is the root of the view transitions overlay, which contains all view transition groups and sits above all other page content.
- A `::view-transition-group()` acts as a container for each view transition snapshot. The `root` argument specifies the default snapshot — the view transition animation will apply to the snapshot whose `view-transition-name` is `root`. By default, this is a snapshot of the `:root` element, because the default browser styles define this:

  ```css
  :root {
    view-transition-name: root;
  }
  ```

  Be aware however that page authors can change this by unsetting the above, and setting `view-transition-name: root` on a different element.

- `::view-transition-old()` targets the static snapshot of the old view, and `::view-transition-new()` targets the live snapshot of the new view. Both of these render as replaced content, in the same manner as an `` or ``, meaning that they can be styled with properties like `object-fit` and `object-position`.

> **Note:**
> It is possible to target different DOM elements with different custom view transition animations by setting a different `view-transition-name` on each one. In such cases, a `::view-transition-group()` is created for each one. See Different animations for different elements for an example.

> **Note:**
> As you'll see later, to customize the outbound and inbound animations you need to target the `::view-transition-old()` and `::view-transition-new()` pseudo-elements with your animations, respectively.

## Creating a basic view transition

This section illustrates how to create a basic view transition, in both the SPA and MPA case.

### Basic SPA view transition

An SPA may include functionality to fetch new content and update the DOM in response to an event of some kind, such as a navigation link being clicked or an update being pushed from the server.

Our View Transitions SPA demo is a basic image gallery. We have a series of `` elements that contain thumbnail `` elements, dynamically generated using JavaScript. We also have a `` element containing a `` and an ``, which displays the full-size gallery images.

When a thumbnail is clicked, the `displayNewImage()` function is run via `Document.startViewTransition()`, which causes the full-size image and its associated caption to be displayed inside the ``. We've encapsulated this inside an `updateView()` function that only calls the View Transition API if the browser supports it:

```js
function updateView(event) {
  // Handle the difference in whether the event is fired on the <a> or the <img>
  const targetIdentifier = event.target.firstChild || event.target;

  const displayNewImage = () => {
    const mainSrc = `${targetIdentifier.src.split("_th.jpg")[0]}.jpg`;
    galleryImg.src = mainSrc;
    galleryCaption.textContent = targetIdentifier.alt;
  };

  // Fallback for browsers that don't support View Transitions:
  if (!document.startViewTransition) {
    displayNewImage();
    return;
  }

  // With View Transitions:
  const transition = document.startViewTransition(() => displayNewImage());
}
```

This code is enough to handle the transition between displayed images. Supporting browsers will show the change from old to new images and captions as a smooth cross-fade (the default view transition). It will still work in non-supporting browsers but without the nice animation.

### Basic MPA view transition

When creating a cross-document (MPA) view transition, the process is even simpler than for SPAs. No JavaScript is required, as the view update is triggered by a cross-document, same-origin navigation rather than a JavaScript-initiated DOM change. To enable a basic MPA view transition, you need to specify a `@view-transition` at-rule in the CSS for both the current and destination documents to opt them in, like so:

```css
@view-transition {
  navigation: auto;
}
```

Our View Transitions MPA demo shows this at-rule in action, and additionally demonstrates how to customize the outbound and inbound animations of the view transition.

> **Note:**
> Currently MPA view transitions can only be created between same-origin documents, but this restriction may be relaxed in future implementations.

## Customizing your animations

The View Transitions pseudo-elements have default CSS Animations applied (which are detailed in their reference pages).

Most appearance transitions are given a default smooth cross-fade animation, as mentioned above. There are some exceptions:

- `height` and `width` transitions have a smooth scaling animation applied.
- `position` and `transform` transitions have a smooth movement animation applied.

You can modify the default animations in any way you want using regular CSS — target the "from" animation with `::view-transition-old()`, and the "to" animation with `::view-transition-new()`.

For example, to change the speed of both:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.5s;
}
```

It is recommended that you target the `::view-transition-group()` with such styles in cases where you want to apply them to `::view-transition-old()` and `::view-transition-new()`. Because of the pseudo-element hierarchy and default user-agent styling, the styles will be inherited by both. For example:

```css
::view-transition-group(root) {
  animation-duration: 0.5s;
}
```

> **Note:**
> This is also a good option for safeguarding your code — `::view-transition-group()` also animates and you could end up with different durations for the `group`/`image-pair` pseudo-elements versus the `old` and `new` pseudo-elements.

In the case of cross-document (MPA) transitions, the pseudo-elements need to be included in the destination document only for the view transition to work. If you want to use the view transition in both directions, you'll need to include it in both.

Our View Transitions MPA demo includes the above CSS, but takes the customization a step further, defining custom animations and applying them to the `::view-transition-old(root)` and `::view-transition-new(root)` pseudo-elements. The result is that the default cross-fade transition is swapped out for a "swipe up" transition when navigation occurs:

```css
/* Create a custom animation */

@keyframes move-out {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(-100%);
  }
}

@keyframes move-in {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0%);
  }
}

/* Apply the custom animation to the old and new page states */

::view-transition-old(root) {
  animation: 0.4s ease-in both move-out;
}

::view-transition-new(root) {
  animation: 0.4s ease-in both move-in;
}
```
