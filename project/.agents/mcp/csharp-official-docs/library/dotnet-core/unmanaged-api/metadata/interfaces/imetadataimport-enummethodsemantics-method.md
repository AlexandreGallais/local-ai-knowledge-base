---
title: "IMetaDataImport::EnumMethodSemantics Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enummethodsemantics-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumMethodSemantics Method

Enumerates the properties and the property-change events to which the specified method is related.

## Syntax

```cpp
HRESULT EnumMethodSemantics (
   [in, out] HCORENUM    *phEnum,
   [in]  mdMethodDef     mb,
   [out] mdToken         <example-value>[],
   [in]  ULONG           cMax,
   [out] ULONG           *pcEventProp
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `mb`
 [in] A MethodDef token that limits the scope of the enumeration.

 `rEventProp`
 [out] The array used to store the events or properties.

 `cMax`
 [in] The maximum size of the `rEventProp` array.

 `pcEventProp`
 [out] The number of events or properties returned in `rEventProp`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumMethodSemantics` returned successfully. |
| `S_FALSE` | There are no events or properties to enumerate. In that case, `pcEventProp` is zero. |

## Remarks

 Many common language runtime types define *Property*`Changed` events and `On`*Property*`Changed` methods related to their properties. For example, the `System.Windows.Forms.Control` type defines a `System.Windows.Forms.Control.Font` property, a `System.Windows.Forms.Control.FontChanged` event, and an `System.Windows.Forms.Control.OnFontChanged*` method. The set accessor method of the `System.Windows.Forms.Control.Font` property calls `System.Windows.Forms.Control.OnFontChanged*` method, which in turn raises the `System.Windows.Forms.Control.FontChanged` event. You would call `EnumMethodSemantics` using the MethodDef for `System.Windows.Forms.Control.OnFontChanged*` to get references to the `System.Windows.Forms.Control.Font` property and the `System.Windows.Forms.Control.FontChanged` event.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
