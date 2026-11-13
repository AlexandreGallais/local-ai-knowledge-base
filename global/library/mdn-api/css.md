---
title: "CSS"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS

The **`CSS`** interface holds useful CSS-related methods. No objects with this interface are implemented: it contains only static methods and is therefore a utilitarian interface.

## Static properties

- `CSS.highlights` (read-only)
    Provides access to the `HighlightRegistry` used to style arbitrary text ranges using the `CSS Custom Highlight API`.
- `CSS.paintWorklet` (read-only) (experimental) (secure context)
    Provides access to the Worklet responsible for all the classes related to painting.

## Instance properties

_The CSS interface is a utility interface and no object of this type can be created: only static properties are defined on it._

## Static methods

_No inherited static methods_.

- `CSS.registerProperty()`
    Registers custom properties, allowing for property type checking, default values, and properties that do or do not inherit their value.
- `CSS.supports()`
    Returns a boolean value indicating if the pair _property-value_, or the condition, given in parameter is supported.
- `CSS.escape()`
    Can be used to escape a string mostly for use as part of a CSS selector.
- CSS factory functions
    Can be used to return a new `CSSUnitValue` with a value of the parameter number of the units of the name of the factory function method used.

    ```js
    CSS.em(3); // CSSUnitValue {value: 3, unit: "em"}
    ```

## Instance methods

_The CSS interface is a utility interface and no object of this type can be created: only static methods are defined on it._
