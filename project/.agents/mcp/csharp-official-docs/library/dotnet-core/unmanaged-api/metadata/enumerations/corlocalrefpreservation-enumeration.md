---
title: "CorLocalRefPreservation Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/corlocalrefpreservation-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorLocalRefPreservation Enumeration

Contains flag values for the treatment of local references.

## Syntax

```cpp
typedef enum CorLocalRefPreservation
{
    MDPreserveLocalRefsNone     =   0x00000000,
    MDPreserveLocalTypeRef      =   0x00000001,
    MDPreserveLocalMemberRef    =   0x00000002
} CorLocalRefPreservation;
```

## Members

| Member | Description |
|------------|-----------------|
| `MDPreserveLocalRefsNone` | Preserve no local references. |
| `MDPreserveLocalTypeRef` | Preserve local type references. |
| `MDPreserveLocalMemberRef` | Preserve local member references. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h

 **.NET versions:** Available since .NET Framework 4.5
