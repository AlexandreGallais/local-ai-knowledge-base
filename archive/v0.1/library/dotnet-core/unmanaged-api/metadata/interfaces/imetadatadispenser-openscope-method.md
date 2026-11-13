---
title: "IMetaDataDispenser::OpenScope Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatadispenser-openscope-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataDispenser::OpenScope Method

Opens an existing, on-disk file and maps its metadata into memory.

## Syntax

```cpp
HRESULT OpenScope (
    [in]  LPCWSTR     szScope,
    [in]  DWORD       dwOpenFlags,
    [in]  REFIID      riid,
    [out] IUnknown    **ppIUnk
);
```

## Parameters

 `szScope`
 [in] The name of the file to be opened. The file must contain common language runtime (CLR) metadata.

 `dwOpenFlags`
 [in] A value of the CorOpenFlags enumeration to specify the mode (read, write, and so on) for opening.

 `riid`
 [in] The IID of the desired metadata interface to be returned; the caller will use the interface to import (read) or emit (write) metadata.

 The value of `riid` must specify one of the "import" or "emit" interfaces. Valid values are IID_IMetaDataEmit, IID_IMetaDataImport, IID_IMetaDataAssemblyEmit, IID_IMetaDataAssemblyImport, IID_IMetaDataEmit2, or IID_IMetaDataImport2.

 `ppIUnk`
 [out] The pointer to the returned interface.

## Remarks

The in-memory copy of the metadata can be queried using methods from one of the "import" interfaces, or added to using methods from the one of the "emit" interfaces.

If the target file does not contain CLR metadata, the `OpenScope` method will fail.

Scopes opened with `dwOpenFlags` set to `ofRead` aren't shared. Use the `ofReadOnly` value to allow the scope to be shared. When a scope is shared, queries that use "read/write" metadata interfaces will fail.

## Requirements

 **Platforms:** See .NET supported operating systems.

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
