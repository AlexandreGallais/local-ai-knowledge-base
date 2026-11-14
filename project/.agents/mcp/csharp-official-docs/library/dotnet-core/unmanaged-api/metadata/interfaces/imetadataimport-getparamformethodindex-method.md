---
title: "IMetaDataImport::GetParamForMethodIndex Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getparamformethodindex-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetParamForMethodIndex Method

Gets the token that represents a specified parameter of the method represented by the specified MethodDef token.

## Syntax

```cpp
HRESULT GetParamForMethodIndex (
   [in]  mdMethodDef      md,
   [in]  ULONG            ulParamSeq,
   [out] mdParamDef       *ppd
);
```

## Parameters

 `md`
 [in] A token that represents the method to return the parameter token for.

 `ulParamSeq`
 [in] The ordinal position in the parameter list where the requested parameter occurs. Parameters are numbered starting from one, with the method's return value in position zero.

 `ppd`
 [out] A pointer to a ParamDef token that represents the requested parameter.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
