---
title: "IMetaDataDispenserEx::GetOption Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatadispenserex-getoption-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataDispenserEx::GetOption Method

Gets the value of the specified option for the current metadata scope. The option controls how calls to the current metadata scope are handled.

## Syntax

```cpp
HRESULT GetOption (
    [in]  REFGUID         optionId,
    [out] const VARIANT   *pValue
);
```

## Parameters

 `optionId`
 [in] A pointer to a GUID that specifies the option to be retrieved. See the Remarks section for a list of supported GUIDs.

 `pValue`
 [out] The value of the returned option. The type of this value will be a variant of the specified option's type.

## Remarks

 The following list shows the GUIDs that are supported for this method. For descriptions, see the IMetaDataDispenserEx::SetOption method. If `optionId` is not in this list, this method returns HRESULT `E_INVALIDARG`, indicating an incorrect parameter.

- MetaDataCheckDuplicatesFor

- MetaDataRefToDefCheck

- MetaDataNotificationForTokenMovement

- MetaDataSetENC

- MetaDataErrorIfEmitOutOfOrder

- MetaDataGenerateTCEAdapters

- MetaDataLinkerOptions

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataDispenserEx Interface
- IMetaDataDispenser Interface
