---
title: "Plugin"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/plugin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Plugin

The `Plugin` interface provides information about a browser plugin.

> **Note:**
> Own properties of `Plugin` objects are no longer enumerable in the latest browser versions.

## Instance properties

- `Plugin.description` (read-only) (deprecated)
    A human-readable description of the plugin.
- `Plugin.filename` (read-only) (deprecated)
    The filename of the plugin file.
- `Plugin.name` (read-only) (deprecated)
    The name of the plugin.

## Instance methods

- `Plugin.item` (deprecated)
    Returns the MIME type of a supported content type, given the index number into a list of supported types.
- `Plugin.namedItem` (deprecated)
    Returns the MIME type of a supported item.
