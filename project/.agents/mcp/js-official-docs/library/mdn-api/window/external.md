---
title: "Window: external property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/external/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: external property

The **`external`** read-only property of the `Window` interface returns an instance of the `External` interface, which was intended to contain functions related to adding external search providers to the browser. However, this is now deprecated, and the contained methods are now dummy functions that do nothing as per spec.

## Instance methods

The `External` object has the following methods:

       | Method
       | Description

       |
        `AddSearchProvider(descriptionURL)`

       |
        Dummy function; does nothing. Used to register search descriptions.

       | `IsSearchProviderInstalled()`
       | Dummy function; does nothing.
