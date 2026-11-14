---
title: "ICorDebugModule::GetMetaDataInterface Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getmetadatainterface-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule::GetMetaDataInterface Method

Gets a metadata interface object that can be used to examine the metadata for the module.

## Syntax

```cpp
HRESULT GetMetaDataInterface (
    [in] REFIID      riid,
    [out] IUnknown **ppObj
);
```

## Parameters

 `riid`
 [in] The reference ID that specifies the metadata interface.

 `ppObj`
 [out] A pointer to the address of an `T:IUnknown` object that is one of the metadata interfaces.

## Remarks

The debugger can use the `GetMetaDataInterface` method to make a copy of the original metadata for a module, which it must do in order to edit that module. The debugger calls `GetMetaDataInterface` to get an IMetaDataEmit interface object for the module, then calls IMetaDataEmit::SaveToMemory to save a copy of the module's metadata to memory.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
