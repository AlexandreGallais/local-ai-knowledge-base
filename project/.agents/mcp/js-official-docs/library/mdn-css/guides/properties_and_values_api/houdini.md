---
title: "CSS Houdini"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/properties_and_values_api/houdini/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS Houdini

**CSS Houdini** is a set of APIs that expose parts of the CSS engine, enabling developers to create CSS extensions. These extensions might polyfill features that are not yet available in browsers, experiment with new layout techniques, or add creative borders and other effects.

While many Houdini examples showcase the creative possibilities of the APIs, there are many practical use cases. For example, you can use Houdini to create advanced custom properties with type checking and default values.

## Basic <example-value>

A regular CSS custom property consists of a property name and a value. Therefore I might create a custom property called `--background-color` and expect it to be given a color value. The value is then used in the CSS as if it were the color value.

```css
:root {
  --background-color: blue;
}

.box {
  background-color: var(--background-color);
}
```

In the above example however, there is nothing to stop someone using some other value for this property, perhaps setting it to a length. Having done so, anywhere that the property is used would have no background color as `background-color: 12px` is not valid. When browsers come across CSS they don't recognize as valid they throw that line away.

Using `@property` however, we can declare the custom property with a `syntax` of `<color>`. This shows that we need this property to have a value which is a valid color.

```css
@property --background-color {
  syntax: "<color>";
  inherits: false;
  initial-value: blue;
}
```

## Houdini worklets

A feature of Houdini is the `Worklet`. A worklet is a module, written in JavaScript, that extends CSS using one of the Houdini APIs. You can see an example worklet on the `PaintWorkletGlobalScope.registerPaint()` page. Once a worklet has been registered you can use it in CSS just like any other value. This means that even if you are not a JavaScript developer, you can access Houdini APIs by using worklets other people have created.

## Reference

### CSS at-rule and descriptors

The `@property` at-rule allows you to register an advanced custom property.

- `@property`
- `inherits`
- `initial-value`
- `syntax`

### Houdini API references

- CSS Properties and Values API
- CSS Typed Object Model API
- CSS Painting API
- `Worklet` reference

### Houdini guides

- Properties and Values API Guide
- Typed OM API Guide
- Using the CSS Painting API

## See also

- A Practical Overview of CSS Houdini
- Smarter custom properties with Houdini's new API
