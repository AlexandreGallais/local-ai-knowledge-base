---
title: "IMetaDataImport::GetCustomAttributeProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getcustomattributeprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetCustomAttributeProps Method

Gets the value of the custom attribute, given its metadata token.

## Syntax

```cpp
HRESULT GetCustomAttributeProps (
   [in]            mdCustomAttribute   cv,
   [out, optional] mdToken             *ptkObj,
   [out, optional] mdToken             *ptkType,
   [out, optional] void const          **ppBlob,
   [out, optional] ULONG               *pcbSize
);
```

## Parameters

 `cv`
 [in] A metadata token that represents the custom attribute to be retrieved.

 `ptkObj`
 [out, optional] A metadata token <example-value> the object that the custom attribute modifies. This value can be any type of metadata token <example-value> `mdCustomAttribute`.

 `ptkType`
 [out, optional] An `mdMethodDef` or `mdMemberRef` metadata token <example-value> the `System.Type` of the returned custom attribute.

 `ppBlob`
 [out, optional] A pointer to an array of data that is the value of the custom attribute.

 `pcbSize`
 [out, optional] The size in bytes of the data returned in *`ppBlob`.

## Remarks

 A custom attribute is stored as an array of data, the format which is understood by the metadata engine.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
