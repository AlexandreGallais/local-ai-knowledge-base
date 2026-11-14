---
title: "CSS environment variables"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/environment_variables/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS environment variables

The **CSS environment variables** module defines the concept of environment variables and the `env` function. Environment variables work similarly to custom properties and the `var` function, except that they are globally defined; they are global variables scoped to the entire document. They are user agent values, provided by the browser or operating system, you can access using the `env` function enabling you to adapt your styles to the user's device or context.

Environment variables provide values that can be used on the page based on information the user agent has access to, such as the size of the titlebar, dynamic keyboard, and safe area insets. Safe area insets define a rectangle that is guaranteed to be visible on non-rectangular displays, based on its distance from the edges of the viewport. You can include the user-agent sizes in your styles, enabling you to modify the layout of essential content based on the available space inside the safe area rectangle, next to a visible dynamic keyboard, or adjacent to a visible title bar.

## Reference

### Functions

- `env`

### Data types

- `<environment-variable-name>`

## Guides

- Using environment variables
    An overview of what environment variables are, browser-defined environment variables, and how to use the `env()` function.

## Related concepts

- CSS media queries module
- custom properties
- `var`
- `VirtualKeyboard` interface
- `display_override` manifest field
  Window Controls Overlay API and `WindowControlsOverlay` interface

## See also

- CSS value functions guide
- CSS properties and values API module
- CSS custom properties for cascading variables module
