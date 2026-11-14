---
title: "IMetaDataImport::GetNameFromToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getnamefromtoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetNameFromToken <example-value>

Gets the UTF-8 name of the object referenced by the specified metadata token. This method is obsolete.

## Syntax

```cpp
HRESULT GetNameFromToken (
   [in] mdToken      tk,
   [out] MDUTF8CSTR  *pszUtf8NamePtr
);
```

## Parameters

 `tk`
 [in] The token <example-value> the object to return the name for.

 `pszUtf8NamePtr`
 [out] A pointer to the UTF-8 object name in the heap.

## Remarks

 `GetNameFromToken` is obsolete. As an alternative, call a method to get the properties of the particular type of token <example-value>, such as `GetFieldProps` for a field or `GetMethodProps` for a method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** 1.0

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
