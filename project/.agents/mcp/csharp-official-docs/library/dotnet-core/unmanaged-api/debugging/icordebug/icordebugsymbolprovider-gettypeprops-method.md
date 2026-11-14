---
title: "ICorDebugSymbolProvider::GetTypeProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-gettypeprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider::GetTypeProps Method

Returns information about a type's properties, such as the number of signature of its generic parameters, given a relative virtual address (RVA) in a vtable.

## Syntax

```cpp
HRESULT GetTypeProps(
   [in]  ULONG32 vtableRva,
   [in]  ULONG32 cbSignature,
   [out] ULONG32 *pcbSignature,
   [out, size_is(cbSignature), length_is(*pcbSignature)] BYTE signature[]
);
```

## Parameters

 `tableRva`
 [in] A relative virtual address (RVA) in a vtable.

 `cbSignature`
 [in] The size of the `signature` array. See the Remarks section.

 `pcbSignature`
 [out] [out] A pointer to the size of the returned `signature` array.

 `signature`
 [out] A buffer that holds the typespec signatures of all generic parameters.

## Remarks

To get the required size of the type's `signature` array, set the `cbSignature` argument to 0 and `signature` to **null**. When the method returns, `pcbSignature` will contain the number of bytes required for the `signature` array.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- GetMethodProps Method
- ICorDebugSymbolProvider Interface
