---
title: "CorLocalRefPreservation Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corlocalrefpreservation-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
