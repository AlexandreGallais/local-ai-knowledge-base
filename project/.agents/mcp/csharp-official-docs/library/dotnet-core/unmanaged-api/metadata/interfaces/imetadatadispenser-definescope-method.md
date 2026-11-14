---
title: "IMetaDataDispenser::DefineScope Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatadispenser-definescope-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataDispenser::DefineScope Method

Creates a new area in memory in which you can create new metadata.

## Syntax

```cpp
HRESULT DefineScope (
    [in]  REFCLSID    rclsid,
    [in]  DWORD       dwCreateFlags,
    [in]  REFIID      riid,
    [out] IUnknown    **ppIUnk
);
```

## Parameters

 `rclsid`\
 [in] The CLSID of the version of metadata structures to be created.

 `dwCreateFlags`\
 [in] Flags that specify options.

 `riid`\
 [in] The IID of the desired metadata interface to be returned; the caller will use the interface to create the new metadata.

 The value of `riid` must specify one of the "emit" interfaces. Valid values are `IID_IMetaDataEmit`, `IID_IMetaDataAssemblyEmit`, or `IID_IMetaDataEmit2`.

 `ppIUnk`\
 [out] The pointer to the returned interface.

## Remarks

 `DefineScope` creates a set of in-memory metadata tables, generates a unique GUID (module version identifier, or MVID) for the metadata, and creates an entry in the module table for the compilation unit being emitted.

 You can attach attributes to the metadata scope as a whole by using the IMetaDataEmit::SetModuleProps or IMetaDataEmit::DefineCustomAttribute method, as appropriate.

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataDispenser Interface
- IMetaDataDispenserEx Interface
- IMetaDataAssemblyEmit Interface
- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
