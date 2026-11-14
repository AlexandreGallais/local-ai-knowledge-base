---
title: "PreferenceObject"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferenceobject/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceObject

The **`PreferenceObject`** interface of the User Preferences API provides attributes and methods for reading and overriding user preferences.

Use the document's `PreferenceManager` (accessed via `Navigator.preferences`) to get access to the `PreferenceObject` objects representing each available preference.

The `PreferenceManager` interface inherits from `EventTarget`.

## Instance properties

- `PreferenceObject.override` (read-only) (experimental)
    The override value if set, `null` otherwise.
- `PreferenceObject.value` (read-only) (experimental)
    The override value if set, the UA default otherwise.
- `PreferenceObject.validValues` (read-only) (experimental)
    The valid values for the override.

## Instance methods

- `PreferenceObject.clearOverride()` (experimental)
    Resets any previously set override to `null` and fires the `change` event.
- `PreferenceObject.requestOverride()` (experimental)
    Requests an override of the preference and fires the `change` event on success.

## Events

- `change` (experimental)
    Fired when the override is set or reset.
