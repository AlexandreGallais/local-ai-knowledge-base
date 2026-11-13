---
title: "ICorDebugType::GetRank Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugtype-getrank-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugType::GetRank Method

Gets the number of dimensions in an array type.

## Syntax

```cpp
HRESULT GetRank (
    [out] ULONG32   *pnRank
);
```

## Parameters

 `pnRank`
 [out] A pointer to the number of dimensions.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
