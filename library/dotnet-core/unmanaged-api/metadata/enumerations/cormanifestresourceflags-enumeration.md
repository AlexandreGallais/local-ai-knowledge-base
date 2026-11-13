---
title: "CorManifestResourceFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/cormanifestresourceflags-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
