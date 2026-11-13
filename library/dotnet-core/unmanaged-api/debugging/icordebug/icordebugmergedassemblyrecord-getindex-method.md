---
title: "ICorDebugMergedAssemblyRecord::GetIndex Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-getindex-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMergedAssemblyRecord::GetIndex Method

Gets the assembly's prefix index.

## Syntax

```cpp
HRESULT GetIndex(
   [out] ULONG32 *pIndex
);
```

## Parameters

 `pIndex`
 [out] A pointer to the prefix index.

## Remarks

The prefix index is used to prevent name collisions in the merged metadata type names.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugMergedAssemblyRecord Interface
