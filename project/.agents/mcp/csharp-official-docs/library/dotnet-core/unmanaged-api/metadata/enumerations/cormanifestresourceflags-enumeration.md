---
title: "CorManifestResourceFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/cormanifestresourceflags-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorManifestResourceFlags Enumeration

Indicates the visibility of resources encoded in an assembly manifest.

## Syntax

```cpp
typedef enum CorManifestResourceFlags {

    mrVisibilityMask        =   0x0007,
    mrPublic                =   0x0001,
    mrPrivate               =   0x0002

} CorManifestResourceFlags;
```

## Members

| Member | Description |
|------------|-----------------|
| `mrVisibilityMask` | Reserved. |
| `mrPublic` | The resources are public. |
| `mrPrivate` | The resources are private. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
