---
title: "IMetaDataAssemblyEmit::SetFileProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyemit-setfileprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyEmit::SetFileProps Method

Modifies the specified `File` metadata structure.

## Syntax

```cpp
HRESULT SetFileProps (
    [in] mdFile        file,
    [in] const void    *pbHashValue,
    [in] ULONG         cbHashValue,
    [in] DWORD         dwFileFlags
);
```

## Parameters

 `file`
 [in] The metadata token that specifies the `File` metadata structure to be modified.

 `pbHashValue`
 [in] A pointer to the hash data associated with the file.

 `cbHashValue`
 [in] The size in bytes of `pbHashValue`.

 `dwFileFlags`
 [in] A bitwise combination of CorFileFlags values that specify various attributes of the file.

## Remarks

 To create a `File` metadata structure, use the IMetaDataAssemblyEmit::DefineFile method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyEmit Interface
