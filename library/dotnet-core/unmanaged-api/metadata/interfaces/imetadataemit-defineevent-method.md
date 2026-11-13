---
title: "IMetaDataEmit::DefineEvent Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-defineevent-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineEvent Method

Creates a definition for an event with the specified metadata signature, and gets a token to that event definition.

## Syntax

```cpp
HRESULT DefineEvent (
    [in]  mdTypeDef    td,
    [in]  LPCWSTR      szEvent,
    [in]  DWORD        dwEventFlags,
    [in]  mdToken      tkEventType,
    [in]  mdMethodDef  mdAddOn,
    [in]  mdMethodDef  mdRemoveOn,
    [in]  mdMethodDef  mdFire,
    [in]  mdMethodDef  rmdOtherMethods[],
    [out] mdEvent      *pmdEvent
);
```

## Parameters

 `td`
 [in] The token for the target class or interface. This is either a `mdTypeDef` or `mdTypeDefNil` token.

 `szEvent`
 [in] The name of the event.

 `dwEventFlags`
 [in] Event flags.

 `tkEventType`
 [in] The token for the event class. This is a `mdTypeDef`, a `mdTypeRef`, or a `mdTokenNil` token.

 `mdAddOn`
 [in] The method used to subscribe to the event, or null.

 `mdRemoveOn`
 [in] The method used to unsubscribe to the event, or null.

 `mdFire`
 [in] The method used (by a derived class) to raise the event.

 `rmdOtherMethods[]`
 [in] An array of tokens for other methods associated with the event. The array is terminated with a `mdMethodDefNil` token.

 `pmdEvent`
 [out] The metadata token assigned to the event.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
