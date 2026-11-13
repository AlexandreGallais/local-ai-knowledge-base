---
title: "CorSaveSize Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corsavesize-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorSaveSize Enumeration

Contains values indicating the level of precision required when querying for the size of a save operation.

## Syntax

```cpp
typedef enum CorSaveSize {
    cssAccurate                = 0x0000,
    cssQuick                   = 0x0001,
    cssDiscardTransientCAs     = 0x0002
} CorSaveSize;
```

## Members

| Member | Description |
|------------|-----------------|
| `cssAccurate` | Specifies that the return value should be exact. |
| `cssQuick` | Specifies that the return value should be estimated. |
| `cssDiscardTransientCAs` | Specifies that discardable types should be removed. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
