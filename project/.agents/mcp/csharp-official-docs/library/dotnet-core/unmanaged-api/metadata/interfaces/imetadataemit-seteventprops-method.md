---
title: "IMetaDataEmit::SetEventProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-seteventprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetEventProps Method

Sets or updates the specified feature of an event defined by a prior call to IMetaDataEmit::DefineEvent.

## Syntax

```cpp
HRESULT SetEventProps (
    [in]  mdEvent     ev,
    [in]  DWORD       dwEventFlags,
    [in]  mdToken     <example-value>,
    [in]  mdMethodDef mdAddOn,
    [in]  mdMethodDef mdRemoveOn,
    [in]  mdMethodDef mdFire,
    [in]  mdMethodDef rmdOtherMethods[]
);
```

## Parameters

 `ev`
 [in] The event token.

 `dwEventFlags`
 [in] Event flags. This is a bitmask of `CorEventAttr` values.

 `tkEventType`
 [in] The token for the event class. This is either a `mdTypeDef` or a `mdTypeRef` token.

 `mdAddOn`
 [in] The method used to subscribe to the event, or null.

 `mdRemoveOn`
 [in] The method used to unsubscribe to the event, or null.

 `mdFire`
 [in] The method used (by a derived class) to raise the event.

 `rmdOtherMethods[]`
 [in] An array of tokens for other methods associated with the event. The last element of the array must be `mdMethodDefNil`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
