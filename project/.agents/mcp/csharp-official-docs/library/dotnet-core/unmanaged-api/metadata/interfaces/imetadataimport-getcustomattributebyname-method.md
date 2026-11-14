---
title: "IMetaDataImport::GetCustomAttributeByName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getcustomattributebyname-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetCustomAttributeByName Method

Gets the custom attribute, given its name and owner.

## Syntax

```cpp
HRESULT GetCustomAttributeByName (
   [in]  mdToken          tkObj,
   [in]  LPCWSTR          szName,
   [out] const void       **ppData,
   [out] ULONG            *pcbData
);
```

## Parameters

 `tkObj`
 [in] A metadata token <example-value> the object that owns the custom attribute.

 `szName`
 [in] The name of the custom attribute.

 `ppData`
 [out] A pointer to an array of data that is the value of the custom attribute.

 `pcbData`
 [out] The size in bytes of the data returned in *`ppData`.

## Remarks

 It is legal to define multiple custom attributes for the same owner; they may even have the same name. However, `GetCustomAttributeByName` returns only one instance. (`GetCustomAttributeByName` returns the first instance that it encounters.) To find all instances of a custom attribute, call the IMetaDataImport::EnumCustomAttributes method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
