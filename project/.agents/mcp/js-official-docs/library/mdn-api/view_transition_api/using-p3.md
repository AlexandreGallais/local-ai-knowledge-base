---
title: "Using the View Transition API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/view_transition_api/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the View Transition API (part 3 of 3)

## Stabilizing page state to make cross-document transitions consistent

Before running a cross-document transition, you ideally want to wait until the state of the page stabilizes, relying on render blocking to ensure that:

1. Critical styles are loaded and applied.
2. Critical scripts are loaded and run.
3. The HTML visible for the user's initial view of the page has been parsed, so it renders consistently.

Styles are render blocked by default unless they are added to the document dynamically, via script. Both scripts and dynamically-added styles can be render blocked using the `blocking="render"` attribute.

To ensure that your initial HTML has been parsed and will always render consistently before the transition animation runs, you can use `<link rel="expect">`. In this element, you include the following attributes:

- `rel="expect"` to indicate that you want to use this `<link>` element to render block some HTML on the page.
- `href="#element-id"` to indicate the ID of the element you want to render block.
- `blocking="render"` to render block the specified HTML.

> **Note:**
> In order to block rendering, `script`, `link`, and `style` elements with `blocking="render"` must be in the `head` of the document.

Let's explore what this looks like with an example HTML document:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- This will be render-blocking by default -->
    <link rel="stylesheet" href="style.css" />

    <!-- Marking critical scripts as render blocking will
         ensure they're run before the view transition is activated -->
    <script async src="layout.js" blocking="render"></script>

    <!-- Use rel="expect" and blocking="render" to ensure the
         #lead-content element is visible and fully parsed before
         activating the transition -->
    <link rel="expect" href="#lead-content" blocking="render" />
  </head>
  <body>
    <h1>Page title</h1>
    <nav>...</nav>
    <div id="lead-content">
      <section id="first-section">The first section</section>
      <section>The second section</section>
    </div>
  </body>
</html>
```

The result is that document rendering is blocked until the lead content `` has been parsed, ensuring a consistent view transition.

You can also specify a `media` attribute on `<link rel="expect">` elements. For example, you might want to block rendering on a smaller amount of content when loading the page on a narrow-screen device, than on a wide-screen device. This makes sense — on a mobile, less content will be visible when the page first loads than in the case of a desktop.

This could be achieved with the following HTML:

```html
<link
  rel="expect"
  href="#lead-content"
  blocking="render"
  media="screen and (width > 640px)" />
<link
  rel="expect"
  href="#first-section"
  blocking="render"
  media="screen and (width <= 640px)" />
```
