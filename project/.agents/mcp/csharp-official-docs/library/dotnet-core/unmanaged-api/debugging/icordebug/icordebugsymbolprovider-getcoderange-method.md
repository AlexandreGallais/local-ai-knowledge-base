---
title: "ICorDebugSymbolProvider::GetCodeRange Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getcoderange-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider::GetCodeRange Method

Gets the method start address and size given a relative virtual address (RVA) in a method.

## Syntax

```cpp
HRESULT GetCodeRange(
   [in] ULONG32 codeRva,
   [out] ULONG32* pCodeStartAddress,
   [out] ULONG32* pCodeSize
);
```

## Parameters

 `codeRva`
 [in] The relative virtual address (RVA) in a method.

 `pCodeStartAddress`
 [out] A pointer to the starting address of the method.

 `pCodeSize`
A pointer to the method code size (the number of bytes of the method's code).

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugSymbolProvider Interface
