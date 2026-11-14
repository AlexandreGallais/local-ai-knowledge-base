---
title: "ICorDebugVariableHome::GetSlotIndex Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehome-getslotindex-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableHome::GetSlotIndex Method

Gets the managed slot-index of a local variable.

## Syntax

```cpp
HRESULT GetSlotIndex(
    [out] ULONG32 *pSlotIndex
);
```

## Parameters

 `pSlotIndex`
 [out] A pointer to the slot-index of a local variable.

## Return Value

The method returns the following values.

|Value|Description|
|-----------|-----------------|
|`S_OK`|The method call returned a slot-index value in `pSlotIndex`.|
|`E_FAIL`|The current ICorDebugVariableHome instance represents a function argument.|

## Remarks

The slot-index can be used to retrieve the metadata for this local variable.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugVariableHome Interface
