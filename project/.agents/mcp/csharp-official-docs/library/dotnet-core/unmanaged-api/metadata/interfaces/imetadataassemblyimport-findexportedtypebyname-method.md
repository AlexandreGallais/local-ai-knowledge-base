---
title: "IMetaDataAssemblyImport::FindExportedTypeByName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-findexportedtypebyname-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::FindExportedTypeByName Method

Gets a pointer to an exported type, given its name and enclosing type.

## Syntax

```cpp
HRESULT FindExportedTypeByName (
    [in]  LPCWSTR           szName,
    [in]  mdToken           <example-value>,
    [out] mdExportedType    *ptkExportedType
);
```

## Parameters

 `szName`\
 [in] The name of the exported type.

 `mdtExportedType`\
 [in] The metadata token for the enclosing class of the exported type. This value is `mdExportedTypeNil` if the requested exported type is not a nested type.

 `ptkExportedType`\
 [out] A pointer to the `mdExportedType` token that represents the exported type.

## Remarks

 The `FindExportedTypeByName` method uses the standard rules employed by the common language runtime for resolving references.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
- How the Runtime Locates Assemblies
