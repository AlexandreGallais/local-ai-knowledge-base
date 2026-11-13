---
title: "ICorDebugEnum::GetCount Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugenum-getcount-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEnum::GetCount Method

Gets the number of items in the enumeration.

## Syntax

```cpp
HRESULT GetCount (
    [out] ULONG *pcelt
);
```

## Parameters

 `pcelt`
 [out] A pointer to the number of items in the enumeration.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
