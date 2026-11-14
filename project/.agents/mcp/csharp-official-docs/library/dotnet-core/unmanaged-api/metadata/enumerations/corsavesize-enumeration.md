---
title: "CorSaveSize Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/corsavesize-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
