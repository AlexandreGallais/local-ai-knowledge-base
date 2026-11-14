---
title: "ICorDebugSymbolProvider2::GetFrameProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider2-getframeprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider2::GetFrameProps Method

Returns the method starting relative virtual address of a method and the parent frame given a code relative virtual address.

## Syntax

```cpp
HRESULT GetFrameProps(
   [in] ULONG32 codeRva,
   [out] ULONG32 *pCodeStartRva,
   [out] ULONG32 *pParentFrameStartRva
);
```

## Parameters

 `codeRva`
 [in] A code relative virtual address.

 `pCodeStartRva`
 [out] A pointer to the method's starting relative virtual address.

 `pParentFrameStartRva`
 [out] A pointer to the frame's starting relative virtual address.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugSymbolProvider2 Interface
