---
title: "ICorDebugMergedAssemblyRecord::GetIndex Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-getindex-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
