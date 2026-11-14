---
title: "IMetaDataImport::EnumUnresolvedMethods Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumunresolvedmethods-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumUnresolvedMethods Method

Enumerates MemberDef tokens representing the unresolved methods in the current metadata scope.

## Syntax

```cpp
HRESULT EnumUnresolvedMethods (
   [in, out] HCORENUM    *phEnum,
   [out]     mdToken     <example-value>[],
   [in]      ULONG       cMax,
   [out]     ULONG       *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `rMethods`
 [out] The array used to store the MemberDef tokens.

 `cMax`
 [in] The maximum size of the `rMethods` array.

 `pcTokens`
 [out] The number of MemberDef tokens returned in `rMethods`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumUnresolvedMethods` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcTokens` is zero. |

## Remarks

 An unresolved method is one that has been declared but not implemented. A method is included in the enumeration if the method is marked `miForwardRef` and either `mdPinvokeImpl` or `miRuntime` is set to zero. In other words, an unresolved method is a class method that is marked `miForwardRef` but which is not implemented in unmanaged code (reached via PInvoke) nor implemented internally by the runtime itself

 The enumeration excludes all methods that are defined either at module scope (globals) or in interfaces or abstract classes.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
