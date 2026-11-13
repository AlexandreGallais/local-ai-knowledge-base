---
title: "ICorDebugSymbolProvider::GetAssemblyImageBytes Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getassemblyimagebytes-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider::GetAssemblyImageBytes Method

Reads data from a merged assembly given a relative virtual address (RVA) in the merged assembly.

## Syntax

```cpp
HRESULT GetAssemblyImageBytes(
   [in] CORDB_ADDRESS rva,
   [in] ULONG32 length,
   [out] ICorDebugMemoryBuffer** ppMemoryBuffer
);
```

## Parameters

 `rva`
 [in] A relative virtual address (RVA) in a merged assembly.

 `length`
The number of bytes to read from the merged assembly.

 `ppMemoryBuffer`
A pointer to the address of an ICorDebugMemoryBuffer object that contains information about the memory buffer with merged assembly metadata.

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
