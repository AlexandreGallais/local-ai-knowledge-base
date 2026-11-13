---
title: "COR_PUB_ENUMPROCESS Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cor-pub-enumprocess-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_PUB_ENUMPROCESS Enumeration

Identifies the type of process to be enumerated.

## Syntax

```cpp
typedef enum {
    COR_PUB_MANAGEDONLY    = 0x00000001
} COR_PUB_ENUMPROCESS;
```

## Members

| Member name           | Description        |
|-----------------------|--------------------|
| `COR_PUB_MANAGEDONLY` | A managed process. |

## Remarks

 The current version of the unmanaged debugging API enumerates only managed processes.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorPub.idl, CorPub.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
