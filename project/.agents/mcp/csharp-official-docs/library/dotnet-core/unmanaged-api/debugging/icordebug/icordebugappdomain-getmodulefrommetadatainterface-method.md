---
title: "ICorDebugAppDomain::GetModuleFromMetaDataInterface Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-getmodulefrommetadatainterface-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain::GetModuleFromMetaDataInterface Method

Gets the module that corresponds to the given metadata interface.

## Syntax

```cpp
HRESULT GetModuleFromMetaDataInterface (
    [in] IUnknown           *pIMetaData,
    [out] ICorDebugModule  **ppModule
);
```

## Parameters

 `pIMetaData`
 [in] A pointer to an object that is one of the Metadata interfaces.

 `ppModule`
 [out] A pointer to the address of an ICorDebugModule object that represents the module corresponding to the given metadata interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
