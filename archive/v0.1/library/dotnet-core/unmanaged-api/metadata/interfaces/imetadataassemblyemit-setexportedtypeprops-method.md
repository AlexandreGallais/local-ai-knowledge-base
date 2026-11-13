---
title: "IMetaDataAssemblyEmit::SetExportedTypeProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyemit-setexportedtypeprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyEmit::SetExportedTypeProps Method

Modifies the specified `ExportedType` metadata structure.

## Syntax

```cpp
HRESULT SetExportedTypeProps (
    [in] mdExportedType   ct,
    [in] mdToken          <example-value>,
    [in] mdTypeDef        tkTypeDef,
    [in] DWORD            dwExportedTypeFlags
);
```

## Parameters

 `ct`
 [in] The metadata token that specifies the `ExportedType` metadata structure to be modified.

 `tkImplementation`
 [in] The token, of type `File`, `AssemblyRef`, or `ExportedType`, that specifies how this type is implemented.

 `tkTypeDef`
 [in] The `TypeDef` token <example-value> in the code file.

 `dwExportedTypeFlags`
 [in] A bitwise combination of values that specify attributes of the type.

## Remarks

 To create an `ExportedType` metadata structure, use the IMetaDataAssemblyEmit::DefineExportedType method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyEmit Interface
