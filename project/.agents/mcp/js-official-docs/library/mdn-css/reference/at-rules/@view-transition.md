---
title: "`@view-transition` CSS at-rule"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@view-transition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `@view-transition` CSS at-rule

The **`@view-transition`** CSS at-rule is used to opt in the current and destination documents to undergo a view transition, in the case of a cross-document navigation.

For a cross-document view transition to work, the current and destination documents of the navigation need to be on the same origin.

## Syntax

```css
@view-transition {
  navigation: auto | none;
  types: none | <custom-ident>#;
}
```

### Descriptors

- `navigation`
    A keyword specifying the effect this at-rule will have on the document's view transition behavior. Possible values are:
    - `auto`
        The document will undergo a view transition when taking part in a navigation, provided the navigation is same-origin, without cross-origin redirects, and its `navigationType` is `traverse`, `push`, or `replace`. In the case of `push` or `replace`, the navigation must be initiated by a user interacting with the page content, not by a browser UI feature.
    - `none`
        The document will not undergo a view transition.

- `types`
    Specifies the view transition types to set on the active view transition for the current and destination documents. Possible values are:
    - `<custom-ident>+`
        One or more space-separated `<custom-ident>` values representing the types to set.
    - `none`
        No types are set.

## Examples

### Transitioning page view

The following code snippets show key <example-value> used in a page transition demo.
The demo uses cross-document view-transitions; a half second transition that occurs when navigating between two pages of a site.
For the full demo, see the View transitions multi-page app demo.

The `@view-transition` at-rule is specified in the CSS for both your current and destination documents of a navigation to opt them both in to the view transition:

```css
@view-transition {
  navigation: auto;
}
```

In addition to the `@view-transition` at-rule, we use the `@keyframes` at-rule to define two keyframe animations and use the `animation` shorthand property to apply those keyframe animations to the elements in the outbound (`::view-transition-old()`) and inbound (`::view-transition-new()`) pages that we want to animate.

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

See this transitions multi-page app demo live.

### Using view transition types

Our MPA transition types example (source code) demonstrates how to use `types` via `@view-transition`:

```css
@view-transition {
  navigation: auto;
  types: slide;
}
```

See Using types with cross-document view transitions via `@view-transition` for a walkthrough of the referenced example.

## See also

- `::view-transition`
- `::view-transition-new()`
- `::view-transition-old()`
- `::view-transition-group()`
- `::view-transition-image-pair()`
- View Transition API
- Using view transition types
- CSS at-rules
- CSS at-rule functions
