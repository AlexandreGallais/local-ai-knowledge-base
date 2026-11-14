---
title: "ICorDebugDataTarget2::GetImageFromPointer Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget2-getimagefrompointer-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget2::GetImageFromPointer Method

Returns the module base address and size from an address in that module.

## Syntax

```cpp
HRESULT GetImageFromPointer(
   [in] CORDB_ADDRESS addr,
   [out] CORDB_ADDRESS *pImageBase,
   [out] ULONG32 *pSize
);
```

## Parameters

`addr`\
A CORDB_ADDRESS value that represents an address in a module.

`pImageBase`\
[out] A CORDB_ADDRESS value that represents the module's base address.

`pSize`\
A pointer to the module size.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugDataTarget2 Interface
