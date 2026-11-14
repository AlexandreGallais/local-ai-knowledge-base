---
title: "IMetaDataImport::GetInterfaceImplProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getinterfaceimplprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetInterfaceImplProps Method

Gets a pointer to the metadata tokens for the `System.Type` that implements the specified method, and for the interface that declares that method.

## Syntax

```cpp
HRESULT GetInterfaceImplProps (
   [in]  mdInterfaceImpl        iiImpl,
   [out] mdTypeDef              *pClass,
   [out] mdToken                *ptkIface
);
```

## Parameters

 `iiImpl`
 [in] The metadata token <example-value> the method to return the class and interface tokens for.

 `pClass`
 [out] The metadata token <example-value> the class that implements the method.

 `ptkIface`
 [out] The metadata token <example-value> the interface that defines the implemented method.

## Remarks

 You obtain the value for `iImpl` by calling the EnumInterfaceImpls method.

 For example, suppose that a class has an `mdTypeDef` token value of 0x02000007 and that it implements three
interfaces whose types have tokens:

- 0x02000003 (TypeDef)
- 0x0100000A (TypeRef)
- 0x0200001C (TypeDef)

Conceptually, this information is stored into an interface implementation table as:

| Row number | Class token | Interface token |
|------------|-------------|-----------------|
| 4          |             |                 |
| 5          | 02000007    | 02000003        |
| 6          | 02000007    | 0100000A        |
| 7          |             |                 |
| 8          | 02000007    | 0200001C        |

Recall, the token is a 4-byte value:

- The lower 3 bytes hold the row number, or RID.
- The upper byte holds the token type – 0x09 for `mdtInterfaceImpl`.

`GetInterfaceImplProps` returns the information held in the row whose token you provide in the `iImpl` argument.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
