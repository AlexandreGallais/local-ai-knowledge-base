---
title: "ICorDebugBlockingObjectEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugblockingobjectenum-next-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugBlockingObjectEnum::Next Method

Gets the specified number of CorDebugBlockingObject objects from the enumeration, starting at the current position.

## Syntax

```cpp
HRESULT Next([in] ULONG  celt,
             [out, size_is(celt), length_is(*pceltFetched)]
                           CorDebugBlockingObject values[],
             [out] ULONG *pceltFetched;
```

## Parameters

 `celt`
 [in] The number of objects to retrieve.

 `values`
 [out] An array of pointers to CorDebugBlockingObject objects.

 `pceltFetched`
 [out] A pointer to the number of objects that were retrieved.

## Return Value

This method returns the following specific HRESULTs.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The method completed successfully.|
|S_FALSE|`pceltFetched` does not equal `celt`.|

## Remarks

This method functions like a typical COM enumerator.

The input array values must be at least of size `celt`. The array will be filled with either the next `celt` values in the enumeration or with all remaining values if fewer than `celt` remain. When this method returns, `pceltFetched` will be filled with the number of values that were retrieved. If `values` contains invalid pointers or points to a buffer that is smaller than `celt`, or if `pceltFetched` is an invalid pointer, the result is undefined.

> **Note:**
> Although the CorDebugBlockingObject structure does not need to be released, the "ICorDebugValue" interface inside of it does need to be released.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugDataTarget Interface
