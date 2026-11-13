---
title: "SVGNumber"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgnumber/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGNumber

The **`SVGNumber`** interface corresponds to the `<number>` basic data type.

An `SVGNumber` object can be designated as read only, which means that attempts to modify the object will result in an exception being thrown.

## Instance properties

- `SVGNumber.value`
    A float representing the number.

    Note: If the `SVGNumber` is read-only, a `DOMException` with the code NO_MODIFICATION_ALLOWED_ERR is raised on an attempt to change the value.

## Instance methods

_This interface doesn't provide any specific methods._
