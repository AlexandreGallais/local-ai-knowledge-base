---
title: "ICorDebugValueEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvalueenum-next-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugValueEnum::Next Method

Gets the specified number of "ICorDebugValue" instances from the enumeration, starting at the current position.

## Syntax

```cpp
HRESULT Next (
    [in]  ULONG  celt,
    [out, size_is(celt), length_is(*pceltFetched)]
        ICorDebugValue *values[],
    [out] ULONG *pceltFetched
);
```

## Parameters

 `celt`
 [in] The number of `ICorDebugValue` instances to be retrieved.

 `values`
 [out] An array of pointers, each of which points to an `ICorDebugValue` object.

 `pceltFetched`
 [out] Pointer to the number of `ICorDebugValue` instances actually returned. This value may be null if `celt` is one.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
