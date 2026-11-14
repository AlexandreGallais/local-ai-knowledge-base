---
title: "ICorDebugHeapValue::IsValid Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugheapvalue-isvalid-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugHeapValue::IsValid Method

**Deprecated** Gets a value that indicates whether the object represented by this ICorDebugHeapValue is valid.

## Syntax

```cpp
HRESULT IsValid (
    [out] BOOL    *pbValid
);
```

## Parameters

 `pbValid`
 [out] A pointer to a Boolean value that indicates whether this value on the heap is valid.

## Remarks

The value is invalid if it has been reclaimed by the garbage collector.

This method has been deprecated. All values are valid until ICorDebugController::Continue is called, at which time the values are invalidated.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
