---
title: "IMetaDataImport::GetParamProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getparamprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetParamProps Method

Gets metadata values for the parameter referenced by the specified ParamDef token.

## Syntax

```cpp
HRESULT GetParamProps (
   [in]  mdParamDef      tk,
   [out] mdMethodDef     *pmd,
   [out] ULONG           *pulSequence,
   [out] LPWSTR          szName,
   [in]  ULONG           cchName,
   [out] ULONG           *pchName,
   [out] DWORD           *pdwAttr,
   [out] DWORD           *pdwCPlusTypeFlag,
   [out] UVCP_CONSTANT   *ppValue,
   [out] ULONG           *pcchValue
);
```

## Parameters

 `tk`
 [in] A ParamDef token that represents the parameter to return metadata for.

 `pmd`
 [out] A pointer to a MethodDef token <example-value> the method that takes the parameter.

 `pulSequence`
 [out] The ordinal position of the parameter in the method argument list.

 `szName`
 [out] A buffer to hold the name of the parameter.

 `cchName`
 [in] The requested size in wide characters of `szName`.

 `pchName`
 [out] The returned size in wide characters of `szName`.

 `pdwAttr`
 [out] A pointer to any attribute flags associated with the parameter. This is a bitmask of `CorParamAttr` values.

 `pdwCPlusTypeFlag`
 [out] A pointer to a flag specifying that the parameter is a `System.ValueType`.

 `ppValue`
 [out] A pointer to a constant string returned by the parameter.

 `pcchValue`
 [out] The size of `ppValue` in wide characters, or zero if `ppValue` does not hold a string.

## Remarks

The sequence values in `pulSequence` begin with 1 for parameters. A return value has a sequence number of 0.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
