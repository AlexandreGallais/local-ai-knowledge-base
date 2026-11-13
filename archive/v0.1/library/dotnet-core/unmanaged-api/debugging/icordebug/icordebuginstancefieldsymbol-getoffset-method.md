---
title: "ICorDebugInstanceFieldSymbol::GetOffset Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebuginstancefieldsymbol-getoffset-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
