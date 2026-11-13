---
title: "ICorDebugSymbolProvider::GetCodeRange Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getcoderange-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
