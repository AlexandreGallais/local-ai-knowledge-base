---
title: "ICorDebugInstanceFieldSymbol::GetOffset Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebuginstancefieldsymbol-getoffset-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugInstanceFieldSymbol::GetOffset Method

Gets the offset in bytes of this instance field in its parent class.

## Syntax

```cpp
HRESULT GetOffset(
   [out] ULONG32 *pcbOffset
);
```

## Parameters

 `pcbOffset`
A pointer to the number of bytes that this instance field is offset in its parent class.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugInstanceFieldSymbol Interface
