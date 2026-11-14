---
title: "MediaKeySystemAccess: getConfiguration() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeysystemaccess/getconfiguration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeySystemAccess: getConfiguration() method

The **`getConfiguration()`** method of the `MediaKeySystemAccess` interface returns an object with the supported combination of the following configuration options:

- `label` (read-only)
    A string identifying the configuration, preserved as-is from the configuration passed to `Navigator.requestMediaKeySystemAccess()`.
    Defaults to the empty string (`""`).
- `initDataTypes` (read-only)
    Returns a list of supported initialization data type names. An initialization data type is a string indicating the format of the initialization data.
- `audioCapabilities` (read-only)
    Returns a list of supported audio type and capability pairs.
- `videoCapabilities` (read-only)
    Returns a list of supported video type and capability pairs.
- `distinctiveIdentifier` (read-only)
    Indicates whether a persistent distinctive identifier is required.
- `persistentState` (read-only)
    Indicates whether the ability to persist state is required.
- `sessionTypes` (read-only)
    An array of strings indicating the session types that are supported by the configuration.

    Permitted values include:
    - `temporary`
        A session for which the license, key(s) and record of or data related to the session are not persisted.
        The application does not need to manage such storage.
        Implementations must support this option, and it is the default.
    - `persistent-license`
        A session for which the license (and potentially other data related to the session) will be persisted.
        A record of the license and associated keys persists even if the license is destroyed, providing an attestation that the license and key(s) it contains are no longer usable by the client.

## Syntax

```js
getConfiguration()
```

### Parameters

None.

### Return value

An object.
