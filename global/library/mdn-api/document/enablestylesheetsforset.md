---
title: "Document: enableStyleSheetsForSet() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/enablestylesheetsforset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: enableStyleSheetsForSet() method

Enables the style sheets matching the specified name in the current style sheet set,
and disables all other style sheets (except those without a title, which are always
enabled).

## Syntax

```js
enableStyleSheetsForSet(name)
```

### Parameters

- `name`
    The name of the style sheets to enable. All style sheets with a title that match
    this name will be enabled, while all others that have a title will be disabled.
    Specify an empty string for the _name_ parameter to disable all alternate and
    preferred style sheets (but not the persistent style sheets; that is, those with no
    `title` attribute).

### Return value

None (`undefined`).

## Notes

- Title matches are case-sensitive.
- Calling this method with a `null` _name_ has no effect; if you
  want to disable all alternate and preferred style sheets, you **must**
  pass "", the empty string.
- Stylesheets that don't have a title are never affected by this method.
- This method never affects the values of `document.lastStyleSheetSet` or
  `document.preferredStyleSheetSet`.

## Examples

```js
document.enableStyleSheetsForSet("Some style sheet set name");
```

## Specifications

Not part of any specification.

## See also

- `Stylesheet`
- `Document.styleSheets`
- `document.lastStyleSheetSet`
- `document.preferredStyleSheetSet`
- `document.selectedStyleSheetSet`
