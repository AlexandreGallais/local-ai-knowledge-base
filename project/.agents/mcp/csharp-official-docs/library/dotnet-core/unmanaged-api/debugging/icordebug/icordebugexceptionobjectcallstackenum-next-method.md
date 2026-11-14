---
title: "ICorDebugExceptionObjectCallStackEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptionobjectcallstackenum-next-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugExceptionObjectCallStackEnum::Next Method

Gets the specified number of CorDebugExceptionObjectStackFrame instances that contain information from an exception object's call stack.

## Syntax

```cpp
HRESULT Next(
    [in] ULONG celt,
    [out, size_is(celt), length_is(*pceltFetched)] CorDebugExceptionObjectStackFrame values[],
    [out] ULONG *pceltFetched
);
```

## Parameters

 `celt`
 [in] The number of CorDebugExceptionObjectStackFrame instances to be retrieved.

 `values`
 [out] An array of pointers, each of which points to a CorDebugExceptionObjectStackFrame object.

 `pceltFetched`
 [out] A pointer to the number of CorDebugExceptionObjectStackFrame instances actually returned.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugExceptionObjectCallStackEnum Interface
