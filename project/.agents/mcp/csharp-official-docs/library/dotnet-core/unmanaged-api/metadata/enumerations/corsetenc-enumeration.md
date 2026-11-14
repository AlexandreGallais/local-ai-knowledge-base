---
title: "CorSetENC Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/corsetenc-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorSetENC Enumeration

Contains values used to influence behavior during the generation of metadata.

## Syntax

```cpp
typedef enum CorSetENC {

    MDSetENCOn                  = 0x00000001,
    MDSetENCOff                 = 0x00000002,

    MDUpdateENC                 = 0x00000001,
    MDUpdateFull                = 0x00000002,
    MDUpdateExtension           = 0x00000003,
    MDUpdateIncremental         = 0x00000004,
    MDUpdateDelta               = 0x00000005,
    MDUpdateMask                = 0x00000007

} CorSetENC;
```

## Members

| Member | Description |
|------------|-----------------|
| `MDSetENCOn` | Obsolete. |
| `MDSetENCOff` | Obsolete. |
| `MDUpdateENC` | Indicates that whereas metadata can be updated, tokens cannot be moved. |
| `MDUpdateFull` | Indicates that tokens can be moved during updates. |
| `MDUpdateExtension` | Indicates that updates can consist only of additions. Tokens cannot be moved. |
| `MDUpdateIncremental` | Indicates that compilation is incremental. |
| `MDUpdateDelta` | Indicates that only changed metadata should be saved. |
| `MDUpdateMask` | Includes `MDUpdateENC`, `MDUpdateFull` and `MDUpdateIncremental`. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
