---
title: "ICorDebugSymbolProvider::GetAssemblyImageMetadata Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getassemblyimagemetadata-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider::GetAssemblyImageMetadata Method

Returns the metadata from a merged assembly.

## Syntax

```cpp
HRESULT GetAssemblyImageMetadata(
   [out] ICorDebugMemoryBuffer** ppMemoryBuffer
);
```

## Parameters

 `ppMemoryBuffer`
 [out] A pointer to the address of an ICorDebugMemoryBuffer object that contains information about the size and address of the merged assembly's metadata.

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
