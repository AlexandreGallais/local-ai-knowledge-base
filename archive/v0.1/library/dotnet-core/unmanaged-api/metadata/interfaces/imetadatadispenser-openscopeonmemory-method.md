---
title: "IMetaDataDispenser::OpenScopeOnMemory Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatadispenser-openscopeonmemory-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataDispenser::OpenScopeOnMemory Method

Opens an area of memory that contains existing metadata. That is, this method opens a specified area of memory in which the existing data is treated as metadata.

## Syntax

```cpp
HRESULT OpenScopeOnMemory (
    [in]  LPCVOID     pData,
    [in]  ULONG       cbData,
    [in]  DWORD       dwOpenFlags,
    [in]  REFIID      riid,
    [out] IUnknown    **ppIUnk
);
```

## Parameters

 `pData`
 [in] A pointer that specifies the starting address of the memory area.

 `cbData`
 [in] The size of the memory area, in bytes.

 `dwOpenFlags`
 [in] A value of the CorOpenFlags enumeration to specify the mode (read, write, and so on) for opening.

 `riid`
 [in] The IID of the desired metadata interface to be returned; the caller will use the interface to import (read) or emit (write) metadata.

 The value of `riid` must specify one of the "import" or "emit" interfaces. Valid values are IID_IMetaDataEmit, IID_IMetaDataImport, IID_IMetaDataAssemblyEmit, IID_IMetaDataAssemblyImport, IID_IMetaDataEmit2, or IID_IMetaDataImport2.

 `ppIUnk`
 [out] The pointer to the returned interface.

## Remarks

 The in-memory copy of the metadata can be queried using methods from one of the "import" interfaces, or added to using methods from the one of the "emit" interfaces.

 The `OpenScopeOnMemory` method is similar to the IMetaDataDispenser::OpenScope method, except that the metadata of interest already exists in memory, rather than in a file on disk.

 If the target area of memory does not contain common language runtime (CLR) metadata, the `OpenScopeOnMemory` method will fail.

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataDispenser Interface
- IMetaDataDispenserEx Interface
- IMetaDataAssemblyEmit Interface
- IMetaDataAssemblyImport Interface
- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
- IMetaDataImport Interface
- IMetaDataImport2 Interface
